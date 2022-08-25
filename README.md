# vue-book-store

## Project Stcuture

- router
	- /books
	- /books/:bookId
- composables
  - useFetch

以兩個 router view 呈現對應頁面  
對於單一書本的操作 (詳情、新增、修改)，由於 UI 介面都極為相似  
因此直接共用一個頁面，以狀態對畫面作調整  
另將與 API 溝通的共用 funcion 設計為 composable useFetch  
統一做 notification, error handling

## 3rd Party Library

使用了套件 vue-toast-notification  
在與 API 溝通後需要給予使用者提示，才是良好的使用者體驗  
由於 Notification 涉及 DOM 元素產生、設定秒數後銷毀  
以及定位、色彩等 CSS  
若自行手刻包裝，需要耗費過多時間，因此直接引入套件完成功能  

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
