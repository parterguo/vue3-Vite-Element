/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-10-27 10:28:13
 * @LastEditors: YaBing
 * @LastEditTime: 2023-04-11 17:20:59
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-24 11:10:49
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-11-04 10:56:47
 */
/* jshint esversion: 6 */

import Mock from 'mockjs';
import ganfan from "/@/assets/ganfan.png";
import heshui from "/@/assets/heshui.png";
import ditie from "/@/assets/ditie.png";
import gongzuo from "/@/assets/gongzuo.png";
Mock.mock('/home/list', {
    status: 200,
    meg: '获取数据成功',
    "data": [
        { title: '干饭', image: ganfan, "number|1-10000.1-10": 1 },
        { title: '喝水', image: heshui, "number|1-10000.1-10": 1 },
        { title: '地铁', image: ditie, "number|1-10000.1-10": 1 },
        { title: '工作', image: gongzuo, "number|1-10000.1-10": 1 }],
    "Echarts1": [
        {
            name: "干饭",
            type: "line",
            stack: "Total",
            "data|7": [{ "number|1-10000.1-10": 1 }],
        },
        {
            name: "喝水",
            type: "line",
            stack: "Total",
            "data|7": [{ "number|1-10000.1-10": 10 }],
        },
        {
            name: "坐地铁",
            type: "line",
            stack: "Total",
            "data|7": [{ "number|1-10000.1-10": 5 }],
        },
        {
            name: "工作",
            type: "line",
            stack: "Total",
            "data|7": [{ "number|1-10000.1-10": 2 }],
        },
    ],
    "Echarts2": {
        title: ["干饭", "喝水", "坐地铁", "工作"],
        indicators: [
            { name: "干饭", max: 6500 },
            { name: "喝水", max: 16000 },
            { name: "坐地铁", max: 30000 },
            { name: "工作", max: 38000 },
        ],
        series: [
            {
                name: "Budget vs spending",
                type: "radar",
                data: [
                    {
                        value: [4200, 4300, 2300, 3500, 5000, 1800],
                        name: "干饭",
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 4200, 21000],
                        name: "喝水",
                    },
                    {
                        value: [5000, 14000, 2800, 2600, 42000, 21000],
                        name: "坐地铁",
                    },
                    {
                        value: [3000, 14000, 2800, 26000, 4200, 2100],
                        name: "工作",
                    }
                ],
            },
        ]
    },
    "Echarts3": {
        title: ["干饭", "喝水", "坐地铁", "工作"],
        series: [{
            type: "pie",
            radius: [20, 140],
            center: ["55%", "50%"],
            roseType: "radius",
            itemStyle: {
                borderRadius: 3,
            },
            label: {
                show: false,
            },
            emphasis: {
                label: {
                    show: true,
                },
            },
            data: [
                { value: 40, name: "干饭" },
                { value: 33, name: "喝水" },
                { value: 28, name: "坐地铁" },
                { value: 22, name: "工作" },
            ],
        },]
    },
    "Echarts4":{
        xAxiData:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        series:[   {
            name: "干饭",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "喝水",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "坐地铁",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          }, 
          {
            name: "工作",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
         
        
      ],
    },
    "progress|5":[
        {date:'@now(yyyy-MM-dd) @increment(10):00:00',title:'@ctitle',content:'@cparagraph(4)','id|+1':1},
    ]
});
//  表格数据
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

const dataList = [] // 用于接受生成数据的数组
// 随机手机号
Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })

for (let i = 0; i < 1000; i++) { // 可自定义生成的个数

  const template = {

    // 'Boolean': Random.boolean, // 可以生成基本数据类型

    // 'Natural': Random.natural(1, 10), // 生成1到100之间自然数

    // 'Integer': Random.integer(1, 100), // 生成1到100之间的整数

    // 'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位

    // 'Character': Random.character(), // 生成随机字符串,可加参数定义规则

    // 'String': Random.string(2, 10), // 生成2到10个字符之间的字符串

    // 'Range': Random.range(0, 10, 2), // 生成一个随机数组

    // 'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式

    // 'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据

    // 'Color': Random.color(), // 生成一个颜色随机值

    // 'Paragraph': Random.paragraph(2, 5), // 生成2至5个句子的文本

    // 'Name': Random.name(), // 生成姓名

    // 'Url': Random.url(), // 生成web地址

    // 'Address': Random.province() // 生成地址
    'id':Random.id(),
    'name':Random.cname(),
    'email':Random.email(),
    'province':Random.province(),
    'guid':Random.guid(),
    'age':Random.integer(20,60),
    'gender':Random.boolean(),
    'time':Random.date()

  }

  dataList.push(template)

}

// list 分页接口()

Mock.mock('/backtop/list', 'post', (params) => {

  var info = JSON.parse(params.body)

  var [index, size, total] = [info.pageIndex, info.pageSize, dataList.length]

  var len = total / size

  var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len

  var newDataList = dataList.slice(index * size, (index + 1) * size)

  return {

    'code': 200,

    'message': 'success',

    'data': {

      'pageIndex': index,

      'pageSize': size,

      'rows': newDataList,

      'total': total,

      'totalPages': totalPages

    }

  }

})
// Mock.mock('/backtop/list',{
//     status: 200,
//     meg: '获取数据成功',
//     data:{
//      'list|10':[{ id: '@ID',name:'@cname',email:'@email',province:'@province',guid:'@guid',age:'@integer(20,60)','gender|1-2': true,}]
//     }
// })
// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '300-500'
});
//登录数据
Mock.mock('/getLogin','post',(res)=>{
  const { account, password } = JSON.parse(res.body);
  if (account === 'admin' && password === '123456') {
    return {
     code:200,
     msg:'请求成功',
     name:Random.cname(),
     token:Random.guid(),
     dateNow: Random.now()

    }
  } else {
    return {
      code:404,
      msg:'账号密码错误!',

    }
  }
}
 
)

let configArray = [];

// 注册所有的Mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
});