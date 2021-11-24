# CSS3 Sticky
![CSS3 Sticky](https://i.imgur.com/IzZjOqL.gif)
## ☀️ 개요
CSS3에서 등장한 Sticky는 웹 상에 존재하는 UI를 스크롤에 따라 움직이게 하는 속성이다.
## 💾 기존
CSS3에서 sticky 속성이 추가 되기 전에는 유사한 기능을 만들기 위해서 ```Javascript```를 사용해야만 했다.
현재 스크롤의 위치를 구하고, 헤더의 높이를 빼는 등의 작업을 통해서 스크롤에 따라 움직이는 요소를 만들 수 있었다.
## ✏️ 문법
```css
.example-parent {
  position: relative;
}
.example-element {
  background-color: blue;
  height: 40px;
  position: sticky;
  top: 0; /* or left, right, bottom */
}
```
```html
<div class="example-parent">
  <div class="example-element"></div>
</div>
```
## ⭐️ fixed와의 차이
### position: fixed
- 어떠한 경우에도 처음 지정한 위치에 고정된다.
- 부모의 position 상황에 영향을 받지 않고 **문서 전체를 기준**으로 위치를 지정한다.
### position: sticky
- 스크롤 위치에 따라 요소의 배치 상태가 달라진다.
- 기본적으로는 **일반적인 요소들처럼 물리적인 영향**을 받는다. (다른 요소와 겹치지 않는다.)
- 부모의 position 상황에 따라 배치가 된다.
- 스크롤이 해당 요소를 표시한 이후, **해당 요소가 가려지기 시작할 정도로 스크롤을 내리게 되면 그 때부터 css에서 지정한 left, top 등의 효과가 발동한다**.
- sticky 진행 경로에 일반 요소가 배치 될 경우, **left, top 등의 효과를 받지 않고 해당 요소에게 밀린다.**