import { useState } from "react";
import SearchCriminals from "./SearchCriminals";
import SearchResults from "./SearchResults";

const SearchPage = () => {
    const [criminals, setCriminals] = useState([]);

    const fetchCriminals = async (query) => {
        console.log("🔍 Fetching criminals with query:", query);
        try {
            const response = await fetch(`http://localhost:5070/api/criminals/search?query=${query}`);
            if (!response.ok) throw new Error("فشل البحث");
            const data = await response.json();
            setCriminals(data);
        } catch (error) {
            console.error("❌ خطأ في جلب البيانات:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <SearchCriminals onSearch={fetchCriminals} />
            <SearchResults criminals={criminals} />
        </div>
    );
};

export default SearchPage;
