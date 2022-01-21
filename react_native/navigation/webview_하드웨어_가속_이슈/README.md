# Webview 안드로이드 하드웨어 가속 이슈
## Webview란?
회사에서 개발하고 있는 서비스의 상당 부분에는 Webview가 포함되어 있습니다.  
Webview는 네이티브 앱에서 웹의 화면을 보여줄 수 있는 컴포넌트라고 생각하시면 됩니다.  
아마 앱 서비스를 개발하는 모든 회사가 그렇지 않을까 싶은데, 개발과 인연이 있는 사람이 아니라면 어디부터 어디까지가 앱이고 웹인지 구분이 안될 정도로 자연스럽게 녹아들어 있습니다.  
상대적으로 제작이 쉽고, 한 번 만들면 플랫폼에 구애받지 않고 동일한 화면을 보여줄 수 있으며, 별도의 심사 과정이 없이도 컨텐츠를 변경시켜줄 수 있기 때문에 많은 서비스들이 애용하죠.
## 개요
우리 회사의 서비스에도 타 서비스와 마찬가지로 Webview가 사용 되는데요, 대표적으로 사용자가 적은 게시글을 앱에서 렌더링 할 때 사용합니다.  
![웹뷰][웹뷰]

웹에서 적는 게시글에 대해서는 Quill Editor를 쓰는데, 웹과 동일한 모습을 보여주기 위해서 인앱에 Quill CSS를 삽입하는건 사용자 경험도, 앱의 성능 측면에서도 결코 유쾌한 경험은 아니기 때문입니다.  

그런데 오늘 기획팀으로부터 **"안드로이드에서 Webview 컨텐츠가 안보여요!"** 라는 이슈가 도착했습니다.  
## 원인 의심
보통 Webview의 내용을 그리지 못하는 경우라면 두 가지의 경우가 대표적입니다.  
1. 서버로부터 게시물을 받아오지 못함
2. 엔드포인트가 목적지와 다른 곳으로 설정 됨

그런데 **안드로이드**에서만 발생하는 이슈라고 해서 약간 불안해졌습니다.  
보통 웹이건 앱이건 플랫폼간 다르게 발생하는 이슈는 슈팅하기 어렵기 때문이죠.  
## 코드
```jsx
  <AutoHeightWebView
    style={{
      width: Dimensions.get('screen').width,
    }}
    source={{
      html: content,
    }}
    scrollEnabled={false}
    onNavigationStateChange={onNavigationStateChange}
    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
    androidHardwareAccelerationDisabled={true}
    originWhitelist={['about:blank']}
  />
```
### 의심
#### content 변수에 html이 제대로 들어가고 있는가?
가장 첫번째로 의심 해볼만한 Feature죠.  
```console.log(content)```로 출력했을 때 HTML이 제대로 표시 되는 것으로 보아 별 문제가 없군요.
#### Property로 인해 Webview가 정상 동작하지 않는 경우
두번째로 의심 해볼만한 Feature입니다.  
네이티브 환경에서는 별 일이 다 벌어지기에 특정 기기에서만 동작하지 않는 Property가 생길 수도 있기 때문이죠.

이런 이슈를 잡아내기 위해서는 최소한의 기능만 하는 컴포넌트 원형을 작성하면 쉽게 알 수 있습니다.  
Webview 자체가 문제는 아닌지, Property의 문제는 아닌지 바로 알 수 있기 때문이죠.
```jsx
<AutoHeightWebView
  source={{
    html: content
  }}
/>
```
위 코드를 작성한 결과, 정상적으로 HTML이 렌더링 되는 것을 확인할 수 있습니다.  
그렇다면 정말 다행히도 컴포넌트 자체에 문제가 있는 것은 아니겠군요.  
예상대로 Property가 동작을 방해한다는건데, 눈에 띄는 Property가 하나 있군요.

```androidHardwareAccelerationDisabled={true}``` 안드로이드 환경에서만 렌더링이 되지 않는다고 했는데 속성 이름에 딱 ```android```가 들어있군요.  
해당 속성을 추가한 결과, 정상적으로 작동 되던 Webview마저도 동작하지 않는 것을 확인할 수 있었습니다.
#### 안드로이드 하드웨어 가속
문제의 속성은 안드로이드 환경에서 특정 컴포넌트를 렌더링 할 때 GPU를 사용하여 보다 빠른 어플리케이션 사용자 경험을 제공하는 **하드웨어 가속**을 비활성화 하는 Property였습니다.  
이걸 왜 넣었나 하고 [Freedcamp][Freedcamp]의 작업 이력을 보아하니 **[안드로이드 일부 운영체제에서 앱이 꺼지는 이슈]**를 수정하기 위해서 해당 Property를 사용했다는 것을 알 수 있었습니다.

실제로 해당 Property를 넣고 여러 안드로이드 기기로 테스트를 해본 결과, **Android 11버전 이상의 기기**에서 크래시 현상이 발견 되었습니다.  
그런데 넣으면 텍스트가 안보이고, 빼면 팅겨버리는 문제가 발생해서 다른 방법이 없나 찾아보고 있었습니다.  
애초에 [API 문서][API 문서]에 따르면 ```androidHardwareAccelerationDisabled```는 Declare 된 Property였기도 하구요.
### 해결 방법
```React Native Webview android crash``` 라는 키워드로 구글링을 한 결과, 결국에는 문제를 해결하긴 했습니다.  
해결 하기는 했는데, 이걸 해결 했다고 봐야 할지 잘 모르겠습니다.

[저랑 같은 이슈로 인해 고통받는 사람들][토론]이 남겨둔 과거의 유산을 활용해본 결과, 방법은 두 가지가 있었습니다.

1. ```androidHardwareAccelerationDisabled```를 사용한다.
2. ```{ opacity: .99, overflow: 'hidden' }``` Style을 Webview에게 준다.

1번은 사용할 수 없으니 무조건 2번을 골라야만 하는 상황인데, 이게 도대체 어떤 원리로 해결 해준다는거지? 라는 생각으로 Webview에 넣어본 결과, 이슈는 여전했습니다.  
**"그럼 그렇지"** 라며 다시 구글링을 하러 가는데, [한국의 개발자 한 분][해결]이 남기신 게시글을 보게 되었습니다.  
이 분은 ```overflow: 'hidden'```이 아닌, ```maxHeight: 1```을 줘서 해결 했다고 합니다.  
실제로 효과가 있는지 시험해보기 위해서 해당 Style을 넣어봤고, **정상 동작하는 것을 확인했습니다.**

```javascript
const Styles = {
  webview: {
    minHeight: 1,
    opacity: .99,
  },
};
```

아니 도대체 이게 무슨 원리로 되는건지 직접 사용하고도 어이가 없어서 구글링을 잔뜩 해봐도 원리를 말하는 사람이 단 한명도 없어서 원리도 모르고 사용하는 코드 중 하나가 되었습니다.  
그래서 원래는 이 글도 작성을 하지 않으려고 했다가, 추후에 같은 상황을 마주했을 때 쉽게 수정하기 위해서 혹은 같은 문제를 앓고 있는 다른 개발자 분들을 위해서라도 문서화 결정을 내렸습니다.

[웹뷰]: ./webview.PNG
[Freedcamp]: https://freedcamp.com
[API 문서]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#androidHardwareAccelerationDisabled
[토론]: https://github.com/react-native-webview/react-native-webview/issues/811
[해결]: https://eloquence-developers.tistory.com/156