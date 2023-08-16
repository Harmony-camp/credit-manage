import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { showModal, toast } from "~/utils/utils";
import store from "~/store";
import { logout } from "../api/user";

export function useRePassword() {
  const router = useRouter();
  const RePasswordformDrawerRef = ref(null);
  const RePasswordFormRef = ref(null);
  const rePasswordForm = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const rePasswordRules = {
    oldpassword: [
      { required: true, message: "旧密码不能为空", trigger: "blur" },
    ],
    password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
    repassword: [
      { required: true, message: "确认密码不能为空", trigger: "blur" },
    ],
  };

  const submitRePassword = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        formDrawerRef.value.showLoading();
        toast("修改密码成功")
        formDrawerRef.value.hideLoading();
      }
    });
  };
  const openRePasswordForm = () => RePasswordformDrawerRef.value.open()
  return {
    RePasswordformDrawerRef, rePasswordForm, RePasswordFormRef, rePasswordRules, submitRePassword, openRePasswordForm
  }
}

export function useLogout() {
  const router = useRouter();
  const handleLogout = () => {
    showModal("是否要退出登录").then(res=>{
      logout().finally(()=>{
        store.dispatch("logout")
        router.push("/login")
      })
    })
  };
  return {
    handleLogout,
  };
}
