# Redux 연동
## 개요
Redux를 연동하는 방법에 대해서 작성한다.
## 패키지
```
"react-redux": "^7.2.6",
"redux": "^4.1.2",
"redux-actions": "^2.6.5",
"redux-devtools-extension": "^2.13.9",
"redux-logger": "^3.0.6",
"redux-thunk": "^2.4.1"
```
## 연동 방법
> 직접 만든 Todo App의 소스코드를 일부 발췌함.
### Actions, Reducer 정의
Todo 앱에서 할 일을 추가하는 액션을 정의한다.
```javascript
// store/todo.js
import { handleActions } from "redux-actions";

const ADD = 'todo/ADD';

const initialState = {
  items: [],
};

export const addItem = (item) => {
  return {
    type: ADD,
    payload: item,
  };
}
```
액션은 reducer에게 변경해야 할 값을 전달하는 역할을 맡는다. 직접적으로 값을 변경할 수 있는 권한은 reducer에게만 있기 때문이다.

reducer는 아래와 같이 정의한다.
```javascript
// store/todo.js

// ... 위 예제의 소스코드

export default handleActions({
  [ADD]: (state, { payload }) => {
    const result = {
      ...state,
      items: [...state.items, { ...payload }],
    };
    return result;
  },
}, initialState);
```
이렇게 정의하면 ```ADD```상수가 가진 ```todo/ADD``` 키를 통해 ```action```과 ```reducer```를 연결할 수 있다. ```actions```에서 넘긴 구조체를 ```reducer```의 두번째 파라미터로 넘겨받게 된다.
```javascript
{
  type: ...
  payload: ...
}
```
action에서는 이렇게 넘겨줬으니, ```reducer```에서도 ```{ payload }``` 형태로 넘겨받은 것이다.
### 실제 사용
```javascript
import { useDispatch } from 'react-redux';
import { addItem } from '~/store/todo';

const dispatch = useDispatch();

const onAddTodoItem = () => {
  dispatch(addItem({ content: '할 일' }));
};
```
이런 식으로 정의한 ```action```을 import하여 dispatch에 변경할 값과 함께 넘기면 된다.