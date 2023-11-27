import { useQuery } from "@tanstack/react-query";
import HelmetTitle from "../../../Components/HelmetTitle";
import { FaTrash, FaUserShield } from 'react-icons/fa';
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { PhotoProvider, PhotoView } from "react-photo-view";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    if (isLoading) {
        return <FadeLoader
            className='grid mx-auto'
            color="#36d7b7"
            height={20}
        />
    }

    //user to change user to admin update admin role
    const handleMakeAdmin = user => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/users/admin/${user._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `${user?.name} has been updated and is now an admin`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    // user delete
    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Are you sure to ${user.name} has bin deleted?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        refetch();
                        if (data) {
                            Swal.fire(
                                'Deleted!',
                                ` ${user.name} has been deleted.`,
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
                subHeading={"All User"}
                heading={"What's New?"}
            ></SectionTitle>
            <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
                <div className="flex justify-evenly items-center gap-10  uppercase text-black">
                    <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">Total users: {users?.length}</h1>
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
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-black">
                                {/* row 1 */}
                                {
                                    users.map((user, index) => <tr
                                        key={user._id}
                                    >
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <PhotoProvider>
                                                            <PhotoView src={user?.photo}>
                                                                <img src={user?.photo} style={{ objectFit: 'cover' }} alt="" />
                                                            </PhotoView>
                                                        </PhotoProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><div className="font-bold">{user?.name}</div></td>
                                        {/* todo: change image name */}
                                        <td className="flex text-lg">
                                            {user?.email}
                                        </td>
                                        <th className="text-lg">
                                            {
                                                user?.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(user)}
                                                    style={{ "background": "#D1A054" }}
                                                    className="btn btn-ghost btn-xs text-lg text-white w-12 h-12"> <FaUserShield></FaUserShield></button>
                                            }
                                        </th>
                                        <th>
                                            <button
                                                style={{ "background": "#B91C1C" }}
                                                onClick={() => handleDelete(user)} className="btn btn-ghost btn-xs w-12 h-12 text-white text-lg" ><FaTrash></FaTrash></button>
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

export default AllUsers;