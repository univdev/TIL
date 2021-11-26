# M1 Mac 초기 설정 방법
## 🚀 개요
모바일 어플리케이션을 제작하기 위한 Reactjs 기반 Framework인 React Native를 M1 Mac 환경에서 실행하기 위한 초기 설정 가이드이다.
## ✏️ 작성자
[CHOI BOO 블로그](https://qnrjs42.blog/react-native/m1-arm64-setting)
## 소요시간
약 **1일**
## 설정 방법
1\. Xcode 설치
============

-   App Store에서 로그인하고 Xcode 설치합니다.

2\. iTerm2 설치
=============

-   <https://iterm2.com/>

2-1. Xcode 설치가 끝나기 전까지 다른 맥 프로그램을 설치하면 됩니다.
===========================================

-   <https://velog.io/@joshuara7235/%EC%8A%AC%EA%B8%B0%EB%A1%9C%EC%9A%B4-M1-MacBook%EC%83%9D%ED%99%9C-%EC%9C%A0%EC%9A%A9%ED%95%9C-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-10>

3\. Homebrew 설치
===============

-   Xcode 설치가 끝나야 Homebrew를 설치할 수 있습니다.
-   <https://brew.sh/index_ko>

```


# homebrew 버전 확인

brew --version

Homebrew 3.2.6

​

# homebrew 경로 확인

which brew

/opt/homebrew/bin/brew

​

# homebrew 정상 작동 확인

# 정상일 때 아무것도 안 뜸

eval  $(/opt/homebrew/bin/brew shellenv)

```


-   여기서 주의할 점은 homebrew 경로가 ```
/opt/homebrew```
로 시작해야합니다.
    -   arm64 architecture: /opt/homebrew
    -   x86 architecture: /usr/local/Homebrew

4\. zsh, oh-my-zsh 설치
=====================

-   iTerm2 테마와 폰트는 아래 링크를 참조합니다.
-   <https://ooeunz.tistory.com/21>

```


# zsh 설치

brew install  zsh

​

# oh-my-zsh 설치

sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

```


```


# .zshrc 파일 있는지 확인

ls -al

​

-rw-r--r-- ........ .zshrc

```


5\. iTerm2 실행할 때마다 homebrew 실행 설정
=================================

-   .zshrc 파일 맨 아래에 추가합니다.

```


# zsh 설정 파일 열기

vim ~/.zshrc

```


```


# brew

export  PATH=/opt/homebrew/bin:$PATH

eval  $(/opt/homebrew/bin/brew shellenv)

```


```


# zsh 설정 파일 실행

source ~/.zshrc

```


6\. nvm 설치
==========

```


brew install nvm

```


7\. iTerm2 실행할 때마다 nvm 실행 설정
============================

-   .zshrc 파일 맨 아래에 추가합니다.

```


vim ~/.zshrc

```


```


# NVM

export  NVM_DIR="$HOME/.nvm"

[ -s "/opt/homebrew/opt/nvm/nvm.sh"  ]  &&  .  "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm

[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  ]  &&  .  "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

```


```


source ~/.zshrc

```


8\. node 설치
===========

-   node 15 버전부터 m1에서 실행된다고 합니다.
-   하지만 node 버전은 16으로 세팅합니다.
-   node lts 버전은 짝수로 진행되기 때문에 16 버전은 10월 달부터 lts가 붙을 예정이라 16버전으로 미리 세팅합니다.
-   <https://nodejs.org/ko/about/releases/>

```


# node 설치

nvm install  16.6.1

​

# 노드 버전 확인

node -v

v16.6.1

​

# npm 버전 확인

npm -v

7.20.3

```


9\. watchman 설치
===============

```


# watchman 설치

brew install watchman

​

# watchman 버전 확인

watchman --version

2021.06.07.00

```


10\. cocoapods 설치
=================

```


# cocoapods 설치

brew install cocoapods

​

# pod 버전 확인

pod --version

1.10.2

```


11\. ffi 설치
===========

```


# ffi 설치

sudo gem install ffi

```


```


vim ~/.zshrc

```


-   맨 아래에 추가합니다.

```


# GEM

export  GEM_HOME=$HOME/.gem

export  PATH=$GEM_HOME/bin:$PATH

```


```


source ~/.zshrc

```


12\. Xcode 시뮬레이터 설정
===================

12-1. Xcode 열기 -> 상태 바 -> Xcode -> Preferences
----------------------------------------------

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/1.png)

