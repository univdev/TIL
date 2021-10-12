# Nuxtjs 프로젝트 설치
## 방법
### npx 설치 (만약 설치 되어 있다면 다음으로)
**만약에** npx가 컴퓨터에 설치되어있지 않다면 최초 한 번 아래 커맨드를 실행한다.
```
npm i -g npx
```
### npx를 통한 프로젝트 설정
```
npx create-nuxt-app [project-name]
```
### 프로젝트 세팅에 필요한 패키지나 설정들을 입력한다.
> 💡 ```Enter```키로 넘어가도 되는 것들도 있고, ```Space bar```를 통해 선택해야 넘어갈 수 있는 것도 있다.

1. Project name:
   - 프로젝트 이름을 그대로 개설할 예정이라면 엔터, 아니라면 입력
2. Programming language:
   - Javascript (자바스크립트로 프로젝트를 구성할 예정이라면 선택) _* 추천_
   - Typescript (타입스크립트로 프로젝트를 구성할 예정이라면 선택)
3. Package manager:
   -  프로젝트를 관리할 매니저를 선택
   -  Yarn (평소에 패키지들을 yarn을 통해 설치 및 관리를 했다면 선택) _* 추천_
   -  Npm (평소에 패키지들을 npm을 통해 설치 및 관리를 했다면 선택)
4. UI Framework:
   - 프로젝트를 제작할 때 사용할 프레임워크를 선택
   - 주로 사용하는, 사용할 예정인 프레임워크를 선택하면 되는데 주로 Element UI, Vant, Vuetify를 선택한다.
   - 개인적으로 Vant 추천
5. Nuxt.js modules: 다중 선택 가능
   - 프로젝트 개발에 필요한 모듈을 설치
   - Axios (서버와 통신을 하면서 데이터를 불러올 수 있는 라이브러리) _* 거의 필수_
   - Progressive Web App (휴대폰에 설치해서 사용할 수 있는 어플리케이션을 제작할 때 사용)
   - Content (깃 기반으로 동작하는 화면이 없는 컨텐츠 관리 툴)
6. Linting tools: 다중 선택 가능
   - 프로젝트 전체의 문법을 관리할 라이브러리를 설치
   - 주로 ESLint, Prettier를 설치함.
7. Testing Framework:
   -  단위 테스트를 진행할 라이브러리를 설치
   -  Jest를 주로 사용하는 추세지만, 굳이 사용하지 않는다면 None을 설치
8. Rendering mode:
   - 웹사이트 렌더링 방식을 선택
   - Universal (SSR을 지원하며, 보편적인 웹서비스를 구축할 때 사용함) _* 추천_
   - Single Page App (모바일 어플리케이션을 구축할 때 사용함)
9. Developyment target:
   - 배포 방식을 선택
   - Server (별도의 서버가 존재하여 외부로부터 컨텐츠를 불러와서 유동적으로 변하는 웹사이트를 구축할 때 사용) _* 추천_
   - Static (정적인 컨텐츠, 변하지 않는 컨텐츠로 웹사이트를 구축할 때 사용함)
10. Development tools: 다중 선택 가능
      - 개발할 때 도움이 되는 툴 설치
      - jsconfig.json (Visual studio code 에디터를 사용하는 개발자가 설치하면 좋음) _* 추천_
      - Semantic Pull Request
      - Dependabot (깃허브 페이지 프로젝트인 경우에 설치)
11. Continuous integration:
      - 자동 배포 모듈을 설치
      - 보통 Github Actions를 설치하지만 자동 배포를 생략하려면 None 선택
12. Version control system:
      - 무조건 Git
### 전처리기 설치
1. 설치 방법에서는 ```pug```와 ```less```를 사용함.
2. ```yarn add pug pug-plain-loader less less-loader@6.2.0```
3. less-loader는 7버전으로 넘어가면 nuxtjs랑 호환 되지가 않음.
4. eslint 설치를 위해 ```eslint-config-airbnb-base```와 ```eslint-import-resolver-nuxt```를 설치한다.
   1. ```yarn add eslint-config-airbnb-base eslint-import-resolver-nuxt```
5. .eslintrc.js를 아래와 같이 작성한다.
```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue'],
      },
    },
  },
  // add your custom rules here
  rules: {
    'vue/order-in-components': 0,
    'no-param-reassign': 0,
    'object-curly-newline': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-restricted-syntax': [0, 'ForOfStatement']
  }
}
```
6. .eslintignore를 아래와 같이 작성한다.
```
/build/
/config/
/dist/
/*.js
/store/
/plugins/
```
7. ```vuex-router-sync```를 설치한다.
```javascript
import { sync } from 'vuex-router-sync';

export default ({ app: { store, router } }) => {
  sync(store, router);
};
```
```javascript
  {
    ...
    plugins: [
      { src: '~/plugins/vuex-router-sync' },
    ],
    ...
  }
```
8. 마지막으로 ```store/index.js``` 파일을 작성한다.
```javascript
export const state = () => ({

});
export const mutations = {

};
export const actions = {
  
};
```
