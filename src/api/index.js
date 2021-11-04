/*
 * @Author: your name
 * @Date: 2021-10-20 10:37:52
 * @LastEditTime: 2021-11-01 11:32:22
 * @LastEditors: GuoYaBing
 * @Description: In User Settings Edit
 * @FilePath: /vue3x-element-admin/src/api/index.js
 */
/* jshint esversion: 6 */
//引入封装的方法和接口域名
import { postRequest, getRequest } from "./axios";
import { baseUrl, baseUrl_New } from "./urlconfig";

export const postTypeList=(data)=>{
	return postRequest(`${baseUrl}/home/list`,data);
};
export const postBacktopList=(data)=>{
	return postRequest(`${baseUrl}/backtop/list`,data);
};
export const getLogin=(data)=>{
	return postRequest(`${baseUrl}/getLogin`,data
	);
};

export const postMockDemo=(data)=>{
	return postRequest(`${baseUrl_New}/taptap/rank/typeList`,data)
};
//轮播列表 
export const postSwiper=(data)=>{
	return postRequest(`${baseUrl_New}/api/swiper`,data)
};

export const getDemo=(data)=>{
	return getRequest(`${baseUrl_New }/xxxx`,data)
};
// 注册用户
export const getaddUser=(data)=>{
	return postRequest(`${baseUrl_New }/api/user/login`,data)
};
