<template>
  <div>
    <el-card shadow="never" class="border-0">
      <el-form :model="searchForm" label-width="80px" size="small" class="mb-3">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="关键词">
              <el-input
                v-model="searchForm.keyword"
                placeholder="请输入学生姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="8">
            <div class="flex items-center justify-end">
              <el-button
                type="primary"
                class="bg-blue-500"
                @click="getData('search')"
                v-loading="searchLoading"
                >搜索</el-button
              >
              <el-button @click="resetSearchForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div class="flex items-center justify-between mb-4">
        <div>
          <el-button
            type="primary"
            size="small"
            class="bg-blue-500"
            @click="handleCreate"
            >新增</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="bg-blue-500"
            @click="dialogVisible = true"
            >批量导入</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="bg-blue-500"
            @click="exportSudentAll"
            v-loading="exportStudentLoading"
            >导出所有学生信息</el-button
          >
        </div>
        <el-tooltip content="刷新数据" placement="top" effect="dark">
          <el-button text @click="getData()">
            <el-icon size="20"><Refresh /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="Name" label="姓名" />
        <el-table-column prop="ID" label="学号" :disabled="disabled" />
        <el-table-column prop="Gender" label="性别" />
        <el-table-column prop="Classes" label="班级" :disabled="disabled" />
        <el-table-column
          prop="EarnedCredits"
          label="学分"
          :disabled="disabled"
        />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button text type="primary" @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="是否删除该学生？"
              confirmButtonText="确认"
              cancelButtonText="取消"
              confirm-button-type="text"
              @confirm="handleDelete(row._id)"
              width="auto"
            >
              <template #reference>
                <el-button type="primary" text>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex items-center justify-center mt-5">
        <el-pagination
          @current-change="getData"
          background
          layout="prev,pager,next"
          :total="total"
          :page-size="limit"
        ></el-pagination>
      </div>
      <FormDrawer
        ref="createStudentRef"
        :title="FormTitle + '学生'"
        @submit="handleSubmit"
      >
        <el-form
          :model="createStudentForm"
          ref="createStudentFormRef"
          :rules="rules"
          label-width="80px"
          :inline="false"
        >
          <el-form-item label="姓名" prop="Name">
            <el-input v-model="createStudentForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="Age">
            <el-input v-model="createStudentForm.Age"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="ID">
            <el-input v-model="createStudentForm.ID"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="Gender">
            <el-radio-group v-model="createStudentForm.Gender" class="ml-4">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学分" prop="EarnedCredits">
            <el-input-number
              v-model="createStudentForm.EarnedCredits"
              :min="1"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="班级">
            <el-select
              v-model="createStudentForm.Classes"
              placeholder="请选择班级"
            >
              <el-option
                v-for="item in classOptions"
                :key="item.className"
                :label="item.className"
                :value="item.className"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </FormDrawer>
      <el-dialog v-model="dialogVisible" title="批量导入学生信息" width="50%">
        <el-upload
          ref="uploadRef"
          drag
          :auto-upload="false"
          :limit="1"
          v-model:file-list="filelist"
        >
          <img src="../../assets/image/student-template.png" class="mb-5" />
          <div class="el-upload__text">都拽上传或者 <em>点此上传</em></div>
          <template #tip>
            <div class="el-upload__tip text-xs text-red-500">
              文件格式要求表头是上述格式，ID为学号，班级只能是已有班级
            </div>
          </template>
        </el-upload>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" class="bg-blue-500" @click="handleImport"
              >导入</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import FormDrawer from "~/components/FormDrawer.vue";
import { computed } from "vue";
import storage from "~/utils/storage";
import useHook from "./hook";

const {
  total,
  limit,
  searchLoading,
  exportStudentLoading,
  uploadRef,
  filelist,
  dialogVisible,
  searchForm,
  rules,
  FormTitle,
  createStudentRef,
  createStudentFormRef,
  classOptions,
  tableData,
  loading,
  createStudentForm,
  getData,
  handleImport,
  handleCreate,
  handleEdit,
  handleDelete,
  exportSudentAll,
  handleSubmit,
  resetSearchForm,
} = useHook();

const userinfo = storage.getItem("userinfo");
const disabled = computed(() => userinfo.role !== 3);

getData();
</script>
