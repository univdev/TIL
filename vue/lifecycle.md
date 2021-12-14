# 생명주기(Lifecycle)
![생명주기](https://miro.medium.com/max/1400/1*tnSXRrpLBYmfHnIagITlcg.png)
## ⭐️ 개요
생명주기(Lifecycle)이란, Vue의 컴포넌트가 탄생하고 소멸하기까지의 사이클을 말한다. ```beforeCreate```, ```created```, ```beforeMount```, ```mounted```, ```beforeDestroy```, ```destroyed``` 6가지가 대표적인 라이프사이클 훅이다.
## ⚒ 훅
라이프사이클 Hook이란, 컴포넌트가 생성되고 소멸하는 등의 특정 타이밍에서 발생하는 이벤트이다. 컴포넌트가 렌더링 되기 전, 렌더링 된 후, 컴포넌트가 생겨나기 전, 생겨난 후 등 특정 상황에 실행된다.
### beforeCreate
- 컴포넌트가 DOM에 추가 되기 전에 실행되는 훅이다.
- SSR 타이밍에 실행되는 부분이기에, Server API 사용이 가능하다.
- 컴포넌트가 생성되기 전이기 때문에 ```this```키워드를 사용할 수 없다.
### created
- 컴포넌트가 생성은 되었으나, DOM에 추가 되기 전에 실행되는 훅이다.
- ```data```와 ```methods```가 생성된 이후이기 때문에 ```this```키워드로 참조할 수 있다.
### beforeMount
- 컴포넌트가 생성이 되고, DOM에 추가 되기 직전에 실행되는 훅이다.
- ```data```와 ```methods``` 참조가 가능하다.
- 서버 렌더링이 끝난 이후에 실행되는 훅이기 때문에 SSR이 지원되지 않는다.
### mounted
- 컴포넌트가 완전히 생성되어 DOM에 추가 된 이후에 실행되는 훅이다.
- 다른 컴포넌트를 참조할 수도 있으며, 컴포넌트 내 모든 부분을 사용할 수 있다.
### beforeDestory
- 컴포넌트가 소멸하기 직전에 실행되는 훅이다.
- 컴포넌트가 소멸하기 전이라서 ```mounted```훅과 마찬가지로 컴포넌트의 모든 부분을 사용할 수 있다.
### destoryed
- 컴포넌트가 완전히 소멸한 후 실행되는 훅이다.
- 컴포넌트가 소멸한 이후라서 해당 컴포넌트의 모든 부분을 사용할 수 없다.