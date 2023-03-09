import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/PageCART';
import { useSelector } from 'react-redux';
import NP from './pages/NP';
import PagePROD from './pages/PagePROD';
import PageCATE from './pages/PageCATE';
import PageORDER from './pages/PageORDER';
import Footer from './components/Footer';
import AdminDash from './pages/AdminDash';
import PageEDIT from './pages/PageEDIT';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {user && (
            <>
              <Route path="/orders" element={<PageORDER />} />
              <Route path="/cart" element={<Cart />} />
            </>
          )}
          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDash />} />
              <Route path="/product/:id/edit" element={<PageEDIT />} />
            </>
          )}
          <Route path="/products/:id" element={<PagePROD />} />
          <Route path="/newprod" element={<NP />} />
          <Route path="/category/:category" element={<PageCATE />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
