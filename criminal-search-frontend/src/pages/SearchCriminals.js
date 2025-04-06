import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchCriminals = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("⚠️ يرجى إدخال اسم المجرم أو رقم البلاغ قبل البحث.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5070/api/criminals/search?query=${query}`);

      if (!response.ok) {
        throw new Error("لم يتم العثور على أي نتائج.");
      }

      const data = await response.json();

      if (data.length === 0) {
        alert("❌ لم يتم العثور على أي مجرمين بهذه البيانات.");
        return;
      }

      navigate("/search-results", { state: { searchTerm: query } });

    } catch (error) {
      alert(`❌ خطأ: ${error.message}`);
      console.error("❌ خطأ في البحث:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleManageCriminals = () => {
    navigate("/manage");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                    </svg>
                    نظام البحث عن المجرمين
                </h1>
          <div className="flex space-x-4 space-x-reverse">
            <button 
              onClick={handleManageCriminals}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              إدارة البيانات
            </button>
            <a href="/analytics" className="hover:text-blue-300 flex items-center transition duration-300">
            <button 
            
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
             شاشة التحليلات
            </button>
            </a>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              تسجيل الخروج
            </button>
          </div>
        </div>
      </nav>

      {/* محتوى الصفحة الرئيسي */}
      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">البحث في سجل المجرمين</h2>
            <p className="text-gray-600">يمكنك البحث باستخدام اسم المجرم أو رقم البلاغ أو أي بيانات أخرى</p>
          </div>
          
          <div className="flex flex-col space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل اسم المجرم أو رقم البلاغ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <button
                onClick={handleSearch}
                className="absolute left-0 top-0 h-full px-6 bg-blue-700 text-white rounded-l-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span className="mr-1">بحث</span>
              </button>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-sm text-blue-700">
                    للحصول على نتائج أفضل، استخدم المعلومات الدقيقة مثل رقم البلاغ أو الاسم الكامل للمجرم.
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