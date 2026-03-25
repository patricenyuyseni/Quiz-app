import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Quiz } from './components/quizapp'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client = {queryClient}>
      <Quiz/>
    </QueryClientProvider>
  )
}

export default App
