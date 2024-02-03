const errorImage = "../../../assets/404.gif"
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import HelmetTitle from "../../../Components/HelmetTitle";
const PaymentFail = () => {
  return (
    <div className="max-w-screen-sm mx-auto px-5 py-[200px]">
      <HelmetTitle title={"Payment Fail"}></HelmetTitle>
      <div className="mx-auto">
        <h1 className="text-xl font-bold text-red-600" >Payment Fail please try again</h1>
        <div className="w-full h-full">
            <div className="grid justify-center align-middle">
                <img src={errorImage} alt="error image" />
            </div>
            <div className="grid justify-center align-middle mt-10">
                <Link to="/">
                <button 
                style={{"background": "linear-gradient(90deg, #835D23 0%, #B58130 100%)"}}
                className="btn border-none text-white">Back To Home<IoHome size={18}></IoHome></button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
