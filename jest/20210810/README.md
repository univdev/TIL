# 20210810
## 요약
JEST 단위 테스트를 활용하기 위한 Husky 라이브러리를 사용하여 자동 배포하기
## How
1. JEST Installation
```
npx husky-init && npm install
// or
npx husky-init && yarn
```
2. Create husky hook
```
npx husky add .husky/pre-commit "npm test"
```
3. Let's do commit
```
git add *
git commit -m "Test commit"
```