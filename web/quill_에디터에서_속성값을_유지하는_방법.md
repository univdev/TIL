# Quill 에디터에서 속성값을 유지하는 방법
[출처](https://stackoverflow.com/questions/43978105/how-do-you-retain-the-custom-attributes-for-a-paragraph-in-quilljs/65793652#65793652)
## 개요
Quill 에디터는 css나 html을 전혀 모르는 일반 사용자도 문서를 예쁘게 디자인 할 수 있는 위지윅 에디터이다.
이 에디터로 평범하게 글을 쓰는데는 아무런 문제가 없는데, **특수하게 사용할 경우 문제가 생긴다.**

마크업 에디터를 병행 지원할 경우를 예로 들 수 있다. 사용자가 html에 대한 지식이 있다고 가정할 경우, quill 에디터가 아닌 다른 에디터를 별도로 제공하면서
html을 직접 적을 수 있도록 만드는 경우가 있는데, **텍스트를 조금이라도 quill 에디터를 사용해서 수정하는 순간 기존에 마크업 에디터로 작성했었던 데이터에서 태그 안에 있는 속성 값이 모조리 날아가게 된다.**
## 예제
```html
<div class="hi">
  Hello world!
</div>
```
이런 데이터가 있다고 할 경우, Quill 에디터를 사용해서 해당 텍스트를 변형하는 순간
```html
<div>
  Updated Hello world!
</div>
```
이 되어버린다.

이것 때문에 참 고생 많이 했는데, 드디어 해결 방법을 찾았다.
## 해결방법
```javascript
const Parchment = Quill.import('parchment');
const classAtrribute = new Parchment.Attributor.Attribute('class-attribute', 'class', {
  scope: Parchment.Scope.BLOCK,
});
Quill.register({
  'attributors/attribute/id': idAttribute,
}, true);
Quill.register({
  'formats/id': idAttribute,
}, true);
```
Quill 에디터 내부 패키지인 ```blots/block```와 ```parchment```를 이용한 방법이다.

위 소스코드대로 작업한다면 ```class``` 속성이 그대로 유지된다. 만약 id도 유지하고 싶다면 아래와 같이 사용하면 된다.

```javascript
const Parchment = Quill.import('parchment');
const classAtrribute = new Parchment.Attributor.Attribute('class-attribute', 'class', {
  scope: Parchment.Scope.BLOCK,
});
const idAtrribute = new Parchment.Attributor.Attribute('id-attribute', 'id', {
  scope: Parchment.Scope.BLOCK,
});
Quill.register({
  'attributors/attribute/id': idAttribute,
  'attributors/attribute/class': classAttribute,
}, true);
Quill.register({
  'formats/id': idAttribute,
  'formats/class': classAttribute,
}, true);
```