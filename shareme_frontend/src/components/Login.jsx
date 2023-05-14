import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { client as sanityClient } from "../client";

import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";

export default function Login() {
  const navigate = useNavigate();

  function responseGoogle(response) {
    if (!response) return;
    localStorage.setItem("user", response.credential);

    // sub is just a unique Google ID
    const { name, sub, picture } = jwtDecode(response.credential);

    const document = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    sanityClient
      .createIfNotExists(document)
      .then(() => navigate("/", { replace: true }));
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          src={shareVideo}
          type="video/mp4"
          autoPlay
          loop
          controls={false}
          muted
        />
        <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="" style={{ width: "130px" }} />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
