# Mock
## 개요
아마 디자인 경험이 있거나, 디자이너와 협업해 본 경험이 있는 사람이라면 ```Mock```이라는 단어가 익숙할 것이다. ```Mock```은 **모조품**이라는 뜻인데, **보다 실제적인 구현 단계를 보기 위해서 만든 프로토타입**이라는 의미이다.

![Mock](https://www.graphicpear.com/wp-content/uploads/2021/11/Stacked-Paper-Cups-Mockup-PSD.jpg)

그렇다면 **Unit Test**에서의 ```mock```은 어떤 의미일까? 말 그대로 개발 단계에서 필요한 견본품이라는 의미이다. 예를 들어보자.

1. 레스토랑 이름을 입력한다.
2. '추가' 버튼을 누른다.
3. 데이터베이스에 해당 레스토랑이 추가 된다.
4. 추가한 레스토랑이 보인다.

위와 같은 기능을 지원하는 App이 있다고 하자. 1, 2, 4번은 다 괜찮은데, 3번이 문제다. 왜 문제일까.

1. 테스트를 한 번 돌릴 때 서버에 접근하는 행위 자체가 리소스를 불필요하게 많이 잡아먹는다. (느려진다.)
2. 테스트를 이행했을 뿐인데 서버에 불필요한 데이터가 추가 된다. (테스트용 데이터를 삭제하는 작업을 수동으로 처리해야 한다.)
3. 반드시 온라인 환경에서만 테스트 진행이 가능해진다. (오프라인에서는 무조건적으로 실패가 뜨기 때문에 본질적인 테스트의 의미가 퇴색된다.)

대표적으로 이런 문제점이 존재한다. 그렇지만 서버 요청 부분을 제외하고 테스트를 진행하기에도 찝찝한 것은 사실이다. 그럴 때 사용하는게 ```Mock```이다.

의존성 라이브러리를 실제로 사용하지 않고, 라이브러리로 실행되는 요청을 가로채서 **jest**에서 지원하는 가짜 로직을 타게 만드는 것이다.
## 방법
아래와 같은 코드가 있다.
```javascript
import produce from 'immer';
import React, { useReducer } from 'react';
import { Text, View, TextInput, Button, Alert, SafeAreaView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../store/restaurants';
import Restaurant from './.components/Restaurant';

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_NAME':
      return produce(state, (draft) => {
        draft.name = action.payload;
        return draft;
      });
    default:
      return state;
  }
};

const Home = () => {
  const reduxDispatch = useDispatch();
  const items = useSelector((state) => state.restaurants.items);
  const [state, dispatch] = useReducer(reducer, {
    name: '',
  });
  const handleAddRestaurant = () => {
    try {
      if (!state.name) throw new Error('레스토랑 이름을 입력해주세요!');
      const { name } = state;
      axios.post('/restaurants', { name }).then(() => {
        reduxDispatch(addItem(name));
        dispatch({ type: 'SET_NAME', payload: '' });
      });
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
          items.map((item, index) => {
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

export default Home;
```
버튼을 누르면 데이터베이스에 레스토랑 이름이 추가되고, 화면단에 표시 되는 앱의 소스코드이다. 보다시피 실제로 동작하는 프로그램의 소스코드이기 때문에 여기서 사용하는 ```axios```는 실제 라이브러리를 사용하며, 실제로 서버에 요청이 전달된다.

이 어플리케이션을 테스트 코드로 변환해보면 아래와 같이 나온다. (서버 요청에 대한 테스트는 일단 제외한다.)
```javascript
import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import Home from '../src/pages/Home';
import Reducers from '../store';

const store = createStore(Reducers);

jest.spyOn(Alert, 'alert');

const setup = () => {
  const screen = render(
    <Provider
      store={store}
    >
      <Home />
    </Provider>
  );
  const input = screen.getByTestId('restaurantNameField');
  const button = screen.getByTestId('restaurantAddButton');
  return {
    screen,
    input,
    button,
  };
};

describe('Home', () => {
  it('Home 화면이 정상적으로 렌더링 되는가?', async () => {
    const { screen } = setup();
    const json = screen.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('타이틀이 정상적으로 보여지는가?', () => {
    const { screen } = setup();
    const title = screen.getByText('Your Favorite Restaurants!');
    expect(title).toBeDefined();
  });
  it('레스토랑 이름을 입력할 수 있는 텍스트 필드가 존재하는가?', () => {
    const { screen } = setup();
    expect(screen.getByTestId('restaurantNameField')).toBeDefined();
  });
  it('레스토랑을 추가할 수 있는 추가 버튼이 존재하는가?', () => {
    const { screen } = setup();
    expect(screen.getByTestId('restaurantAddButton')).toBeDefined();
  });
  it('레스토랑 이름을 추가하지 않고 추가 버튼을 누를 경우 예외 문구가 표시 되는가?', () => {
    const { screen, button } = setup();
    const title = '레스토랑 추가 실패';
    const message = '레스토랑 이름을 입력해주세요!';
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
    const { screen, input, button } = setup();
    for (const name of names) {
      fireEvent(input, 'changeText', name);
      fireEvent(button, 'press');
      expect(screen.getByText(name)).toBeDefined();
    }
  });
});
```
이 테스트 코드를 실행하면 실제 ```axios```가 실행된다. 하지만 실제 요청을 보내다보니 위에 상기한 문제점들이 도사리고 있다. 이럴 경우 **Jest**에서 지원하는 ```Mock``` 생성을 위한 함수가 존재한다.
## jest.fn
이 함수는 **Jest**에서 사용할 수 있는 ```Mock``` 생성 함수이다.
### 사용법
테스트 문서들을 ```__tests__``` 폴더 안에 생성하듯이, ```mock``` 파일들은 ```__mocks__``` 폴더에 생성한다.

파일의 이름은 의존성 라이브러리의 이름과 동일하게 작성하면 좋다. 위에서는 ```axios```를 사용했으니 ```__mocks__/axios.js```라고 명명하면 좋을 것 같다. ```axios.js``` 파일에는 아래와 같은 코드를 넣는다.
```javascript
export default {
  get: jest.fn(() => {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve({
          data: 'Hello world!',
        });
      }, 1500);
    });
  }),
};

```
```get```만 구현한 ```mock axios```가 완성이 되었다. 이제 테스트코드에서 ```import axios from '../__mocks__/axios.js```를 적으면 ```axios``` 라이브러리를 대신하여 사용할 수 있다.
위 코드의 로직대로 1.5초 뒤에 ```{ data: 'hello world!' }``` 라는 데이터를 전달 받은 것을 볼 수 있다.

```jest.fn```의 장점은 여기서 끝나지 않는다. 외부 라이브러리의 실행 여부를 ```jest.spyOn```을 써서 추적했던 것 처럼, ```jest.fn```도 추적이 가능하다. 애초에 **Jest**에서 지원하는 내장함수다보니 얘는 ```spy```고 뭐고 필요 없다. 그냥 아래와 같이 실행해주면 된다.
```javascript
expect(axios.get).toBeCalled()
```