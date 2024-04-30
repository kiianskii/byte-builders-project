import axios from 'axios'

export const transactionsApi = axios.create({
	baseURL: 'https://wallet.b.goit.study/',
})
