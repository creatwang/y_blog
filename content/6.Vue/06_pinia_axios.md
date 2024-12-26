# Pinia 介绍

> `Pinia`（发音为`/piːnjʌ/`，如英语中的“`peenya`”）是最接近`piña`（西班牙语中的菠萝）的词；

- Pinia开始于大概**2019年**，最初是作为一个实验为Vue重新设计状态管理，让它**用起来像组合式API（Composition API）**

  > 个人理解：用于vue3 composition Api 中的状态管理。

- 直到到现在，最初的**设计原则依然是相同**的，并且目前同时**兼容Vue2、Vue3**，也并**不要求**必须使用`Composition API`；

- `Pinia`**本质上依然是一个状态管理的库**，用于跨组件、页面进行状态共享（这点和`Vuex`、`Redux`一样）



## Pinia 和 vuex 的区别(重点)

> Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法；
> 最终，团队意识到Pinia已经实现了Vuex5中大部分内容，所以最终决定用Pinia来替代Vuex

1. ##### Pinia 不在需要 mutations

   >  mutation 最主要的作用是在 单一状态树的实现上，用来 `devtools` 跟踪数据的变化。

   - 只是为了实现跟踪，**使用 mutations 添加很多的冗余代码**，就显得很没有必要，那么实现了跟踪的话也就没有必要使用mutations

   - 通过对象语法获取修改，在很大程度上降低了，使用难度和复杂度

     

2. ##### 更**友好的TypeScript支持**，Vuex之前对TS的支持很不友好，pinia完全是由ts编写的

3. 更加轻量化，1.6kb

4. ##### 通过**定义 "多store" 的方式**，**摆脱了 vuex  `module` 嵌套结构的复杂调用**

   > 可以灵活使用每一个store，它们是**通过扁平化的方式 “多store” 来相互使用的**。

   - 同样**不也需要有命名空间的概念**，也不需要记住它们的复杂关系，降低了使用的复杂度。

   

5. **getters 的区别**，在返回值不是函数的调用方式多个**标签重复调用的话只会调用一次getter**，同计算属性依赖的**数据发生改变的时候重新计算**

   - 如果**返回值的是函数还是会重复调用**，来获取新的值
   - vuex 的getter 无论是返回函数，还是封装属性的方式，都会重复调用

6. Pinia dispatch 不会默认返回promise





# Pinia 的使用步骤



## 安装

- `npm install pinia`
- `yarn add pinia`



## 创建pinia

> **创建**一个 pinia 的实例对象，之后**注册**到app当中就可以了

- 注册完pinia 之后就使用完成了，不在需要这个文件了

~~~js
import {createPinia} from "pinia"
export const pinia = createPinia()


/****************main.js****在主文件中注册******/
import { createApp } from 'vue'
import App from './App.vue'
import {pinia} from "./stores"
const app = createApp(App)
  app.use(pinia)
  app.mount('#app')

~~~



## 定义 store 及规范（重点）



- #### 通过 `defineStore` 方法**可以定义多个 store函数**

  > Store在它被使用之前是不会创建的，通过调用use函数来使用Store



- #### **`store`函数定义规范：** **统一使用useX作为命名方案**，这是约定的规范

  > `defineStore` 会返回一个函数，函数会根据传入的 `options` 创建 `store` 对象，因此在使用 `store` 的时候需要调用这个函数。这样**统一 store 函数的命名方式**就很有必要了



- #### **`store`文件规范：**统一文件名具有**特定的标识**

  > paina 使用扁平化，多存储的方式进行管理状态，对于区分不同的存储，以及提高封装度多文件对应 store，最好统一下命名规范



- #### **参数**

  - **参数一[必填]**：**重点 Sting 类型的 id**，`devTools` 通过**每个 store 的 "唯一id" 进行跟踪**，不可以重复。
  - **参数二**：`Object` 类型 **store 的核心配置对象**

  ~~~js
      import { defineStore } from "pinia";
      //命名规范：store命名前添加 use
      export const useHome = defineStore("home", {
        state() {
          return {
            name: "zhangsan"
          }
        }
      })
  ~~~

  

## pinia使用

> 定义好 store 函数就可以**进行导入调用hook**，**获取返回的 store 对象**进行使用。

~~~js
import {useHome} from "@/stores/homeStore";
const store = useHome()
~~~





# Pinia 的核心

> Pinia 的**核心只有 `Getters`、 `state` 、`Actions`。**

## 一、state

> 声明的方式同 vuex 一致，定义 state 函数，返回初始化对象。

- 和 `vuex` 不同的是不需要在使用 `mutations` 来修改 `state`，devTools 会根据 store 的id 进行跟踪

  > 直接修改 state ，devTools 也会进行监听的

  

- **注意事项**：同样 **解构** 或者 **赋值**的情况下都**不会是响应式**。

  > 还是要**结合 `ref` 和 或者 `toRefs` 使用**
  
  
  
- **提示: `storeToRefs` 和toRefs效果相似**。

  > 创建一个引用对象，其中包含存储的所有状态、**`getter` 和插件添加的状态属性(toRefs也会)**。 类似于toRefs()，但**专门为 Pinia 设计**，所以 **方法 **和 **非 `reative` 对象**属性完全被忽略，**toRefs 不会忽略非 `reactive`属性。** 

  

