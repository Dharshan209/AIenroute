import React, { useState } from 'react';
import { Github } from 'lucide-react';
import { supabase } from './supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn =async()=>{
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
  }

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col md:flex-row" style={{
      backgroundImage: "url('/api/placeholder/1920/1080')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col bg-white rounded-lg m-4 shadow-xl">
        {/* Logo */}
        <div className="mb-14">
          <div className="flex items-center">
            <span className="ml-2 text-blue-600 text-xl font-medium">Aienroute</span>
          </div>
        </div>

        {/* Welcome text */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>

        {/* Auth providers */}
        <div className="mb-6 space-y-3">
          <button className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded text-sm transition duration-200 border border-gray-300">
            <Github size={18} className="mr-2" />
            Continue with GitHub
          </button>
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center bg-white-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded text-sm transition duration-200 border border-gray-300">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
              <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
              <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
              <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Email/Password form */}
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-800 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot Password?</a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-800 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-800">Sign Up Now</a>
          </p>
        </div>

        {/* Terms */}
        <div className="mt-10 text-xs text-gray-500">
          <p>
            By continuing, you agree to Aienroute's <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>, and to receive periodic emails with updates.
          </p>
        </div>
      </div>

      {/* Right side - Testimonial */}
      <div className="hidden md:flex md:w-1/2 p-8 items-center justify-center">
        <div className="max-w bg-white bg-opacity-90 p-8 rounded-lg shadow-xl">
          <div className="text-blue-600 text-6xl mb-6">"</div>
          <p className="text-gray-800 text-xl leading-relaxed">
            Working with @Aienroute has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.
          </p>
          <div className="mt-6 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <span>T</span>
            </div>
            <span className="ml-3 text-gray-700">@dharshan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;