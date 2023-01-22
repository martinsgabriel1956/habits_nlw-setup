import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query';
import * as Toast from '@radix-ui/react-toast';
import { App } from './App'
import { queryClient } from './lib/react-query'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast.Provider swipeDirection='right' >
        <App />
      </Toast.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
