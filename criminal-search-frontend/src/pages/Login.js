import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5070/api/auth/login',
        { username, password }
      );
      if (response.status !== 200) {
        alert('خطأ في تسجيل الدخول');
        return;
      }

      localStorage.setItem('token', response.data.token);

      navigate('/search');
    } catch (error) {
      alert('خطأ في تسجيل الدخول');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">تسجيل الدخول</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
