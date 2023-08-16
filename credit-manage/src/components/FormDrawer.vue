<template>
  <el-drawer
    v-model="drawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroyOnClose="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button
          class="bg-blue-400"
          type="primary"
          @click="submit"
          :loading="loading"
          >{{ confirmText }}</el-button
        >
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, reactive } from "vue";
const drawer = ref(false);

const loading = ref(false);
const showLoading = () => (loading.value = true);
const hideLoading = () => (loading.value = false);

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%",
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "提交",
  },
});
const open = () => (drawer.value = true);
const close = () => (drawer.value = false);
const submit = () => emit("submit");
const emit = defineEmits(["submit"]);
//向父组件暴露方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
});
</script>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
