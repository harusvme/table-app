import { Route, Routes } from "react-router-dom";
import Welcome from "./screens/welcomePage/welcomePage";
import TablePage from "./screens/tablePage/tablePage";
import "./App.css";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/table" element={<TablePage />} />
        </Routes>
    );
};

export default App;
