<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
                <span class="tags-li-icon" @click="closeTags(index)"  v-if="item.title!='工作台'">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const isActive = (path) => {
            return path === route.fullPath;
        };
        const store = useStore();
         const isTags = computed(() => store.state.isTags);
        const tagsList = computed(() => store.state.tagsList);
        const showTags = computed(() => tagsList.value.length > 0);
        // 关闭单个标签
        const closeTags = (index) => {
            const delItem = tagsList.value[index];
            store.commit("delTagsItem", { index });
            const item = tagsList.value[index]
                ? tagsList.value[index]
                : tagsList.value[index - 1];
            if (item) {
                delItem.path === route.fullPath && router.push(item.path);
            } else {
                router.push("/");
            }
        };

        // 设置标签
        const setTags = (route) => {
            const isExist = tagsList.value.some((item) => {
                return item.path === route.fullPath;
            });
            if (!isExist) {
                if (tagsList.value.length >= 8) {
                    store.commit("delTagsItem", { index: 0 });
                }
                store.commit("setTagsItem", {
                    name: route.name,
                    title: route.meta.title,
                    path: route.fullPath,
                });
            }
        };
        setTags(route);
        onBeforeRouteUpdate((to) => {
            setTags(to);
        });

        // 关闭全部标签
        const closeAll = () => {
            store.commit("clearTags");
            router.push("/");
        };
        // 关闭其他标签
        const closeOther = () => {
            const curItem = tagsList.value.filter((item) => {
                return item.path === route.fullPath;
            });
            store.commit("closeTagsOther", curItem);
        };
        const handleTags = (command) => {
            command === "other" ? closeOther() : closeAll();
        };

        // 关闭当前页面的标签页
        // store.commit("closeCurrentTag", {
        //     $router: router,
        //     $route: route
        // });

        return {
            isActive,
            tagsList,
            showTags,
            closeTags,
            handleTags,
            isTags
        };
    },
};
</script>


<style>
.tags {
    position: relative;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    background: #e9eaec;
    padding-right: 120px;
    /* box-shadow: 10px 5px 10px #ddd; */

}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    border-radius: 3px 3px 0px 0px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    padding: 0 15px 0 15px;
    margin: 5px 10px 10px 2px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
    color: black !important;
}


.tags-li.active {
    background:#fff !important;
    color: black !important;
    border: none !important;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: black;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 40px;
    z-index: 10;
}
</style>
