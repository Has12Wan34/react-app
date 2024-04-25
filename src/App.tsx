import './App.css';
import './styles/home.css';
import './styles/form.css';
import './styles/style.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Style from './pages/Style';
import Form from './pages/Form';
import Appbar from './components/appbar';

function App() {
  return (
    <Appbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/layout_style" element={<Style/>} />
          <Route path="/form_table" element={<Form/>} />
        </Routes>
      </BrowserRouter>
    </Appbar>
  );
}
export default App;

