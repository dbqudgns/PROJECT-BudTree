# 버드 나무

## <span id="1">0. 목차</span>

1. [프로젝트 주제](#1-프로젝트-주제)
2. [프로젝트 소개](#2-프로젝트-소개)
3. [배포 주소](#3-배포-주소)
4. [팀 소개](#4-팀-소개)
5. [주요 화면 구성](#5-주요-화면-구성)
6. [기능 소개](#6-기능-소개)
7. [기술 스택](#7-기술-스택)
8. [상세 담당 업무](#8-상세-담당-업무)
9. [트러블 슈팅](#9-트러블-슈팅)
10. [성능 개선](#10-성능-개선)
11. [시스템 아키텍처](#11-시스템-아키텍처)
12. [ERD](#12-erd)
13. [기타](#13-기타)

## <span id="1">1. 프로젝트 주제</span>
생성형 AI를 활용한 우울증 환자 상담 서비스

## <span id="2">2. 프로젝트 소개</span>
본 프로젝트는 우울증으로 어려움을 겪고 있는 분들에게 심리적인 지원을 제공하기 위해 개발된 **웹/앱 서비스**입니다. 
PHQ-9 자가 진단 결과를 기반으로 AI 친구 **"버디"** 와 대화를 나누며 정서적인 위로를 받을 수 있도록 설계되었습니다.

- 개발 기간 : 2025/03 ~ 2025/05

## <span id="3">3. 배포 주소</span>
- 사이트 주소 : https://www.budtree.store
- API 서버 주소 : https://api.budtree.store/swagger-ui/index.html#/

## <span id="4">4. 팀 소개</span>
<div align="center">

|<img src="https://avatars.githubusercontent.com/dbqudgns" width="200px;" alt=""/>|<img src="https://avatars.githubusercontent.com/ChousnCom" width="200px;" alt=""/>|<img src="https://avatars.githubusercontent.com/cxfls" width="200px;" alt=""/>|<img src="https://avatars.githubusercontent.com/hjStack" width="200px;" alt=""/>|<img src="https://avatars.githubusercontent.com/0GYURI" width="200px;" alt=""/>|
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------: | 
|           [팀장 : 유병훈](https://github.com/dbqudgns)           |           [팀원 : 최지훈](https://github.com/ChousnCom)            |                 [팀원 : 이채린](https://github.com/cxfls)                 |         [팀원 : 권혜준](https://github.com/hjStack)          |       [팀원 : 김규리](https://github.com/0GYURI)          |
|                PM, BACKEND, FRONTEND                  |                            BACKEND, FRONTEND             |                                  FRONTEND                          |                          FRONTEND                      |                              DESIGN                         |  

</div>

## <span id="5">5. 주요 화면 구성</span>
| 시작 화면                                         | 로그인                                      | 메인 화면                                         |
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/00d1c2e5-75ac-4b11-b99f-89d132693260" alt="" width="200" height="450"> | <img src="https://github.com/user-attachments/assets/bfeb9e74-4c91-4c47-aeff-81c81c718530" alt="" width="200" height="450"> | <img src="https://github.com/user-attachments/assets/76cc5ab0-1d89-4815-8cd1-0aaecedf07c9" alt="" width="200" height="450"> |

| 하루 나무                                             | 마이 페이지                                              | 일반 챗봇                               |             
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/13971bf4-b275-4cb9-87ab-4097a72dcd67" alt="" width="200" height="450"> | <img src="https://github.com/user-attachments/assets/65fee112-c4df-456a-aeee-04cf631e13d8" alt="" width="200" height="450"> | <img src="https://github.com/user-attachments/assets/6e01dfd9-c3cd-47cc-a0de-1693c496e7a6" alt="" width="200" height="450"> |

| 자가진단                                              | 자가진단 기반 챗봇                             | 일기 내역                                         |             
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/a16c7981-0c54-4fa0-9f23-c92db5504ed7" alt="" width="200" height="450"> | <img src="https://github.com/user-attachments/assets/2a28c9f6-b7bf-455e-bdd5-212c9bbe6e48" alt="" width="200" height="450"> | <img src="https://github.com/user-attachments/assets/50690d47-87af-43ba-836a-b8cbc23238d7" alt="" width="200" height="450"> |

## <span id="6">6. 기능 소개</span>
 
**1. 자가진단을 통한 우울증 상태 파악**

- 신뢰성 있는 자가진단(**PHQ-9**)을 통해 우울증 상태를 빠르게 확인하고 결과를 기반으로 AI 챗봇과 상담을 제공합니다.

**2. AI 챗봇을 통한 맞춤형 지속 상담**

- 사용자 개별 상황에 맞춘 구체적인 해결책을 AI 챗봇과의 상담을 기반으로 사용자에게 심리적 지원을 제공합니다.

**3. 감정 일기장을 통한 자기 이해와 정신 건강 관리**

- 자신의 감정을 기록하면서 스스로의 감정을 이해하고 스트레스를 완화하며 지속적으로 정신 건강 상태를 관리할 수 있도록 합니다.

## <span id="7">7. 기술 스택 </span>

<h3 align="center">[ FRONTEND ]</h3>

| 구분 | 내용 | 
| --- | --- |
| **IDE / Language** | ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> |
| **Deployment** | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> |
| **Config** |   <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">   <img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white"> |
| **Layout** | <img src="https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoColor=white"> <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> |

<h3 align="center">[ BACKEND ]</h3>

| 구분 | 내용 | 
| --- | --- |
| **IDE / Language** | <img src="https://img.shields.io/badge/Java17-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/Intellij_IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white"> |
| **Deployment** | <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/spring_boot_3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/spring_securiy-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/spring_data_jpa-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/spring_ai-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"> |
| **DataBase** |   <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">   <img src="https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white"> |
| **API** | <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"> <img src="https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white"> |
| **Test** | <img src="https://img.shields.io/badge/postman-ff6c37?style=for-the-badge&logo=postman&logoColor=white"> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white"> |

<h3 align="center">[ COMMON ]</h3>

| 구분 | 내용 | 
| --- | --- |
| **Release** | <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/docker_compose-2F93E0?style=for-the-badge&logo=octopusdeploy&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/certbot-ED1C24?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white"> |
| **CI/CD** | <img src="https://img.shields.io/badge/Github_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"> |
| **Design** | <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> |
| **Communication** | <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> |
| **Environment** | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/dockerhub-2496ED?style=for-the-badge&logo=docker&logoColor=white"> |


## <span id="8">8. 상세 담당 업무</span>

### 👤 유병훈 – PM / BACKEND / FRONTEND

<details> <summary><strong>PM</strong></summary>
 
    - 프로젝트 기획안 작성
    
    - 프로젝트 제안서 작성
    
    - PPT 제작 및 발표
    
    - 중간 및 최종 보고서 작성
    
    - 특정 날에 진행된 정기 회의록 작성 및 배포
        - 원할한 소통을 위해 공지 및 안건 작성

    - 프로젝트 Github/README.md 작성 
        
    - 모든 파트(DESIGN, BACKEND, FRONTEND) 진행 상황 검토 및 작업물에 대한 피드백 진행

</details> <details> <summary><strong>BACKEND</strong></summary>

    - 사용자(Member), 채팅방(Chatroom), 메시지(Message) ERD 기반 엔티티 작성
        - API 명세서를 기반으로 RESTful API 로직 설계 및 구현
  
    - JWT 기반 Spring Security Custom Filter 구현으로 사용자 인증/인가 구현
        - Redis를 이용해 Access Token / Refresh Token TTL 처리
        - Redis를 이용해 사용자가 서비스 종료 시 Acces Token Black List 처리
          
    - Spring AI를 활용하여 OpenAI Fine-tuning 모델 호출 및 응답 로직 구현
        - 우울증 관련 대화 주제로 Multi-turn 데이터 셋 작성 및 Fine-tuning 모델 생성

    - 일관된 오류 응답을 위한 전역 예외 처리 핸들러 설계 및 구현
      
    - Github Actions을 통한 CI/CD 자동화 파이프라인 구축
        - Git 브랜치 전략 중 Git Flow(master, develop, feat/**) 를 적용

    - AWS EC2 서비스 배포 및 운영
        - Docker-compose을 통해 Spring Boot, MySQL, Redis 컨테이너화 진행
        - Nginx를 통해 API 서버 리버스 프록시 구축 및 설정
        - Certbot을 통해 SSL 인증서를 발급하고 안전한 HTTPS 통신 환경 제공

</details> <details> <summary><strong>FRONTEND</strong></summary>

    - 자가 진단 응답 저장, 자가진단 기반 챗봇, 일반 챗봇, 로그인 API 통신 기능 구현
    
    - Axios 인터셉터를 통한 인증(Access Token) 기반 통신 로직 일관화 (/src/app/util/reissue.js)
        - Access Token 만료 시 토큰 재발급 API 호출 후 기존 API 호출 재시도 로직 구현
        
    - Github Actions을 통한 CI/CD 자동화 파이프라인 구축
        - Git 브랜치 전략 중 Git Flow(master, develop, feature/**) 를 적용
        
    - AWS EC2 서비스 배포 및 운영
        - Docker을 통해 Node.js 컨테이너화 진행
        - Nginx를 통해 프론트엔드 서버 리버스 프록시 구축 및 설정
        - Certbot을 통해 SSL 인증서를 발급하고 안전한 HTTPS 통신 환경 제공
       
</details>

## <span id="9">9. 트러블 슈팅</span>

<details> <summary><strong>프리티어 EC2 프리징 현상</strong></summary>
     
     - 문제점 : 
     
     Docker-compose를 이용하여 백엔드 API 서버를 컨테이너화하여 실행한 결과, EC2 인스턴스에서 멈추거나 심한 렉 현상이 
     발생하였다. 
     
     - 원인 : 
     
     Docker-Compose를 통해 다수의 컨테이너를 동시에 실행할 때, EC2 인스턴스의 RAM 용량이 부족하여 시스템의 메모리 한계를 초과하였다. 
     이로 인해 커널 오버헤드 현상이 발생하여 EC2가 멈추는 문제가 나타났다. 
     
     - 해결 방안 : 
     
     RAM 용량 부족 문제를 해결하기 위해 EC2 인스턴스에 Swap 메모리를 설정하였다. 
     Swap 메모리를 활성화하면 물리적 메모리 부족 시 디스크 공간을 가상 메모리로 활용할 수 있어 Docker-Compose를 통해 여러 컨테이너를 실행해도 EC2 인스턴스가 안정적으로 운영될 수 있도록 개선하였다. 
     
     - 적용 코드 :
     
     Swap 메모리는 일반적으로 물리적 RAM 용량의 2배 이상 설정하는 것이 권장된다. 
     본 프로젝트는 AWS EC2 프리티어 인스턴스를 사용하여  1GB RAM을 제공받으므로 그 2배인 2GB의 Swap 메모리로 설정하였다.
   ![image](https://github.com/user-attachments/assets/a9541617-7e1c-420c-b188-d0382e1685db)

</details>

<details> <summary><strong>RedisReadOnlyException 예외 발생</strong></summary>
     
     - 문제점 : 
     
     로컬에서 개발 시 로그인을 시행하면 정상적으로 토큰 값이 Redis에 반영되었다. 
     하지만 배포 환경에서는 Spring Boot에서 다음과 같은 오류가 발생하였다. 
     org.springframework.data.redis.RedisSystemException: Error in execution; nested exception is io.lettuce.core.RedisReadOnlyException: READONLY You can't write against a read only replica.
     
     - 원인 : 
     
     위 오류는 Redis 클러스터의 읽기 전용 replica에 쓰기 작업을 시도할 때 발생한다. 
     Redis는 읽기 전용 replica에서 쓰기 작업을 허용하지 않기 때문에 해당 오류가 나타난 것이다. 
     
     - 해결 방안 : 
     
     Redis 환경 설정에서 replica의 읽기 전용 모드를 영구적으로 해제하기 위해 서버에 Redis 설정 파일을 작성하여 읽기 전용을 비활성화 하도록 설정하고, Docker-compose 파일에서 Redis 컨테이너가 실행 시 이 설정 파일을 인식하여 적용할 수 있도록 구성하였다. 
     
     - 적용 파일 :
    
![image](https://github.com/user-attachments/assets/580bb0a1-ce5d-4ad0-b82a-401a6c9f6d14)

</details>

## <span id="10">10. 성능 개선</span>
<details> <summary><strong>데이터 전체 조회 시 응답 속도 저하 현상 </strong></summary>
     
     - 문제점 : 

     사용자의 Post, Survey, Chatroom, Message 데이터를 전체 조회 시 데이터 양이 많아질수록 서버 응답 속도가 점차 느려지는 문제를 확인하였다. 
     특히, 약 500,000건의 데이터를 조회하는 부하 테스트를 진행한 결과 일시적인 프리징 현상도 나타나는 것을 테스트하였다. 
     이러한 현상은 사용자 경험을 저하시킬 뿐만 아니라 서비스의 확장성 및 안정성 측면에서 심각한 위험 요소가 될 수 있다고 판단하였다. 
  
     - 해결 방안 : 
     
     1. 커서 기반 페이지네이션 도입
     Spring Data에서 제공하는 Slice 객체를 활용해 커서 기반 페이지네이션를 구현하였다. 
     Slice는 내부적으로 (요청 size + 1)만큼 데이터를 조회하여 실제로는 요청한 개수보다 1건 더 가져온 뒤 다음 페이징 여부를 판단할 수 있다. 
     위 방식을 기반으로 Repository를 구성하고 조회 결과에서 마지막 요소의 Id를 cursorId로 반환하도록 하여 다음 페이징 요청 시 기준 포인터로 활용할 수 있도록 설계하였고 적용하였다.

     2. QueryDSL 적용 및 공통 Repository 설계 및 적용
     커서 기반 페이지네이션을 도메인마다 개별 구현하면서 반복되던 로직을 개선하기 위해 QueryDSL 기반의 공통 모듈 Repository를 적용하였다. 
     EntityPath, StringPath, NumberPath, DateTimePath를 Q타입의 인자로 받아 도메인별로 동적 조건을 구성할 수 있도록 하였고 각 도메인에서는 공통 메서드만 호출하도록 하여 단일 책임 원칙(SRP)을 실현하였다.
     그리고 년/월 조건 필터를 WHERE절에 다중 파라미터 방식으로 적용하여 추후 다른 메서드에서도 호출 시 재사용 가능하도록 설계하였다.
     
     - 결과 : 
     500,000건 데이터를 년/월 조건으로 조회할 때 기존 API는 평균 6000ms가 소요되었으나 커서 기반 페이지네이션 적용 후 30ms 내외로 단축되어 응답 속도가 약 99.5% 개선되었다.
     QueryDSL 기반의 공통 Repository 설계로 중복 코드가 제거되었고 재사용성이 향상되었다. 

</details>

<details> <summary><strong>최신 6개의 일기장 조회 시, 전체 데이터를 DB에서 조회하는 비효율적인 구조 </strong></summary>
     
     - 문제점 : 

     하루 나무 페이지 접속 시, 서버는 최신 6개의 일기장을 조회하기 위해 사용자가 작성한 모든 일기장을 데이터베이스에서 전부 조회한 뒤 상위 6개만 반환하는 로직이 적용되어 있었다.
     500,000건의 데이터를 조회하는 부하 테스트를 진행한 결과 응답 지연과 일시적인 프리징 현상이 발생하였다. 
     그리고 사용자가 일기장을 작성하지 않았더라도 페이지 접속 시마다 데이터베이스 조회 요청이 발생하여 불필요한 쿼리 실행이 반복되는 구조적 비효율성이 확인되었다.  
     
     - 해결 방안 : 
     
     1. Repository 쿼리 최적화
     기존의 전체 데이터 조회 로직을 LIMIT 6 형태로 변경하여 불필요한 전체 조회 없이 최신 6개의 데이터만 직접 조회하도록 개선하였다. 

     2. Redis 캐싱 전략 도입
     최신 6개의 일기장을 Redis 캐시에 저장하여 페이지 접속 시 데이터베이스 대신 캐시에서 즉시 반환하도록 구조를 변경하였다. 
     캐시 데이터의 TTL이 만료되면 데이터베이스에서 데이터를 조회한 뒤 캐시에 저장하였으며 일기장 작성 및 삭제 시 데이터베이스와 캐시 모두에 변경 사항을 반영하였다. 

     구조 : 
     - 현재 흐름 : 페이지 접근 -> 데이터베이스에서 전체 조회 -> 상위 6개 반환
     - 개선 흐름 : 페이지 접근 -> Redis 캐시 확인 -> 캐시에 존재 시 즉시 반환 / 없을 시 데이터베이스에서 조회 후 캐싱 진행 후 반환

     - 결과 : 
     500,000건 데이터를 기존 API로 조회할 때 평균 14,000ms가 소요되었으나 결과 개수 제한(LIMIT) 적용과 Redis 캐싱 전략 도입 후 16ms 내외로 단축되어 응답 속도가 약 99.89% 개선되었다.
 
</details>


## <span id="11">11. 시스템 아키텍처</span>
![image](https://github.com/user-attachments/assets/7aa3f085-9aa6-46ef-9068-932cbdd07c9e)

## <span id="12">12. ERD</span>
![image](https://github.com/user-attachments/assets/b87fc086-356a-4da5-aedf-3f805c1d7aa0)

## <span id="13">13. 기타</span>
- 프로토타입 : https://www.figma.com/design/dsYzPgIOph6PRTlBQXumFv/%EB%B2%84%EB%93%9C-%EB%82%98%EB%AC%B4---%EC%B5%9C%EC%A2%85-UI-UX?node-id=0-1&t=zi9fRsS4xblqTWSa-1

- API 명세서 : https://lateral-iron-436.notion.site/API-1aeaa43430de80b4a5c7ff8887230c69
