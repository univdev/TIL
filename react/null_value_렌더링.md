# null value 렌더링
## 개요
```input```의 ```value```는 ```null```이 아닌 ```''``` 빈 문자열로 표시해야 한다. 문자열을 초기화할 때, ```null``` 문자로 초기화를 한다면 입력 되어있는 ```value```가 렌더링 되지 않는다.
## 예제
### 잘못 된 코드
```javascript
import React, { useState } from 'react';
import Button from '../../components/Button';
import TodoList from '../../components/TodoList';
import Input from '../../components/Input';

const App = () => {
  const [state, setState] = useState({
    todoItems: [],
    currentWork: null,
  });
  // ...
  return (
    <div className="container">
      <h1>To-do</h1>
      <form
        action="#"
        method="POST"
        className="search"
        onSubmit={ handleAddTodoItem }>
        <Input
          type="text"
          value={ state.currentWork }
          onInput={ (e) => handleChangeCurrentWork(e.target.value) }/>
        <Button type="submit">추가</Button>
      </form>
      <TodoList
        items={ state.todoItems }
        onComplete={ handleCompleteTodoItem }/>
    </div>
  );
};

export default App;
```
이렇게 사용하면 ```추가```버튼을 눌렀을 때 ```state.currentWork```를 초기화하는 기능을 넣었을 때, 기존에 입력했던 값이 제거되지 않는다.