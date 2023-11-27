import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import HelmetTitle from '../../../Components/HelmetTitle';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FadeLoader } from "react-spinners";
import { Rating } from '@smastrom/react-rating';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ManageReview = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ["review", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${user?.email}`);
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

    console.log("manage Review", reviews);

    const handleDelete = review => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Message sent",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/review/${review._id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        refetch()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
            }
        })
    }
    return (
        <div className="w-full">
            <HelmetTitle
                title={"Manage Review"}
            ></HelmetTitle>
            <SectionTitle
                heading={"Review"}
                subHeading={"Manage Review"}
            ></SectionTitle>
            <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
                <div className="flex justify-evenly items-center gap-10  uppercase text-black">
                    <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">Total Booking: {reviews?.length}</h1>
                </div>
                {/* table aria....... */}
                <div className="overflow-x-auto w-full h-full mt-[38px]">
                    <table className="table">
                        {/* head */}
                        <thead className="text-white bg-[#D1A054] rounded-br-box  uppercase">
                            <tr>
                                <th></th>
                                <th>Product Image</th>
                                <th>Recipe Name</th>
                                <th>Suggestion For Review</th>
                                <th>Review Detail</th>
                                <th>Rating</th>
                                <th>Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            {/* row 1 */}
                            {
                                reviews.map((review, index) => <tr
                                    key={review._id}
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={review?.imgURL} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{review?.recipeName}</div>
                                    </td>
                                    <td>
                                        <h3>{review?.suggestion}</h3>
                                    </td>
                                    <td>
                                        <h1>{review?.reviewDetail}</h1>
                                    </td>
                                    <td>
                                        <Rating
                                            style={{ maxWidth: 120 }}
                                            value={review?.reviewCurrentValue || review?.reviewHoverValue}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateReview/${review?._id}`}>
                                            <button
                                                style={{ "background": "#D1A054" }}
                                                className="btn btn-ghost btn-xs text-lg text-white w-12 h-12"> <FiEdit></FiEdit></button>
                                        </Link>
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(review)} style={{ "background": "#B91C1C" }}
                                            className="btn btn-ghost btn-xs w-12 h-12 text-white text-lg"><FaTrash></FaTrash></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageReview;