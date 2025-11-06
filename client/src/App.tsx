import {Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp";
import {Toaster} from "@/components/ui/sonner";
import Login from "./pages/Login";
import {Preferences} from "./pages/Preferences";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/preferences" element={<Preferences />} />

      </Routes>
    </>
  );
}

export default App;
