import { ref } from "vue";
import { getClassesList,addClasses } from "~/api/user";
import storage from "~/utils/storage"

export default function () {

  const userinfo = storage.getItem('userinfo');
  const title = ref("添加班级")
  const classesList = ref([]);
  const classesColumns = ref([]);
  const classesForm = ref([]);
  const classesRules = ref([]);
  const classesRef = ref(null);
  const getClassList = () => {
    getClassesList().then((res) => {
      classesList.value = res;
      classesColumns.value = [
        {
          prop: "className",
          key: "name",
          label: "班级名称",
        },
      ];
      classesForm.value = [
        {
          label: "班级名称",
          component: "el-input",
          prop: "className",
        },
        {
          label: "班级名称",
          component: "el-select",
          children:[
            {
              label: "班级名称",
              prop: "123",
              value:4,
              component: "el-option",
            },
            {
              label: "班级名称",
              prop: "abc",
              value:1,
              component: "el-option",
            },
          ]
        },

      ]
      classesRules.value = {
          className:[
            { required: true, message: "请输入班级名称", trigger: "blur" },
          ]
        }
      
    });
  };

  const editClass = (index,row)=>{
    title.value = index +"班级"

  }

  const deleteClass = (id)=>{
    console.log("删除班级", id);
  }

  const submitClass = (form)=>{
    addClasses({...form,role:userinfo.role}).then((res)=>{
      classesRef.value.close()
    }).catch((err)=> Promise.reject(err)) 
  }
  return {
    title,
    classesList,
    classesColumns,
    classesForm,
    classesRules,
    getClassList,
    deleteClass,
    submitClass,
    editClass
  }
}