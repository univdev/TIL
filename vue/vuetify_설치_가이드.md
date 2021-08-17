# Vuetify 설치 가이드
## 개요
Vue에서 사용되는 UI 라이브러리 중 가장 인지도가 높은 라이브러리이다. 개인적인 생각으로는 Element UI나 Vant보다 사용법이 상대적으로 복잡하고 커스터마이징이 어렵다.
하지만 기본적으로 지원하는 기능이 풍부하여 Vuetify가 지원하는 기능의 범위 안에 들어오는 프로젝트의 개발은 상대적으로 쉽게 제작할 수 있다고 생각한다.
## 설치 방법
1. 설치 커맨드 입력
```
yarn add @nuxtjs/vuetify -D
# OR
npm install @nuxtjs/vuetify -D
```
```javascript
{
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', { /* module options */ }]
  ]
}
```
2. ~/plugins/vuetify.js 작성
```javascript
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)
```
3. nuxt.config.js에 플러그인 추가
```javascript
{
  // ...
  plugins: [
    '~/plugins/vuetify',
  ],
  // ...
}
```
## 사용 후기
아직은 익숙하지 않아서 Element UI랑 Vant의 개발 방식이 더 빠른 것 같다.
예를 들자면, Element UI의 Table 같은 경우는 ```el-table-column``` 태그를 테이블 안애만 추가하면 되는데, Vuetify에서는 넘겨주는 데이터별로 태그의 사용 방법이 달라진다.
```json
{
  "id": "username01",
  "password": "password01"
}
```
위 데이터를 띄우고 싶다면, Element UI에서는 아래와 같이 하면 되나,
```pug
el-table(:data="items")
  el-table-column(
    label="User ID",
    prop="id")
  el-table-column(
    label="User ID",
    prop="id")
```
Vuetify에서는 이렇게 진행한다.
```pug
v-data-table(:items="items")
  template(v-slot:item.id="{ item }") {{ item.id }}
  template(v-slot:item.id="{ item }") {{ item.id }}
```
척 보면 코드 줄 수가 짧아 Vuetify가 간단하다고 생각 될 수가 있으나, 손자 Component 방식으로 코딩할 경우, template 안에 template을 사용하지 못해서 저 방법을 사용할 수가 없다.
평소 유용하게 쓰는 개발 방식 중 하나를 활용을 못한다는건 생각보다 크다.

그 밖에도 Datepicker를 Input타입으로 쓰려면 ```v-menu```를 열고 ```v-input-field```를 따로 생성하여 인풋창에 보여질 데이터를 별도의 변수로 관리해야 하는 등 편의성 측면에서 많이 부족함을 느꼈다.
현재 다니는 회사에서 쓰는 라이브러리이기 때문에 배우기는 하겠다만 굳이 개인적으로 쓰고싶은 라이브러리는 아닌 것 같다.