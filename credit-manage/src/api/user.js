import request from "~/utils/reqests";

export const login = (params)=>request.post('/users/login', params)
export const logout = (params)=>request.post('/users/logout', params)

export const getClassesList = ()=>request.get('/users/classes')
export const addClasses = (params)=>request.post('/users/addClasses', params)
export const editClassesApi = (params)=>request.post('/users/addClasses', params)

export const getDepartmentList = ()=>request.get('/users/department')
 