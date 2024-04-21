import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Form from './page/Form';
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Form/>} />
    </Routes>
  </BrowserRouter>
  );
}
export default App;