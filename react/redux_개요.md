# Redux에 대해서
## 개요
상태값을 저장하기 위한 전역 저장소이다. ```Vuex```라이브러리가 ```Redux```와 유사한 역할을 한다.
## 용어
### 액션 (Action)
- ```Vuex```의 ```Action```과 동일한 역할이다.
- 상태값을 조정하는 역할을 한다.
- 액션 자체는 아무런 역할도 수행하지 못한다.
- 기본적으로 ```type``` 필드를 갖는다.
```javascript
{
  type: 'ADD_TODO',
  data: {
    id: 1,
    text: 'learn to redux',
  }
}
```
### 액션 생성 함수
- 위에서 정의한 액션을 생성한다.
  ```javascript
  const addTodo = () => {
    return {
      type: 'ADD_TODO',
      data: {
        id: 1,
        text: 'learn to redux',
      }
    };
  };
  ```
- 매개변수를 직접 전달받아서 액션을 정의할 수도 있다.
  ```javascript
  const addTodo = (todo) => {
    return {
      type: 'ADD_TODO',
      data: {
        id: 1,
        text: todo,
      }
    };
  };
  ```
### 리듀서 (Reducer)
- 상태값을 직접적으로 변환하는 함수이다.
- ```Vuex```의 ```mutation```과 비슷한 역할이다.
- 파라미터로는 ```state```와 ```action```을 전달받는다.
- 전달받은 ```state```와 ```action```을 통합하여 변화된 상태값을 리턴하는 구조이다.
```javascript
const state = {
  counter: 1,
};
const reducer = (s = state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1,
      };
    default:
      return s;
  }
};
```
### 디스패치(Dispatch)
- 액션을 트리거 하는 역할이다.
- ```Vuex```의 ```dispatch```와 역할이 비슷하다.