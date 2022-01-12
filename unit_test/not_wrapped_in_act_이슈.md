# Not wrapped in act 이슈
## 개요
아래와 같이 테스트를 작성할 경우 ```not wrapped in act``` 이슈가 발생할 수 있다.
```javascript
describe('<App />', () => {
  it('render', () => {
    render(<App />);
  });
});
```
보기에는 이슈가 전혀 없을 것 같은 렌더링 테스트 코드인데 왜 ```not wrapped in act``` 이슈가 발생할까?  
### async
```<App />``` 안에서 비동기 처리로 인한 상태 변경이 이루어지는 로직이 있을 경우 위 에러가 나타날 수 있다.
```javascript
// ...
useEffect(() => {
  axios.get('/example').then((response) => {
    setResponse(response);
  });
});
// ...
```
위 경우에는 아래 처럼 테스트를 작성하면 해결할 수 있다.
```javascript
  it('render', async () => {
    render(<App />);
    await waitFor(() => screen.findAllByTestId('testId'));
  });
```
```waitFor``` 함수를 통해 상태가 온전히 변경 된 다음 테스트를 진행하는 방식이다.
### setTimeout
```setTimeout```을 통해 상태를 변경하는 로직이 있는 경우에도 발생할 수 있다.
```javascript
useEffect(() => {
  window.setTimeout(() => {
    setLoaded(true);
  }, 1000);
});
```
위 경우에는 ```act``` 함수의 ```callback```을 통해 타이머를 기다려주면 된다.
```javascript
  it('render', async () => {
    jest.useFakeTimers();
    render(<App />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  });
```