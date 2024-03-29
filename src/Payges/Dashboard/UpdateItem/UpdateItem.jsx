import { useForm } from "react-hook-form";
import { GiForkKnifeSpoon } from "react-icons/gi";
import Swal from "sweetalert2";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import HelmetTitle from "../../../Components/HelmetTitle";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AddAnItem = () => {
  const storeItem = useLoaderData();
  const [preview, setPreview] = useState("");
  const image_hosting_token = import.meta.env.VITE_IMAGE_BB_KEY;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const imgURL = imageResponse.data?.display_url;
          const { category, name, price, recipe } = data;
          const updateItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            imgURL,
          };

          axiosSecure
            .put(`/items/${storeItem?._id}`, updateItem)
            .then((data) => {
              if (data.data?.acknowledged) {
                reset();
                navigate("/dashboard/manageItems");
                Swal.fire({
                  icon: "success",
                  title: "Your item is successfully Update",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };

  //image preview handler
  const handleImageChange = (image) => {
    setPreview(window.URL.createObjectURL(image));
  };

  return (
    <div className="w-full mb-[130px]">
      <HelmetTitle title={"Update Review"}></HelmetTitle>
      <SectionTitle
        heading={"What's New?"}
        subHeading={"Please Update 'A' Review "}></SectionTitle>
      <div className="grid lg:justify-center">
        <div className="max-w-[992px] bg-slate-100 p-10 rounded-md">
          <div className="avatar grid justify-center">
            <div className="w-24 mask mask-squircle">
              {preview ? (
                <img src={preview} alt="" />
              ) : (
                <img src={storeItem?.imgURL} alt="" />
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full mt-5">
              <label className="label ">
                <span className="label-text text-black font-semibold">
                  Recipe name*
                </span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Please fill up this field !",
                })}
                defaultValue={storeItem?.name}
                placeholder="Recipe name"
                className="input input-bordered w-full bg-white text-black"
              />
              {errors.name && (
                <p className="text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-control w-full  mt-5">
                <label className="label">
                  <span className="label-text text-black font-semibold">
                    Select your item*
                  </span>
                </label>
                <select
                  defaultValue={"SALAD"}
                  {...register("category", { required: true })}
                  className="select select-bordered bg-white text-black">
                  <option>SALAD</option>
                  <option>PIZZA</option>
                  <option>SOUPS</option>
                  <option>DESSERTS</option>
                  <option>DRINKS</option>
                </select>
                {errors.category && (
                  <p className="text-red-600" role="alert">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full  mt-5">
                <label className="label">
                  <span className="label-text text-black font-semibold">
                    Price*
                  </span>
                </label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Please fill up this field !",
                  })}
                  defaultValue={storeItem?.price}
                  placeholder="Type here"
                  className="input input-bordered w-full text-black  bg-white"
                />
                {errors.price && (
                  <p className="text-red-600" role="alert">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Recipe Details*
                </span>
              </label>
              <textarea
                {...register("recipe", {
                  required: "Please fill up this field !",
                })}
                defaultValue={storeItem?.recipe}
                className="textarea textarea-bordered h-[250px] bg-white text-black"
                placeholder="Recipe Details"></textarea>
              {errors.recipe && (
                <p className="text-red-600" role="alert">
                  {errors.recipe.message}
                </p>
              )}
            </div>
            <div>
              <div className="form-control w-full  mt-5">
                <input
                  type="file"
                  {...register("image", {
                    required: "Please fill up this field !",
                  })}
                  className="file-input file-input-bordered w-full max-w-xs bg-white"
                  onChange={(event) => {
                    handleImageChange(event.target.files[0]);
                  }}
                />
                {errors.image && (
                  <p className="text-red-600" role="alert">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
            <input
              style={{
                background:
                  "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
              }}
              className="btn w-[180px] h-[56px] text-white mt-5 border-none"
              type="submit"
              value="Update Item"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAnItem;
