import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import './App.css'
import HomeTab from './pages/HomeTab/HomeTab'


import Layout from './components/Layout/Layout'

function App() {


  return (
    <Suspense fallback={null}>
       <Routes>
					<Route path='/' element={<Layout />}>
					<Route index element={<HomeTab />} />
					</Route>
					<Route path='*' element={<HomeTab />} />
		</Routes>

</Suspense>
  )
}

export default App
