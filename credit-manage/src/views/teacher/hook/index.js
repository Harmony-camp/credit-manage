import { ref, reactive, computed } from "vue";

import {
  getTeacherList,
  createTeacher,
  updateTeacher
} from "~/api/teacher";
import {
  getDepartmentList,
} from "~/api/user";
import { toast,importFile } from "~/utils/utils";



export default function () {

  const page = ref(1);
  const total = ref(0);
  const limit = ref(10);

  const searchLoading = ref(false);
  const exportLoading = ref(false);
  const uploadRef = ref(null);
  const filelist = ref([]);
  const dialogVisible = ref(false);
  const createRef = ref(null);
  const createFormRef = ref(null);
  const departmentOptions = ref([]);
  const tableData = ref([]);
  const loading = ref(false);
  const editId = ref(0);
  const FormTitle = computed(() => (editId.value ? "修改" : "新增"));
  const currentId = ref(null);
  const searchForm = reactive({
    keyword: "",
  });
  const createForm = reactive({
    ID: "",
    Name: "",
    Gender: "男",
    Age: "",
    Title: "教授",
    Department: "大数据学院",
  });
  const rules = {
    Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    Age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
    ID: [{ required: true, message: "请输入学号", trigger: "blur" }],
    Title: [{ required: true, message: "请选择职称", trigger: "change" }],
    Department: [{ required: true, message: "请输入所属学院", trigger: "blur" }],
  };


  const handleImport = () => importFile(filelist,createTeacher)

  const resetSearchForm = () => {
    searchForm.keyword = "";
    getData();
  };

  function resetForm(row) {
    if (createForm.value) createForm.value.clearValidate();
    if (row) {
      for (const key in createForm) {
        createForm[key] = row[key];
      }
    }
  }

  const handleCreate = () => {
    editId.value = 0;
    resetForm();
    createRef.value.open();
  };

  const handleEdit = (row) => {
    currentId.value = row._id;
    editId.value = row._id;
    resetForm(row);
    createRef.value.open();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    getData();
  };

  const exportAll = () => {
    exportLoading.value = true;
    getTeacherList()
      .then((res) => {
        const ws = XLSX.utils.json_to_sheet(res);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "教师信息");
        XLSX.writeFile(wb, "教师信息.xlsx");
        toast("导出教师信息成功");
      })
      .finally(() => (exportLoading.value = false));
  };

  const handleSubmit = () => {
    createFormRef.value.validate((valid) => {
      if (valid) {
        createRef.value.showLoading();
        const fun = editId.value
          ? updateTeacher({ ...createForm, _id: currentId.value })
          : createTeacher(createForm);
        fun
          .then((res) => {
            getData();
            createRef.value.close();
          })
          .finally(() => createRef.value.hideLoading());
      }
    });
  };

  const getData = (e) => {
    const { keyword } = searchForm;

    let params = {
      page: page.value,
      limit: limit.value,
    };
    if (e == "search") {
      if (!keyword) return toast("请输入关键词", "error");
      params.keyword = keyword;
    }
    getTeacherList(params)
      .then((res) => {
        loading.value = true;
        tableData.value = res;
        total.value = res.length;
      })
      .finally(() => {
        searchLoading.value = false;
        loading.value = false;
      });
    getDepartmentList().then((res) => {
      departmentOptions.value = res
    })
  };
  return {
    total,
    limit,
    searchLoading,
    exportLoading,
    uploadRef,
    filelist,
    dialogVisible,
    createRef,
    searchForm,
    createFormRef,
    tableData,
    loading,
    departmentOptions,
    createForm,
    rules,
    editId,
    FormTitle,
    getData,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
    exportAll,
    resetSearchForm,
    handleImport
  }
}
