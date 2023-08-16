import {ElNotification,ElMessageBox} from 'element-plus'
import nProgress from 'nprogress';
import * as XLSX from "xlsx";

export const toast = (message,type='success',dangerouslyUseHTMLString=true) =>ElNotification({message,type,dangerouslyUseHTMLString,duration:3000})
export const showModal = (content="提示内容",type="warning",title="") => ElMessageBox.confirm(content,title,{confirmButtonText:"确定",cancelButtonText:"取消",type});

export const showFullLoading = ()=>nProgress.start()
export const hideFullLoading = ()=>nProgress.done()

/**
* 加密函数
* @param str 待加密字符串
* @returns {string}
*/
export const  str_encrypt = (str) =>{
   var c = String.fromCharCode(str.charCodeAt(0) + str.lengteh);
   for (var i = 1; i < str.length; i++) {
       c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
   }

   return encodeURIComponent(c);
}

export const importFile = (filelist,fn)=>{
    let filename = filelist.value[0].name.split(".")[1];
    if (filename !== "xls" && filename !== "xlsx" && filename !== "csv")
      return toast(
        "文件不属于xls/xlsx/csv中的一种，无法上传，请切换文件",
        "error"
      );

    const file = filelist.value[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file.raw);
    reader.onload = (e) => {
      const fileString = e.target.result;
      const workbook = XLSX.read(fileString, {
        type: "binary",
      });
      const wsname = workbook.SheetNames[0];

      const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
      console.log('ws :>> ', ws);
      let prmoseAll = [];

      ws.forEach((item) => {
        prmoseAll.push(fn(item));
      });
      Promise.all(prmoseAll).then((res) => {
        toast("导入成功");
        getData();
        dialogVisible.value = false;
      });
    };
}