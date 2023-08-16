<template>
  <el-aside width="220px" class="aside-menu" v-loading="loading">
    <div class="top">
      <template v-for="item,index in list">
        <div @click="selectCourse(item,index)" class="aside-list" :class="{active:active === index}">{{ item.name }}</div>
      </template>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,next"
        :total="total"
        :page-size="limit"
      ></el-pagination>
    </div>
  </el-aside>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { toast } from "~/utils/utils";

//加载动画
const loading = ref(false);
//分页
const total = ref(220);
const limit = ref(10);

const active = ref(0);

const list = ref([
  {
    name:"科学精神",
    id:1
  },
  {
    name:"科学精神",
    id:2
  },
  {
    name:"科学精神",
    id:3
  },
  {
    name:"科学精神",
    id:4
  },
  {
    name:"科学精神",
    id:5
  },
]);

const emit = defineEmits(['change'])

const selectCourse = (item,index) => {
  active.value = index;
  emit('change',item)
}



// function getData(p = null) {
//   if (typeof p == "number") currentPage.value = p;
//   loading.value = true;
//   getImageClassList(currentPage.value)
//     .then((res) => {
//       list.value = res.list;
//       total.value = res.totalCount;
//       let item = list.value[0];
//       if (item) handleChangeActiveId(item.id)
//     })
//     .finally(() => (loading.value = false));
// }
// getData();



</script>

<style>
.aside-menu {
  border-right: 1px solid #eee;
  position: relative;
}

.active-menu .top{
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.aside-menu .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  right: 0;
  left: 0;
  @apply flex justify-center items-center;
}
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600 ;
}
.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>
