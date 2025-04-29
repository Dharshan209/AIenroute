import React, { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw, Calendar, User, Clock } from 'lucide-react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would use your API key
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial+intelligence&sortBy=publishedAt&language=en&apiKey=ce37e8d7218b4dc9b6a82cbd971a51be`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">AI News Hub</h1>
          <button 
            onClick={fetchNews}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title area */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Latest AI News
          </h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Articles grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-10">No articles found. Try a different search term.</p>
            ) : (
              articles.map((article, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {article.urlToImage ? (
                    <div className="relative h-48 w-full">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/400/240";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                      <img src="/api/placeholder/400/240" alt="placeholder" className="h-32 w-32 opacity-50" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-gray-500 mb-2 gap-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                      {article.author && (
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          {article.author.length > 20 ? article.author.substring(0, 20) + '...' : article.author}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{article.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {new Date(article.publishedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Read more
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;