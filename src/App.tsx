import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Form from './page/Form';
import Appbar from './component/appbar';

function App() {
  return (
    <Appbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Form/>} />
        </Routes>
      </BrowserRouter>
    </Appbar>
  );
}
export default App;

