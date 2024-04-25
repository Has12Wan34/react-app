import './App.css';
import './styles/home.css';
import './styles/form.css';
import './styles/style.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Style from './pages/Style';
import Form from './pages/Form';
import Appbar from './components/appbar';

function App() {
  return (
    <BrowserRouter>
      <Appbar>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}/>
          <Route path="/home" element={<Home/>} />
          <Route path="layout_style" element={<Style/>} />
          <Route path="form_table" element={<Form/>} />
        </Routes>
      </Appbar>
    </BrowserRouter>
  );
}

export default App;


