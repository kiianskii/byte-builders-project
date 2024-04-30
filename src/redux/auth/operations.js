import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearToken, setToken, userApi } from '../../config/userAPI'


export const registerThunk = createAsyncThunk('auth/register', async (credentials, thunkApi) => {
	try {
		const { data } = await userApi.post('/api/auth/sign-up', credentials)
		setToken(data.token)
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})

export const signInThunk = createAsyncThunk('auth/sign-in', async (credentials, thunkApi) => {
	try {
		const { data } = await userApi.post('/api/auth/sign-in', credentials)
		setToken(data.token)
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})

export const signOutThunk = createAsyncThunk('auth/sign-out', async (_, thunkApi) => {
	try {
		await userApi.post('/api/auth/sign-out')
		clearToken()
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})

export const refreshThunk = createAsyncThunk('auth/refresh', async (_, thunkApi) => {
	const savedToken = thunkApi.getState().auth.token
	if (!savedToken) {
		return thunkApi.rejectWithValue('Unable to fetch user')
	}
	setToken(savedToken)
	try {
		const { data } = await userApi.get('/api/users/current')
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})