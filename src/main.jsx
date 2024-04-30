
import ReactDOM from 'react-dom/client'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        {/* <ToastContainer autoClose={2000} /> */}
      </PersistGate>
    </Provider>
  </BrowserRouter>,
)
