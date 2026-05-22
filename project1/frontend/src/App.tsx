import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatInterface from './components/ChatInterface'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:roomId" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
