<template>
  <el-card shadow="never">
    <template #header>
      <div>
        <el-button text type="primary" @click="handleCreate('添加')">{{
          title
        }}</el-button>
      </div>
    </template>
    <el-table :data="data" border stripe max-height="200">
      <el-table-column
        v-for="(item, index) in columns"
        :prop="item.prop"
        :key="index"
        :label="item.label"
      />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button text type="primary" @click="handleCreate('编辑',row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="是否删除？"
            confirmButtonText="确认"
            cancelButtonText="取消"
            confirm-button-type="text"
            @confirm="$emit('delete', row._id)"
            width="auto"
          >
            <template #reference>
              <el-button type="danger" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <FormDialog
    ref="dialogRef"
    @submit="submit"
    :title="title"
    :loading="loading"
  >
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item
        v-for="(item, index) in formObj"
        :key="item"
        :label="item.label"
        :prop="item.prop"
      >
        <template v-if="!item.children">
          <component :is="item.component" v-model="form[item.prop]"></component>
        </template>
        <template v-else>
          <component :is="item.component" v-model="form[item.prop]">
            <template v-for="iten in item.children">
              <component
                :is="iten.component"
                v-model="form[iten.prop]"
                :label="iten.label"
                :value="iten.value"
              ></component>
            </template>
          </component>
        </template>
      </el-form-item>
    </el-form>
  </FormDialog>
</template>

<script setup>
import { onMounted } from "vue";
import FormDialog from "./FormDialog.vue";

import { ref, reactive } from "vue";

const dialogRef = ref(null);
const formRef = ref(null);
const loading = ref(false);
const form = reactive({});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  rules: {
    type: Array,
    default: [],
  },
  formObj: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["render", "edit",  "delete", "submit"]);
const handleCreate = (title,row=null) => {
  dialogRef.value.open();
  emit("edit",title,row);
};

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      emit("submit", form)
      loading.value = false;
      
      emit("render");
    }
  });
};

const close = ()=>dialogRef.value.close();

onMounted(() => {
  emit("render");
});

defineExpose({
  close,
})
</script>

<style></style>
