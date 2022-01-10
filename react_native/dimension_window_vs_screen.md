# Dimensions.get('window') vs Dimensions.get('screen)
## 개요
웹이나 앱을 만들어봤다면 현재 보여지는 페이지의 전체 길이를 구해야 하는 경우가 있다. 웹에서는 ```window``` 객체 안에 스크린 사이즈 정보가 이미 들어있기 때문에 ```window.innerWidth```를 사용하면 쉽게 가져올 수 있으나 **React Native** 환경에서는 해당 값을 가져오는 방식이 조금 다르다.

제목에서도 알 수 있듯, ```Dimensions``` 객체 안에 해당 정보가 있기 때문에 ```Dimensions``` 객체를 활용해야 한다.  
그런데 ```Dimensions```의 ```get``` 메소드에는 ```window```와 ```screen```이라는 두가지의 선택지가 존재한다. 이 둘은 과연 어떤 차이가 있을까?
## Dimensions.get('window')
- 상태 표시줄(배터리, 알림정보들이 포함 된 상단 영역)의 길이가 포함되지 않은 객체가 반환된다.
## Dimensions.get('screen')
- 상태 표시줄의 길이가 포함 된 객체가 반환된다.
## 주의할 점
위 차이점은 iOS에서는 해당되지 않는다. 하지만 안드로이드에서는 위에서 열거한 차이가 발생하기 때문에 대부분의 사이트에서는 ```Dimesions.get('window')```를 사용하는 것을 권장하고 있다.