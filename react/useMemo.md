# useMemo Hook
## 개요
```useMemo```는 값을 메모리에 저장하기 위한 ```hook```이다. 우리가 컴퓨터 구조를 배웠다면 알 수 있는 사실이지만, 컴퓨터가 데이터를 꺼내올 때 가장 빠르게 꺼내오는 순서는 CPU에 있는 ```register``` > ```memory``` > ```Hard disk``` 순서대로 빠르다. 하지만 앱 / 웹은 ```register```나 ```Hard disk```에서 꺼내오는 방식을 사용할 수 없으니 기본적으로는 ```memory``` > 프로그램 실행 시 새로 불러오는 데이터 > ```Server``` 순서대로 빠르다고 보면 된다.

그렇다면 왜 ```useMemo```를 써가면서 까지 ```memory```에 값을 저장하는 기능을 만들어둔 것일까? 이는 ```React```의 렌더링 방식에 원인이 있다. [React의 렌더링 방식](./렌더링_메커니즘.md) 문서를 보면 알겠지만, ```React```는 컴포넌트가 가지고 있는 ```state```가 변화하면 본인과 하위 컴포넌트들을 모두 렌더링한다. 그 과정에서 컴포넌트 내 함수나 변수를 구성하는 로직도 함께 재작성 되게 되는데, 굳이 연관되는 ```state```가 변화하지 않더라도 덩달아서 값을 재선언 하는 일도 벌어진다.
## 예시
```javascript
const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const d = b + c;
  return (...);
};

export default App;
```
위 코드에서 문제가 되는 부분은 ```d = b + c```이다. 변수 ```d```는 ```b```와 ```c```라는 ```state```에게 의존적이다. 하지만 ```a```와는 의존 관계가 전혀 없다. 그렇지만 ```React``` 특성 상, ```a```가 바뀌더라도 ```d```를 구성하는 로직을 다시 그리게 된다.

물론 지금은 단순 덧셈이라 이거 한번 재선언 한다고 문제가 될 것은 전혀 없지만, 저 연산이 만약에 **배열의 유효한 값을 매번 체크하여 길이를 반환하는 로직을 갖고 있는 경우**는 어떨까? 알고리즘을 배울 때 실행속도를 가장 저해하는 원인 중 하나인 ```탐색```을 매 렌더링마다 실행하게 되는 것이다. 그렇기 때문에 의존성이 있는 ```state```가 아니라면 해당 변수는 재선언 될 이유가 없이 기존에 계산 되어 있는 값을 다시 불러와서 쓸 수 있어야만 한다. 그럴 때 사용하는 것이 ```useMemo```이다.

```javascript
const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const d = useMemo(() => b + c, [b, c]);
  return (...);
};

export default App;
```
이렇게 단순한 구조로 ```memorize```를 구현할 수 있다. ```useMemo(callback, deps)```의 구조로, 대부분의 ```React Hook```과 비슷한 구조를 갖는다. ```deps```는 다른 ```hook```을 안다면 이해가 쉬울 것이다. 바로, 해당 ```hook```을 실행하기 위한 의존 ```state```를 기재하는 부분이다.

위 코드를 이용한 설명을 하자면, ```useMemo```의 두번째 매개변수로 ```deps```를 전달했으니 해당 ```deps```안에 있는 ```state```가 변화하면 ```useMemo```를 재선언 한다는 의미이다. ```useMemo```의 ```callback```을 보면 ```b```, ```c```의 값에 의존하는 로직을 구성했으므로, ```b```와 ```c```가 변화하면 다시 재정의되어 최신 값을 불러오도록 해야하기 때문에, 위 코드에서는 ```deps```에 ```b```와 ```c```를 넘긴 것이다.