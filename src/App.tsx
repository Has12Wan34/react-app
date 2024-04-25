import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Style from './page/Style';
import Form from './page/Form';
import Appbar from './component/appbar';

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

