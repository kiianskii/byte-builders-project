import axios from 'axios'

export const userApi = axios.create({
	baseURL: 'https://wallet.b.goit.study/',
})

export const setToken = token => {
	userApi.defaults.headers.common.Authorization = `Bearer ${token}`
}
export const clearToken = () => {
	userApi.defaults.headers.common.Authorization = ``
}