12-2. Accounts -> 하단에 '+' 아이콘 클릭
--------------------------------

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/2.png)

12-3. Apple ID 선택 후 Apple ID 계정 입력
----------------------------------

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/3.png)

12-4. 정상 생성 확인
--------------

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/4.png)

12-5. Locations -> Command Line Tools -> 최신 버전 선택
-------------------------------------------------

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/5.png)

12-6. Components -> iOS 시뮬레이터 설치
--------------------------------

-   저는 최신버전을 선택했습니다.\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/6.png)

13\. Android JDK 설치
===================

-   아래 링크를 통해 JDK를 설치합니다.

-   .dmg 파일을 다운 받아서 설치합니다.

-   <https://www.azul.com/downloads/?version=java-8-lts&os=macos&architecture=arm-64-bit&package=jdk#download-openjdk>

-   adoptopenjdk8이 아닌 이유는 아래 링크 참고해주세요.

-   <https://ichi.pro/ko/apple-m1-jangchieseo-android-keompail-sogdo-hyangsang-120657012280249>\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/7.png)

```


vim ~/.zshrc

```


-   .zshrc 파일 맨 아래에 추가합니다.

```


# JDK

export  JAVA_HOME=$(/usr/libexec/java_home -v '1.8*')

export  JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home

```


```


# 설정 파일 실행

source ~/.zshrc

​

# java_home 확인

/usr/libexec/java_home -V

​

Matching Java Virtual Machines (1):

1.8.0_302 (arm64)  "Azul Systems, Inc." - "Zulu 8.56.0.23" /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home

```


14\. Android Studio 설치
======================

-   공홈에 가면 바로 다운로드 누르지 마시고 하단에 다운로드 옵션있습니다 거기서 아래와 같이 진행해주세요.
-   Mac (64-bit, ARM) 설치 파일을 다운로드합니다.
-   2020.3.1.22 버전입니다.
-   <https://developer.android.com/studio#downloads>
-   설치 방법은 그냥 Yes 계속 누르면 됩니다.

14-1. SDK 설치 경로를 복사합니다.
-----------------------

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/8-0.png)

14-2. zsh 설정 파일에 SDK 설정을 추가합니다.
-------------------------------

```


vim ~/.zshrc

```


```


export  ANDROID_HOME=/Users/choiboogeon/Library/Android/sdk

export  PATH=$PATH:$ANDROID_HOME/emulator

export  PATH=$PATH:$ANDROID_HOME/tools

export  PATH=$PATH:$ANDROID_HOME/tools/bin

export  PATH=$PATH:$ANDROID_HOME/platform-tools

```


```


source ~/.zshrc

```


14-3. AVD 설정
------------

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/8.png)

### 14-3-1. 처음에 AVD가 하나 있을텐데 제거해서 비워줍니다.

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/9.png)

### 14-3-2. Play Store 아이콘이 있는 디바이스를 선택합니다. (중요)

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/10.png)

### 14-3-3. 추천 목록에 다음과 같이 뜨는지 확인합니다.

-   Release Name: S
-   API Level: 31
-   ABI: arm64-v8a
-   Target: Android 12 Preview (Google Play)

우측 하단에 Recommendation이 빨간색 폰트로 출력되고 있는데 무시해주세요.\
다운로드가 안 되어 있다면 다운로드를 합니다.\
Google Play가 없다면 Expo Go 설치가 안 됩니다.\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/11.png)

### 14-3-4. 입맛에 맞게 디바이스 설정해줍니다.

-   저는 Device Frame만 체크해제했습니다.

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/12.png)

### 14-3-5. 생성한 디바이스를 실행시킵니다.

-   'Allow USB debugging?' 이라고 뜨면 'Always allow from this computer' 체크하고, 'Allow' 버튼 클릭합니다.
-   여기까지 안드로이드 세팅 완료입니다.\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/13.png)

15\. Expo 설정
============

```


npm i -g expo-cli

```


