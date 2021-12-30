# React Native Gesture Handler 안드로이드 이슈
출처는 **[여기!](https://stackoverflow.com/questions/70335156/how-to-resolve-react-native-navigation-error-while-installing-version-6)**
## 개요
```react-native-gesture-handler``` 라이브러리는 ```React Navigation```의 ```draw navigation```을 사용하기 위해 반드시 ```import```해야하는 라이브러리이다. 아마도 우측이나 좌측부터 사용자가 손가락으로 끌어서 당기는 애니메이션을 지원하다보니 ```gesture```를 다루기 위해서 사용하는 것 같다.

다만, ```android```에서 해당 라이브러리를 ```import```하고 실행을 하면 아래와 같은 에러가 보이는 경우가 있다.

![Gesture handler 이슈 이미지](https://i.stack.imgur.com/mhWDJ.png)

**Attempt to invoke interface method boolean com.swmansion.reanimated.layoutReanimation.NativeMethodsHolder.isLayoutAnimationEnabled() on a null object reference** 라는 문구가 표시되면서 버그 페이지가 보여진다.
## 픽스 방법
1. ```android/app/build.gradle``` 파일을 연다.
2. ```80```번째 줄 쯤에 이런 코드가 있는데, ```false```를 ```true```로 변경한다.
```groovy
project.ext.react = [
  enableHermes: true  // <- here -- change false for true
]
```
3. ```android/app/src/main/java/com/<projectName>/MainApplication.java``` 파일을 연다.
4. ```import```가 잔뜩 적힌 부분에 아래 두 줄을 추가한다.
```java
import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
```
  #### 예시
  ```java
  package com.forgotthis;

  import android.app.Application;
  import android.content.Context;
  import com.facebook.react.PackageList;
  import com.facebook.react.ReactApplication;
  import com.facebook.react.ReactInstanceManager;
  import com.facebook.react.ReactNativeHost;
  import com.facebook.react.ReactPackage;
  import com.facebook.soloader.SoLoader;
  import java.lang.reflect.InvocationTargetException;
  import java.util.List;
  import com.facebook.react.bridge.JSIModulePackage; // 얘 추가 됨
  import com.swmansion.reanimated.ReanimatedJSIModulePackage; // 얘 추가 됨

  public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
        new ReactNativeHost(this) {
          @Override
          public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
  // ...
  ```
5. 위에 ```import```를 추가했다면 ```38```번째 줄 쯤 위치하게 되는 영역에 아래 코드를 추가한다.
```java
  @Override 
  protected JSIModulePackage getJSIModulePackage() {
    return new ReanimatedJSIModulePackage(); // <- add
  }
```
#### 예시
```java
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
        // 이 밑에 추가
        // 여기부터
        @Override 
        protected JSIModulePackage getJSIModulePackage() {
          return new ReanimatedJSIModulePackage(); // <- add
        }
        // 여기까지
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
```
6. ```yarn start --reset-cache```를 입력하여 캐시를 제거한다.
7. ```yarn android```를 입력하여 실행한다.