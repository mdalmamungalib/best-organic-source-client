import { useQuery } from "@tanstack/react-query";
import HelmetTitle from "../../../Components/HelmetTitle";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa6";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageOrders = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/card");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <FadeLoader
        className="grid mx-auto"
        color="#36d7b7"
        height={20}
      />
    );
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure ${item?.name} has been deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cards/${item._id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        });
      }
    });
  };
  return (
    <div className="w-full">
      <HelmetTitle title={"Manage Orders"}></HelmetTitle>
      <SectionTitle
        heading={"What's New?"}
        subHeading={"All Orders"}></SectionTitle>
      <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
        <div className="flex justify-evenly items-center gap-10  uppercase text-black">
          <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">
            Total Orders: {orders?.length}
          </h1>
        </div>
        {/* table aria....... */}
        <div className="overflow-x-auto w-full h-full  mt-[38px]">
          <div className="md:flex">
            <table className="table w-full">
              {/* head */}
              <thead
                style={{
                  "border-radius": "15px 15px 0px 0px",
                  background: "#D1A054",
                }}
                className="text-white uppercase">
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Product Name</th>
                  <th>Transaction Id</th>
                  <th></th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {/* row 1 */}
                {orders.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <PhotoProvider>
                              <PhotoView
                                src={item?.product_profile}>
                                <img
                                  src={item?.product_profile}
                                  style={{ objectFit: "cover" }}
                                  alt=""
                                />
                              </PhotoView>
                            </PhotoProvider>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link to={`/dashboard/aOrderDetails/${item._id}`}>
                        <div className="font-bold hover:text-slate-400">
                          {item?.cus_name}
                        </div>
                      </Link>
                    </td>
                    {/* todo: change image name */}
                    <td className="flex text-lg">
                      ${item?.total_amount}
                    </td>
                    <td className=" text-lg">
                      {item?.product_name}
                    </td>
                    <td className=" text-lg">
                      {item?.transactionId}
                    </td>
                    <th className="text-lg"></th>
                    <th>
                      <button
                        style={{ background: "#B91C1C" }}
                        className="btn btn-ghost btn-xs w-12 h-12 text-white text-lg"
                        onClick={() => handleDelete(item)}>
                        <FaTrash></FaTrash>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
