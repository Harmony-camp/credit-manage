import { ref, reactive, computed } from "vue";
import * as XLSX from "xlsx";
import {
  getStudentList,
  deleteStudent,
  createStudent,
  updateStudent,
} from "~/api/student";
import {
  getClassesList
} from "~/api/user";
import { toast,importFile } from "~/utils/utils";


export default function () {

  const page = ref(1);
  const total = ref(0);
  const limit = ref(10);

  const searchLoading = ref(false);
  const exportStudentLoading = ref(false);
  const uploadRef = ref(null);
  const filelist = ref([]);
  const dialogVisible = ref(false);
  const createStudentRef = ref(null);
  const createStudentFormRef = ref(null);
  const classOptions = ref([]);
  const tableData = ref([]);
  const loading = ref(false);
  const editId = ref(0);
  const currentId = ref(null);
  const FormTitle = computed(() => (editId.value ? "修改" : "新增"));
  const createStudentForm = reactive({
    ID: "",
    Name: "",
    Gender: "男",
    Age: "",
    Classes: "数据科学二班",
    EarnedCredits: 2,
  });
  const rules = {
    Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    Age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
    ID: [{ required: true, message: "请输入学号", trigger: "blur" }],
    Gender: [{ required: true, message: "请选择性别", trigger: "change" }],
    EarnedCredits: [{ required: true, message: "请输入学分", trigger: "blur" }],
  };

  const searchForm = reactive({
    keyword: "",
  });

  const handleImport = () =>importFile(filelist,createStudent)

  const resetSearchForm = () => {
    searchForm.keyword = "";
    getData();
  };

  function resetForm(row) {
    if (createStudentForm.value) createStudentForm.value.clearValidate();
    if (row) {
      for (const key in createStudentForm) {
        createStudentForm[key] = row[key];
      }
    }
  }

  const handleCreate = () => {
    editId.value = 0;
    resetForm();
    createStudentRef.value.open();
  };

  const handleEdit = (row) => {
    currentId.value = row._id
    editId.value = row._id;
    resetForm(row);
    createStudentRef.value.open();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    getData();
  };

  const exportSudentAll = () => {
    exportStudentLoading.value = true;
    getStudentList().then(res => {
      const ws = XLSX.utils.json_to_sheet(res);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "学生信息");
      XLSX.writeFile(wb, "学生信息.xlsx");
      toast("导出学生信息成功")
    }).finally(() => exportStudentLoading.value = false)
  }

  const handleSubmit = () => {
    createStudentFormRef.value.validate((valid) => {
      if (valid) {
        createStudentRef.value.showLoading();
        const fun = editId.value
          ? updateStudent({ ...createStudentForm, _id: currentId.value })
          : createStudent(createStudentForm);
        fun
          .then((res) => {
            getData();
            createStudentRef.value.close();
          })
          .finally(() => createStudentRef.value.hideLoading());
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
    getStudentList(params)
      .then((res) => {
        loading.value = true;
        tableData.value = res;
        total.value = res.length;
      })
      .finally(() => {
        searchLoading.value = false;
        loading.value = false;
      });

    getClassesList().then((res) => {
      classOptions.value = res;
    });
  };

  return {
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
  }

}