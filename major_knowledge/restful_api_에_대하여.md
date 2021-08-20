# RESTFul API에 대하여
## 개요
RESTFul API는 서버와 클라이언트 혹은 서버와 서버가 데이터를 공유하기위해 만들어진 API 규칙이다.
## 규칙
### 라우트 명칭은 명사만 사용할 것
```
GET /users/get/:userId (X)
GET /users/:userId
```
이와 같이 ```get```이라는 동사로 표현하는게 아닌, METHOD로 해당 API의 역할을 정의한다.
```
DELETE /users/:userId <-- 사용자 삭제
PUT /users/:userId <-- 사용자 수정
```
라우트 경로가 동일하더라도 METHOD로 역할을 구분하면 쉽게 의미를 이해할 수 있다.
### 슬래시는 계층 관계를 나타낼 때 사용한다
```
GET /users/:userId/jobs/:jobId/departments
```
해당 유저가 소속한 과를 알기 위해서 ```user``` -> ```job``` -> ```department``` 순서대로 들어가서 데이터를 꺼내온다.
계층 구조 상 상위에 존재하는 데이터부터 기재한다.
### 대소문자 구분보다는 하이픈을 사용한다.
```
POST /boardCategories (X)
POST /board-categories (O)
```
### 파일 확장자는 포함하지 않는다.
```
GET /users/profile/photo/face.jpg (X)
GET /users/profile/photo (O)
```
### 관계성 표현 방법
```
GET /users/:userId/fruits
```
사용자가 좋아하는 과일의 목록을 가져올 때는 위와 같은 방법을 사용한다.
하지만, 사용자가 '좋아하는' 과일을 가져오는 식의 복잡한 관계는 아래와 같이 사용하기도 한다.
```
GET /users/:userId/like/fruits
```
