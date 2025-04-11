# FRONTEND

- main 브랜치는 서비스를 이용하는 고객들이 최종적으로 마주하는 작업물 즉, 서비스의 가장 안정적인 버전
- develop 브랜치는 GitHub Actions CI/CD를 통해 배포 도메인에 제대로 동작하는지 확인하는 용도
- feature/** 브랜치는 각자 개발 용도

```
**Git workflow**

main (최종 배포용)
   │
   ├── develop   (개발 진행용 : CI/CD 확인용)
         ├── ex) feature/survey (각자 개발용)
         ├── ex) feature/chatbot
         ├── ex) feature/login 등등

**Commit 양식** 

- feat : 새로운 기능 추가
- fix : 버그 수정
- env : 개발 or 배포 환경 관련 설정, 엔티티 or config 추가
- refactor : 코드 리팩토링 (더 효율적인 코드로 변경 등)
- comment : 주석 추가/수정
- docs : 내부 문서 추가/수정
- rename : 파일 및 폴더명 수정
- remove : 파일 및 폴더 삭제

ex) env : 프로젝트 초기 환경 세팅
ex) feat : 자가진단 레이아웃
```
