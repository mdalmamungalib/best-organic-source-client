const errorImage = "../../../dist/assets/404.gif"
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
const Error404 = () => {
    return (
        <div className="w-full h-full">
            <div className="grid justify-center align-middle">
                <img src={errorImage} alt="" />
            </div>
            <div className="grid justify-center align-middle mt-10">
                <Link to="/">
                <button 
                style={{"background": "linear-gradient(90deg, #835D23 0%, #B58130 100%)"}}
                className="btn border-none text-white">Back To Home<IoHome size={18}></IoHome></button>
                </Link>
            </div>
        </div>
    );
};

export default Error404;