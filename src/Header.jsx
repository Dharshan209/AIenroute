import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div>
            <h1 className="text-2xl font-bold text-white">AI Prompts</h1>
          </div>

          {/* Login Button */}
          <button className="flex items-center gap-2 bg-blue text-yellow-600 hover:bg-blue-50 px-4 py-2 rounded-full font-medium transition-colors duration-200">
            <User size={18} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;