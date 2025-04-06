import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <App />
   {/* ✅ تذييل الصفحة */}
<footer className="w-full bg-gray-200 text-center text-gray-700 py-3 mt-8 shadow-inner">
  {new Date().getFullYear()} إعداد : سلمي احمد عبدالله 
-امنيه محمد حسن 
- رانيا سعيد عوض سرور|
</footer>

  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
