<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-27 13:33:15
 * @LastEditors: YaBing
 * @LastEditTime: 2023-04-13 10:08:26
-->
<template>
  <div class="echarts-common">
    <!-- 头部信息 -->
    <div class="card">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="card">
            <div v-for="item in 4" :key="item" class="card-panel">
              <div class="cardSkeleton">
                <div class="card-panel-img">
                  <el-skeleton-item
                    variant="image"
                    style="width: 80px; height: 80px; border-radius: 50%"
                  />
                </div>
                <div style="width: 100%; margin-left: 10px">
                  <el-skeleton-item
                    variant="text"
                    style="width: 30%; margin-top: 10px"
                  />
                  <el-skeleton-item variant="text" style="width: 80%" />
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #default>
          <div class="card-panel" v-for="(item, index) in navData" :key="index">
            <div class="card-panel-img">
              <img :src="item.image" alt="" />
            </div>
            <div class="card-panel-text">
              <h3>{{ item.title }}</h3>
              <p>
                <countTo
                  
                  :endVal="item.number"
                  :duration="3000"
                ></countTo>
              </p>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
    <!-- 图表展示 -->
    <div class="Echarts">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton :rows="5" animated />
        </template>
        <template #default>
          <div id="myChart1" :style="{ width: '100%', height: '400px' }"></div>
        </template>
      </el-skeleton>
    </div>
    <!-- 分析图标 -->
    <div class="analysis">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="analysis">
            <div class="boderShow" style="width: 30%">
              <el-skeleton :rows="3" animated />
            </div>
            <div class="boderShow" style="width: 30%">
              <el-skeleton :rows="3" animated />
            </div>
            <div class="boderShow" style="width: 30%">
              <el-skeleton :rows="3" animated />
            </div>
          </div>
        </template>
        <template #default>
          <div
            id="myChart2"
            class="boderShow"
            :style="{ width: '30%', height: '300px' }"
          ></div>
          <div
            id="myChart3"
            class="boderShow"
            :style="{ width: '30%', height: '300px' }"
          ></div>
          <div
            id="myChart4"
            class="boderShow"
            :style="{ width: '30%', height: '300px' }"
          ></div>
        </template>
      </el-skeleton>
    </div>
    <!-- 时间线 -->
    <div class="book">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="book">
            <div class="row7 boderShow">
              <el-skeleton :rows="4" animated />
            </div>
            <div class="row3 boderShow">
              <el-skeleton :rows="4" animated />
            </div>
          </div>
        </template>
        <template #default>
          <div class="row7 boderShow">
            <el-timeline  >
              <el-timeline-item center  :timestamp="item.date" placement="top" v-for="(item, index) in progress" :key="index">
                <el-card>
                  <h4>{{item.title}}</h4>
                  <p>{{item.content}}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>

          <div class="row3 boderShow">
            <div class="demo-collapse">
              <el-collapse v-model="activeNames" @change="handleChange"  >
                <el-collapse-item :title="item.title"  v-for="(item, index) in progress" :key="index"  :name="item.id">
                  <div>
                   {{item.content}}
                  </div>
                </el-collapse-item>
              
           
            
              </el-collapse>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
  
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
import { onMounted, reactive, toRefs, ref, nextTick } from "vue";
import { postTypeList} from "../../api/index";
import CountTo from "../../components/vue-count-to/vue-countTo.vue";
export default {
  
  setup() {
    onMounted(async () => {
      const { data, status } = await postTypeList();
      if (status == 200) {
        state.navData = data.data;
        state.myChartSeries1 = data.Echarts1;
        state.myChartSeries2 = data.Echarts2;
        state.myChartSeries3 = data.Echarts3;
        state.myChartSeries4 = data.Echarts4;
        state.progress=data.progress;
        state.myChartSeries1.forEach((item) => {
          var array = [];
          item.data.forEach((el) => {
            array.push(parseInt(el.number));
          });
          return (item.data = array);
        });
        console.log(data, "数据");
        state.loading = false;
        nextTick(() => {
          drawLine();
        });
      }
    });
     const drawLine = () => {   
      var myChart1 = echarts.init(document.getElementById("myChart1"));
      var myChart2 = echarts.init(document.getElementById("myChart2"));
      var myChart3 = echarts.init(document.getElementById("myChart3"));
      var myChart4 = echarts.init(document.getElementById("myChart4"));
      myChart1.setOption({
        itle: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["干饭", "喝水", "坐地铁", "工作"],
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: state.myChartSeries1,
      });
      // 图表2
      myChart2.setOption({
        legend: {
          data: state.myChartSeries2.title,
          orient: "Vertical",
          x: "2%",
          y: " center",
        },

        radar: {
          // shape: 'circle',
          indicator: state.myChartSeries2.indicators,
        },
        series: state.myChartSeries2.series,
      });
      // 图表3
      myChart3.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          orient: "Vertical",
          x: "2%",
          y: " center",
          data:state.myChartSeries3.title,
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: state.myChartSeries3.series,
      });
      // 图表4
      myChart4.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: state.myChartSeries4.xAxiData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series:state.myChartSeries4.series
      });
       
       
       
       window.onresize = function () {
      // 自适应大小
      myChart1.resize();
      myChart2.resize();
      myChart3.resize();
      myChart4.resize();
    };

    };
      
  
    const activeNames = ref(["1"]);
    const handleChange = (val) => {
      console.log(val);
    };
    const state = reactive({
      navData: [],
      loading: true,
      myChartSeries1: [],
      progress:[],
      myChartSeries2: {},
      myChartSeries3: {},
      myChartSeries4: {},
      myChartDataX: [],
    });
    return {
      ...toRefs(state),
      activeNames,
      handleChange,
    };
  },
  components: {
    CountTo,
  },
};
</script>
<style>
.echarts-common {
  width: 100%;
  height: 100%;
  color: black;
}
.card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card-panel {
  width: 21%;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  min-width: 200px;
  /* margin: 10px; */
  border-radius: 5px;
  /* margin-right: 20px; */
  padding: 15px;
}
.card-panel-text {
  margin-left: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  /* white-space: nowrap; */
  font-weight: 600;
}
.card-panel-text p {
  font-size: 26px;
}
.Echarts {
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.analysis {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.boderShow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
}
.book {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 100px;
}
.row7 {
  width: 64%;
  margin-right: 10px;
}
.row3 {
  width: 30%;
}
.cardSkeleton {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
