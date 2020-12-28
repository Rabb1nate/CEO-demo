const changeNav = (i,key) => {
    sessionStorage.setItem("count"+i,key)
  }
  export default changeNav
  //在浏览器刷新时，当前的导航栏会丢失目前所提示的导航项(高亮部分),
  //自己想了个方法，用本地存储。这样刷新时就不会导致丢失