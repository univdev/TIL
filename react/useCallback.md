# useCallback Hook
## 개요
```useCallback```은 함수를 중복 선언하지 않기 위한 ```Hook```이다. ```React```는 상태값의 변화에 따라 컴포넌트를 다시 그리는 ```리렌더링```작업을 실행한다. 이 경우에, 컴포넌트를 구성하는 모든 로직을 다시 읽어버리는데 이 과정에서 선언된 변수와 함수들을 모조리 재선언 해버린다. 변수나 함수는 어지간해서 중복선언 좀 된다고 메모리에 어마어마한 부하를 주는 것은 아니지만, 한번 선언한 함수는 재선언 되지 않는게 원칙이다.
## useCallback을 사용하지 않는다면
```useEffect```와 사용 방법은 비슷하다.
```javascript
const app = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const getNameLength = () => {
    if (!name) return 0;
    return name.length;
  };

  return (...);
};
```
아마 이런 식으로 선언했을 것이다. 기본적으로 문제는 없지만 ```name```의 길이만을 구하는 함수가 ```count```를 바꿨을 때도 재선언이 되는 것은 사실 그다지 바람직하지 않다. 그렇기 때문에 아래와 같이 작성을 할 필요가 있다.
```javascript
const app = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const getNameLength = React.useCallback(() => {
    if (!name) return 0;
    return name.length;
  }, [name]);

  return (...);
};
```
보다시피, ```React.useCallback(callback, deps)```의 구조를 갖고 있는데, ```callback```은 누가 보더라도 역할이 분명하다. 그렇다면 ```deps```는 뭘까? 이는 ```useEffect```를 공부했다면 알겠지만, ```hook``` 실행에 영향을 미치는 ```state```의 묶음이다. 다만, ```useCallback```은 **실행이 아닌 재선언**의 여부를 결정한다.

위에서도 말했지만 ```useCallback```은 **함수의 재선언을 막기 위해** 사용한다. 그 말인 즉, 함수가 재선언이 되지 않는다면 함수 안에서 사용된 모든 ```state```는 ```state```가 변경되지 않은 값을 가질 수도 있다는 얘기이다.
```javascript
const app = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const getNameLength = React.useCallback(() => {
    if (!name) return 0;
    return name.length;
  }, []);

  return (...);
};
```
만약 이렇게 ```deps```에 아무 ```state```도 넘기지 않을 경우, ```React.useCallback``` 내부의 ```callback```은 ```name```이 선언 된 이후로 한 번도 갱신된 적이 없기 때문에 ```name```의 값을 계속 ```''```로 착각하게 된다. 그렇기 때문에 함수가 재선언 되는 타이밍을 정해줘야 하는데, 이 역할을 하는 것이 ```deps```이다.
그러므로, ```deps```에는 ```callback``` 안에서 사용된 모든 ```state```를 넘겨줘야만 한다.