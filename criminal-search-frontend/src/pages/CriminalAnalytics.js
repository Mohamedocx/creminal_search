import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CriminalAnalytics = () => {
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const response = await axios.get("http://localhost:5070/api/criminals");
        setCriminals(response.data);
        setLoading(false);
      } catch (err) {
        setError("فشل في جلب البيانات");
        setLoading(false);
      }
    };
    fetchCriminals();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "غير معروف";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const groupBy = (key, data) => {
    return data.reduce((acc, item) => {
      const value = item[key] || "غير معروف";
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  };

  const formatDataForChart = (groupedData) => {
    return Object.keys(groupedData).map((key) => ({ name: key, value: groupedData[key] }));
  };

  const enhancedCriminals = criminals.map((criminal) => ({
    ...criminal,
    age: calculateAge(criminal.dateOfBirth),
  }));

  const ageData = formatDataForChart(groupBy("age", enhancedCriminals));
  const tribeData = formatDataForChart(groupBy("tribe", criminals));
  const crimeLocationData = formatDataForChart(groupBy("crimeLocation", criminals));

  if (loading) return <p>جاري تحميل البيانات...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5">
      {/* أزرار التحكم */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">نظام إدارة المجرمين</h1>
        <button
          onClick={() => navigate("/search")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          العودة إلى البحث
        </button>
      </div>


      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">التوزيع حسب العمر</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">التوزيع حسب القبيلة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tribeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">التوزيع حسب موقع الجريمة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={crimeLocationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CriminalAnalytics;
