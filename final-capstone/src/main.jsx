import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Sorting } from './components/MainPages/sortbutton.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Sorting> 
            <App />
        </Sorting>
    </React.StrictMode>
    
    )
