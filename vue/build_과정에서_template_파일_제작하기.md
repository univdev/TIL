# Nuxtjs Build 과정에서 Template 제작하기
## 개요
빌드 과정에서 파일의 일부 내용을 변경해야 하는 상황이 생길 수 있다. 예를 들면, static 파일에 있는 robots.txt같은 경우, 별도의 스테이징 서버를 운영한다고 하면 스테이징 서버는 일반 사용자에게 노출 되어서는 안될 것이다.
하지만 production 단계에서의 웹사이트는 사용자에게 노출이 되어야 하기 때문에 같은 개발 환경에서 동일한 경로에 놓여야만 하는 robots.txt 파일의 변경이 불가피하다.

그래서 빌드 단계에서 해당 프로젝트의 NODE_ENV를 읽어서 파일의 내용을 다르게 빌드할 수 있는 ```build``` 프로퍼티에 대해서 알아보겠다.
## 사용방법
1. robots.txt를 ```templates``` 폴더에 작성한다.
```
User-agent: *
<% if (options.env === 'staging') { %>Disallow: /<% } %>
<% if (options.env === 'production') { %>Allow: /<% } %>
```
2. nuxt.config.js 파일에 다음과 같이 작성한다.
```javascript
export default {
  // ...
  build: {
    templates: [
      {
        src: './templates/robots.txt',
        dst: '../static/robots.txt',
        options: {
          env: process.env.NODE_ENV
        }
      }
    ]
  },
  // ...
}
```
## 원리
- templates/robots.txt 파일은 단순 텍스트 파일로, 그 자체로는 아무런 기능을 하지 않는다.
- Build 과정에서 src에 있는 파일을 읽어서 dst 위치로 복사 생성하게 되는데, 이 과정에서 options를 통해 환경 변수를 설정할 수 있다.
- 템플릿 파일에서는 <% %> 태그를 통해 조건문 및 options 변수 참조가 가능하다.