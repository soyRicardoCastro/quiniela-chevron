import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
