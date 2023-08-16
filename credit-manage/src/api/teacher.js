import request from "~/utils/reqests";

export const getTeacherList = (params)=>request.get('/teachers/list',params)
export const createTeacher = (params)=>request.post('/teachers/create',params)
export const updateTeacher = (params)=>request.post('/teachers/update',params)