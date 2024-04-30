import { createAsyncThunk } from '@reduxjs/toolkit'
import { monoApi } from '../../config/monoAPI'

// Не забудьте що має бути 1 запит на годину, не більше!!!!

export const currencyThunk = createAsyncThunk('bank/currency', async (_, thunkApi) => {
	try {
        const { data } = await monoApi.get('/bank/currency')
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})