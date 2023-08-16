<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class="font-bold text-4xl text-light-50 mb-4">XX学分管理系统</div>
        <div class="text-gray-200 text-sm">前端: Vite + vue3 + elementplus</div>
        <div class="text-gray-200 text-sm">后端: koa2 + mongoDB</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div
        class="flex justify-center items-center my-5 text-gray-300 space-x-2"
      >
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="formRef" :model="form" class="w-[250px]" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select
            v-model="form.role"
            placeholder="请选择您的身份"
            class="w-[100%]"
          >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-[250px] bg-blue-500"
            round
            color="#626aef"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { toast, str_encrypt } from "~/utils/utils";
import { useStore } from "vuex";
import storage from '~/utils/storage';

const router = useRouter();
const store = useStore();
const formRef = ref(null);
const loading = ref(false);
const form = reactive({
  username: "",
  password: "",
  role: 1,
});
const roleList = [
  {
    value: 1,
    label: "学生",
  },
  {
    value: 2,
    label: "教师",
  },
  {
    value: 3,
    label: "管理员",
  },
];
const rules = {
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "用户名长度必须是3到20个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 10, message: "密码长度必须是3到20个字符", trigger: "blur" },
  ],
};
const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      let params = {...form};
      params.password = str_encrypt(form.password);
      console.log('params :>> ', params);
      store
        .dispatch("login", params)
        .then((res) => {
          
          router.push("/");
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

//监听回车事件
function onKeyUp(e) {
  if (e.key === "Enter") {
    onSubmit();
  }
}

//添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>

<style>
.login-container {
  @apply bg-indigo-500 min-h-screen;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply flex-col bg-gray-50;
}
</style>
