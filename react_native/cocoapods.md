# Cocoapods
## 개요
**React Native** 개발을 시작하려 하면 제일 먼저 해야하는 일이 **Cocoapods**의 설치이다.  
심지어 **React Native** 앱을 실행하려고 하면 ```[your project]/ios``` 폴더에 들어가서 ```pod install``` 커맨드를 입력 해야만 정상적으로 실행이 가능하다.  
그렇다면 이게 굉장히 중요하단 것을 알 수 있는데, **Cocoapods**이란 과연 무엇일까?
## 의존성 패키지 매니저
**Cocoapods**은 **의존성 패키지 매니저**이다. Nodejs 환경에서 개발하는 개발자들은 **npm**이라는 패키지 매니저를 활용하는 것 처럼, iOS 앱 개발자들은 **Cocoapods**이라는 패키지 매니저를 사용한다고 보면 된다.
## 설치
아래 명령어를 통해 CLI를 컴퓨터에 설치한다.
```
sudo gem install cocoapods
```
**Cocoapods**은 **Ruby**언어를 기반으로 작성 되었는데, **Ruby**는 macOS 기반 컴퓨터에 처음부터 설치가 되어있기 때문에 macOS를 활용하는 개발자라면 **Ruby**를 설치하지 않아도 된다.
## 프로젝트 초기화
만약 특정 프로젝트 폴더에서 Cocoapods의 패키지를 활용하고 싶다면 아래 명령어를 입력하여 초기화를 진행한다. (반드시 해당 프로젝트 폴더에 **.xcodeproj 파일**이 존재해야 한다.)
```
pod init
```
위 명령어를 실행하면 프로젝트 폴더에 ```Podfile``` 파일이 생성되는 것을 볼 수 있다.

```Podfile```을 읽으면 아래와 같은 내용을 볼 수 있다.
```ruby
platform :ios, '11.0'

target 'project' do
end
```
## 의존성 패키지 설치
```target 'project' do``` 아래에 의존성 패키지들을 설치하는 구문을 작성하면 추후에 ```pod install``` 명령어 하나로 모든 패키지를 내려받을 수 있다.  
예를 들자면 이렇게.
```ruby
platform :ios, '11.0'

target 'project' do
  pod 'RealmSwift' # <-------- 얘 처럼
end
```
### 특정 버전 패키지 설치
만약 특정 버전의 패키지로 다운받고 싶다면
```ruby
platform :ios, '11.0'

target 'project' do
  pod 'RealmSwift', '~> 2.6' # <-------- 얘 처럼
end
```
```pod 'package'``` 뒤에 콤마를 적고 버전을 따로 표시하면 된다.  
- ```~> version```는 연산자 뒤에 기재한 버전보다 더 큰 버전으로 설치 (i.e 최신 버전)
- ```version```는 해당 버전으로 고정 설치
### 패키지 제거
```Podfile```에 작성한 ```pod 'package'``` 구문을 제거하고 ```pod install```을 실행하면 해당 패키지가 제거 된다.
## React Native에서의 Cocoapod
만약 ```Swift```같은 언어로 **Native Application**을 제작하는 것이 아니라면 **PodFile**은 그다지 신경 쓸 이유가 없다.  
**React Native** 라이브러리가 ```0.60``` 버전부터 ```Autolink``` 기능을 지원하면서 부터 ```node_modules```에 설치 된 라이브러리 중 **Cocoapods**에 의존적인 패키지들을 알아서 판별하여 ```Podfile```에 자동으로 추가해주기 때문에 개발자는 ```Podfile```의 직접적인 작성 없이 ```pod install``` 명령어 한 줄로 의존성 패키지 **Sync**가 가능해졌다.

참고로, React Native ```< 0.60```을 사용하는 개발자는 ```react-native link``` 명령어를 사용했다고 한다.