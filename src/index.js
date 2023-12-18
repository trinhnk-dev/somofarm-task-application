import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App' // Đảm bảo import từ đúng đường dẫn
import { Provider } from 'react-redux'
import { store } from './features/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
