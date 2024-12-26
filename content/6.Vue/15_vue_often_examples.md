# 1、vue2 关闭指令

`v-close`

~~~js
  directives: {
    close: {
      inserted(el, binding, vnode) {
        window.addEventListener("click", e => {
          if (!el.contains(e.target)) vnode.context.flag = false;
        });
      }
    }
  }
~~~

# 面试题

watchEffect异步处理问题

```js
watchEffect(async() => {
  userInfo.vulue = await getUserInfo();
    // 由于是异步任务，所以在这个地方是收集不到依赖的，要想办法将这个行代码移动到异步代码的上面
  tabRef.value && (tabRef.value.timer = sleep.value)
})
```

