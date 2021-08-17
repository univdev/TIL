# CORS 대처 방법
## CORS란?
CORS (Cross Origin Resources Sharing) 교차 자원 공유란, 도메인이 서로 다른 서비스에서 자원(리소스)를 교환할 때 적용 되는 보안 정책이다.

예를 들어, 내가 구축한 웹사이트인 ```https://example.com```에서 ```axios```로 ```https://naver.com```의 자원을 가져올 때 클라이언트는 내 서버가 되고, 서버는 네이버가 된다. 하지만 이 둘은 Origin(출처)이 서로 다르기 때문에 보안상의 이슈가 발생할 수 있는 우려가 있어서 기본적으로 통신을 차단하게 된다.
## CORS를 해결해야 하는 이유
개발 환경에서는 사실 어지간해서 CORS 문제가 발생하지 않는다. 클라이언트와 서버가 둘 다 로컬에서 동작하기 때문에 Origin이 동일한 경우가 많기 때문이다. (localhost 등) 하지만 실제 배포 환경이 되면 얘기가 달라지는데, 클라이언트와 서버가 다를수도 있고 도메인을 서로 다르게 구축할 수도 있다. 그렇기 때문에 개발자(제공자)가 동일한 서버와 클라이언트임에도 불구하고 통신이 안되는 사태가 벌어질 수 있기 때문에 CORS 해결은 개발을 막 시작한 **백엔드 개발자가 반드시 거쳐야하는 관문** 중 하나이다.
## 해결 방법
### 1. 화이트리스트 작성
- 자원을 제공하는 서버에서 해당 서버에 접근할 수 있는 도메인 목록을 작성하는 방법이다.
- 화이트리스트 작성방법
  - ```Access Control Allow Origin```이라고 하며, ```*``` 문자를 통해 모든 도메인에서의 접근을 허용할 수 있다.
    - 하지만 이 방법은 모든 도메인의 접근을 허용하기 때문에 보안상 권장되지 않는다.
  - ```Access Control Allow Origin```에 특정 도메인만을 작성하여 해당 도메인만 접근이 가능하도록 만들 수 있다.
    - ```Access-Control-Allow-Origin: https://foo.example```
    - 이 방법은 도메인 전체를 허용하는 위 방법보다 안전하다.
    - 하지만 접근을 허용할 도메인의 리스트가 많다면 복잡해진다.
### 2. JSONP 방법
브라우저는 기본적으로 script에서 다른 제공자가 제공하는 데이터를 불러오는 것을 막는다. 하지만 예외가 있는데, script 태그를 통해 외부 문서를 불러올 때는 다른 제공자의 데이터를 허용한다. (CDN 방식을 허용해야 하기 때문에 어찌보면 당연하다.) 이 원리를 이용한 방법으로 다시말해 *꼼수*이다. 보안상 문제가 있기 때문에 사용을 권장하진 않는다.
```javascript
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'http://server.example.com/Users/1234', true);
xmlhttp.onload = function () {
  console.log('Retrieved Data: ' + xmlhttp.responseText);
};
xmlhttp.send(); // -> 교차 출처 요청 차단
```
원래라면 이 방식을 통해 데이터를 불러와야 하지만 교차 출처로 인해 차단된다.
```javascript
<script type="application/javascript"
        src="http://server.example.com/Users/1234">
</script>
```
이 방법을 이용하면 데이터는 불러와지지만 ```Javascript Syntax Error```가 발생한다.
```javascript
<script type="application/javascript"
        src="http://server.example.com/Users/1234?callback=parseResponse">
</script>
```
그렇기 때문에 ```parseResponse``` Query를 이용하여 해당 문서에서 돌아오는 데이터를 파싱하여 받을 수 있다.
## 마치며
사실 CORS 이슈는 서버가 아니라 브라우저가 발생시키는 이슈이다. 서버는 클라이언트로부터 넘어오는 Origin이 어떤지 사실 아무런 신경도 쓰지 않고 결과를 반환하지만 서버가 데이터와 함께 반환하는 ```Access-Control-Allow-Origin:``` 값을 보고 브라우저가 이 값을 받을지 말지를 결정한다. 그래서 CORS 이슈에 익숙하지 않은 백엔드 개발자와 프론트 개발자가 만나 작업을 하면 이슈 추적이 매우 힘들다. 서버에서는 분명 데이터를 전송했다고 나오고 프론트에서는 데이터를 받지 못했다고 나오니 환장할 노릇이 된다. 덤으로 브라우저에서 발생시킨다는건 서버와 서버 사이 통신에서는 이와 같은 문제가 발생하지 않는다는 얘기도 된다.