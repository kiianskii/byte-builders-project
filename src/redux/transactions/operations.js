import { createAsyncThunk } from '@reduxjs/toolkit'
import { transactionsApi } from '../../config/transactionsAPI'



export const transactionsCategoriesThunk = createAsyncThunk('trans/categories', async (_, thunkApi) => {
	try {
		const { data } = await transactionsApi.get('/api/transaction-categories')
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})

export const userTransactionsThunk = createAsyncThunk('trans/user-transactions', async (_, thunkApi) => {
	try {
		const { data } = await transactionsApi.get('/api/transactions')
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})

export const sendTransactionThunk = createAsyncThunk('trans/send-transaction', async (credentials, thunkApi) => {
	try {
		const { data } = await transactionsApi.post('/api/transactions', credentials)
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})

export const editTransactionThunk = createAsyncThunk('trans/edit-transaction', async ({ id, credentials }, thunkApi) => {
	try {
		const { data } = await transactionsApi.patch(`/api/transactions/${id}`, credentials)
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})

export const deleteTransactionThunk = createAsyncThunk('trans/delete-transaction', async (id, thunkAPI) => {
	try {
     await transactionsApi.delete(`/api/transactions/${id}`, id)
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})

export const transactionByDateThunk = createAsyncThunk('trans/transaction-by-date', async (credentials, thunkApi) => {
	try {
		const { data } = await transactionsApi.post('/api/transactions-summary', credentials)
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})
