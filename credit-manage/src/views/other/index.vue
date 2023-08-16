<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <AddCard
          ref="classesRef"
          :title="title"
          @render="getClassList"
          @delete="deleteClass"
          @submit="submitClass"
          @edit="editClass"
          :data="classesList"
          :columns="classesColumns"
          :formObj="classesForm"
          :rules="classesRules"
        />
      </el-col>
      <el-col :span="12" :offset="0">
        <AddCard
          ref="classesRef"
          :title="title"
          @render="getClassList"
          @delete="deleteClass"
          @submit="submitClass"
          @edit="editClass"
          :data="classesList"
          :columns="classesColumns"
          :formObj="classesForm"
          :rules="classesRules"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import AddCard from "~/components/AddCard.vue";
import useOperateClasses from "./hooks/useOperateClasses";

const {
  title,
  classesList,
  classesRules,
  classesColumns,
  classesForm,
  submitClass,
  deleteClass,
  getClassList,
  editClass
} = useOperateClasses();

</script>

<style></style>
