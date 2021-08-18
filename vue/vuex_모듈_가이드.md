# Vuex 모듈 가이드
## 개요
Vuex에는 모듈이라는게 있다. 유사한 특징을 가진 데이터의 그룹을 지을 수 있는 기능인데 객체지향 프로그래밍 언어의 클래스와 비슷하다.

모듈에는 일반적인 저장소와 마찬가지로 ```state```, ```mutations```, ```actions```, ```getters``` 등이 포함될 수 있다.
## 설명
### 상태
```javascript
const A = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};

const B = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};

export default Vuex.Store({
  mutations: {
    A,
    B
  },
});
```
위 코드는 모듈 A와 B를 만드는 예제이다. 모듈을 구분해두면 아래와 같이 상태 참조가 가능하다.
```javascript
this.$store.state.A;
this.$store.state.B;
```
### 네임스페이스
하지만 위 코드대로 구현을 하면 한가지 문제가 있다. state는 정의 된 모듈 이름에 따라 확실한 구분이 생기지만 ```mutations```, ```actions```, ```getters``` 등은 아직도 전역에 포함되기 때문이다. 예를 들어 모듈 A와 B에 둘 다 ```name```이라는 ```state```가 있고, 이를 수정하는 ```mutation```이 ```SET_NAME``` 이라고 가정하자. 이렇게 되면 ```SET_NAME```을 불렀을 때 어떤 모듈의 ```SET_NAME```이 불리게 될까? 이 모호함을 해결하기 위해 네임스페이스를 사용한다.
```javascript
const A = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};

const B = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};

export default Vuex.Store({
  namespaced: true,
  mutations: {
    A,
    B
  },
});
```
```namespaced: true```를 사용하면 아래와 같이 사용할 수 있다.
```javascript
this.$store.commit('A/SET_NAME', name);
this.$store.commit('B/SET_NAME', name);
```