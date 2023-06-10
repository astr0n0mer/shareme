import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Login } from "./components";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

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
