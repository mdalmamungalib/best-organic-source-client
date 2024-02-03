import { useForm } from "react-hook-form";
import HelmetTitle from "../../Components/HelmetTitle";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import bgImg from "../../assets/reservation/wood-grain-pattern-gray1x.png";

const SingUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const image_hasting_token = import.meta.env.VITE_IMAGE_BB_KEY;

  const { createUser, verifyEmail, updateUser } =
    useContext(AuthContext);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${image_hasting_token}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const photo = imgResponse.data.display_url;

          //create user
          createUser(data?.email, data?.password)
            .then((result) => {
              const user = result.user;
              //user profile update
              updateUser(data?.name, photo)
                .then(() => {
                  //verify email
                  verifyEmail()
                    .then(() => {
                      const saveUser = {
                        name: data?.name,
                        email: data?.email,
                        photo,
                      };
                      fetch(
                        `${import.meta.env.VITE_SERVER_URL}/users`,
                        {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify(saveUser),
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.insertedId) {
                            alert(
                              "Please cake your email and verify your account"
                            );
                            Swal.fire({
                              icon: "success",
                              title: "Sing Up Successfully 🙂",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            navigate(from, { replace: true });
                          }
                        });
                    })
                    .catch((error) => {
                      const errorMessage = error.message;
                      setErrorMessage(errorMessage);
                    });
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  setErrorMessage(errorMessage);
                });
            })
            .catch((error) => {
              const errorMessage = error.message;
              setErrorMessage(errorMessage);
            });
        }
      });
  };

  //image preview handler
  const handleImageChange = (image) => {
    setPreview(window.URL.createObjectURL(image));
  };

  return (
    <div>
      <HelmetTitle title={"SingUp"}></HelmetTitle>
      <div
        className="hero min-h-screen "
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}>
        <div
          className="hero-content flex-col lg:flex-row-reverse p-10"
          style={{
            boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)",
          }}>
          <div className="text-center lg:text-left text-black">
            <h1 className="text-5xl font-bold">Sing Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat
              fugiat ut assumenda excepturi exercitationem quasi.
              In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>

          <div className="card flex-shrink-0 w-full max-w-sm  py-10">
            <div className="avatar grid justify-center">
              <div className="w-24 mask mask-squircle">
                {preview ? (
                  <img src={preview} alt="" />
                ) : (
                  <img
                    src="https://t4.ftcdn.net/jpg/02/66/38/51/240_F_266385116_LLT33wrlKFZmsS5PfqHYF8plJTeRqvX1.jpg"
                    alt=""
                  />
                )}
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="name"
                  className="input input-bordered bg-white"
                  required
                />
                {errors.name && (
                  <p role="alert">{errors.name.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered bg-white"
                  required
                />
                {errors.email && (
                  <p role="alert">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  placeholder="Please set your profile pic"
                  onChange={(event) => {
                    handleImageChange(event.target.files[0]);
                  }}
                  className="file-input file-input-bordered w-full max-w-xs bg-white"
                />
                {errors.image && (
                  <p className="text-red-600">
                    Please select your profile picture?
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 26,
                  })}
                  name="password"
                  placeholder="************"
                  className="input input-bordered bg-white"
                  required
                />
                {errors.password && (
                  <p role="alert">{errors.password.message}</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password mast be 6 characters
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password mast be 6 characters
                  </p>
                )}
              </div>
              <p className="text-red-600">{errorMessage}</p>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Sing Up"}
                  className="btn bg-[#D1A054] border-none text-white"
                />
              </div>
            </form>
            <h3 className="text-xl text-[#D1A054] text-center">
              Already registered?{" "}
              <Link className="font-bold" to="/login">
                Go to log in
              </Link>
            </h3>
            <p className="text-center text-xl font-medium text-[#444444] mt-[24px]">
              Or sign in with
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
