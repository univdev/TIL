# [Jekyll] Liquid Exception: Liquid syntax error
## 사건
바로 이전 포스팅인 [React Native Calendars 오픈소스를 파헤쳐보자][오픈소스를 파헤쳐보자]를 작성하던 도중 있었던 일입니다.  
![Liquid Syntax Error][Liquid Syntax Error]

자꾸 프로젝트를 실행하면 계속 이런 에러문이 노출되면서 블로그를 로컬에서 실행할 수가 없게 되었습니다.  
Github pages에 배포를 하면 CI/CD와 Deploy가 무사히 진행이 되는게 보이는데도, 해당 포스팅이 노출되지 않는 이슈가 있었습니다.  
머릿말이 문제인가 싶어서 ```Front matter```를 바꿔보기도 하고, 제목을 바꿔보기도하고, 포스트가 저장 된 폴더 경로를 바꿔보기도 하는 등 여러가지 노력을 했으나 게시물이 노출되지 않는 이슈가 이어졌습니다.
## 해결
Google에 검색하여 [이 이슈에 대한 해결법을 기재한 게시글][해결]을 보게 되었습니다.  
### 원인
Jekyll은 Liquid Template Language를 이용하여 문서를 읽어냅니다.  
그런데 이 Liquid의 문법에는 변수를 출력할 때 사용되는 {% raw %}```{{ }}```{% endraw %}가 있습니다.  
문서 어딘가에 이와 같은 연산자를 사용하는 부분이 있기 때문에 Liquid의 Syntax와 충돌이 일어난게 원인이였던겁니다.
### 방법
![원인][원인]  
이 부분에서 ```{{```를 사용한 것이 원인이 되었기에 **"Liquid 문법을 쓰려고 한게 아니예요"**라고 Liquid에게 말해줘야 합니다.  
원인의 시작 부분에 ```{% raw %}```를 적고, 종료되는 지점에 ```{% endraw %}```를 적으면 해결할 수 있습니다.  
```markdown
다행히도 해당 부분은 공식 API에서 지원을 하는 기능으로 보이기에 가능하다고 판단했습니다.  
![달력 범위 선택][Calendar Range]
```tsx
<Calendar
  markingType={'period'}
  markedDates={% raw %}{{
    '2012-05-15': {marked: true, dotColor: '#50cebb'},
    '2012-05-16': {marked: true, dotColor: '#50cebb'},
    '2012-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
    '2012-05-22': {color: '#70d7c7', textColor: 'white'},
    '2012-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
    '2012-05-24': {color: '#70d7c7', textColor: 'white'},
    '2012-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
  }}{% endraw %}
/>
```
```


[오픈소스를 파헤쳐보자]: https://univdev.github.io/posts/React_Native_Calendars/
[Liquid Syntax Error]: /assets/posts/liquid_syntax_error.png
[해결]: https://iamheesoo.github.io/blog/gitblog-sol-jekyll02
[원인]: /assets/posts/liquid_error_원인.png