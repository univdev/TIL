---
title: "Firestore Database 데이터 읽기"
author:
  name: 박 찬영
  link: https://github.com/univdev
date: 2022-02-10 23:06:00 +0900
categories: [Firebase, Firestore]
tags: [Firebase, Firestore, Serverless]
---
# 개요
Firestore는 NOSQL Base의 데이터베이스입니다.  
프론트엔드 및 백엔드 개발자가 직접 구현하기에는 까다롭고 시간도 많이 걸리는 데이터 캐싱, 실시간 조회 등을 아주 간단하게 사용할 수 있는 솔루션입니다.
# 단일 데이터 읽기
```javascript
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "document-id");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
```
> ```doc``` 함수를 통해서 가져올 Document를 선택하고, ```getDoc``` 함수를 통해서 실제 데이터를 불러올 수 있습니다.

# 단일 데이터 실시간으로 읽기
```javascript
import { doc, onSnapshot } from 'firebase/firestore';

const docRef = doc(db, 'collection-name', 'document-id');
const unsubscriber = onSnapshot(docRef, (snapshot) => {
  const item = snapshot.data();
  return item;
});

unsubscriber(); // 구독을 해제할 때 사용
```
> ```doc```으로 바라볼 문서를 선택하고, ```onSnapshot```의 첫번째 인자로 넘겨주면 해당 문서가 변경 될 때마다 두번째 인자로 넘긴 Callback이 실행됩니다.

# 두 개 이상의 데이터 읽기
```javascript
import { collection, getDocs } from 'firebase/firestore';

const col = collection(db, 'collection-name');
const docs = await getDocs(col);
const items = [...docs].map((doc) => doc.data());

return items;
```
> 데이터가 들어있는 Collection을 ```collection``` 함수로 선택하여 ```getDocs```로 추출할 수 있습니다.

# Where로 원하는 데이터만 불러오기
```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

const col = collection(db, 'collection-name');
const q = query(col, where('attribute-name', '>=', value));
const docs = await getDocs(q);
const items = [...docs].map((doc) => doc.data());

return items;
```
> ```query``` 함수와 ```where``` 함수를 통해 불러올 데이터를 선택할 수 있습니다.

> ```orderBy```나 ```limit```도 ```query```를 통해 사용할 수 있습니다.

# 두 개 이상의 데이터를 실시간으로 읽기
```javascript
import { collection, onSnapshot } from 'firebase/firstore';

const col = collection(db, 'collection-name');
const unsubscriber = onSnapshot(col, (snapshot) => {
  const docs = snapshot.docs();
  const items = [...docs].map((doc) => doc.data());
  return items;
});
```

> ```onSnapshot``` 함수를 이용하여 ```Collection```을 실시간으로 확인할 수 있습니다.

> ```onSnapshot```의 첫번째 인자로 ```doc``` ```collection``` ```query``` 등이 들어갈 수 있으며, 첫번째 인자에 따라 바라보는 문서의 유형과 결과값이 달라집니다.