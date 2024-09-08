import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { StateProvider } from './state/State.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(

  // <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <StateProvider>
          <App />
        </StateProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  // </React.StrictMode >

)