- **直接用 `reactive` 、`ref` 和 `toRefs`。**

  - 最实用的方式 toRefs

  ~~~js
  const store = useHome()
  let {addr} = toRefs(store.info)
  function trigger() {
   addr.value = "广州"
  }
  ~~~

  



### 常见方法

> 输入和写入直接同对象修改添加即可



##### $patch 批量修改

> 批量修改多个文件，

~~~js
  store.$patch({
    info: {
      addr: "广州"
    },
    list: "lisit"
  })
~~~





##### $reset() 重置

> 通过调用 store 上的 $reset() 方法将状态 重置 到其初始值。



##### $state 覆盖替换

> 使用 将 store.$state 赋予新的对象，会**将新对象当中的 "属性" 替换掉 state当中对应的"属性" **,是属性替换不是state 替换，**所以其他没有替换的属性还会存在。**

- 造成的现象就是，根据 **原state** `toRefs` 解构的响应式数据同样也<u>无法和被替换的属性建立联系了</u>，**因此不在是响应式的了。**

- 剩下的就与 patch 功能相似了

  ~~~js
    store.$state= {
      info: {
        addr: "广州"
      },
      list: "lisit"
    }
  ~~~

  



##### mapState

> pinia 也为 options Api 提供了辅助函数







## 二、Getters

> Getters **相当于Store的计算属性**，在调用多次触发一次，但**只是针对封装成对象的属性**，在**修改依赖的值时并不会重复的调用**，返回值如果是函数的话，在标签复用getters，还是会重复调用的



### 定义 Getters

- **支持返回函数的写法**：不重复调用计算属性也**仅限于非返回函数的方式**，**返回函数的话重复调用还是会执行多次**，进行更新数据

  > 当依赖的数据发生改变的时候，一会重新计算。

- 在getters中可以，**通过this访问整个store实例的所有操作**

  > 就是 this 就相当于 store

- 参数：`state`

- 定义：同 `vuex` 一样，配置`getters` 选项

  > **提示：**如果需要其他的 `store` **直接导入即可**
  
  ~~~js
    getters: {
      getTatol(state) {
        // 如果需要其他的 store 直接导入即可
        // const userStore = useUser()
        console.log("开始调用");
        return state.products.reduce((preVal, currentVal) => {
          return preVal + currentVal.score
        }, 0)
      }
    }
  ~~~



### 调用 Getters

- `pinia` 中 `getters` 的调用方式，同 `state` 一样，**会将getter的返回值封装到 `state` 对象中**，**直接   `.getter名`   调用**。

  > 因此**返回值如果是函数**的话，就要**用小括号来调用**了

  ~~~html
    <div>{{store.getTatol}}</div>
  ~~~

  

- ##### 注意事项

  - pinia 将getters 封装到 state 对象当中，因此会**造成getters 和 state 中属性的命名冲突**

    > 尽量避免冲突，否则会报警告，同时后面的值的会进行替换

  - **pinia 同vuex一样 不能直接  `.getters名` 进行修改**，报错

  - **重点**：返回值非函数的话，会根据依赖改变而重新计算getters，同计算属性一样





## 三、Actions

> Actions **相当于组件中的 methods。**

- 也是和getters 的"区别"，`actions` 只**能通过函数的方式进行调用**
- 和vuex actions 的"区别"，**不会默认返回 promise的实例**。
- Actions中是**支持异步操作的**



### 定义 Actions

> 同 getters ，**注意命名冲突。**

- 和getters一样，在action中可以**通过this访问整个store实例的所有操作**

- **不需要 ctx** 上下文

- **通过this 直接添加到state**

  > **提示**：同样需要其他的 store 直接导入即可

~~~js
  actions: {
      
	//返回promise
    getInfos() {
      // console.log(this);
      return fetch("http://123.207.32.32:8000/home/multidata").then(data => data.json())
    },
	//异步函数的方式
    async getInfos2() {
      // console.log(this);
      const data = await fetch("http://123.207.32.32:8000/home/multidata").then(data =>         data.json())
      const json = data
      this.banners = json.data.banner
      return json.data.banner
    },
    //接收参数
    getInfo3(payload) {
      return this.banners
    }
      
  }
~~~



### 调用 Actions

> 通过调用对象中方法的方式 **使用 `.方法名` 调用**，像 methods

~~~js
//传入参数，actions 可以直接接收到
store.getInfo3({name: "wangwu"})
~~~



# axios封装

> 注意:  在不封装的时候依然可以正常的使用，可以使用是为了，有一天这个框架不维护了，或者退出市场。可以更好和其他的依赖适配

- ts版

~~~js

//index.ts
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest

//type.ts
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
~~~



### 拦截器的作用

1. 可以实现对网络请求以及响应的拦截器，
2. 通常用于对数据的整理封装
3. 对于网络请求配置进行统一配置修改，提取在发送网络请求过程中的重复操作



### axios 使用要点



1. `post`、`put`、`pathc` 方法第二个参数可以直接跟`data`
2. `params`:  `Object` 类型相当于 `queryString` 对应 `get`
3. `data` ：`Object` 类型，是请求体 对应 `post`

