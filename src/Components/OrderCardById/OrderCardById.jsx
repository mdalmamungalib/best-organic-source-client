import { useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import HelmetTitle from "../HelmetTitle";
import SectionTitle from "../SectionTitle/SectionTitle";

const OrderCardById = () => {
  const aSingleData = useLoaderData();
  const { name, imgURL, price, recipe, _id } = aSingleData;
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className=" max-w-screen-xl mx-auto px-5 py-[200px] ">
      <HelmetTitle title={"OrderId"}></HelmetTitle>
      <SectionTitle
        heading={"My Cart"}
        subHeading={"WANNA ADD MORE?"}></SectionTitle>
      <div className="flex justify-items-end align-middle">
        <div>
          <img
            className="max-w-96 max-h-[380px]"
            src={imgURL}
            alt=""
          />
        </div>
        <div className="ml-2">
          <h1 className="text-2xl text-slate-950">
            <span className="text-4xl font-bold">Name:</span>{" "}
            {name}
          </h1>
          <h2 className="text-4xl text-slate-950 mt-5">
            <span className="text-4xl font-bold">Price:</span> $
            {totalPrice}
          </h2>
          <div className="mt-5">
            <button
              className="btn btn-sm bg-slate-200 
              
              hover:bg-slate-300 border-none text-black text-2xl"
              onClick={handleDecrement}>
              <FaMinus />
            </button>
            <span className="text-2xl text-black font-semibold px-2">
              {quantity}
            </span>
            <button
              className="btn btn-sm bg-slate-200 
              hover:bg-slate-300 border-none text-black text-2xl"
              onClick={handleIncrement}>
              <FaPlus />
            </button>
          </div>
          <Link
            to="/order_form"
            state={{
              name,
              totalPrice,
              quantity,
              _id,
              imgURL,
            }}>
            <button
              className="btn btn-md border-none bg-slate-400
           hover:bg-slate-300 text-black sm:btn-md md:btn-md lg:btn-lg mt-5">
              By Now
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-justify">{recipe}</p>
      </div>
    </div>
  );
};

export default OrderCardById;
