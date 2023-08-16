<template>
  <div class="header-main">
    <span class="logo">
      <el-icon><ElementFilled /></el-icon>
      学分管理系统
    </span>
    <el-icon class="icon-btn mr-3" @click="$store.commit('handleAsideWidth')">
      <Fold v-if="$store.state.asideWidth == '250px'" />
      <expand v-else />
    </el-icon>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-gray-50">
          <el-avatar class="mr-2" :size="30" :src="avatar"/>
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="showInfo">查看个人信息</el-dropdown-item>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <FormDrawer
    ref="RePasswordformDrawerRef"
    @submit="submitRePassword"
    title="修改密码"
    destroyOnClose
  >
    <el-form
      ref="RePasswordFormRef"
      :model="rePasswordForm"
      :rules="rePasswordRules"
      label-width="80px"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input
          type="password"
          v-model="rePasswordForm.oldpassword"
          placeholder="请输入旧密码，默认为123456"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          v-model="rePasswordForm.password"
          type="password"
          show-password
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model="rePasswordForm.repassword"
          type="password"
          show-password
          placeholder="请再次输入新密码"
        />
      </el-form-item>
    </el-form>
  </FormDrawer>
  <FormDrawer
    ref="showInfoFormDrawerRef"
    @submit="submitShowInfo"
    title="查看个人信息"
    destroyOnClose>

  </FormDrawer>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import { useRePassword, useLogout } from "~/hooks/useManager";
import FormDrawer from "~/components/FormDrawer.vue";
import avatar from '~/assets/image/avatar.png'
import {useRouter} from 'vue-router'

const {
  RePasswordformDrawerRef,
  rePasswordForm,
  RePasswordFormRef,
  rePasswordRules,
  submitRePassword,
  openRePasswordForm,
} = useRePassword();
const { handleLogout } = useLogout();
const router = useRouter();

const { isFullscreen, toggle } = useFullscreen();
const handleCommand = (command) => {
  switch (command) {
    case "showInfo":
      router.push("/index")
      break;
    case "rePassword":
      openRePasswordForm()
      break;
    case "logout":
      handleLogout();
      break;
  }
};
const submitShowInfo = ()=>{}
</script>

<style>
.header-main {
  @apply flex bg-indigo-700 text-gray-50 fixed top-0 left-0 ring-0 items-center;
  height: 64px;
  width: 100%;
  z-index: 1000;
}
.logo {
  @apply flex items-center justify-center text-xl font-thin;
  width: 250px;
}
.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-indigo-600;
}
.header-main .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
