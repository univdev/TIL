# Jest를 이용한 React Native 단위 테스트
## 개요
요즘 소프트웨어의 개발은 **정교함**보다는 **빠른 마감일정에 충실한지**를 우선적으로 따진다. 물론 모든 기업이 그런 것은 아니겠지만, 대부분의 기업은 아래의 절차로 소프트웨어를 개발한다.

1. 소프트웨어의 요구스펙을 적은 기획서를 작성한다. (일부 기업에서는 이를 '유저스토리'라고 칭한다.)
2. 디자인을 제작한다.
3. 개발자가 디자인과 기획서를 보고 개발에 들어간다.
4. 개발자가 직접 테스트를 진행하면서 기획서와 교차 테스트를 진행한다.
5. 제품을 출시한다.
6. 이슈가 발견되면 수정한다.

아마 이 중에서 일부 다를 수는 있어도 큰 틀은 벗어나지 않을 것이다. 하지만 이 부분에는 문제점이 있다. **소프트웨어가 요구하는 기능이 늘어나거나, 기존 기획을 수정하는 경우** 한참 이전에 만들었었던 기능에 대해서 테스트가 소홀해질 수 밖에 없는게 가장 큰 문제이다. 예를 들어보자.


1. **2017년**에 만들기 시작한 프로젝트가 있다. 이 때는 앱이 지원하는 기능이 간단한 게시판 정도밖에 없었다. 심지어 비회원도 게시물을 작성할 수 있는, 별도의 회원 인증 기능조차 없는 간단한 앱이다.
2. **2018년**에는 앱의 사용자 수가 늘어나서 수익을 창출해야만 한다. 광고를 추가했다.
3. **2019년**에는 멤버십 기능 추가를 위해 회원 기능을 만들었다.
4. **2020년**에는 구글 애널리틱스를 적용하여 비회원과 회원의 앱 사용 방식을 분석하기 시작했다.
5. **2021년**에는 비회원 제도를 폐지하여 회원만 앱 사용이 가능하도록 제작했다.

위와 같은 개발 절차를 거칠 경우, 기존에 있던 기능이 삭제 됨에도 불구하고 5년전에 개발한 기능이라 회사 내 QA가 신경을 쓰지 않는 범위일 가능성이 높다. 심지어 QA가 없는 소규모 개발팀이라면 상황은 더더욱 심각해진다. 이런 문제가 대부분의 소프트웨어 기업에서 발견되기 시작했고, 속도 중심의 개발에서 **테스트 커버리지** 위주의 개발 방식을 추구하기 시작했다.

**단위 테스트**란, 개발에 사용되는 가장 작은 단위의 요소(컴포넌트)를 기능별로 분석하여 모든 기능이 개별적으로, 정상적으로 동작하는지를 확인하기 위한 테스트 방법이다. 일단 사람이 직접 테스트를 진행하는 것이 아니기 때문에 **warning** 출력에 대해서도 용서없이 **커버리지**를 차감해버리며, **5년 전에 만들었던, 10년 전에 만들었던 상관없이 컴포넌트를 계속 테스트해주는 봇을 만들 수 있다.**
## 사용된 패키지
- @types/jest
- @testing-library/jest-native
- @testing-library/react-native
- react-test-renderer
- immer (단위 테스트에는 상관 없는데, 추후 Home 컴포넌트를 작성하기 위해서 사용한다.)
#### 패키지 설치
```
yarn add --dev @types/jest @testing-library/jest-native @testing-library/react-native react-test-renderer immer
```
## 방법
기본적으로 ```jest```의 ```expect```와 ```toBe```와 같은 함수의 사용법은 안다는 것을 전제로 하고 넘어간다. 이 섹션에서는 ```Render``` 방식의 테스트 라이브러리를 사용하는 방법에 대해서 설명한다.

아래와 같은 앱을 만든다고 생각해보자.
1. 상단에는 타이틀이 보여진다.
2. 내가 가장 좋아하는 레스토랑의 이름을 입력할 수 있는 입력 필드가 있다.
3. 레스토랑을 추가할 수 있는 버튼이 존재한다.
4. 레스토랑의 이름을 입력하지 않고 추가 버튼을 누를 경우 경고창이 보여지며 입력을 막는다.
5. 레스토랑 이름을 입력하면 레스토랑이 추가가 되어 화면에 표시가 된다.

