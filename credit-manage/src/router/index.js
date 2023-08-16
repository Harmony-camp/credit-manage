import { createRouter, createWebHashHistory } from 'vue-router';

import Admin from '../layout/index.vue'
import Index from '~/views/Home.vue'

const routes = [
  {
    path: '/',
    component: Admin,
    name: 'admin',
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index,
        name: 'index',
        meta: {
          title: "首页"
        }
      },
      {
        path: '/student',
        component: () => import("~/views/student/index.vue"),
        name: '学生管理',
        meta: {
          title: "学生管理",
          role:[3,2]
        }
      },
      {
        path: '/teacher',
        component: () => import("~/views/teacher/index.vue"),
        name: '教师管理',
        meta: {
          title: "教师管理",
          role:[3]
        }
      },
      {
        path: '/course',
        component: () => import("~/views/course/index.vue"),
        name: '课程管理',
        meta: {
          title: "课程管理",
          role:[3],
          
        }
      },
      {
        path: '/selectCourse',
        component: () => import("~/views/CourseSelection/index.vue"),
        name: '学生选课',
        meta: {
          title: "学生选课",
           role:[3,1]
        }
      },
      {
        path: '/credit',
        component: () => import("~/views/credit/index.vue"),
        name: '成绩管理',
        meta: {
          title: "成绩管理",
          role:[3,2]
        }
      },
      {
        path: '/setting',
        component: () => import("~/views/other/index.vue"),
        name: '其他',
        meta: {
          title: "其他",
          role:[3]
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import("~/views/login.vue"),
    name: 'login',
    meta: {
      title: "登录页"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotF",
    component: () => import("~/views/404.vue")
  },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})






