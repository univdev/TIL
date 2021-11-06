# v-if와 v-for의 동시 선언 규칙
일반적으로 v-if와 v-for을 동시에 한 태그에 삽입하는 것을 금하고 있었습니다.
하지만 Vue에서 기능적으로 오류를 뿜지는 않았기 때문에 동시 선언을 하는 개발자들도 꽤 많았습니다.

```pug
<template lang="pug">
  .element
    ul.list
      li.list__item(
        v-if="item.isActive",
        v-for="(item, key) in items",
        :key="key")
</template>
```
## Vue 2
Vue 2에서는 위 코드처럼 ```li.list__item``` 객체 안에 v-if와 v-for을 동시에 사용한다면 v-for을 우선적으로 처리하여, 아마 많은 개발자가 의도했던대로 돌아갔을 것입니다.
## Vue 3
그런데 Vue 3에서부터는 v-if를 우선적으로 처리하도록 변경되었기 때문에 v-for에서 선언되는 item 변수 참조가 불가능하며, v-if가 false라면 반복문이 실행되지조차 않게 됩니다.
## Best
최고의 방법은 아래와 같이 한 태그에 두 디렉티브가 삽입되지 않게 하는 것입니다.
```pug
<template lang="pug">
  .element
    ul.list
      template(v-for="(item, key) in items")
        li.list__item(
          v-if="item.isActive",
          :key="key")
        li.list__item(
          v-else
          :key="key")
```
