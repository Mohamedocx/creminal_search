import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SearchCriminals from "./pages/SearchCriminals";
import SearchResults from "./pages/SearchResults";
import ManageCriminals from "./pages/ManageCriminals";
import CriminalDetails from "./pages/CriminalDetails";
import CriminalAnalytics from "./pages/CriminalAnalytics"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchCriminals />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/manage" element={<ManageCriminals />} />
        <Route path="/criminal/:id" element={<CriminalDetails />} />
        <Route path="/analytics" element={<CriminalAnalytics />} /> 
      </Routes>
    </Router>
  );
}

export default App;
