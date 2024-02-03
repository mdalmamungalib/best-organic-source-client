import { useContext } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { singInWidthGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    singInWidthGoogle()
      .then((user) => {
        const saveUser = {
          name: user?.user?.displayName,
          email: user?.user?.email,
          photo: user?.user?.photoURL,
        };
        fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className="w-full  text-center mt-4">
      <button className="btn btn-circle btn-outline text-black text-xl">
        <FaFacebook></FaFacebook>
      </button>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-circle btn-outline text-black text-xl ml-[56px]">
        <FaGoogle></FaGoogle>
      </button>
      <button className="btn btn-circle btn-outline text-black text-xl ml-[56px]">
        <FaGithub></FaGithub>
      </button>
    </div>
  );
};

export default SocialLogin;
