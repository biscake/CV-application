import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/reset.css'
import './styles/index.css'
import Header from './components/header'
import paperIcon from './assets/paper-icon.svg'
import App from './components/app'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
)
