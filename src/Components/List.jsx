import { useEffect, useState} from 'react';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';
import { X, BookOpen, Copy, Bookmark, Tag, Search, ChevronRight, ChevronDown, ChevronLeft,MessageCircleCode } from 'lucide-react';
import ChatPage from './chat';

function PromptList() {
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchPrompts() {
      setLoading(true);
      try {
        let { data: Prompt, error } = await supabase
          .from('Promt')
          .select('*');
        
        if (error) throw error;
        
        setPrompts(Prompt);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(Prompt.map(item => item.Category))];
        setCategories(uniqueCategories);


      } catch (err) {
        console.error('Error fetching Prompts:', err);
        setError('Failed to load prompts');
      } finally {
        setLoading(false);
      }
    }

    fetchPrompts();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSearchTerm('');
  };

  const navigate = useNavigate();
  
  // Updated handleChat function to pass the prompt text using navigate
  const handleChat = (promptText) => {
    navigate('/ChatPage', { 
      state: { firstMessage: promptText }
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredPrompts = prompts.filter(prompt => 
    (selectedCategory ? prompt.Category === selectedCategory : true) &&
    (searchTerm ? 
      prompt.Category.toLowerCase().includes(searchTerm.toLowerCase()) || 
      prompt['Small Description'].toLowerCase().includes(searchTerm.toLowerCase())
      : true)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 text-center p-6 bg-red-50 rounded-lg text-red-600 mx-auto max-w-md shadow-sm">
        <p className="font-bold text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Prompt Library</h1>
          <p className="text-white/90 max-w-2xl">Discover and use effective AI prompts that help you create better content, solve problems, and improve your workflow</p>
        
          {/* Search Bar */}
          <div className="mt-6 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-white/60" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search prompts..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden pt-4">
        {/* Sidebar Toggle Button (Mobile) */}
        <button 
          className="md:hidden fixed z-20 left-0 top-24 bg-indigo-600 text-white p-2 rounded-r-lg shadow-md"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Sidebar */}
        <div className={`w-64 bg-white shadow-sm border-r border-slate-200 shrink-0 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
          fixed md:static h-[calc(100vh-12rem)] z-10`}>
          <div className="p-4">
            <h2 className="font-semibold text-lg text-slate-800 mb-4 flex items-center">
              <Tag size={18} className="mr-2 text-indigo-600" />
              Categories
            </h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center
                    ${!selectedCategory ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Prompts
                </button>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center
                      ${selectedCategory === category ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          <div className="max-w-5xl mx-auto">
            {/* Category Header */}
            {selectedCategory && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
                <h2 className="text-xl font-medium text-slate-800 flex items-center">
                  <Tag size={18} className="mr-2 text-indigo-600" />
                  {selectedCategory}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-slate-500 hover:text-indigo-600"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Grid cards */}
            {filteredPrompts.length === 0 ? (
              <div className="text-center p-12 bg-white rounded-lg shadow-sm border border-slate-100">
                <p className="text-slate-500 text-lg">No prompts found</p>
                {(searchTerm || selectedCategory) && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPrompts.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-slate-100"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {item.Category}
                        </span>
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                          <Bookmark size={18} />
                        </button>
                      </div>
                      
                      <h2 className="text-lg font-bold text-slate-800 mb-3 line-clamp-1">{item['Small Description']}</h2>
                      <p className="text-slate-600 text-sm line-clamp-2 mb-6 h-10">{item['Actual Prompt'].substring(0, 100)}...</p>
                      
                      <button 
                        onClick={() => setSelectedPrompt(item)}
                        className="w-full flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:bg-indigo-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        <BookOpen size={16} />
                        View Prompt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
              onClick={() => setSelectedPrompt(null)}
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-3">
                  {selectedPrompt.Category}
                </span>
                <h2 className="text-2xl font-bold text-slate-900">{selectedPrompt['Small Description']}</h2>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-5 mb-6 relative border border-slate-100">
                <button 
                  onClick={() => handleCopy(selectedPrompt['Actual Prompt'])}
                  className="absolute top-3 right-3 text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-white transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                <h3 className="text-sm font-medium text-slate-500 mb-3">Prompt Text:</h3>
                <p className="text-slate-800 whitespace-pre-wrap text-sm leading-relaxed font-light">{selectedPrompt['Actual Prompt']}</p>
              </div>
              
              <div className="flex justify-between items-center gap-3">
                {copied && (
                  <span className="text-emerald-600 text-sm font-medium px-3 py-1 bg-emerald-50 rounded-full">Copied to clipboard!</span>
                )}
                {!copied && <div></div>}
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedPrompt(null)}
                    className="px-5 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => handleChat(selectedPrompt['Actual Prompt'])}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow transition-all flex items-center gap-2"
                  >
                    <MessageCircleCode size={16} />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptList;