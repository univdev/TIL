---
title: "Firestore Database"
---
# 개요
Firebase의 Firestore Database는 NoSQL 기반의 Database입니다.  
아마존과 같은 Serverless 플랫폼에서 지원하는 일반적인 Database이며, 사용법이 간단하여 많은 주니어 개발자 혹은 서버 개발에 익숙하지 않은 사람들이 많이들 사용하는 서비스입니다.  
# 초기 화면
![Database][Database]  
위 화면이 Firestore Database의 초기 화면입니다.  
Firebase Project를 개설하고나면 이렇게 모든 컬렉션이 비어있음을 확인할 수 있습니다.
# Data 구조
![Example][Example]  
## Collection
컬렉션이란 관계형 데이터베이스(e.g MySQL)의 Table과 같다고 보면 됩니다.  
다시 말해, 동일한 형태의 데이터들이 모이는 집합입니다.
## Document
문서란 관계형 데이터베이스의 Tuple과 같다고 볼 수 있습니다.  
다시 말해, 컬렉션 안에 들어가는 수많은 데이터 중 하나입니다.
## Field
필드란 관계형 데이터베이스의 Attribute와 같다고 볼 수 있습니다.  
문서 내부에 있는 수많은 데이터 유형 중 하나를 의미합니다.

[Database]: ./database.png
[Example]: ./example.png