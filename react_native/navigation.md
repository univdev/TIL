# React Native Navigation
## 개요
웹이건 앱이건 버튼을 누르거나 링크를 누르면 지금과는 완전히 다른 페이지가 보여지는 기능이 필수적으로 들어간다.
물론 컴포넌트를 여러개 만들어서 활성화 / 비활성화 하는 형태로 작업해도 되겠지만 생각만해도 머리가 아플정도로 로직이 복잡해질 것이다.
렌더링 하는 부분도 어렵겠지만 네비게이션, 애니메이션 등 기존 앱에서 지원하는 기능을 만들기에는 한계가 있을 것이다.

그래서 앱도 웹처럼 페이지를 나눌 수 있는데, 그 기능을 지원하는 라이브러리이다.
## 컴포넌트
### NavigationContainer
#### 의존성 패키지 설치
```
yarn add react-native-gesture-handler @react-navigation/native
cd ios
pod install
```
#### 역할
앱의 최상단을 감싸는 역할을 하며, 앱 전체의 네비게이션을 담당하는 역할을 한다. 앞으로 설명할 모든 네비게이션 컴포넌트는 해당 컴포넌트 하위에 선언하여야 하며, 프로젝트 당 한개만 선언할 수 있다.

#### 예제
```javascript
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from '../routes/stacks';
import React from 'react';

const App = () => {
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
};

export default App;
```
### Stack
#### 개요
말 그대로 스택처럼 계층 구조를 가질 수 있는 형태의 네비게이션이다. 웹으로 비유하자면 ```Stack.Screen```이 하나의 페이지이다.
#### 역할
페이지의 역할을 한다. 하나의 ```Stack.Screen```은 다른 유형의 네비게이션 컴포넌트도 하위에 배치할 수 있다.
#### 예제
```javascript
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Drawer from './drawer';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer">
      <Stack.Screen
        name="Drawer"
        component={ Drawer }/>
    </Stack.Navigator>
  );
};

export default Routes;
```
실질적으로 페이지의 역할을 맡고있는 ```Stack.Screen``` 컴포넌트는 ```Stack.Navigation``` 컴포넌트 하위에 배치된다.
```Stack.Navigation```은 하나의 그룹이라고 봐도 무방한데, 해당 그룹에 진입했을 때 별다른 입력 없이 진입했다면 최초로 진입할 페이지를 ```initialRouteName``` 프로퍼티를 통해 선언할 수 있다.

```Stack.Screen```은 실제로 사용자에게 보여지는 하나의 페이지로, ```name``` 프로퍼티와 ```component``` 프로퍼티를 의무적으로 받는다.
```name```은 웹페이지의 ```URL```의 역할을 하며, ```component```는 해당 스크린이 보여질 때 실질적으로 보여질 UI의 집합을 정의한다.