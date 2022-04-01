<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-10-14 10:45:41
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2022-03-29 16:41:55
-->
<template>
  <div>
    <el-card shadow="hover">
      <div id="myChart1" :style="{ width: '100%', height: '500px' }"></div>
    </el-card>
    <el-checkbox-group v-model="listKeyData">
      <el-checkbox
        v-for="(item, index) in listdata"
        :key="index"
        :label="item"
        :value="item.id"
        @change="handleChange(item)"
        >{{ item.name }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
  <el-button @click.once="oncClick">只能点击一次</el-button>
  <!-- 有且只有 Ctrl 被按下的时候才触发 -->
  <el-button @click.ctrl.exact="onCtrlClick">Ctrl+点击触发</el-button>
  <el-button @click="show = !show"> Toggle </el-button>
  <!-- 过渡动画 -->
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
  user：{{ twiceTheCounter }}
</template>
<script>
import * as echarts from "echarts";
import { onMounted, reactive, toRefs, watch,computed } from "vue";

export default {
  setup() {
    let data = reactive({
      dayTime: null,
      loading: null,
      statusName: "",
      show: false,
      cheobj: {},
      listKeyData: [],
      count: 0,
      listdata: [
        {
          id: "23321",
          name: "dadas3",
        },
        {
          id: "23321",
          name: "dadas2",
        },
        {
          id: "23321",
          name: "dadas1",
        },
      ],
    });
    const twiceTheCounter = computed(() => data.count*2)
     data.count++;
    console.log('computed计算属性',twiceTheCounter.value)

    const handleChange = () => {
      console.log(data.listKeyData);
    };
    // 点击事件只执行一次
    const oncClick = () => {
      alert("执行点击事件");
    };

    //  按Ctrl触发
    const onCtrlClick = () => {
      alert("触发了Ctrl");
    };

    onMounted(() => {
      // 太极八卦
      let myChart = echarts.init(document.getElementById("myChart1"));
      const colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
      const bgColor = "#2E2733";
      const itemStyle = {
        star5: {
          color: colors[0],
        },
        star4: {
          color: colors[1],
        },
        star3: {
          color: colors[2],
        },
        star2: {
          color: colors[3],
        },
      };
      const data = [
        {
          name: "乾坤八卦",
          itemStyle: {
            color: colors[1],
          },
          children: [
            {
              name: "乾",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦的首卦",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "天、阳物也",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "乾为天、为圜、",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "为君、为父、为玉、",
                    },
                  ],
                },
                {
                  name: "2☆",
                  children: [
                    {
                      name: "为金、为寒、为冰、为大赤、",
                    },
                  ],
                },

                {
                  name: "3☆",
                  children: [
                    {
                      name: "为良马、为老马、为瘠马",
                    },
                    {
                      name: "为驳马、为木果",
                    },
                  ],
                },
              ],
            },
            {
              name: "坤",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦之一",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "坤为地",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "为母",
                    },
                    {
                      name: "为布",
                    },
                    {
                      name: "为釜",
                    },
                    {
                      name: "为吝啬",
                    },
                  ],
                },
              ],
            },
            {
              name: "震",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦之一",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "雷之象",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "万物出乎震",
                    },
                    {
                      name: "震，东方也",
                    },
                  ],
                },
                {
                  name: "2☆",
                  children: [
                    {
                      name: "震，东方也",
                    },
                  ],
                },
              ],
            },
            {
              name: "巽",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦之一",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "代表风",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "巽为木，为风",
                    },
                  ],
                },
                {
                  name: "2☆",
                  children: [
                    {
                      name: "东南方",
                    },
                  ],
                },
              ],
            },
            {
              name: "坎",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦之一",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "代表水",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "习坎，重险也",
                    },
                  ],
                },
              ],
            },
            {
              name: "离",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦之一",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "象征火",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "离，为火，为日",
                    },
                  ],
                },
              ],
            },
            {
              name: "艮",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦之一",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "代表山",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "方位名",
                    },
                  ],
                },
                {
                  name: "2☆",
                  children: [
                    {
                      name: "东北方。艮为小石",
                    },
                  ],
                },
              ],
            },
            {
              name: "兑",
              children: [
                {
                  name: "5☆",
                  children: [
                    {
                      name: "八卦之一",
                    },
                  ],
                },
                {
                  name: "4☆",
                  children: [
                    {
                      name: "象征沼泽 西方",
                    },
                  ],
                },
                {
                  name: "3☆",
                  children: [
                    {
                      name: "古人认为兑为西方之卦",
                    },
                    {
                      name: "故亦用以称西方",
                    },
                  ],
                },
                {
                  name: "2☆",
                  children: [
                    {
                      name: "为羊",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      for (let j = 0; j < data.length; ++j) {
        let level1 = data[j].children;
        for (let i = 0; i < level1.length; ++i) {
          let block = level1[i].children;
          let bookScore = [];
          let bookScoreId;
          for (let star = 0; star < block.length; ++star) {
            let style = (function (name) {
              switch (name) {
                case "5☆":
                  bookScoreId = 0;
                  return itemStyle.star5;
                case "4☆":
                  bookScoreId = 1;
                  return itemStyle.star4;
                case "3☆":
                  bookScoreId = 2;
                  return itemStyle.star3;
                case "2☆":
                  bookScoreId = 3;
                  return itemStyle.star2;
              }
            })(block[star].name);
            block[star].label = {
              color: style.color,
              downplay: {
                opacity: 0.5,
              },
            };
            if (block[star].children) {
              style = {
                opacity: 1,
                color: style.color,
              };
              block[star].children.forEach(function (book) {
                book.value = 1;
                book.itemStyle = style;
                book.label = {
                  color: style.color,
                };
                let value = 1;
                if (bookScoreId === 0 || bookScoreId === 3) {
                  value = 5;
                }
                if (bookScore[bookScoreId]) {
                  bookScore[bookScoreId].value += value;
                } else {
                  bookScore[bookScoreId] = {
                    color: colors[bookScoreId],
                    value: value,
                  };
                }
              });
            }
          }
          level1[i].itemStyle = {
            color: data[j].itemStyle.color,
          };
        }
      }

      myChart.setOption({
        backgroundColor: bgColor,
        color: colors,
        series: [
          {
            type: "sunburst",
            center: ["50%", "50%"],
            data: data,
            sort: function (a, b) {
              if (a.depth === 1) {
                return b.getValue() - a.getValue();
              } else {
                return a.dataIndex - b.dataIndex;
              }
            },
            label: {
              rotate: "radial",
              color: bgColor,
            },
            itemStyle: {
              borderColor: bgColor,
              borderWidth: 2,
            },
            levels: [
              {},
              {
                r0: -33,
                r: 40,
                label: {
                  rotate: 0,
                },
              },
              {
                r0: 40,
                r: 105,
              },
              {
                r0: 115,
                r: 140,
                itemStyle: {
                  shadowBlur: 2,
                  shadowColor: colors[2],
                  color: "transparent",
                },
                label: {
                  rotate: "tangential",
                  fontSize: 10,
                  color: colors[0],
                },
              },
              {
                r0: 140,
                r: 145,
                itemStyle: {
                  shadowBlur: 80,
                  shadowColor: colors[0],
                },
                label: {
                  position: "outside",
                  textShadowBlur: 5,
                  textShadowColor: "red",
                },
                downplay: {
                  label: {
                    opacity: 0.8,
                  },
                },
              },
            ],
          },
        ],
      });

      window.onresize = function () {
        // 自适应大小

        myChart.resize();
      };
    });

    return {
      ...toRefs(data),
      handleChange,
      oncClick,
      onCtrlClick,
      twiceTheCounter
    };
  },
};
</script>
<style scoped>
.box {
  width: 600px;
  height: 500px;
  border: solid 1px;
}
.box div:nth-child(1) {
  border: solid 1px green;
}
.box div:nth-child(2) {
  height: 100px;
  border: solid 1px red;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
