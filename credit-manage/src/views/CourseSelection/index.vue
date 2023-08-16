<template>

  <el-container class="bg-white rounded" :style="{height:h+'px'}">
    <CourseMenu ref="AsideMenuRef" @change="handleAsideChange"/>
    <CourseMain />
  </el-container>
  
</template>

<script setup>
import {ref} from "vue"
import storage from '~/utils/storage'
import CourseMenu from "~/components/CourseMenu.vue";
import CourseMain from "~/components/CourseMain.vue";
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight-64 - 44 -40

const userinfo = storage.getItem('userinfo')


const AsideMenuRef  =  ref(null)


const handleAsideChange = (item)=>{
  console.log('item :>> ', item);
}

</script>