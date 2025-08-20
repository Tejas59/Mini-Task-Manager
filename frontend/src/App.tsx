import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterModal />}></Route>
        <Route path="/" element={<LoginModal />}></Route>
        <Route path="/home" element={"home"}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