예상 실행 모습은 아래와 같다.

![My Favorite Restaurants](./screen.gif)

**TDD**개발 방식에 따라, 기능 구현보다 테스트를 먼저 작성해보자.

1. ```__test__``` 폴더를 루트 경로에 배치한다. ```react-native CLI```를 이용하여 프로젝트를 생성했다면 이미 해당 폴더가 존재한다.
2. ```__test__``` 폴더 안에 ```Home-test.js``` 파일을 생성한다.
3. ```Home-test.js``` 안에는 ```Home```이라는 이름의 스크린에서 유저가 행할 수 있는 모든 행동과, 유저가 얻을 수 있는 모든 기대값을 테스트하기 위한 로직을 작성한다.
4. ```Home-test.js``` 최상단에서 패키지를 ```import```한다. 각각의 패키지에서 불러온 메소드가 어떤 역할을 하는지는 나중에 설명한다.
```javascript
import React from 'react';
import 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../src/Home'; // Home 컴포넌트는 예시이다. 각자의 사정에 맞춰서 테스트를 할 컴포넌트를 불러오면 된다.
```
5. 현재 ```Home``` 컴포넌트를 테스트하고 있으니, 대주제를 생성해준다.
```javascript
describe('Home', () => {

});
```
1. **스냅샷 촬영 및 컴포넌트 렌더링이 제대로 되었는지에 대한** 테스트 로직을 작성한다. (위에서 생성한 ```describe```의 ```callback``` 내부에 작성해야 한다.)
```javascript
it('Home 화면이 정상적으로 렌더링 되는가?', () => { // 현재 테스트 하고자 하는 목적을 적고, 두번째 매개변수로 callback을 전달한다. 실제 테스트는 callback 내부에서 진행한다.
  const screen = render(<Home />); // react-native 컴포넌트를 @testing-library/react-native 패키지의 render 함수를 통해 렌더링한다.
  const json = screen.toJSON(); // 렌더링 된 컴포넌트를 json 구조로 변환한다.
  expect(json).toMatchSnapshot(); // 만들어진 json으로 스냅샷을 촬영한다.
});
```
스냅샷을 촬영하는 이유는, 추후 컴포넌트가 무언가에 의해 변경됨을 감지하기 위해서 앱 실행 당시 초기의 모습을 기억해두기 위해서이다. 하지만 스냅샷은 파일로서 ```__snapshots__``` 폴더에 저장되기 때문에 추후에 컴포넌트를 직접 변경했을 경우 기존에 촬영된 스냅샷과 일치하지가 않아 에러가 발생되는 경우가 있는데, 그럴 경우에는 ```yarn test --u```를 한 번 실행해주면 스냅샷을 다시 촬영한다.
7. **제대로 타이틀이 보여지는지**에 관한 테스트를 작성한다.
```javascript
it('타이틀이 정상적으로 보여지는가?', () => { // 마찬가지로 현재 테스트하고자 하는 목적을 적는다.
  const screen = render(<Home />); // Home 컴포넌트를 렌더링한다.
  const title = screen.getByText('Your Favorite Restaurants!'); // 해당 screen에서 'Your Favorite Restaurants!' 라는 내용을 갖는 노드를 찾는다.
  expect(title).toBeDefined(); // 만약 노드가 있다면 toBeDefined()로 해당 객체가 정의 되었는지 테스트한다. (toBeDefined는 undefined가 넘어가면 실패를 반환하는 메소드이다.)
});
```
8. **내가 가장 좋아하는 레스토랑의 이름을 입력할 수 있는 입력 필드가 노출** 되었는지에 관한 테스트를 작성한다.
```javascript
it('레스토랑 이름을 입력할 수 있는 텍스트 필드가 존재하는가?', () => {
  const screen = render(<Home />);
  expect(screen.getByTestId('restaurantNameField')).toBeDefined(); // testID 속성에 'restaurantNameField'가 들어가있는 요소가 있는지 찾고, 정의 되었는지를 식별한다.
});
```
```testID```란, ```React Native```에서 순전히 테스트를 위해 존재하는 ```Attribute```이다. ```React Native```환경은 웹과 엄연히 달라서, ```className```이나 ```id``` 선택 방식은 사용하지 않기 때문에 특정 요소 하나만을 선택하기 위해 사용하는 가상 속성이라고 보면 된다. 실제 구현 모습은 나중에 설명한다.
9. **레스토랑을 추가할 수 있는 버튼이 노출** 되었는지에 관한 테스트를 진행한다.
```javascript
// 레스토랑 이름 입력 필드 검사 로직과 testId만 다르기 때문에 설명은 생략한다.
it('레스토랑을 추가할 수 있는 추가 버튼이 존재하는가?', () => {
  const screen = render(<Home />);
  expect(screen.getByTestId('restaurantAddButton')).toBeDefined();
});
```
10. **레스토랑 이름을 입력하지 않고 추가 버튼을 누를 경우**에 대한 테스트를 작성하기 전에, 패키지 ```import```라인에 해당 코드를 추가한다.
```javascript
import { Alert } from 'react-native'; // react-native에서 지원하는 경고창이다.

jest.spyOn(Alert, 'alert'); // jest의 spy를 Alert 메소드에 심어놓는다. 테스트를 할 때는 실제 Alert를 실행하는게 아닌, '실행이 되었나?'에 대한 여부만을 확인하기 위한 mocking 작업을 진행하게 된다.
```
11. **레스토랑 이름을 입력하지 않고 추가 버튼을 누를 경우**에 대한 테스트를 작성한다.
```javascript
  it('레스토랑 이름을 추가하지 않고 추가 버튼을 누를 경우 예외 문구가 표시 되는가?', () => {
    const screen = render(<Home />);
    const title = '레스토랑 추가 실패'; // Alert의 제목
    const message = '레스토랑 이름을 입력해주세요!'; // Alert의 내용
    const button = screen.getByTestId('restaurantAddButton'); // 버튼을 직접 눌러보기 위해서 버튼을 탐색
    fireEvent(button, 'press'); // fireEvent를 통해 윗 줄에서 선택한 버튼에 'press'라는 이벤트를 실행하는 trigger이다.
    const json = screen.toJSON(); // 버튼을 누른 이후의 모습을 json으로 만든다.
    expect(Alert.alert).toHaveBeenCalledWith(title, message); // react-native의 Alert 메소드가 title, message과 같은 매개변수를 넘겨받고 실행 된 적이 있는지 테스트한다.
    expect(json).toMatchSnapshot(); // 초기에 촬영 된 스냅샷과 현재 스크린을 비교한다. 만약 경고창은 띄웠지만 실제 작성을 막지 않은 경우, 엉뚱한 노드가 하나 더 생겼을테니 초기 스냅샷과 달라졌기 때문에 오류가 난다.
  });
```
12. **레스토랑을 추가할 수 있는지**에 대한 테스트를 작성한다.
```javascript
  it('레스토랑을 추가할 수 있는가?', () => {
    const names = [ // 추가할 레스토랑의 이름들을 배열에 적어둔다.
      '1st gourmet',
      'sushi daisuki',
      'udonya',
    ];
    const screen = render(<Home />);
    const input = screen.getByTestId('restaurantNameField');
    const button = screen.getByTestId('restaurantAddButton');
    for (const name of names) { // 이름들을 반복한다.
      fireEvent(input, 'changeText', name); // 위에서 찾은 input 노드에 'changeText'라는 이벤트를 보내는데, 매개변수로 name을 보낸다.
      fireEvent(button, 'press'); // 위에서 찾은 button 노드에 'press'라는 이벤트를 보낸다.
      expect(screen.getByText(name)).toBeDefined(); // name 텍스트를 가진 요소가 정의 되었는지 탐색한다. 만약 레스토랑 이름이 표기되지 않았다면 실패한다.
    }
  });
```

