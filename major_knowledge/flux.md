# Flux Architecture
## 참고
[Flux 아키텍쳐란?](https://velog.io/@alskt0419/FLUX-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EB%9E%80)
## MVC
![MVC](https://media.vlpt.us/images/alskt0419/post/ee1b0474-26a8-448e-bc2f-cda1724038fa/image.png)
### 개요
꽤 옛날부터 웹을 개발할 때는 **MVC** 패턴을 주로 사용했다.  
```Controller``` ```Model``` ```View```, 데이터의 흐름과 사용자에게 보여지는 과정을 이와 같은 3가지의 역할로 분배하고 처리하는 디자인 패턴이다. 데이터를 불러오고, 데이터를 뿌려주는 로직이 한 페이지에 집결 되어있던 기존의 웹 개발에 상당한 혁신을 가져왔으며, **PHP**와 같은 옛날부터 주로 쓰이던 웹 개발 언어 사용자 사이에서 상당한 호응을 얻었다.
### MVC 구성요소
**Controller**는 ```Model```에서 데이터를 가져와서 ```View```에 뿌려주고, ```View```에서 들어온 입력값에 따라 최적의 ```Data```를 ```Model```을 통해 가져오는 역할을 한다.  
**View**는 ```Controller```에 사용자의 입력을 전달하며 ```Controller```가 뿌려주는 값을 사용자에게 보여주는 역할을 한다.  
**Model**은 ```Database```와 직접적인 통신을 담당하며, ```Controller```에서 넘겨주는 요청에 따라 적합한 데이터를 반환하는 역할을 한다.
### 단점
다만 이 방법은 **Facebook**에 의해 문제점이 제기 되었다.  
처음에 개발을 할 때는 이 패턴이 참 괜찮았는데, 프로젝트의 규모가 커지면 커질수록 복잡해지긴 매한가지였기 때문이다.

![MVC패턴의 문제점](https://media.vlpt.us/images/alskt0419/post/35a7a12e-4f0d-416c-889c-92bdeca47dbb/image%20(1).png)

**Model** 파일은 기본적으로 동일한 데이터베이스의 **Table(NoSQL이라면 Document)** 단위로 작성되고, 해당 **Table**에 대한 **CRUD** 로직을 갖도록 작성되는데, **View**에서는 하나의 테이블에서만 데이터를 꺼내오지 않을 수도 있기 때문이다.  
하나의 **View**가 원하는 데이터를 구성하기 위해서 의존성이 있는 여러 ```Table```에서 데이터를 가져오거나, 변경시켜야 하는 일이 잦은데도 그런 경우에 대한 대처 방법이 미비하기 때문이다.
## Flux
![Flux Architecture](https://baeharam.netlify.app/media/architecture/flux.png)
### 개요
기존의 **MVC** 패턴의 문제점을 해결하고자 **Facebook**은 새로운 디자인 패턴을 들고 나왔는데, 그것이 바로 본 문서에서 소개할 **Flux Architecture**이다.  
**Facebook**은 **MVC** 패턴의 복잡성의 원인을 **데이터의 양방향 교환**에 있다고 생각했다.  
그래서 본인들이 만든 새로운 Architecture는 데이터를 가지고 있는 ```Store```라는 주체가 ```View```에 데이터를 뿌려주기만 할 뿐, ```View```에서의 입력은 ```Store```로 전달 될 일이 없도록 만든 패턴이다.
### Flux 구성요소
- Store: 데이터가 저장되는 저장소이다. 앱에서 필요로 하는 상태값이 저장된다.
- Controller View: 사용자가 직접 볼 수 있는 부분이다. 다만 **MVC** 패턴과는 다르게 데이터 처리에 대한 로직도 같이 포함한다.
  - Controller View는 자식 Controller View를 포함할 수 있으며, **부모에서 자식으로 데이터를 흘려보낼 수 있다.** 다만 자식에서 부모로 데이터를 보낼 수는 없다.
- Action: Store의 데이터를 어떻게 변경하면 좋을지에 대한 설계도이다. **Action은 store로 바로 전달되지 않으며, 반드시 Dispatch를 통해서만 전달 되어야 한다.**
- Dispatch: Store에게 값을 변경하라고 전달하는 역할을 한다.
  - Dispatch는 ```Store```를 변경하기 위한 로직을 갖고 있다.
  - ```Store``` 변경 로직에 대한 실행은 반드시 ```Action```에 적힌대로 실행해야 한다.
- Action Creator: ```Action```을 반환하는 함수이다. ```Dispatch```에 원하는 값을 전달하기 위해서, 중복 코드 방지를 위해서 사용을 권장한다.
## 사용 예제
- React에서 가장 높은 점유율을 갖고 있는 Redux 상태 관리 라이브러리가 Flux Architecture로 작성되었다.
- Redux를 참고하여 제작 된 Vuex 라이브러리도 Flux Architecture로 작성되었다.
## 마치며
나는 **PHP**로 웹 개발을 처음 시작했기 때문에 **Flux**보다 **MVC**를 먼저 사용해봤다고 할 수 있다. (그 때 사용했던 Framework가 Codeigniter와 Lalavel이였다.)  
사실 **Facebook**이 말했던 **MVC**패턴의 고질적인 문제는 내 경험상 그다지 공감이 되지는 않았다. 제작해봤던 프로젝트가 워낙에 작은 규모의 프로젝트이기도 했고, 학생 때 개발했던 웹 페이지이기 때문에 트래픽을 신경썼던 프로젝트도 아니기 때문이다.

다만 지금 나는 **PHP**가 아닌 **Javascript** 생태계에서 살고 있고, 그 중에서 Frontend Framework의 수장이라고 할 수 있는 **React**와 **Vue**를 사용하고 있는 사람이니만큼 **Flux** 패턴에 대해서 숙지하고 있으면 나쁠 것은 없겠다 생각했다.