import Swal from "sweetalert2";
import HelmetTitle from "../../../Components/HelmetTitle";
import UseCard from "../../../Hooks/UseCard";
import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const MyCart = () => {
  const [cards, , refetch] = UseCard();
  const total = cards.reduce(
    (sum, item) => item.total_amount + sum,
    0
  );

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Message sent",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_SERVER_URL}/cards/${item._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then(() => {
            refetch();
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          });
      }
    });
  };
  return (
    <div className="w-full">
      <HelmetTitle title={"My Cart"}></HelmetTitle>
      <SectionTitle
        heading={"My Cart"}
        subHeading={"WANNA ADD MORE?"}></SectionTitle>
      <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
        <div className="flex justify-evenly items-center gap-10  uppercase text-black">
          <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">
            Total Booking: {cards?.length}
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold ">
            Total Price: ${total}
          </h1>
        </div>
        {/* table aria....... */}
        <div className="overflow-x-auto w-full h-full mt-[38px]">
          <table className="table">
            {/* head */}
            <thead className="text-white bg-[#D1A054] rounded-br-box  uppercase">
              <tr>
                <th></th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {/* row 1 */}
              {cards.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.product_profile}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">
                      {item?.product_name}
                    </div>
                  </td>
                  <td>${item?.total_amount}</td>
                  <td>{item?.product_quantity}</td>
                  <td>
                    <h1>Pending</h1>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost btn-xs text-red-600 text-lg">
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
  );
};

export default MyCart;
