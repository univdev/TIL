# Nodejs 프로젝트에서 루트 폴더 import 하기
## 개요
```React```나 ```Vue``` 등으로 작업을 해봤다면 알겠지만, ```Route``` 구조에 기반하여 ```Directory```를 구성할 경우, ```Depth```가 깊어질수록 ```root``` 폴더에 있는 다른 ```Resource```에 접근하기 힘들어진다. ```../../../../../../../components``` 이런 식으로 접근해야 하기 때문이다.

지금부터 설명할 방법은 ```../../../../../../../components```를 ```~/components```로 줄여주는 방법이다.
## 출처
[RN(React Native)에서 root import하기](https://dev-yakuza.posstree.com/ko/react-native/root-import/)
## 방법
#### Javascript
아래 패키지를 설치한다.
```
npm install babel-plugin-root-import --save-dev
```
```babel.config.js``` 문서를 다음과 같이 수정한다.
```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src', // ~ 문자를 [Project]/src 로 치환해주는 역할을 한다.
      },
    ],
  ],
};
```
#### TypeScript
```tsconfig.json``` 파일을 열고 아래와 같이 수정한다.
```javascript
{
  "compilerOptions": {
    ...
    "baseUrl": "./src", // all paths are relative to the baseUrl
    "paths": {
      "~/*": ["*"] // resolve any `~/foo/bar` to `<baseUrl>/foo/bar`
    }
  },
  ...
}
```