위 모든 과정을 제대로 따라왔다면 최종 테스트 코드의 모습은 아래와 같이 작성 될 것이다.
```javascript
import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../src/pages/Home';

jest.spyOn(Alert, 'alert');

describe('Home', () => {
  it('Home 화면이 정상적으로 렌더링 되는가?', () => {
    const screen = render(<Home />);
    const json = screen.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('타이틀이 정상적으로 보여지는가?', () => {
    const screen = render(<Home />);
    const title = screen.getByText('Your Favorite Restaurants!');
    expect(title).toBeDefined();
  });
  it('레스토랑 이름을 입력할 수 있는 텍스트 필드가 존재하는가?', () => {
    const screen = render(<Home />);
    expect(screen.getByTestId('restaurantNameField')).toBeDefined();
  });
  it('레스토랑을 추가할 수 있는 추가 버튼이 존재하는가?', () => {
    const screen = render(<Home />);
    expect(screen.getByTestId('restaurantAddButton')).toBeDefined();
  });
  it('레스토랑 이름을 추가하지 않고 추가 버튼을 누를 경우 예외 문구가 표시 되는가?', () => {
    const screen = render(<Home />);
    const title = '레스토랑 추가 실패';
    const message = '레스토랑 이름을 입력해주세요!';
    const button = screen.getByTestId('restaurantAddButton');
    fireEvent(button, 'press');
    const json = screen.toJSON();
    expect(Alert.alert).toHaveBeenCalledWith(title, message);
    expect(json).toMatchSnapshot();
  });
  it('레스토랑을 추가할 수 있는가?', () => {
    const names = [
      '1st gourmet',
      'sushi daisuki',
      'udonya',
    ];
    const screen = render(<Home />);
    const input = screen.getByTestId('restaurantNameField');
    const button = screen.getByTestId('restaurantAddButton');
    for (const name of names) {
      fireEvent(input, 'changeText', name);
      fireEvent(button, 'press');
      expect(screen.getByText(name)).toBeDefined();
    }
  });
});
```
위 테스트 코드를 기반으로 ```Home```을 구현해보자. 실제 ```Home```의 코드는 아래와 같이 될 것이다.
```javascript
import produce from 'immer';
import React, { useReducer } from 'react';
import { Text, View, TextInput, Button, Alert, SafeAreaView, } from 'react-native';

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_NAME':
      return produce(state, (draft) => {
        draft.name = action.payload;
        return draft;
      });
    case 'ADD_ITEM':
      return produce(state, (draft) => {
        draft.items.push(action.payload);
        return draft;
      });
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    items: [],
  });
  const handleAddRestaurant = () => {
    try {
      if (!state.name) throw new Error('레스토랑 이름을 입력해주세요!');
      const { name } = state;
      dispatch({ type: 'ADD_ITEM', payload: name });
      dispatch({ type: 'SET_NAME', payload: '' });
    } catch (e) {
      Alert.alert('레스토랑 추가 실패', e.message);
    }
  };
  const handleChangeName = (e) => {
    dispatch({ type: 'SET_NAME', payload: e });
  };
  return (
    <SafeAreaView>
      <Text>Your Favorite Restaurants!</Text>
      <View>
        {
          state.items.map((item, index) => {
            return (
              <Restaurant
                key={index}
                name={item}
              />
            );
          })
        }
      </View>
      <TextInput
        value={state.name}
        testID="restaurantNameField"
        onChangeText={handleChangeName}
      />
      <Button
        title="추가"
        testID="restaurantAddButton"
        onPress={handleAddRestaurant}
      />
    </SafeAreaView>
  );
};

const Restaurant = (props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

export default Home;
```
## 테스트 코드 실행방법
jest는 기본적으로 ```__test__``` 폴더 내부의 모든 파일 혹은 ```*.test``` 명칭을 가진 파일들을 실행하기 때문에 아래 커맨드로 모든 테스트 파일을 읽을 수 있다.
```
yarn test
```
만약 특정 테스트 파일만 읽고 싶다면 아래 명령어를 입력한다.
```
yarn test home
// home은 파일의 이름이다. Home-test.js일 경우, 앞의 Home만 따서 쓰는 형태이다.
```
만약 스냅샷을 재촬영하고 싶다면 아래 명령어를 입력한다.
```
yarn test --u
```