import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import SavedPage from "./pages/SavedPage";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/food/:id" element={<DetailPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </>
  );
}

export default App;