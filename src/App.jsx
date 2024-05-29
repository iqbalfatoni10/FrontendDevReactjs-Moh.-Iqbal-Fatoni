// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailRestaurant from './pages/DetailRestaurant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/FrontendDevReactjs-Moh.-Iqbal-Fatoni" element={<HomePage />} />
        <Route path="detail-restaurant/:id" element={<DetailRestaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
