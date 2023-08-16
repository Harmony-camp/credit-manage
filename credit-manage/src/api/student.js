import request from "~/utils/reqests";

export const getStudentList = (params)=>request.get('/student/getlist',params)
export const deleteStudent = (id)=>request.post('/student/delete',{id})
export const createStudent = (params)=>request.post('/student/create',params)
export const updateStudent = (params)=>request.post('/student/update',params)


