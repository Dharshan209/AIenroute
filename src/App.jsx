import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Components/Header';
import Login from './Components/login';
import PromtList from './Components/List';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <PromtList />
            </>
          } />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
