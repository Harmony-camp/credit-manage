<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in 20"
          :key="index"
        >
          <el-card shadow="hover" class="relative" :body-style="{ padding: 0 }" :class="{'border-blue-500':item.checked}">
            <el-image
              :src="item.url"
              fit="cover"
              class="h-[150px]"
              style="width: 100%"
              :preview-src-list="[item.url]"
              :initial-index="0"
            />
            <div class="image-title">{{ item.name }}</div>
            <div class="flex justify-center items-center p-2">
              <el-checkbox v-if="openChoose"
                v-model="item.checked"
                @change="handleChooseChange(item)"
              ></el-checkbox>

              <el-button
                type="primary"
                size="small"
                @click="handleEdit(item)"
                text
                >选择该课程</el-button
              >
              <el-popconfirm
                title="是否改图片？"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(item.id)"
              >
                <template #reference>
                  <el-button type="primary" class="!m-0" size="small" text
                    >删除</el-button
                  >
                </template></el-popconfirm
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="getData"
        background
        layout="prev,pager,next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
      ></el-pagination>
    </div>
  </el-main>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({
  openChoose:{
    type:Boolean,
    default:false
  }
})

const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const list = ref([]);
const loading = ref(false);
const ImageClassId = ref(0);

const drawer = ref(false);
const openUploadFile = () => (drawer.value = true);

// function getData(p = null) {
//   if (typeof p == "number") currentPage.value = p;
//   loading.value = true;
//   getImageList(ImageClassId.value, currentPage.value)
//     .then((res) => {
//       console.log('res :>> ', res);
//       list.value = res.list.map((o) => {
//         o.checked = false;
//         return o;
//       });
//       total.value = res.totalCount
//     })
//     .finally(() => (loading.value = false));
// }

// const loadData = (id) => {
//   currentPage.value = 1;
//   ImageClassId.value = id;
//   getData();
// };

// const handleEdit = (item) => {
//   showPrompt("重命名", item.name).then((res) => {
//     loading.value = true;
//     updateImage(item.id, res.value)
//       .then((res) => {
//         toast("修改成功");
//         getData();
//       })
//       .finally(() => (loading.value = false));
//   });
// };

// const handleDelete = (id) => {
//   loading.value = true;

//   deleteImage([id])
//     .then((res) => {
//       toast("删除成功");
//       getData();
//     })
//     .finally(() => (loading.value = false));
// };


const emit = defineEmits(['choose'])






</script>

<style>
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  right: 0;
  left: 0;
  @apply flex justify-center items-center;
}
.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
