<template>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" class="bg-blue-500" v-loading="loading" @click="$emit('submit')">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
const dialogVisible = ref(null);

const open = () => {
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
};

defineProps({
  loading:{
    type:Boolean,
    default:false
  },
  title:{
    type:String,
    default:''
  }
})

defineEmits(['submit'])


defineExpose({
  open,
  close,
});
</script>

<style></style>
