/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-24 11:10:49
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-10-25 17:12:41
 */
/* jshint esversion: 6 */

import Mock from 'mockjs';
import ganfan from "../assets/ganfan.png";
import heshui from "../assets/heshui.png";
import ditie from "../assets/ditie.png";
import gongzuo from "../assets/gongzuo.png";
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
Mock.mock('/backtop/list',{
    status: 200,
    meg: '获取数据成功',
    data:{
     'list|50':[{ id: '@ID',name:'@cname',email:'@email',province:'@province',guid:'@guid',age:'@integer(20,60)','gender|1-2': true,}]
    }
})
// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '300-900'
});
// 登录数据
//登录数据
Mock.mock('/getLogin',
  {
    "error_code": 0,
    "data": [{
      "id": '@natural(100, 300)',
      "usertitle": "管理员",
      "username": "admin",
      "password": "123456",
      "token": '@guid',
     },
     {
      "id": '@natural(100, 300)',
      "usertitle": "小郭",
      "username": "guoyabing",
      "password": "88888888",
      "token": '@guid',
     }
    ]
  }
)
let configArray = [];

// 使用webpack的require.context()遍历所有Mock文件
// const files = require.context('.', true, /\.js$/);
// files.keys().forEach((key) => {
//     if (key === './index.js') return;
//     configArray = configArray.concat(files(key).default);
// });

// 注册所有的Mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
});