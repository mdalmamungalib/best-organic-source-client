import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HelmetTitle from "../../Components/HelmetTitle";

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/order-by-transaction-id/${transactionId}`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [transactionId]);

  if(!data?._id){
    <div>
      <h2>Your payment cancel Please payment again</h2>
    </div>
  }
  
  return (
    <div className="max-w-screen-xl mx-auto px-5 py-[200px] text-black">
      <HelmetTitle title={"Payment success"}></HelmetTitle>
      <h1>Your Payment success</h1>
      <h3>Your order summery</h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>{data?.product_name}</td>
                <td>${data?.total_amount}</td>
                <td>{data?.product_quantity}</td>
                <td>{data?.cus_add1}</td>
                <td>{transactionId}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn w-60 h-[56px] text-white mt-5 border-none 
            ml-auto block print:hidden"
            style={{
              background:
                "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
            }}
            onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
