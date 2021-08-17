# Nuxtjs 프로젝트 설치
## 방법
1. 아래 명령어 입력
```
npx create-nuxt-app [project-name]
```
2. 프로젝트 세팅에 필요한 패키지나 설정들을 입력한다.
   1. ```Enter```키로 넘어가도 되는 것들도 있고, ```Space bar```를 통해 선택해야 넘어갈 수 있는 것도 있다.
3. 전처리기 설치
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