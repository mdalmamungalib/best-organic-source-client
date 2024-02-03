import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import UseCard from "../../Hooks/UseCard";
import Swal from "sweetalert2";
import HelmetTitle from "../HelmetTitle";

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, , refetch] = UseCard();
  const { user, loading } = useContext(AuthContext);
  const {
    name: foodName,
    totalPrice,
    quantity,
    _id,
    imgURL,
  } = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const orderData = {
      userName: user?.displayName,
      userEmail: user?.email,
      foodName,
      totalPrice,
      currency: data.currency,
      quantity,
      phoneNumber: data.phoneNumber,
      address: data.address,
      productId: _id,
      productImage: imgURL,
    };

    if (user && user?.email) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/cards`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.replace(data.url);
        });
    } else {
      Swal.fire({
        title: "Please login the order the product",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {
            state: { from: location },
          });
        }
      });
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto px-5 py-[200px]">
      <HelmetTitle title={"Order Form"}></HelmetTitle>
      <div className="border p-10 bg-slate-200 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label>
              <span>User Name:</span>
            </label>
            <input
              type="text"
              {...register("userName")}
              defaultValue={user?.displayName}
              disabled
              className="w-full p-2 bg-white rounded-lg text-black text-2xl "
            />
          </div>
          <div className="form-control w-full mt-5">
            <label>
              <span>Food Name:</span>
            </label>
            <input
              type="text"
              defaultValue={foodName}
              {...register("foodName")}
              disabled
              className="w-full p-2 bg-white rounded-lg text-black text-2xl "
            />
          </div>
          <div className="form-control w-full mt-5">
            <label>
              <span>Price:</span>
            </label>
            <input
              type="text"
              defaultValue={totalPrice}
              disabled
              className="w-full p-2 bg-white rounded-lg text-black text-2xl "
            />
          </div>
          <select
            defaultValue={"BDT"}
            className="select select-bordered w-full 
            max-w-xs mt-5 bg-white text-black text-2xl"
            {...register("currency")}>
            <option value={"BDT"}>BDT</option>
            <option value={"USD"}>USD</option>
          </select>
          <div className="mt-5">
            <label>
              <span>Your Current Phone Number:</span>
            </label>
            <PhoneInput
              className="phoneInput"
              defaultCountry="BD"
              placeholder="12345-678910"
              {...register("phoneNumber", {
                required: "Please fill up this field !",
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-600" role="alert">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="form-control w-full mt-5">
            <label>
              <span>Your Address:</span>
            </label>
            <textarea
              className="textarea textarea-bordered bg-white text-black 
              text-lg h-44"
              placeholder="Please Provide Your Current Address:"
              {...register("address", {
                required: "Please fill up this field !",
              })}></textarea>
            {errors.address && (
              <p className="text-red-600" role="alert">
                {errors.address.message}
              </p>
            )}
          </div>
          <input
            style={{
              background:
                "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
            }}
            className="btn w-full h-[56px] text-white mt-5 border-none"
            type="submit"
            value="Pay Now"
          />
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
