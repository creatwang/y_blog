# 第一节、数据可视化

> 为了清晰有效地传递信息，数据可视化使用统计图形、图表、信息图表和其他工具

- 可以使用点、线或条，对数字数据进行编码；

- 数据可视化让我们可以更加清晰的去认识、理解、表达数据；



## 1、前端可视化的工具

> 常见的框架： ECharts 、g2、d3、vis、hightChart等等；

- g2框架封装：bizcharts(react) viser(vue)；
- 地理可视化： g2、L7、高德的 Loca、 菜鸟的 鸟图；
- 3D可视化：three.js；
- 目前使用最多的还是ECharts



# 第二节、ECharts介绍

> 官方的解释是：一个基于 JavaScript 的开源可视化图表库；



## ECharts的历史：

- ECharts由百度团队开源；
- 2018年初，捐赠给Apache基金会，成为ASF（Apache Software Foundation，简称为ASF，Apache软件基金会）孵化级项目；
- 2021年1月26日晚，Apache基金会官方宣布 ECharts项目正式毕业，成为Apache顶级项目；
- 2021年1月28日，ECharts 5线上发布会举行；



## ECharts的特点：

- 丰富的图表类型：提供开箱即用的 20 多种图表和十几种组件，并且支持各种图表以及组件的任意组合；
- 强劲的渲染引擎：**Canvas、SVG 双引擎一键切换，增量渲染、流加载等技术实现千万级数据的流畅交互；**
- 专业的数据分析：通过数据集管理数据，支持数据过滤、聚类、回归，帮助实现同一份数据的多维度分析；
- 优雅的可视化设计：默认设计遵从可视化原则，支持响应式设计，并且提供了灵活的配置项方便开发者定制；
- 健康的开源社区：活跃的社区用户保证了项目的健康发展，也贡献了丰富的第三方插件满足不同场景的需求；
- 友好的无障碍访问：智能生成的图表描述和贴花图案，帮助视力障碍人士了解图表内容，读懂图表背后的故事；



## echart 社区地址

> 会有很多echart 的例子

[made a pie](https://madeapie.com/#/);

## canvas vs svg



- 通常情况下，这两种渲染模式是比较相近的，并且是可以相互替换的

-  `ECharts`**最初**采用的**是`canvas`绘制图表**，从`ECharts4.x`开始，**发布了`SVG`渲染器**，提供了另外的一种选择。
- 一般来说，`Canvas` 更适合**绘制图形元素数量非常大（这一般是由数据量大导致）的图表**（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等），也利于实现某些视觉特效；
- 但是，在不少场景中，`SVG` 具有重要的优势：它的**内存占用更低**（这对移动端尤其重要）、**渲染性能略高**、并且用户使用浏览器内置的**缩放功能时不会模糊**



- **总结**：只有**pc端柱形图超过1000数据时** 使用 `canvas` 的性能会高一点，剩下大多数情况或者其他类图的情况下，都是svg 性能更高一点



# 第三节、Echart 使用



## 一、基本使用

1. 下载 `echart`

   ~~~shell
   npm install echarts
   ~~~

2. 初始化实例

   > init方法参数：el，主题theme通常是 “light”，配置选项 {renderer: "svg"} 可以设置渲染模式

   ~~~js
   //根据上述，通常数据量小时候用 svg模式，echart 默认使用的 cancer
   var myChart = echarts.init(containerDom, null, { renderer: 'svg' });
   
   //5.3.0 的版本推荐使用，服务端渲染，svg模式
   const chart = echarts.init(null, null, {
     renderer: 'svg', // 必须使用 SVG 模式
     ssr: true, // 开启 SSR
     width: 400, // 需要指明高和宽
     height: 300
   });
   // 像正常使用一样 setOption
   chart.setOption({
     //...
   });
   
   // 输出字符串
   const svgStr = chart.renderToSVGString();
   ~~~

3. 配置 `echart` 选项生成图标

   > 需要图标刷新的话，重新调用一下该api即可

   ~~~js
   myChart.setOption({...})
   ~~~

4. option配置选项

   ~~~js
   // 指定图表的配置项和数据
         var option = {
           title: {
             text: 'ECharts 入门示例'
           },
           //工具栏触碰时的提示
           tooltip: {},
           //图例
           legend: {
             data: ['销量']
           },
           xAxis: {
             inverse:true   //此属性控制方向,默认为false,改为true就达到你要的要求了
             data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
           },
           yAxis: {},
           //系列 ：表示要展示什么类型的系列数据，通常表示图标要 展示的数据
           series: [
             {
               name: '销量',
               type: 'bar',
               data: [5, 20, 36, 10, 10, 20]
             }
           ]
         };
   ~~~

   



## 二、echarts 使用封装

### 1、hooks封装

~~~js
import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)
//传入组件
export default function (el: HTMLElement) {
  
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  
 //手动更新echarts 大小
  const updateSize = () => {
    echartInstance.resize()
  }
 //当浏览器大小发生变化的时候，自动更新图形大小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}

~~~



### 2、echarts 组件封装

~~~typescript
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
})
~~~



