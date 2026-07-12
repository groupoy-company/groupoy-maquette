window.addEventListener('error', ev => { try { sessionStorage.setItem('__bootErr', String(ev.error && ev.error.stack || ev.message)); } catch(e){} });
import React from 'react'
import ReactDOM from 'react-dom/client'
import SimulateurRuches from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimulateurRuches />
  </React.StrictMode>,
)
