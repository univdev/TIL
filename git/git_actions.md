# Git Actions
![Git Actions](https://image.toast.com/aaaadh/real/2021/techblog/1%2818%29.png)
## ☀️ 개요
Git Actions는 Github가 제공하는 자동화 도구이다. ```Push```, ```Pull Request``` 등 Git에서 발생할 수 있는 모든 이벤트에 대해 훅을 설정할 수 있으며, response에 따라 이후 해당 이벤트를 실행할지 반려할지를 선택할 수 있다.
## ✏️ 활용 예제
주로 Git Actions는 [CI/CD](https://artist-developer.tistory.com/24)에 사용 된다.

```development``` 브랜치에서 실질적인 작업을 진행하고, ```master``` 브랜치에서 배포를 진행하는 일반적인 프로젝트의 경우를 생각해보자.

일반적인 경우라면 ```development``` 브랜치에서 작업을 모두 수행하고, ```master``` 브랜치에 병합하여 배포를 수동으로 진행할 것이다.
하지만 자동화 작업을 진행한 프로젝트라면 ```master``` 브랜치에 변경 이력이 발생하면 자동으로 배포를 진행하도록 만들 수 있다.
심지어 ```Unit Test```를 진행하여 테스트에서 ```Failed```가 발생하면 ```master```브랜치로 진행되는 ```push```, ```Pull``` 등의 이벤트를 막을수도 있다.
## ⭐️ 사용 방법
```Workflow```, ```Event```, ```Job```, ```Step```, ```Action```, ```Runner```라는 개념이 존재함.
### Workflow
Workflow는 여러개의 Job을 가질 수 있으며, 이벤트에 의해 실행될 수 있는 프로세스이다. ```.yml``` 확장자를 갖는 파일이며, ```.github/workflows``` 폴더 안에 존재한다.
### Event
Workflow를 실행하는 방아쇠(Trigger)의 역할을 한다. ```Push```, ```Pull``` 등 Git에서 발생할 수 있는 모든 이벤트에 해당한다. 심지어 아무 이벤트가 없더라도 특정 시간대에 실행하는 ```Cron```도 지원한다.

```Webhook```을 사용한다.
### Job
Job은 실행될 ```Step```의 집합이다. 서로 다른 ```Job```끼리 의존적 관계를 형성할 수도 있다.
### Step
Step은 ```Task```의 집합이다. 커맨드를 실행하거나 ```Action을``` 실행할 수 있다.
### Action
```Action```은 ```Workflow```가 갖는 가장 작은 블럭이다. ```Job```을 만들기 위해서 ```Step```을 연결할 수 있다.
### Runner
```Github Action Runner``` 어플리케이션이 설치 된 머신을 말한다.
## 🚀 예제
```yml
  name: CI
	
  on:
    push:
      branches: [ master ]
    pull_request:
      branches: [ master ]
	
  jobs:
    build:
      runs-on: ubuntu-latest
	
      steps:
      - uses: actions/checkout@v2
	
      - name: Run a one-line script
        run: echo Hello, world!
	
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```
### Name
- ```Workflow```의 이름이다. 보통 해당 ```Workflow```의 파일의 이름과 ```Name```은 일치시키는 편이다.
### On
- Event와 해당 Event를 감지할 브랜치를 설정하는 부분이다.
- ```Push```, ```Pull Request``` 혹은 ```Schedule```을 설정할 수 있다.
- 단일 이벤트 및 배열 이벤트를 지원한다.
```yml
on: pull_request
# or
on: [pull_request, push]
```
### Job
실행할 ```Step```을 정의할 수 있다.
```yml
  jobs:
        build:
          runs-on: ubuntu-latest
		
          steps:
          - uses: actions/checkout@v2
          - name: Run a one-line script
            run: echo Hello, world!

          - name: Run a multi-line script
            run: |
              echo Add other actions to build,
              echo test, and deploy your project.
```
위 예제는 build라는 이름의 ```job``` 안에 ```Run a one-line script```와 ```Run a multi-line script```라는 ```Step```이 존재한다.

```runs-on```은 아래 ```Step```을 실행할 운영체제를 기재하는 부분이다.

```run```은 해당 ```Step```내부에서 실행할 명령어들을 기재하는 부분이다.
## 🔒 Secret key
Git Action을 실행하는 과정에서 외부 서비스에 접근할 필요가 있을 수 있다. 외부 서비스에 접근할 때 필요한 ```Secret key```를 파일에 그대로 적어두자니 매우 불안하다. 그렇기 때문에 이를 보관할 수 있는 저장소도 지원한다.
### Github Repository
- ```Secret key```를 저장할 ```Repository```를 선택한다.
- ```Settings -> Secrets -> New secret```순서대로 접근한다.
- ```Name```과 ```Value```를 입력한다. (```Repository access```에서 ```access policy``` 설정도 가능하다.)
- ```workflow```에서 사용할 때는 $ 연산자를 통해 꺼내올 수 있다.
## 🔗 Job 의존성
위에서도 말했듯이, Job은 서로 의존성을 가질 수 있다.
```yml
  jobs:
    job1:
    job2:
      needs: job1
    job3:
      needs: [job1, job2]
```
```needs```를 통해 배열 혹은 문자열로 의존성이 있는 ```job```을 기재하면 해당 ```job```이 완전히 수행 된 이후에 실행되게 된다.