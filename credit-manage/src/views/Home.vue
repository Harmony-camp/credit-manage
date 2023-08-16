<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="9" :offset="0">
        <el-card shadow="hover">
          <div class="flex justify-between items-center">
            <el-avatar />
            <div class="select-all my-2">
              <div>姓名： {{ userinfo.Name }}</div>
              <div>学号： {{ userinfo.ID }}</div>
              <div>性别： {{ userinfo.Gender }}</div>
              <div>班级： {{ userinfo.Classes }}</div>
              <div>已获得学分： {{ userinfo.EarnedCredits }}</div>
              <div>当前身份： {{ formatRole(userinfo.role) }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="py-5">
      <template v-for="item in 3">
        <el-col :span="8" :offset="0">
          <el-card shadow="hover" class="border-0">
            <template #header>
              <div class="flex justify-between">
                <span class="text-sm"> {{ item }}</span>
                <el-tag effect="plain"> item </el-tag>
              </div>
            </template>
            <span class="text-3xl font-bold text-gray-500">
              <CountTo :value="10" />
            </span>
            <el-divider />
            <div class="flex justify-between text-sm text-gray-500">
              <span>1</span>
              <span>2</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup>
import storage from "~/utils/storage";

import IndexCard from "~/components/IndexCard.vue";
import CountTo from "~/components/CountTo.vue";

const userinfo = storage.getItem("userinfo");

function formatRole(role) {
  switch (role) {
    case 3:
      return "管理员";
    case 2:
      return "教师";
    case 1:
      return "学生";
    default:
      return "未知";
  }
}
</script>
