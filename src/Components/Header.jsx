import { User, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };
    
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-amber-300" />
            <h1 className="text-2xl font-bold text-white tracking-tight">AI<span className="text-amber-300">enroute</span></h1>
          </div>

          {/* Navigation - could be expanded later */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white/90 hover:text-white text-sm font-medium transition">Home</a>
            <a href="#" className="text-white/90 hover:text-white text-sm font-medium transition">Discover</a>
            <a href="#" className="text-white/90 hover:text-white text-sm font-medium transition">About</a>
          </nav>

          {/* Login Button */}
          <button 
            onClick={handleLoginClick} 
            className="flex items-center gap-2 bg-white hover:bg-amber-50 text-indigo-600 px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow border border-transparent"
          >
            <User size={18} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;