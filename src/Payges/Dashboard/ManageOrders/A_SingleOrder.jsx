import { useLoaderData } from "react-router-dom";
import HelmetTitle from "../../../Components/HelmetTitle";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
const A_SingleOrder = () => {
  const data = useLoaderData();
  return (
    <div className="m-auto px-5 py-[200px]">
      <HelmetTitle title={"Single Order"}></HelmetTitle>
      <SectionTitle
        heading={"My Cart"}
        subHeading={"WANNA ADD MORE?"}></SectionTitle>
      <div className="card lg:card-side bg-slate-200 shadow-xl">
        <figure className="max-w-[480px] print:hidden">
          <img className="print:hidden h-full" src={data?.product_profile} alt="Album" />
        </figure>
        <div className="card-body text-black">
          <div>
            <h2 className="card-title">
              Customer Name: {data?.cus_name}
            </h2>
            <h2 className="card-title print:hidden">
              Customer Email: {data?.cus_email}
            </h2>
            <h2 className="card-title">
              Customer Phone: {data?.cus_phone}
            </h2>
            <h2 className="card-title">
              Product Quantity: {data?.product_quantity}
            </h2>
            <h2 className="card-title">
              Price: {data?.total_amount}
            </h2>
            <h2 className="card-title">
              Address: {data?.cus_add1}
            </h2>
          </div>
          <div className="divider">OR</div>
          <div className="print:hidden">
            <h2 className="card-title">
              Product Name: {data?.product_name}
            </h2>
            <h2 className="card-title">
              Product Quantity: {data?.product_quantity}
            </h2>
            <h2 className="card-title">
              Price: {data?.total_amount}
            </h2>
            <h2 className="card-title">
              Transaction Id: {data?.transactionId}
            </h2>
            <h2 className="card-title">
              Paid Date: {data?.paidAt}
            </h2>
          </div>
          <div className="card-actions justify-end">
            <button
              onClick={() => window.print()}
              style={{
                background:
                  "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
              }}
              className="btn w-full h-[56px] text-white mt-5 border-none">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A_SingleOrder;
