<template>
  <div class="f-menu" :style="{width:$store.state.asideWidth}">
    <el-menu
      unique-opened 
      :default-active="defaultActive"
      class=" border-0"
      :collapse="isCollapse"
      :collapse-transition="false"	
      @select="handleSelect"
    >
      <template v-for="(item,index) in asideMenus" :key="index">
       
      <el-menu-item  :index="item.path">
        <el-icon> <component :is="item.icon"></component></el-icon>
        <span>{{item.name}}</span>
      </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import {computed,ref} from 'vue'
import  {useStore} from 'vuex'
import storage from '~/utils/storage';
import {menus} from '~/constants/menus'


const store = useStore()
const router  = useRouter()

const isCollapse = computed(()=>!(store.state.asideWidth == "250px"))
const defaultActive = computed(()=>(store.state.pathActive))
const asideMenus = computed(()=>storage.getItem("menus"))



const handleSelect = (e)=>{
  router.push(e)
}
</script>

<style>
.f-menu{
  transition: all .2s;
  top: 64px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-gray-50;
}
.f-menu::-webkit-scrollbar{
  width: 0;
}
</style>