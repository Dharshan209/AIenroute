import React, { useState } from 'react';
import { Github, Sparkles } from 'lucide-react';
import { supabase } from './supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-violet-700 flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center">
            <Sparkles className="text-amber-400 h-6 w-6 mr-2" />
            <span className="text-indigo-600 text-xl font-semibold tracking-tight">AI<span className="text-indigo-500">enroute</span></span>
          </div>

          {/* Welcome text */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="text-slate-500 mt-1 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Auth providers */}
          <div className="mb-6 space-y-3">
            <button className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 shadow-sm hover:shadow">
              <Github size={18} className="mr-2" />
              Continue with GitHub
            </button>
            <button 
              onClick={handleGoogleSignIn} 
              className="w-full flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 shadow-sm hover:shadow"
              disabled={loading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
              </svg>
              {loading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="px-3 text-xs text-slate-400 font-medium">or continue with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Email/Password form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Forgot Password?</a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow mt-2 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account? <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign Up Now</a>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-8 text-xs text-slate-400 text-center">
            <p>
              By continuing, you agree to AIenroute's <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Testimonial */}
      <div className="hidden md:flex md:w-1/2 p-8 items-center justify-center">
        <div className="max-w-md bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="text-indigo-500 opacity-90 text-6xl mb-4">"</div>
          <p className="text-slate-800 text-lg leading-relaxed">
            Working with AIenroute has transformed how I create content. The prompt library is invaluable and the interface is so intuitive. It's become an essential part of my creative workflow.
          </p>
          <div className="mt-6 flex items-center border-t border-slate-100 pt-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-medium shadow-sm">
              D
            </div>
            <div className="ml-3">
              <p className="text-slate-800 font-medium">Dharshan S.</p>
              <p className="text-slate-500 text-sm">Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;