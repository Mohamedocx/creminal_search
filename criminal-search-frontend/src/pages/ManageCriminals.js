import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageCriminals = () => {
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    caseNumber: "",
    dateOfBirth: "", // يجب تحويله لـ DateTime
    birthPlace: "",
    nationalId: "",
    nationality: "",
    tribe: "",
    personalDescription: "",
    specialFeatures: "",
    permanentResidence: "",
    usualPlaces: "",
    crimeType: "",
    crimeLocation: "",
    image: null
  });

  const navigate = useNavigate();
  const API_URL = "http://localhost:5070/api/Criminals";

  useEffect(() => {
    fetchCriminals();
  }, []);

  const fetchCriminals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setCriminals(response.data);
    } catch (error) {
      console.error("خطأ في جلب بيانات المجرمين:", error);
      setError("فشل تحميل بيانات المجرمين. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked.toString() : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // التحقق من نوع الملف
    if (!file.type.match('image/(jpeg|png|jpg)')) {
      alert('يجب أن تكون الصورة من نوع JPEG أو PNG');
      return;
    }
  
    // التحقق من حجم الملف
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 5MB');
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'name', 'caseNumber', 'dateOfBirth', 'birthPlace',
      'nationalId', 'nationality', 'tribe', 'personalDescription',
      'specialFeatures', 'permanentResidence', 'usualPlaces',
      'crimeType', 'crimeLocation'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`الحقول التالية مطلوبة: ${missingFields.join(', ')}`);
      return;
    }
  
    const form = new FormData();
    
    // Append all fields with exact property names expected by the backend
    form.append('Name', formData.name);
    form.append('CaseNumber', formData.caseNumber);
    form.append('DateOfBirth', new Date(formData.dateOfBirth).toISOString());
    form.append('BirthPlace', formData.birthPlace);
    form.append('NationalId', formData.nationalId);
    form.append('Nationality', formData.nationality);
    form.append('Tribe', formData.tribe);
    form.append('PersonalDescription', formData.personalDescription);
    form.append('SpecialFeatures', formData.specialFeatures);
    form.append('PermanentResidence', formData.permanentResidence);
    form.append('UsualPlaces', formData.usualPlaces);
    form.append('CrimeType', formData.crimeType);
    form.append('CrimeLocation', formData.crimeLocation);
  
    // Append image if exists
    if (formData.image) {
      form.append('Image', formData.image); // Changed from 'imageFile' to 'Image'
      form.append('ImagePath', formData.image.name); // Add ImagePath
    }
  
    try {
      setLoading(true);
      const response = await axios.post(API_URL, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('تم إضافة المجرم بنجاح!');
      resetForm();
      fetchCriminals(); // Refresh the list
    } catch (error) {
      console.error('Error:', error.response?.data);
      let errorMessage = 'حدث خطأ أثناء إضافة المجرم';
      
      // Show validation errors if available
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        errorMessage += `: ${errors.join(', ')}`;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      caseNumber: "",
      arrivalDateTime: "",
      tribe: "",
      arrestedBy: "",
      hasOfficialArrestOrder: "true",
      dateOfBirth: "",
      birthPlace: "",
      nationalId: "",
      nationality: "",
      personalDescription: "",
      specialFeatures: "",
      permanentResidence: "",
      usualPlaces: "",
      crimeType: "",
      crimeLocation: "",
      image: null,
      imagePath: ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المجرم؟")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("تم حذف المجرم بنجاح!");
      fetchCriminals();
    } catch (error) {
      console.error("خطأ في حذف المجرم:", error);
      alert("فشل حذف المجرم. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Header */}
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

      {/* Add Criminal Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">إضافة مجرم جديد</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "الاسم الكامل", field: "name", type: "text", required: true },
            { label: "رقم القضية", field: "caseNumber", type: "text", required: true },
            { label: "تاريخ ووقت الوصول", field: "arrivalDateTime", type: "datetime-local" },
            { label: "تاريخ الميلاد", field: "dateOfBirth", type: "date" },
            { label: "مكان الميلاد", field: "birthPlace", type: "text" },
            { label: "الرقم الوطني", field: "nationalId", type: "text", required: true },
            { label: "الجنسية", field: "nationality", type: "text" },
            { label: "القبيلة", field: "tribe", type: "text" },
            { label: "الوصف الشخصي", field: "personalDescription", type: "textarea" },
            { label: "المميزات الخاصة", field: "specialFeatures", type: "textarea" },
            { label: "مكان السكن الدائم", field: "permanentResidence", type: "text" },
            { label: "الأماكن التي يتردد عليها", field: "usualPlaces", type: "text" },
            { label: "نوع الجريمة", field: "crimeType", type: "text", required: true },
            { label: "مكان وقوع الجريمة", field: "crimeLocation", type: "text" },
          ].map(({ label, field, type, required = false }) => (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={required}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              ) : (
                <input
                  type={type}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={required}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}

          {/* Image Upload */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">صورة المجرم</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {formData.imagePath && (
              <p className="text-sm text-gray-500 mt-1">تم اختيار: {formData.imagePath}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md shadow-sm flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري المعالجة...
                </>
              ) : (
                "إضافة المجرم"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Criminals List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-700">المجرمون المسجلون</h2>
          <div className="text-sm text-gray-500">
            {criminals.length} {criminals.length === 1 ? "سجل" : "سجلات"} موجودة
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : criminals.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد سجلات للمجرمين</h3>
            <p className="mt-1 text-sm text-gray-500">إضافة مجرم جديد للبدء</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم القضية</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العمر</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع الجريمة</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الرقم الوطني</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصورة</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {criminals.map((criminal) => (
                  <tr key={criminal.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{criminal.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{criminal.caseNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{calculateAge(criminal.dateOfBirth)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{criminal.crimeType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{criminal.nationalId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {criminal.imagePath ? (
                        <img
                          src={`http://localhost:5070${criminal.imagePath}`}
                          alt={criminal.name}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/40";
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <button
                        onClick={() => handleDelete(criminal.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCriminals;