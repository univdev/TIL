# Quill Editor
Quill Editor는 웹 개발 환경에서 가장 사랑받는 에디터 라이브러리이다.
HTML과 CSS를 모르는 사람들도 쉽게 예쁘게 꾸며진 게시글을 사용할 수 있는 UI를 제공한다.
## 👍 장점
- 일반 사용자들도 예쁜 문서를 작성할 수 있다.
- 커스터마이징이 간편하다.
- 개발자가 필요에 따라 툴을 개발 및 편집할 수 있다.
- 적용이 간단하다.
## 💾 사용 방법
### Vue.js 프로젝트에 Import 하는 방법
```javascript
import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';

import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */);
```
### 싱글 파일 컴포넌트에서 사용하는 방법
```vue
<template>
  <!-- Two-way Data-Binding -->
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  />

  <!-- Or manually control the data synchronization -->
  <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  />
</template>

<script>
  // You can also register Quill modules in the component
  import Quill from 'quill'
  import someModule from '../yourModulePath/someQuillModule.js'
  Quill.register('modules/someModule', someModule)
  
  export default {
    data () {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // Some Quill options...
        }
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>
```
### Quill 에디터에 모듈을 등록하는 방법
```javascript
import Quill from 'quill'
import yourQuillModule from '../yourModulePath/yourQuillModule.js'
Quill.register('modules/yourQuillModule', yourQuillModule)

// Vue app...
```