import axios from 'axios'

export const monoApi = axios.create({
	baseURL: 'https://api.monobank.ua/',
})
