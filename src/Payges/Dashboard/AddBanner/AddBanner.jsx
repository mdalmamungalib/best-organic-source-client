import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { PhotoProvider, PhotoView } from "react-photo-view";
import HelmetTitle from "../../../Components/HelmetTitle";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FadeLoader } from "react-spinners";

const AddBanner = () => {
    const [axiosSecure] = useAxiosSecure()
    const [preview, setPreview] = useState("");

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_KEY}`;

    const handleImageChange = image => {
        setPreview(window.URL.createObjectURL(image));
    };

    // get_banner_data
    const { data: banners = [], isLoading, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get("/banner")
            return res.data;
        }
    });

    if(isLoading){
        return <FadeLoader
            className='grid mx-auto'
            color="#36d7b7"
            height={20}
        />
    }

    const handleSubmit = event => {
        event.preventDefault(); // Prevent form submission

        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');

        if (fileInput && fileInput.files.length > 0) {
            formData.append("image", fileInput.files[0]);

            if (url) {
                fetch(url, {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        const imgURL = data.data?.display_url;
                        return fetch(`${import.meta.env.VITE_SERVER_URL}/addBanner`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ imgURL })
                        })

                    })
                    .then(res => res.json())
                    .then(data => {
                        refetch();
                        {
                            data.acknowledged && Swal.fire({
                                icon: "success",
                                title: "Banner success fully added",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }
        } else {
            console.error("No file selected");
        }
    };

    const handleDeleteBanner = banner => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteBanner/${banner._id}`)
                    .then(res => {
                        refetch();
                        if (res.data?.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div>
            <HelmetTitle
                title={"Add Banner"}
            ></HelmetTitle>
            <SectionTitle
                subHeading={"Add Banner & Preview"}
                heading={"What's New?"}
            ></SectionTitle>
            <div className="border p-5 rounded-md bg-slate-200">
                <div className="ml-10 mb-5">
                    <img className="w-48 rounded-md" src={preview} alt={preview} />
                </div>
                <div className="gap-5">
                    <input
                        type="file" className="file-input file-input-bordered w-full max-w-xs"
                        name="image"
                        accept="image/*"
                        onChange={event => handleImageChange(event.target.files[0])}
                        required="Please select your file"
                    />
                    <button
                        style={{ "background": "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}
                        className="btn border-none text-white mt-3"
                        onClick={event => handleSubmit(event)}
                    >Submit
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-10 mb-10">
                {
                    banners.map(banner => <div key={banner._id} className="card card-compact w-96 bg-slate-200 shadow-xl">
                        <figure>
                            <PhotoProvider>
                                <PhotoView src={banner?.imgURL}>
                                    <img className="max-w-[382px] min-h-[255px]" src={banner?.imgURL} style={{ objectFit: 'cover' }} alt="" />
                                </PhotoView>
                            </PhotoProvider>
                        </figure>
                        <div className="card-body">
                            <div className="card-actions justify-end">
                                <button
                                    onClick={()=> handleDeleteBanner(banner)}
                                    style={{ "background": "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}
                                    className="btn border-none text-white mt-3 hover:text-red-600">Delete</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AddBanner;