# 📷👨🏻‍🤝‍👨🏻 S.O.M.E.(Share Our Memory Everywhere) 👨🏻‍🤝‍👨🏻📷

### [링크 바로가기](https://some-album.com/)

![메인페이지](https://file.notion.so/f/s/4dc78c86-67ea-4213-9ac7-74d47144235c/Splash.svg?id=c6906208-484e-4c95-b244-0918a58c33ea&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684513985185&signature=aw-8QE59t9qv8-NoSB-euO6A0xwQjpo9PVHkArWkeNM&downloadName=Splash.svg)

---

## :clapper: 소개 영상

### [UCC 링크](https://www.youtube.com/watch?v=TMUya0yS6mA)

<br>

## :date: 프로젝트 진행 기간

- _2023/4/10 ~ 2023/5/19 (6주)_
- SSAFY 8기 자율 프로젝트
  <br>

## :heavy_check_mark: SOME - 배경

- 친구들과 사진을 공유해 본 경험 있으신가요?
- 많은 사진을 공유하려면 기존의 서비스들은 아쉬웠던 점이 많았습니다.
- 다른 사람들은 같은 장소에서 어떻게 사진을 찍었는지 궁금했습니다.
- 그래서, 사진 공유 서비스 SOME을 개발했습니다!
  <br>

## :heavy_check_mark: SOME - 개요

- 공유 앨범에 친구를 쉽게 초대하고, 편하게 사진을 업로드 하세요.
- 공유한 사진을 AI를 활용해 편하게 분류하여 제공합니다.
- 잘 찍은 사진을 그 장소에 등록해서 자랑하세요.
  <br>

## :pushpin: 주요 기능

- **남사친**
  - 목적에 맞는 공유 앨범 생성
  - 카카오톡 연동 친구 초대
  - AI 자동 사진 분류
  - SNS 업로드 동의 요청
- **여사친**
  - 내 위치에 사진 남기기
  - 내 주변에 등록된 사진 보기
  - 마음에 드는 사진에 좋아요 남기기

<br>

## :art: 주요 기술

- **AI**

  - YOLO
    <br>

- **FrontEnd**

  - Next.js
  - TypeScript
  - SCSS
  - Tailwind
  - React-Query
  - Redux Toolkit
  - PWA
  - Kakao API (Map, Auth, Local)
    <br>

- **BackEnd**

  - Java 11
  - Spring Boot
  - Spring Data JPA
  - QueryDSL
  - MySQL
  - mongoDB
  - Redis
  - RabbitMQ
  - fastAPI
  - SSE
    <br>

- **Deployment**
  - Nginx
  - Docker
  - Jenkins
  - AWS EC2
  - Gitlab
    <br>

## :art: 버전 정보

### Ver 1.0 (~ 4/27)

- `Client`
  - 남사친, 사진 상세, 친구 초대, 앨범 상세 페이지, 마이페이 구현
  - PWA 설정
  - 로그인 기능 구현
- `Server`

  - AI 사진 분류, mongoDB 연동, 로그인 서버 개발

  #### 1.1

  - `Client`
    - 목업 서버(Json Server)를 활용한 API 테스트
  - `Server`
    - OAUTH -> kakao 소셜 로그인
    - AI 카테고리 커스텀
    - mongoDB queryDSL 연동

### Ver 2.0 (~ 5/4)

- `Client`
  - 사진 업로드 기능, 사진 집중모드 구현
  - 리덕스 세팅
  - 서비스워커 Notification 설정
  - React-Query를 활용한 API 연결
- `Server`

  - 남사친 API 개발
  - 사진파일 메타데이터 추출
  - S3 연동
  - SSE 알림 연동

  #### 2.1

  - `Server`
    - 파일 압축 업로드
    - S3 폴더 관리

### Ver 3.0 (~ 5/19)

- `Client`
  - 여사친 페이지 구현
  - 사진 줌인, 줌아웃, 좋아요, 대표이미지 설정 기능 구현
  - 다운로드 및 업로드 기능 구현
- `Server`
  - 여사친 API 개발
  - RabbitMQ 구현
  - 알림 서버 개발

#### 3.1

- `Client`
  - 사진 옆으로 넘기기 기능 구현
  - 여사친 지도 및 기능 구현
  - 사진 공유 기능 구현
- `Server`
  - 카카오 친구목록 연동
  - 알림 기능 고도화

#### 3.2

- `Client`
  - CSS 디자인 수정
  - Next/image 컴포넌트를 활용한 이미지 최적화
    <br>

## :open_file_folder: 시스템 아키텍처

![SOME아키텍쳐](./docs/architecture.png)

## :open_file_folder: 프로젝트 파일 구조

### FrontEnd

```
└frontend
    ├─components
    │   ├─album
    │   ├─album-starter
    │   ├─notification
    │   ├─photo-detail
    │   └─profile
    ├─features
    ├─lib
    ├─nginx
    ├─pages
    │   ├─album
    │   │    └─[album_id]
    │   │       └─[photo_id]
    │   │           └──[page_idx]
    │   │                └─[index]
    │   ├─api
    │   ├─boy-home
    │   ├─desktop
    │   ├─girl-home
    │   │    └─[list]
    │   │       └─[photo_id]
    │   ├─invite
    │   ├─login
    │   └─oauth
    ├─public
    │   ├─favicons
    │   ├─icons
    │   ├─images
    │   └─splash_screens
    ├─store
    ├─styles
    └─types

```

### BackEnd 1: 남사친 서버

```
some-friendboy
    └─src
        ├─main
        │  ├─generated
        │  ├─java
        │  │  └─com
        │  │      └─ssafy
        │  │          └─somefriendboy
        │  │              │  SomeFriendboyApplication.java
        │  │              │
        │  │              ├─config
        │  │              │      AmazonS3Config.java
        │  │              │      MongoDBConfig.java
        │  │              │      RabbitConfig.java
        │  │              │      RedisConfig.java
        │  │              │      WebMvcConfig.java
        │  │              │
        │  │              ├─controller
        │  │              │      AlbumController.java
        │  │              │      AlbumPhotoController.java
        │  │              │      NotiController.java
        │  │              │      UserController.java
        │  │              │
        │  │              ├─dto
        │  │              │
        │  │              ├─entity
        │  │              │  │  Album.java
        │  │              │  │  AlbumFav.java
        │  │              │  │  AlbumMember.java
        │  │              │  │  AlbumPhoto.java
        │  │              │  │  AlbumPhotoSNS.java
        │  │              │  │  FeedBack.java
        │  │              │  │  Notification.java
        │  │              │  │  PhotoCategory.java
        │  │              │  │  User.java
        │  │              │  │  UserPhotoLike.java
        │  │              │  │
        │  │              │  ├─id
        │  │              │  │
        │  │              │  └─status
        │  │              │
        │  │              ├─repository
        │  │              │  ├─album
        │  │              │  │
        │  │              │  ├─albumfav
        │  │              │  │
        │  │              │  ├─albummember
        │  │              │  │
        │  │              │  ├─albumphoto
        │  │              │  │
        │  │              │  ├─albumphotosns
        │  │              │  │
        │  │              │  ├─noti
        │  │              │  │
        │  │              │  ├─user
        │  │              │  │
        │  │              │  └─userphotolike
        │  │              │
        │  │              ├─service
        │  │              │      AlbumPhotoService.java
        │  │              │      AlbumService.java
        │  │              │      AmazonS3Service.java
        │  │              │      NotiService.java
        │  │              │      UserService.java
        │  │              │
        │  │              └─util
        │  │
        │  └─resources
        │          application.yml

```

### BackEnd 2: 여사친

```
some-friendgirl
    └─src
        ├─main
        │  ├─generated
        │  ├─java
        │  │  └─com
        │  │      └─ssafy
        │  │          └─somefriendgirl
        │  │              │  SomeFriendgirlApplication.java
        │  │              │
        │  │              ├─config
        │  │              │      AmazonS3Config.java
        │  │              │      MongoDBConfig.java
        │  │              │      RedisConfig.java
        │  │              │      WebMvcConfig.java
        │  │              │
        │  │              ├─controller
        │  │              │      AlbumController.java
        │  │              │      PhotoController.java
        │  │              │
        │  │              ├─dto
        │  │              │
        │  │              ├─entity
        │  │              │      AlbumPhoto.java
        │  │              │      AutoIncrementSequence.java
        │  │              │      PhotoLikeStatus.java
        │  │              │      PhotoStatus.java
        │  │              │      User.java
        │  │              │
        │  │              ├─redis
        │  │              │      RedisScheduler.java
        │  │              │
        │  │              ├─repository
        │  │              │  ├─album
        │  │              │  │
        │  │              │  ├─photo
        │  │              │  │
        │  │              │  └─user
        │  │              │
        │  │              ├─service
        │  │              │      AlbumService.java
        │  │              │      AmazonS3Service.java
        │  │              │      PhotoService.java
        │  │              │
        │  │              └─util
        │  │                      GetResponse.java
        │  │                      HttpUtil.java
        │  │                      MongoQueryUtil.java
        │  │                      ResponseUtil.java
        │  │
        │  └─resources
        │          application.yml
```

### AI

- fast.py

<br>

## 🤝 협업 툴

- Git
- Notion
- JIRA
- MatterMost
- Webex
- Discord
- Kakaotalk
  <br>

## :clipboard: 프로젝트 산출물

- [서비스기획서](<[./docs/md/%EC%84%9C%EB%B9%84%EC%8A%A4%EA%B8%B0%ED%9A%8D%EC%84%9C.md](https://www.notion.so/b173d37cba5b4e9e969ebba75f4e55e7)>)
- [기능명세서](https://www.notion.so/3f14f23d87ad4a44bc8b7a25e3e99677?v=08794510cc7348658f1588d063464dd4&pvs=4)
- [회의록](https://www.notion.so/515356e2d5b44df89a6d6698d132683d)
- [Jira](<[./docs/md/jira.md](https://www.notion.so/JIRA-55029bb25c5c4fa6a90080f17290cd29)>)
- [아키텍처](https://www.notion.so/dbf3bc6ba4ca4eec9e7a49512bbd82ed)
- [와이어프레임](https://www.figma.com/file/pz0IKJ0MUDdbW6McHsjjsR/%EC%99%80%EC%9D%B4%EC%96%B4-%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=0%3A1&t=wYKlFGL9ZbBE09U0-1)
- [컨벤션](https://www.notion.so/a0528901fc77473c99b48a5535a37eaf)
- [API 명세서](https://www.notion.so/API-4d3b372debb34bec9163a956bb00ce4f)
- [ERD](https://www.notion.so/fdb2ffd4fe5e4ff2a20a8e020df68cd9?v=1ace44a24be9481b8897deebeb4a1089)
- [회의록](https://www.notion.so/515356e2d5b44df89a6d6698d132683d?pvs=4)
- [최종발표 PPT](./docs/%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pdf)
- [중간발표 PPT](./docs/%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C.pdf)
- [포팅메뉴얼](https://www.notion.so/23c6e70cbd364b9cb5fa3f56b468362c)

<br>

## :sparkles: 서비스 화면

### 🙋‍♂️ 남사친 (남는 건 사진이야, 친구야!)

1️⃣ 홈 화면

- 즐겨찾는 앨범, 전체 앨범

  ![홈 화면](https://file.notion.so/f/s/f3771810-3958-49ae-8125-fef5ffd4655e/Untitled.gif?id=9a8e5e16-48ff-4882-9806-1c217f18e2a9&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684498965026&signature=PJlwne7iko25ckJXaF13ngFHSYPcglcBwTxCBM7ztZM&downloadName=Untitled.gif)

2️⃣ 최근 업로드

- 최근 앨범에 업로드된 사진 확인

  ![최근 업로드](https://file.notion.so/f/s/42371105-71a8-407a-b416-69853692b21a/Untitled.gif?id=8053efec-b97a-4ea5-9c84-c7a1aa864eb8&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499040815&signature=FE_FBG7gZ6kvQXRFFlQdTTRhF4VIs_DHaMXLIqfxxio&downloadName=Untitled.gif)

3️⃣ 앨범 생성

- 목적에 맞는 새로운 앨범 생성
- 카카오톡 연동을 통한 친구 초대

  ![앨범 생성](https://file.notion.so/f/s/60896367-c412-4b9f-9290-c52de46232ed/Untitled.gif?id=8a3c5bef-e0ee-4ee3-aae0-1e3b7d4f39b9&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499170579&signature=72WSaEBYQRfKx7GqEEQy9OYBxfvvCAFl05cf-4QtSJs&downloadName=Untitled.gif)

4️⃣ 카톡으로 친구 초대하기

- SOME에 가입하지 않은 친구에게 카카오톡 보내기

  ![카톡으로 친구 초대하기](https://file.notion.so/f/s/0d51a25a-670d-4c2f-8576-a2e6008250cd/Untitled.gif?id=4b2c98ca-d390-44a2-bbb5-c45b0e3f6ff0&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499353664&signature=a3mYn_S3324UGNl210-_cjf4nzRiiRceHoWb1PfyH4g&downloadName=Untitled.gif)

5️⃣ 앨범 참여하기

- 앨범에 초대되면 푸시 알림 수신
- 알림 페이지를 통해 요청 수락

  ![앨범 참여하기](https://file.notion.so/f/s/cbc4f73d-5890-4172-94e9-2ddeca9089e6/Untitled.gif?id=7aedaf00-f902-4c84-9216-2aa6f7b7d09c&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499514853&signature=4cK2zFn-oybiyYTMQhztUtu9_vwkiO83SCr4WcRTrTU&downloadName=Untitled.gif)

6️⃣ 앨범 상세보기

- 유저 및 카테고리 별 사진 분류

  ![사진 분류](https://file.notion.so/f/s/85fb14f6-b723-4465-8213-0226f0e5f094/Untitled.gif?id=cb2c0e35-2e0d-41d2-b552-17f792ed828d&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499574267&signature=x_Gr5giSR9s9vzQ2Qo5_uACjzr18ptJ43GWHA1i1L9k&downloadName=Untitled.gif)

- 여러 사진 다운로드

  ![사진 다운1](https://file.notion.so/f/s/26d66047-821f-4e51-815b-9a769658791c/08.gif?id=3be11b78-85ee-4d9b-b1dd-c9c03356d457&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499649413&signature=THRqPB_0U_PTm1QuIzZl9LE8BcJtpGMKblRLfOsGrSY&downloadName=08.gif)

- 사진 업로드 (사진 선택)

  ![사진 업로드1](https://file.notion.so/f/s/4957bd50-043c-4ac8-8fe0-8577d7f5bd24/10.gif?id=7017720a-3e07-4864-ad8a-10dd60385344&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499736032&signature=QYbnfSYhcuoeEL5ndGUtNcSBBeHwdThGBcdLuayB1Es&downloadName=10.gif)

- 사진 업로드 (사진 찍기)

  ![사진 업로드2](https://file.notion.so/f/s/4acc9ee0-5fb0-482a-9746-e86a00c8b6d9/11.gif?id=6168e853-f512-487f-9fcc-4a0a791b5c63&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499761775&signature=TpgYmab9KeKO-t6NwLsPtdxc6G07juWhnb0GQiF6qnc&downloadName=11.gif)

7️⃣ 사진 상세보기

- 줌인, 줌아웃 기능
- 좋아요, 대표 이미지 설정 기능

  ![사진 상세](https://file.notion.so/f/s/67037613-0e93-4719-b71e-5f22e995ae23/07.gif?id=86ec4353-c898-4aa3-bc35-4973ce985c94&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499629212&signature=1USvs6ymYS-nanhS9HQTnTPdTcUOXvYdtsQd54DXnkU&downloadName=07.gif)

- 다운로드 및 삭제 기능

  ![사진 다운 삭제](https://file.notion.so/f/s/9ef3538f-9ec2-44da-aa83-ce3f8f9009d4/09.gif?id=c5948739-f31b-4237-b721-43df1040e8e3&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499697771&signature=kgeestJugCFF9bGHYB3_c7Kl52WtPonr4SkdIUBkvfQ&downloadName=09.gif)

8️⃣ SNS 요청

- 알림을 통해 SNS 공유 요청 수락
- SNS 요청 현황 확인

  ![SNS](https://file.notion.so/f/s/bb550d32-1b35-4fc1-9430-aeadafbc8443/12.gif?id=dd788c85-8380-4a76-ad67-a4c1316298b1&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499796828&signature=NlP-DfQd5c-CTGB8JYVdU5nCZog1iGmMoXA7IZaoKzQ&downloadName=12.gif)

### 🙋‍♀️ 여사친 (여기에 사진 남겼어, 친구야!)

1️⃣ 사진 업로드

- 현재 위치에 사진 업로드

  ![여사친1](https://file.notion.so/f/s/1b1e228c-1542-4b5f-8d0f-e4642d23ef89/13.gif?id=a9ed02f5-2131-4855-8961-08870325bfaf&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684499960284&signature=r0Ez8sQbo3D-U9502BJrp8lbiIpTlplIe-wdCMWGSu8&downloadName=13.gif)

2️⃣ 현재 위치의 사진 확인

- 현재 위치 주변의 사진 목록 확인
- 정렬 기준 변경

  ![여사친2](https://file.notion.so/f/s/3784299e-d37f-4d91-b6b0-d54d103007b1/14.gif?id=38942b8c-59ab-49f3-aa30-02406d339963&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684500035277&signature=b_6z-y7B6uEdiCSxLnEuB6OHgWRJkZ8QmVlQl5dKobY&downloadName=14.gif)

3️⃣ 사진 상세보기

- 좋아요 기능

  ![여사친3](https://file.notion.so/f/s/ec317149-6433-4a45-b552-8add3fc5f858/15.gif?id=d15bcf06-38d3-4323-8632-1096e7ddc125&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684500057803&signature=uvjdJaa8ObdTkC_Zr_xxPzHiHsEk1xDIa2WcK3nFNn8&downloadName=15.gif)

### 🤼 마이페이지

- 활동 이력 확인
- 알림 설정
- 계정 설정

  ![마이페이지](https://file.notion.so/f/s/5b841552-01ef-48dd-b01c-e2f5a30286cf/Untitled.gif?id=8672dbde-72fc-44b8-8c3e-044acc683601&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684500541947&signature=fqzejaTMQYL0xZsCnHJKUvx3KomfCZvHHbruJg_7AUw&downloadName=Untitled.gif)

- 로그아웃 및 로그인

  ![로그아웃](https://file.notion.so/f/s/67af3c5c-1538-4e6d-9012-fb4e84c1aa69/Untitled.gif?id=d98bb779-6ff6-4e15-9ab6-ada52a85cb0b&table=block&spaceId=6c4a8b4a-051a-4ef0-ad49-395545692169&expirationTimestamp=1684500627291&signature=iWh1tEFcj6QjEzSVLsz4z7Rv1tihKKQTzRGgnH2ba4k&downloadName=Untitled.gif)
  <br>
