/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-10-11 11:42:38
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-10-11 11:43:24
 */
 //  每秒更新时间
 const updateTime = (timeStamp) => {
    let year = new Date(timeStamp).getFullYear();
    let month =
      new Date(timeStamp).getMonth() + 1 < 10
        ? "0" + (new Date(timeStamp).getMonth() + 1)
        : new Date(timeStamp).getMonth() + 1;
    let date =
      new Date(timeStamp).getDate() < 10
        ? "0" + new Date(timeStamp).getDate()
        : new Date(timeStamp).getDate();
    let hh =
      new Date(timeStamp).getHours() < 10
        ? "0" + new Date(timeStamp).getHours()
        : new Date(timeStamp).getHours();
    let mm =
      new Date(timeStamp).getMinutes() < 10
        ? "0" + new Date(timeStamp).getMinutes()
        : new Date(timeStamp).getMinutes();
    let ss =
      new Date(timeStamp).getSeconds() < 10
        ? "0" + new Date(timeStamp).getSeconds()
        : new Date(timeStamp).getSeconds();
    data.dayTime =
      year +
      "年" +
      month +
      "月" +
      date +
      "日" +
      "\n" +
      hh +
      ":" +
      mm +
      ":" +
      ss;
  };
  export default updateTime;