import { useContext, useEffect, useRef, useState } from "react";
import bgImg from "../../assets/reservation/wood-grain-pattern-gray1x.png";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HelmetTitle from "../../Components/HelmetTitle";
import Swal from 'sweetalert2';
import SocialLogin from "../../Components/SocialLogin/SocialLogin";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true);
    const [captchaMessage, setCaptchaMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const { loginUser, resetPassword } = useContext(AuthContext);
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfully 🙂',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true })
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    }

    const handleCaptcha = (event) => {
        const captcha = event.target.value;
        if (validateCaptcha(captcha)) {
            setDisable(false);
        }
        else {
            setDisable(true);
            setCaptchaMessage('Captcha Does Not Match');
        }
    };

    const handleResetPass = () => {
        resetPassword(userEmail)
            .then(() => {
                alert("Please cake your email and reset your password?");
            })
            .catch(error => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            })
    };



    
    return (
        <div style={{ "backgroundImage": `url(${bgImg})`, "backgroundSize": 'cover', "minHeight": '100vh' }}>
            <HelmetTitle
                title={"Login"}
            ></HelmetTitle>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse"
                style={{ "boxShadow": "10px 10px 10px 10px rgba(0, 0, 0, 0.25)" }}
                >
                    <div className="text-center lg:text-left text-black">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm py-10">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onBlur={() => setUserEmail(event.target.value)} name="email" type="email" placeholder="email" className="input input-bordered bg-white" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="**********" className="input input-bordered bg-white" required />
                                <label className="label">
                                    <Link to="">
                                        <p onClick={handleResetPass} className="label-text-alt link link-hover">Forgot password?</p>
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleCaptcha} ref={captchaRef} type="text" placeholder="Type Here" className="input input-bordered bg-white" required />
                                {disable && <><p className="text-red-600">{captchaMessage}</p></>}
                            </div>
                            <p className="text-red-600">{errorMessage}</p>
                            <div className="form-control mt-6">
                                <input disabled={disable} className="btn bg-[#D1A054] border-none text-white" type="submit" value="Login" />
                            </div>
                        </form>
                        <h3 className="text-xl text-[#D1A054] text-center">New here? <Link className="font-bold" to="/singUp">Create a New Account</Link></h3>
                        <p className="text-center text-xl font-medium text-[#444444] mt-[24px]">Or sign in with</p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;