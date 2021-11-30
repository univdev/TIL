# v-viewer
![v-viewer](https://miro.medium.com/max/2000/1*DkmebzbEg20BZMZWGsARaw.png)
## ☀️ 개요
이미지를 자세하게 볼 수 있는 기능을 지원하는 라이브러리이다.
## 👍 장점
- 이미지를 확대해서 볼 수 있다.
- 이미지 리스트 기능을 지원하여, 이미지 탐색을 보다 쉽게 만들어준다.
- 확대 / 축소, 이미지 변경 등 편리한 기능들을 다수 지원한다.
- 다양한 기능들을 키보드 단축키로 사용할 수 있다.
## 💾 설치 방법
```
npm i -S v-viewer
// or
yarn add v-viewer
```
## 🚀 사용 방법
### Import
```javascript
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import Vue from vue;

Vue.use(VueViewer);
```
### API
```javascript
export default {
  data() {
    return {
      items: [
        'https://picsum.photos/200/200',
        'https://picsum.photos/300/200',
        'https://picsum.photos/250/200',
      ],
    };
  },
  methods: {
    showLightbox() {
      this.$viewerApi({
        images: this.items,
      });
    },
  },
};
```
