# useFocusEffect Hook
## 개요
이는 ```React Native```가 아닌, ```React Navigation```에서 지원하는 ```Hook```이다. 일반적으로 ```useEffect```와 동일한 효과를 갖고 있지만, 유일한 차이점은 **해당 페이지에 포커스가 맞춰졌을 때**만 실행된다는 점이다. 여기서의 ```Focus```는 모든 ```Screen```중 가장 최상위에 해당 ```Screen```이 올라와 있는 경우를 말한다.
## 실행 주기
해당 페이지가 렌더링 될 때마다 1회 호출 된다.
## 사용법
### 일반적인 사용법
```useEffect```와 사용하는 방법은 *거의* 동일하다.
```javascript
useFocusEffect(callback);
```
척 보면 알겠지만, ```useEffect```와는 다르게 **의존성 상태 변수**를 두번째 인자로 넘기지 않는다. 그렇기 때문에 ```useFocusEffect```는 단독으로 사용하면 너무 많이 호출 될 수 있다는 위험성을 내포하고 있다. 그래서 ```useFocusEffect```는 단독으로 사용하면 안되고, ```React.useCallback```이라는 ```Hook```과 같이 사용해야 한다.
```javascript
useFocusEffect(() => {
  React.useCallback(callback, [stateArray]);
});
```
```useFocusEffect```는 ```useState```와 사용법이 완전히 동일하다. 두번째 인자로 넘어간 ```stateArray```에 들어있는 상태 중 하나가 변경되면 실행된다.
### async useFocusEffect
```useFocusEffect```는 네비게이션의 이동 혹은 리렌더링 시 사용된다는 것을 알고 있다. 그렇다면, 비용이 높은 호출을 ```useFocusEffect```에서 호출 해야만 하는 경우는 어떻게 처리할 수 있을까?

예를 들어보자, 게시물 하나를 불러와야만 UI를 구성할 수 있는 페이지가 있다면, 해당 페이지에 대한 구성요소를 전부 불러온 다음에야 애니메이션이 실행 될 것이다. 즉각적인 반응을 요하는 앱에서는 절대적으로 피해야 할 상황일 것이다. ```InteractionManager.runAfterInteractions```을 이용하여 페이지 이동 애니메이션이 전부 끝난 다음에 비동기 처리를 진행할 수 있다.
```javascript
useFocusEffect(
  React.useCallback(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      // Expensive task
    });

    return () => task.cancel();
  }, [])
);
```
### Unmount Effect
페이지가 소멸할 때, 즉 사용자가 해당 스크린을 벗어나서 더 이상 쓸 일이 없을 때 해야만 하는 조치가 있다. ```addEventListener```을 예로 들 수 있는데, 해당 ```Screen```이 Focus 될 때 화면에 구성 된 Node에게 이벤트를 부여하는 경우가 충분히 있을 수 있다. 하지만 페이지가 소멸한다면? 더 이상 존재하지도 않는 객체에게 할당 되어 있을 이벤트들을 제거해야만 하는 상황이 생길 수 있다.
```javascript
function FetchUserData({ userId, onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = API.subscribe(userId, onUpdate);

      return () => unsubscribe();
    }, [userId, onUpdate])
  );

  return null;
}

// ...

class Profile extends React.Component {
  _handleUpdate = user => {
    // Do something with user object
  };

  render() {
    return (
      <>
        <FetchUserData
          userId={this.props.userId}
          onUpdate={this._handleUpdate}
        />
        {/* rest of your code */}
      </>
    );
  }
}
```
위와 같이 ```useFocusEffect```를 사용하는 함수를 컴포넌트화 시켜서 **실제 렌더링 되는 컴포넌트 내부에 삽입**하는 형태로 구현할 수 있다. ```useCallback```에서는 ```Screen```이 ```Mount```되었을 때 실행하는 로직을 작성하고, **return 값으로 페이지가 ```unmount```될 때 실행 될 로직을 담은 함수를 반환하면 된다.**