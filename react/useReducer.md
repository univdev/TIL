# useReducer Hook
## 개요
```reducer```는 ```redux```를 다뤄봤거나, 상태 관리 라이브러리를 다뤄봤다면 한 번 쯤 들어봤을 개념이다. **액션을 통해 ```state```를 관리하는 매니저**라고 보면 된다. ```reducer```를 통한 상태 관리의 원칙은, ```state```를 변경할 수 있는 권한을 ```reducer```만 가져야 함에 있다.

상태 관리 프로세스에는 크게 세 가지의 구성 요소가 있는데, ```state``` ```actions``` ```reducer```가 있다.
#### state
관리 되는 주체이다. 변수라고 생각하면 된다.
#### reducer
```state```를 직접적으로 수정할 수 있는 권한을 가졌다. ```reducer```를 호출할 때 넘기는 ```action```에 따라서 ```state```를 처리할 로직을 결정할 수 있다.
#### action
```reducer```에게 ```state```를 어떻게 수정할 지에 대해서 명령을 내리는 주체이다. 명령과 함께 데이터를 같이 전달할 수 있다.
## 사용 용도
위에서 ```redux```를 예시로 들어서 장황하게 설명은 했지만 사실 ```redux```와는 전혀 상관 없다. 단순히 예시를 들기 위해 설명한 것이다.

```useReducer```는 컴포넌트의 외부 ```scope```에서도 ```state```에 대해 참조 및 수정을 진행할 수 있도록 하는 ```hook```이다. ```React```를 쓰면서 이러한 경험이 있지 않은가?
```javascript
const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [rank, setRank] = useState(1);

  const handleChangeCount = (n) => {
    setCount(n);
  };
  const handleChangeName = (name) => {
    setName(name);
  };
  const handleChangeAddress = (addr) => {
    setCount(addr);
  };
  const handleChangeRank = (n) => {
    setName(n);
  };
  ...
};

export default App;
```
컴포넌트 내부에서 ```state``` 관리를 하는 ```useState```의 사용 예시이다. 예시가 간단해서 척 보기에는 무슨 문제가 있는가 싶은 사람도 있겠지만, 컴포넌트 내부에서 ```state```의 정의와 변이가 함께 일어나는 로직이 많아지면 눈을 어디다가 둬야 할지 감이 잘 안잡히는 상황이 생긴다.

심지어 나는 상태 관리를 할 때 저렇게 ```state```마다 ```useState```를 사용하지 않고 아래와 같이 작성하는 경우가 많다.
```javascript
const App = () => {
  const [state, setState] = useState({
    name: '',
    address: '',
    count: 0,
    rank: 1,
  });
  const handleChangeName = (name) => {
    setState({
      ...state,
      name,
    });
  };
  const handleChangeCount = (count) => {
    setState({
      ...state,
      count,
    });
  };
  const handleIncreaseCount = () => {
    setState({
      ...state,
      count: state.count + 1,
    });
  };
  ...
};

export default App;
```
이제 문제점이 조금 감이 잡히는가? 일단 ```...state``` 라는 구분을 ```state```가 수정 될 때마다 ```setState```에 넘기고 있다. 심지어 이러한 형태는 앞으로 ```state```를 변이시키는 로직을 구현할 때마다 계속해서 사용해야 할 것이다.
그렇기 때문에 ```state```를 변경하는 로직을 미리 ```reducer```에 정의해두고 ```action```을 통해 명령과 값만 전달하면서 변이를 시킬 수 있다.
```javascript
const reducer = (state, action) => {
  if (action.type === 'SET_COUNT') return { ...state, count: action.payload };
  if (action.type === 'SET_NAME') return { ...state, name: action.payload };
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    address: '',
    rank: 1,
    count: 0,
  });
  const handleIncreaseCount = () => {
    dispatch({ type: 'SET_COUNT', payload: state.count + 1 });
  };
  const handleChangeName = (name) => {
    dispatch({ type: 'SET_NAME', payload: name });
  };
  ...
};

export default App;
```
위와 같이 구현할 수 있다. ```dispatch```를 통해 ```reducer```에 ```action```을 전달할 수 있으며, ```action.type```을 통해서 ```reducer```의 처리 로직을 결정할 수 있다. 이렇게 되면 앞으로 어떤 변이가 일어나더라도 ```...state```를 여러번 부르지 않아도 될 뿐더러, ```state```를 변이 시킬 수 있는 최소 조건을 구축할 수도 있어서 보다 안정적인 소프트웨어를 구현할 수 있다.