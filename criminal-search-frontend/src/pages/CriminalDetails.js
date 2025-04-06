import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CriminalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [criminal, setCriminal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCriminalData = async () => {
            try {
                const response = await fetch(`http://localhost:5070/api/criminals/${id}`);
                if (!response.ok) throw new Error("فشل في جلب بيانات المجرم");

                const data = await response.json();
                setCriminal(data);
                setError(null);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCriminalData();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return "غير معروف";

        try {
            const birthDate = new Date(dateOfBirth);
            if (isNaN(birthDate.getTime())) return "غير معروف";

            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age >= 0 ? `${age} سنة` : "غير معروف";
        } catch (error) {
            console.error("خطأ في حساب العمر:", error);
            return "غير معروف";
        }
    };

    if (loading) return <p className="text-center mt-4 text-lg font-semibold">جاري تحميل البيانات...</p>;
    if (error) return <p className="text-center text-red-500 text-lg font-semibold">⚠️ {error}</p>;
    if (!criminal) return <p className="text-center text-red-500 text-lg font-semibold">لم يتم العثور على بيانات المجرم.</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
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
                            onClick={() => navigate("/search")}
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            العودة للبحث
                        </button>
                        <button 
                            onClick={handlePrint}
                            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md transition-colors flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                            </svg>
                            طباعة التقرير
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    {/* Report Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-bold text-gray-800">تقرير مفصل عن المجرم</h1>
                            <div className="text-sm text-gray-600">
                                <p>رقم الملف: <span className="font-medium">{criminal.caseNumber || "غير معروف"}</span></p>
                                <p>تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Criminal Photo */}
                    {criminal.imagePath && (
                        <div className="flex justify-center py-6 bg-white">
                            <div className="relative">
                                <img 
                                    src={`http://localhost:5070/${criminal.imagePath}`} 
                                    alt="صورة المجرم" 
                                    className="w-40 h-40 object-cover rounded-md border-2 border-gray-200 shadow-sm" 
                                />
                                
                            </div>
                        </div>
                    )}

                    {/* Criminal Details */}
                    <div className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">المعلومات الشخصية</h3>
                                <div className="space-y-3">
                                    <DetailItem label="الاسم الكامل" value={criminal.name} />
                                    <DetailItem label="النمرة المتسلسلة" value={criminal.caseNumber} />
                                    <DetailItem label="العمر" value={calculateAge(criminal.dateOfBirth)} />
                                    <DetailItem label="مكان الميلاد" value={criminal.birthPlace} />
                                    <DetailItem label="الرقم الوطني" value={criminal.nationalId} />
                                    <DetailItem label="الجنسية" value={criminal.nationality} />
                                    <DetailItem label="القبيلة" value={criminal.tribe} />
                                </div>
                            </div>

                            {/* Criminal Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">المعلومات الجنائية</h3>
                                <div className="space-y-3">
                                    <DetailItem label="نوع الجريمة" value={criminal.crimeType} />
                                    <DetailItem label="مكان الجريمة" value={criminal.crimeLocation} />
                                    <DetailItem label="الأوصاف الشخصية" value={criminal.personalDescription} />
                                    <DetailItem label="المميزات الخاصة" value={criminal.specialFeatures} />
                                    <DetailItem label="مكان السكن الدائم" value={criminal.permanentResidence} />
                                    <DetailItem label="الأماكن التي يتردد عليها" value={criminal.usualPlaces} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                   
                </div>
            </div>

            {/* Print Styles */}
            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .container, .container * {
                            visibility: visible;
                        }
                        .container {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            margin: 0;
                            padding: 0;
                        }
                        nav {
                            display: none;
                        }
                    }
                `}
            </style>
        </div>
    );
};

// Reusable Detail Item Component
const DetailItem = ({ label, value }) => (
    <div className="flex mr-4">
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="text-gray-900 mr-4">{value || "غير معروف"}</span>
    </div>
);

export default CriminalDetails;