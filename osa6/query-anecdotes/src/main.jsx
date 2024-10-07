import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifContextProvider } from './NotifContext' 

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotifContextProvider>
      <App />
    </NotifContextProvider>
  </QueryClientProvider>
)