### 3、世界地图

1. 在echar5 不在提供地图的geojson数据了，需要自己找

   > geoJson 就是包含地区名称，编码形式，地图所需要的数据，用来注册地图的
- <a href="../../assets/json/world_map/world.zh.json">world.zh.json</a> :设置 `visualMap.inRange` 没有渐变效果

- <a href="../../assets/json/world_map/world.en.js">world.en.js</a>: 比 `world.zh.json`多个了 `encodeOffsets` 和 `crs` 字段, 设置 `visualMap.inRange` 地图有渐变效果。

  > `world.en.js` 来源：https://api.map.baidu.com/api?v=2.0&ak=Y5S7nNrWYd45G4uVIUaTZ00nrldHfIXb

- <a href="../../assets/json/world_map/nameMap.json">nameMap.json</a>

- <a href="../../assets/json/world_map/country.json">country.json</a>

~~~typescript
<template>
<div ref="map" class="container"></div>
</template>

<script>
import * as echarts from "echarts";
import { throttle } from "lodash";
import worldJSON from "../../server/word.json"
import nameMap from "../../server/nameMap.json";
import dataMapArr from "../../server/dataMapArr.json";
export default {
  name: "index",
  props: {
    indexArr: {
      type: Array,
      default: () => [
        // 维度X   维度Y   其他维度 ...
        {
          name: '上海',
          value: [121.47,31.23, 46]
        },
        {
          name: '巴西',
          value: [-47.55, -15.47, 45]
        },              {
          name: '北京',
          value: [100, 37, 85]
        },
        {
          name: '重庆',
          value: [106.55,29.56,65]    // value的前两项是经纬度坐标，第三项为污染度数据
        }
      ],
    }
  },
  mounted() {
    let instance = echarts.init(this.$refs.map)
    //echart5不在支持geojson数据了，需要自己导入下载
    echarts.registerMap('world', {geoJSON: worldJson});
    const option = {
      // 图表主标题
      title: {
        //text: '世界地图', // 主标题文本，支持使用 \n 换行
        //top: 20, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
        left: 'center', // 值: 'left', 'center', 'right' 同上
        textStyle: { // 文本样式
          fontSize: 18,
          fontWeight: 600,
          color: 'black'
        }
      },
      tooltip: {
        trigger: 'item',
        //格式化需要提示的数据
        formatter: throttle(function (params, temp) {
          if (params.name && Array.isArray(params.value)) {
            return params.name + ' : ' + params.value[2];
          } else if (params.name && !Array.isArray(params.value)) {
            return params.name
          }
          return "暂时没有信息"
        }, 200)
      },
      //地理观测，用来观测设置，地图上某一块要设置什么信息例如：背景色，
      geo: {
        //引用geojson数据
        map: 'world',
        silent: true,
        itemStyle: {
          color: '#004981',
          borderColor: '#004981'
        }
      },
        //想当于控制器
       visualMap: {
        show: false,
        min: 0,
        max: 100,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
            //让地图渐变，但是好像要有encodeOffsets 字段，编码偏离量才行，world.en.js可以展示，但是world.zh.json就不行
          color: ['#e6f2fe', '#cce5fe', '#99cbfd', '#66b2fd', '#3398fc', '#007ffc', '#0065c9', '#004c97', '#003264', '#001932']
        }
      },
      series: [
        {
          name: 'World Population (2010)',
          //表示是地图类型的echart
          type: 'map',
          //地图的类型，注册地图时的名字
          mapType: 'world',
          //禁止缩放和拖动
          roam: false,
          itemStyle: {
            areaColor: '#2a82e4', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
            borderWidth: 0.5, // 描边线宽 为 0 时无描边
            borderColor: '#2a82e4', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
            borderType: 'none', // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
            emphasis: {label: {show: true}}
          },
          label: {
            show: false // 是否显示对应地名
          },
            //数组类型：根据namemap所对应的name配置需要展示的数据
            //"dataArr": [ { "name": "阿富汗", "value": 28397.812 }, {"name": "安哥拉", "value": 19549.124 }] 
          data: dataMapArr.dataArr,
            //对象类型：每个地区展示的名字 例： "namemap": { "Afghanistan": "阿富汗", "Angola": "安哥拉",
    		//"Albania": "阿尔巴尼亚"},
          nameMap: nameMap,
        },
        {
          //显示散点图的类型 
          type: 'effectScatter',
          coordinateSystem: 'geo',
          itemStyle: { // 坐标点颜色
            normal: {
              show: true,
              color: '#d41a2e',
              shadowBlur: 10,
              shadowColor: '#fff'
            }
          },
          //设置散列图大小，dataItem 是 this.indexArr 集合里的元素
          symbolSize: dataItem => dataItem[2] * 0.2,
          //需要展示散点图的位置，提供经纬度
          data: this.indexArr
        },
      ]
    };
    instance.setOption(option);
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 400px;
}