```


expo init m1-expo-test

​

> blank # 선택

```


```


cd m1-expo-test

​

yarn start

```


-   터미널에서 'a' 키를 눌러 안드로이드를 실행시킵니다.
-   터미널에서 'i' 키를 눌러 iOS를 실행시킵니다.\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/14.png)

### 짜잔 🚀

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/15.png)

16\. React Native CLI 설정
========================

-   0.66.0 버전 테스트 해봤는데 xcode 설정은 패스하셔도 됩니다. 16-2, 16-10, 16-11 보시면 됩니다.

-   RN Xcode 이슈가 있어서 까다롭습니다.

-   현재 RN 버전은 0.64.2 버전입니다.

-   <https://zerogyun.dev/2021/05/06/Xcode-12-5%EC%97%90%EC%84%9C-React-Native-%EB%B9%8C%EB%93%9C%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0/>

-   <https://github.com/aiba/react-native-m1/blob/main/README.md>

-   <https://github.com/pmadruga/react-native-clean-project>

16-1. CLI 설치 전 캐시를 지웁니다.
------------------------

```


pod cache clean --all

yarn cache clean

rm -rf ~/Library/Developer/Xcode/DerivedData/*

```


16-2. 프로젝트를 생성합니다.
------------------

```


# 놀랍게도 폴더명에 하이푼을 못씁니다.

npx react-native init M1CLITest

​

cd M1CLITest

```


16-3. Facebook SDK 관련 패키지를 설치합니다.
---------------------------------

```


yarn i react-native-fbsdk-next

```


16-4. Xcode 파일을 엽니다.
--------------------

```


cd ios

open M1CLITest.xcworkspace

```


16-5. iOS Deployment Target 설정합니다.
----------------------------------

-   좌측에 M1CLITest 선택
-   Info 선택
-   Deployment Target
-   iOS Deployment Target
-   12.1\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/16.png)

16-6. iOS Simulator SDK 설정합니다.
------------------------------

-   좌측에 M1CLITest 선택
-   Build Settings
-   Architectures
-   Excluded Architectures
-   Debug - Any iOS Simulator SDK - arm64 추가
-   Release - Any iOS Simulator SDK - arm64 추가\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/17.png)

16-7. Library Search Path 설정합니다.
--------------------------------

-   좌측에 M1CLITest 선택
-   Build Settings
-   검색 -> 'library search'
-   Library Search Paths 다 지웁니다. (초기화)\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/18.png)

16-8. BridgingFile.switft 파일을 생성합니다.
------------------------------------

-   좌측에 M1CLITest 선택
-   New File
-   Swift File
-   Save As: BridgingFile.swift
-   Create 선택
-   Create Bridging Header 선택
-   좌측에 M1CLITest 보면 BridgingFile.swift 파일과 M1CLITest-Bridging-Header.h 파일이 생성됨.\
![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/19.png)

16-9. 다시 ios 폴더로 돌아와 Pod 설정을 합니다.
---------------------------------

```


vim Podfile

```


```


# 4번째 줄에 아래와 같이 바꿔줍니다.

platform :ios, '12.1'

```


```


# Podfile에서 아래로 내리면 use_flipper!()라고 있는데 아래와 같이 바꿔줍니다.

use_flipper!({  'Flipper'  =>  '0.95.0', 'Flipper-Folly'  =>  '2.6.7', 'Flipper-DoubleConversion'  =>  '3.1.7'  })

post_install do  |installer|

installer.pods_project.build_configurations.each do  |config|

config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"]  =  "arm64"

config.build_settings['IPHONEOS_DEPLOYMENT_TARGET']  =  '12.1'

end

react_native_post_install(installer)

end

​

# 마지막 줄에 end가 하나 있어야 끝맺을 수 있습니다.

end

```


```


rm -rf Pods Podfile.lock

rm -rf ~/Library/Developer/Xcode/DerivedData/*

pod deintegrate && pod setup && pod install

```


16-10. iOS를 실행합니다.
------------------

```

cd  ..

yarn run ios

```

![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/20.png)

16-11. 안드로이드를 실행합니다.
--------------------

```


yarn run android

```


![](https://qnrjs42.blog/images/react-native/m1-arm64-setting/21.png)