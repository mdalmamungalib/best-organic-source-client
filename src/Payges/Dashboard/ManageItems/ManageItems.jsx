import HelmetTitle from "../../../Components/HelmetTitle";
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/UseMenu";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, isLoading, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    if (isLoading) {
        return <FadeLoader
            className='grid mx-auto'
            color="#36d7b7"
            height={20}
        />
    }

    // item delete
    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Are you sure ${item?.name} has been deleted!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/items/${item._id}`)
                    .then(res => {
                        if (res.data?.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )

                        }
                    })
            }
        })
    };

    return (
        <div className="w-full">
            <HelmetTitle
                title={"All Users"}
            ></HelmetTitle>
            <SectionTitle
                subHeading={"All Item"}
                heading={"What's New?"}
            ></SectionTitle>
            <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
                <div className="flex justify-evenly items-center gap-10  uppercase text-black">
                    <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">Total Items: {menu?.length}</h1>
                </div>
                {/* table aria....... */}
                <div
                    className="overflow-x-auto w-full h-full  mt-[38px]">
                    <div className="md:flex">
                        <table className="table w-full">
                            {/* head */}
                            <thead
                                style={{
                                    "border-radius": "15px 15px 0px 0px",
                                    "background": "#D1A054"
                                }}
                                className="text-white uppercase">
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Update</th>
                                    <th>Delete </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-black">
                                {/* row 1 */}
                                {
                                    menu.map((item, index) => <tr
                                        key={item._id}
                                    >
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <PhotoProvider>
                                                            <PhotoView src={item?.imgURL}>
                                                                <img src={item?.imgURL} style={{ objectFit: 'cover' }} alt="" />
                                                            </PhotoView>
                                                        </PhotoProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><div className="font-bold">{item?.name}</div></td>
                                        {/* todo: change image name */}
                                        <td className="flex text-lg">
                                            ${item?.price}
                                        </td>
                                        <th className="text-lg">
                                            <Link to={`/dashboard/updateItem/${item?._id}`} >
                                                <button
                                                    style={{ "background": "#D1A054" }}
                                                    className="btn btn-ghost btn-xs text-lg text-white w-12 h-12"> <FiEdit></FiEdit></button>
                                            </Link>
                                        </th>
                                        <th>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                style={{ "background": "#B91C1C" }}
                                                className="btn btn-ghost btn-xs w-12 h-12 text-white text-lg" ><FaTrash></FaTrash></button>
                                        </th>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;