</style>
~~~





# 第四节、Echart Faq



## 一、解决echarts宽度100%变成了100px

> 问题：外层div设置宽高为100%，在渲染出来的时候变成了100px

- 原因：这种情况一般都是 `echart` 所在的 `div` 一开始是 `display: none`，一般出现在以下几种情况：

1. `display: none` 解决方法（没试过，嫌麻烦）：
   1、通过 `js` 获取外层 `div` 的宽高，然后设置给图表容器
   2、加  `mychart.resize()`  



2. `elementUI` 解决方案

   > 原因：`echats` 放在了 `el-tab-pane  ` 中

   - `el-tab-pane` 有一个属性：`lazy`，表示标签是否延迟渲染。设为true，延时加载即可。



3. **首次**加载的 `v-if` 或者 `v-show` 设置为`true`。

4. 所在 `div` 用了 `v-show`，这种情况要不换成 `v-if`，要不就设置初始值是`true`。换成 `v-if` 可行，但在频繁显示或不显示的时候不适用 `v-if`，所以在试用 `v-show` 且初始为 `false` 的时候，可以使用 `resize()`

~~~js
    watch：{
        show(v){
            // 在show为true，也就是显示的时候，调用 resize 解决100px的问题
            if(v){
              this.$nextTick(() => this.$refs.chart.instance.resize())
            }
        }
    }
~~~



## 二、切换option样式覆盖的问题

> 在切换 `option` 的时候，记得 `clear` 一下就好了

~~~js
  watch: {
    option: {
        handler() {
          if (this.$refs.echartRef) {
            this.instance = echarts.init(this.$refs.echartRef)
            if(this.instance) {
              this.instance.clear()
              this.instance.setOption(this.option)
            }
          }
        },
      deep: true,
      immediate: true
    }
  }
~~~





## 三、不显示文字只显示图，label旋转45、渐变

~~~js
  xAxis: [
          {
            axisLine: {show: false},
            axisTick: {show: false},
            data: this.Xlist,
            axisLabel: {
              //旋转45度
              rotate: 45,
            }
          }
        ],
 yAxis: [
          {
            type: "value",
            //不显示文字文本
            axisLabel: {
              interval: 0,
              fontSize: "0"
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
          }
        ],
     
 series: [
          {
            smooth: true, //这个是把线变成曲线
            itemStyle: {
              normal: {
                color: "#fb8c1e",
                lineStyle: {
                  color: "#f1ad5e"
                }
              }
            },
            areaStyle: {
      		//折线图渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(251,140,30,0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(241,173,94,0.3)'
                }
              ])
            },
            symbol: "none",
            type: "line",
            data: this.Ylist
          }
        ]
~~~



