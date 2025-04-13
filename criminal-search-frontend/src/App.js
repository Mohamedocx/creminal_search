import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SearchCriminals from './pages/SearchCriminals';
import SearchResults from './pages/SearchResults';
import ManageCriminals from './pages/ManageCriminals';
import CriminalDetails from './pages/CriminalDetails';
import CriminalAnalytics from './pages/CriminalAnalytics';
import PrivateRoute from './router/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchCriminals />
            </PrivateRoute>
          }
        />
        <Route
          path="/search-results"
          element={
            <PrivateRoute>
              <SearchResults />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <PrivateRoute>
              <ManageCriminals />
            </PrivateRoute>
          }
        />
        <Route
          path="/criminal/:id"
          element={
            <PrivateRoute>
              <CriminalDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <CriminalAnalytics />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
