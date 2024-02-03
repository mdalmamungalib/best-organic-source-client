import {
  useLoaderData,
  useNavigate,
} from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { FaStar } from "react-icons/fa"
import { useContext } from "react"
import { AuthContext } from "../../../Providers/AuthProvider"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import HelmetTitle from "../../../Components/HelmetTitle"
import SectionTitle from "../../../Components/SectionTitle/SectionTitle"

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
}

const UpdateReview = () => {
  const aReview = useLoaderData()
  const { user } = useContext(AuthContext)
  const [preview, setPreview] = useState("")
  const image_hosting_token = import.meta.env
    .VITE_IMAGE_BB_KEY
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
  const [axiosSecure] = useAxiosSecure()
  const navigate = useNavigate()

  // handleReview
  const stars = Array(5).fill(0)
  const [reviewCurrentValue, setReviewCurrentValue] =
    useState(0)
  const [reviewHoverValue, setReviewHoverValue] =
    useState(undefined)

  const handleClick = (value) => {
    setReviewCurrentValue(value)
  }

  const handleMouseOver = (newHoverValue) => {
    setReviewHoverValue(newHoverValue)
  }

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append("image", data.image[0])
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const imgURL = imageResponse.data?.display_url
          const { suggestion, recipeName, reviewDetail } =
            data
          const updateReview = {
            suggestion,
            recipeName,
            reviewDetail,
            reviewCurrentValue,
            reviewHoverValue,
            email: user?.email,
            imgURL,
          }
          
          axiosSecure
            .put(
              `/updateReview/${aReview?._id}`,
              updateReview
            )
            .then((data) => {
              if (data.data?.acknowledged) {
                reset()
                navigate("/dashboard/manageReview")
                Swal.fire({
                  icon: "success",
                  title:
                    "Your Review Is Success Fully Update",
                  showConfirmButton: false,
                  timer: 1500,
                })
              }
            })
        }
      })
  }

  //image preview handler
  const handleImageChange = (image) => {
    setPreview(window.URL.createObjectURL(image))
  }

  return (
    <div className="w-full mb-[130px]">
      <HelmetTitle title={"Add Review"}></HelmetTitle>
      <SectionTitle
        heading={"Sharing is Caring!!!"}
        subHeading={"Update A REVIEW..."}
      ></SectionTitle>
      <div className="max-w-[820px] p-10 border bg-[#F3F3F3] rounded-md">
        <div className="avatar grid justify-center">
          <div className="w-24 mask mask-squircle">
            {preview ? (
              <img src={preview} alt="" />
            ) : (
              <img src={aReview?.imgURL} alt="" />
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid justify-center mt-10">
            <div className="rating text-center">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    color={
                      (reviewHoverValue ||
                        reviewCurrentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() =>
                      handleMouseOver(index + 1)
                    }
                  ></FaStar>
                )
              })}
            </div>
          </div>
          <div className="form-control w-full mt-5">
            <label className="label ">
              <span className="label-text text-black font-semibold">
                Which recipe you liked most?
              </span>
            </label>
            <input
              type="text"
              {...register("recipeName", {
                required: "Please fill up this field !",
              })}
              placeholder="Recipe you liked most"
              defaultValue={aReview?.recipeName}
              className="input input-bordered w-full bg-white text-black"
            />
            {errors.name && (
              <p className="text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="form-control w-full mt-5">
            <label className="label ">
              <span className="label-text text-black font-semibold">
                Kindly express your care in a short way.
              </span>
            </label>
            <input
              type="text"
              {...register("suggestion", {
                required: "Please fill up this field !",
              })}
              placeholder="Suggestion"
              defaultValue={aReview?.suggestion}
              className="input input-bordered w-full bg-white text-black"
            />
            {errors.name && (
              <p className="text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="form-control mt-5">
            <label className="label">
              <span className="label-text text-black font-semibold">
                Kindly express your care in a short way.
              </span>
            </label>
            <textarea
              {...register("reviewDetail", {
                required: "Please fill up this field !",
              })}
              defaultValue={aReview?.reviewDetail}
              className="textarea textarea-bordered h-[250px] bg-white text-black"
              placeholder="Review in detail"
            ></textarea>
            {errors.recipe && (
              <p className="text-red-600" role="alert">
                {errors.recipe.message}
              </p>
            )}
          </div>
          <div>
            <div className="form-control w-full  mt-5">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Choice Your product Image
                </span>
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Please fill up this field !",
                })}
                className="file-input file-input-bordered w-full max-w-xs bg-white"
                onChange={(event) => {
                  handleImageChange(event.target.files[0])
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
            value="Send Review"
          />
        </form>
      </div>
    </div>
  )
}

export default UpdateReview
