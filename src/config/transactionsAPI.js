import axios from 'axios'


export const transactionsApi = axios.create({
	baseURL: 'https://wallet.b.goit.study/',
})

export const setTokenTrans = token => {
	transactionsApi.defaults.headers.common.Authorization = `Bearer ${token}`
}
export const clearTokenTrans = () => {
	transactionsApi.defaults.headers.common.Authorization = ``
}