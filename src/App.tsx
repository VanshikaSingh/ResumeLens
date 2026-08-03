import { useState } from 'react'


import './App.css'
import "./pages/Home"
import Home from './pages/Home'


function App() {
  const [messege, setMessage] = useState("");
  const testBackend = async () => {
  const response = await fetch("http://localhost:3000");
  const data = await response.json();

  setMessage(data.message);
};

  return (
  <>
  <Home />
  </>
  )
}

export default App
