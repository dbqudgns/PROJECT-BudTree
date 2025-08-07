package com.happiness.budtree.domain.post;

import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.post.DTO.request.PostAllRQ;
import com.happiness.budtree.domain.post.DTO.request.PostChangeRQ;
import com.happiness.budtree.domain.post.DTO.request.PostRegisterRQ;
import com.happiness.budtree.domain.post.DTO.response.PostAllRP;
import com.happiness.budtree.domain.post.DTO.response.PostEmotionRP;
import com.happiness.budtree.domain.post.DTO.response.PostMessageRP;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.CursorPaginationRP;
import com.happiness.budtree.util.RedisUtil;
import com.happiness.budtree.util.ReturnMember;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final RedisUtil redisUtil;
    private final ReturnMember returnMember;

    @Transactional
    public void createPost(PostRegisterRQ postRegister, CustomMemberDetails customMemberDetails) {

        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        Post post = Post.builder()
                .content(postRegister.content())
                .emotion(postRegister.emotion())
                .createdDate(LocalDateTime.now())
                .member(member)
                .build();
        postRepository.save(post);

    }

    @Transactional
    public void updatePost(Long postId, PostChangeRQ changeRQ, CustomMemberDetails customMemberDetails) {

        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("일기장이 존재하지 않습니다."));

        if(!post.getMember().getMemberId().equals(member.getMemberId())) {
            throw new IllegalArgumentException("해당 일기장에 대한 수정권한이 없습니다.");
        }
        post.updatePost(changeRQ.content(),changeRQ.emotion());
    }


    @Transactional
    public PostMessageRP findByPostId(Long postId, CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());


        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("일기장을 찾을 수 없습니다."));


        if (!post.getMember().getMemberId().equals(member.getMemberId())) {
            throw new IllegalArgumentException("일기장을 조회 할 권한이 없습니다.");
        }
        return PostMessageRP.builder()
                .postId(postId)
                .content(post.getContent())
                .emotion(post.getEmotion())
                .createdDate(post.getCreatedDate())
                .build();
    }

    public List<PostEmotionRP> findLatestSixEmotions(CustomMemberDetails customMemberDetails) {

        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());
        List<Post> posts = postRepository.findLatestPosts(member)
                .stream()
                .limit(6)
                .toList();

        List<PostEmotionRP> res = new ArrayList<>();

        for (Post post : posts) {
          res.add(PostEmotionRP.builder()
                  .postId(post.getPostId())
                  .emotion(post.getEmotion())
                  .build());
        }
        return res;
    }

    // Redis 적용
    public List<PostEmotionRP> findLatestSixEmotionsByRedis(CustomMemberDetails customMemberDetails) {

        String username = customMemberDetails.getUsername();
        String key = "recentSixPost:" + username;

        // 1. Redis에서 캐시 조회
        Object cached = redisUtil.getData(key);

        // 2. 캐시가 존재하고 타입이 올바르면 반환
        if (cached instanceof List<?> cachedList &&
                (cachedList.isEmpty() || cachedList.get(0) instanceof PostEmotionRP)) {
            return (List<PostEmotionRP>) cachedList;
        }

        // 3. 캐시가 없거나 타입이 다르면 DB 조회
        List<Post> posts = postRepository.findSixLatestPosts(username);

        List<PostEmotionRP> res = new ArrayList<>();

        for (Post post : posts) {
            res.add(PostEmotionRP.builder()
                    .postId(post.getPostId())
                    .emotion(post.getEmotion())
                    .build());
        }

        // 4. Redis에 캐시 저장 (TTL 10분)
        redisUtil.setDataExpire(key, res, 60 * 10L);

        return res;
    }

    public List<PostAllRP> findAllPosts(PostAllRQ postAllRQ,  CustomMemberDetails customMemberDetails) {
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());
        List<Post> posts = postRepository.findLatestPosts(member);

        List<Post> filterPost;
        if(postAllRQ.year() == 0 && postAllRQ.month()==0){
            filterPost = posts;

         //월별 조회
        }else if(postAllRQ.year() == 0){
            filterPost = posts.stream()
                    .filter(post->post.getCreatedDate().getMonthValue() == postAllRQ.month())
                    .toList();
         //년별 조회
        }else if(postAllRQ.month() == 0){
            filterPost = posts.stream()
                    .filter(post->post.getCreatedDate().getYear() == postAllRQ.year())
                    .toList();

            // 년 월로 조회
        }else{
            filterPost = posts.stream()
                    .filter(post -> post.getCreatedDate().getYear() == postAllRQ.year() &&
                            post.getCreatedDate().getMonthValue() == postAllRQ.month())
                    .toList();
        }

        //예외 EntityNotFoundException 으로 처리
        if(filterPost.isEmpty()){
            throw new IllegalArgumentException("해당 날짜에 조회되는 일기장이 존재하지 않습니다.");
        }

        return filterPost.stream()
                    .map(this::convertToPostAllRP)
                    .toList();
    }

    public CursorPaginationRP<Object> findAllPostsByCursor(Long cursor, int size, Integer year, Integer month, CustomMemberDetails customMemberDetails) {

        // 사용자 아이디 반환
        String username = customMemberDetails.getUsername();

        // 년/월 지정, 쿼리 파라미터에 없으면 0
        int setYear = (year != null) ? year : 0;
        int setMonth = (month != null) ? month : 0;

        // Slice<T>를 반환하려면 Spring Data JPA가 페이지 크기와 정렬, 다음 페이지 여부 계산(hasNext)을 위해 Pageable이 필요하다.
        Pageable pageable = PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "postId"));

        // Slice<Post> postSlice = postRepository.findPostByCursor(username, cursor, setYear, setMonth, pageable);
        // 동적 쿼리 QueryDSL 적용
        Slice<Post> postSlice = postRepository.findByCursor(username, cursor, setYear, setMonth, pageable);

        if (!postSlice.hasContent()) {
            throw new EntityNotFoundException("해당 날짜에 조회되는 대화 내역이 존재하지 않습니다.");
        }

        // 가져온 DB 데이터 DTO로 변환
        List<PostAllRP> lists = new ArrayList<>();
        for (Post post : postSlice) {
            PostAllRP postAllRP = convertToPostAllRP(post);
            lists.add(postAllRP);
        }

        // nextCursor 설정
        Long nextCursor = null;
        if (postSlice.hasNext()) {
            Post lastPost = postSlice.getContent().get(postSlice.getNumberOfElements() - 1);
            nextCursor = lastPost.getPostId();
        }

        return CursorPaginationRP.builder()
                .lists(lists)
                .nextCursor(nextCursor)
                .hasNext(postSlice.hasNext())
                .build();
    }


    private PostAllRP convertToPostAllRP(Post post) {
        return PostAllRP.builder()
                .postId(post.getPostId())
                .createdDate(post.getCreatedDate())
                .emotion(post.getEmotion())
                .build();
    }



    @Transactional
    public void deletePost(Long postId,CustomMemberDetails customMemberDetails){
        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("일기장이 존재하지 않습니다."));

        if(!post.getMember().getMemberId().equals(member.getMemberId())) {
            throw new IllegalArgumentException("일기장 삭제 권한이 없습니다.");
        }
        postRepository.delete(post);
    }
}