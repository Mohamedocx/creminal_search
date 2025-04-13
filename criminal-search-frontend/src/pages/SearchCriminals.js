import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchCriminals = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('⚠️ يرجى إدخال اسم المجرم أو رقم البلاغ قبل البحث.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5070/api/criminals/search?query=${query}`
      );

      if (!response.ok) {
        throw new Error('لم يتم العثور على أي نتائج.');
      }

      const data = await response.json();

      if (data.length === 0) {
        alert('❌ لم يتم العثور على أي مجرمين بهذه البيانات.');
        return;
      }

      navigate('/search-results', { state: { searchTerm: query } });
    } catch (error) {
      alert(`❌ خطأ: ${error.message}`);
      console.error('❌ خطأ في البحث:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleManageCriminals = () => {
    navigate('/manage');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <nav className="text-white bg-blue-800 shadow-lg">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto">
          <h1 className="flex items-center text-2xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              />
            </svg>
            نظام البحث عن المجرمين
          </h1>
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={handleManageCriminals}
              className="flex items-center px-4 py-2 transition-colors bg-blue-700 rounded-md hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              إدارة البيانات
            </button>
            <a
              href="/analytics"
              className="flex items-center transition duration-300 hover:text-blue-300"
            >
              <button className="flex items-center px-4 py-2 transition-colors bg-blue-700 rounded-md hover:bg-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                شاشة التحليلات
              </button>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 transition-colors bg-red-600 rounded-md hover:bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              تسجيل الخروج
            </button>
          </div>
        </div>
      </nav>

      {/* محتوى الصفحة الرئيسي */}
      <main className="container flex flex-col items-center px-4 py-12 mx-auto">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              البحث في سجل المجرمين
            </h2>
            <p className="text-gray-600">
              يمكنك البحث باستخدام اسم المجرم أو رقم البلاغ أو أي بيانات أخرى
            </p>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل اسم المجرم أو رقم البلاغ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-5 py-3 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSearch}
                className="absolute top-0 left-0 flex items-center h-full px-6 text-white transition-colors bg-blue-700 rounded-l-lg hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mr-1">بحث</span>
              </button>
            </div>

            <div className="p-4 border-l-4 border-blue-500 rounded bg-blue-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-sm text-blue-700">
                    للحصول على نتائج أفضل، استخدم المعلومات الدقيقة مثل رقم
                    البلاغ أو الاسم الكامل للمجرم.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchCriminals;
