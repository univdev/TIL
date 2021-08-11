# JEST + Husky 선 테스트 후 커밋
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