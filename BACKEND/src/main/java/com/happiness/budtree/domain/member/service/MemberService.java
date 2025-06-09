package com.happiness.budtree.domain.member.service;

import com.happiness.budtree.domain.member.DTO.request.MemberRegisterRQ;
import com.happiness.budtree.domain.member.DTO.response.MemberCheckRP;
import com.happiness.budtree.domain.member.Member;
import com.happiness.budtree.domain.member.MemberRepository;
import com.happiness.budtree.domain.member.Role;
import com.happiness.budtree.jwt.Custom.CustomMemberDetails;
import com.happiness.budtree.util.ReturnMember;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;
    private final ReturnMember returnMember;

    @Transactional
    public MemberCheckRP checkID(String username) {

        if (memberRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("이미 사용중인 아이디 입니다.");
        }

        return MemberCheckRP.builder()
                .username(username)
                .success(1)
                .msg("사용 가능한 아이디 입니다.")
                .build();
    }

    @Transactional
    public void register(MemberRegisterRQ memberRegisterRQ) {

        if (!memberRegisterRQ.password().equals(memberRegisterRQ.verifyPassword())) {
            throw new IllegalArgumentException("입력한 비밀번호와 검증용 비밀번호가 일치하지 않습니다.");
        }

        Member member = Member.builder()
                .name(memberRegisterRQ.name())
                .username(memberRegisterRQ.username())
                .password(bCryptPasswordEncoder.encode(memberRegisterRQ.password()))
                .role(Role.USER)
                .build();

        memberRepository.save(member);
    }

    @Transactional
    public void changeName(String name, CustomMemberDetails customMemberDetails) {

        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        member.updateName(name);

    }

    @Transactional
    public void changePW(String newPassword, CustomMemberDetails customMemberDetails) {

        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        member.updatePassword(bCryptPasswordEncoder.encode(newPassword));

    }

    @Transactional
    public void edit(CustomMemberDetails customMemberDetails) {

        Member member = returnMember.findMemberByUsernameOrTrow(customMemberDetails.getUsername());

        memberRepository.delete(member);

    }

}
