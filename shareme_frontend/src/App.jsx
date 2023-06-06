import { Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Login } from "./components";
import Home from "./container/Home";

export default function App() {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_SHAREME_GOOGLE_API_TOKEN}
    >
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}
