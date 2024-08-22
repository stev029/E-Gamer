import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/Home'
import Search from './components/SearchItem'
import Auth from './components/auth';
import Detail from './components/detail';
import Cart from "./components/cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/product/:itemId" element={<Detail/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/register" element={<Auth/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
