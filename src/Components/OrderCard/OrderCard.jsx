import { Link } from "react-router-dom";

const OrderCard = ({ item }) => {
  const { name, imgURL, price, recipe, _id } = item;

  return (
    <div>
      <div className="card w-96 bg-[#F3F3F3] shadow-xl">
        <figure>
          <img
            className="w-full"
            style={{
              height: "260px",
            }}
            src={imgURL}
            alt=""
          />
        </figure>
        <p
          className="absolute right-0 mr-5 mt-5
         bg-[#111827] text-white px-3">
          ${price}
        </p>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-black text-xl">
            {name}
          </h2>
          <p className="text-black">{recipe.slice(0, 80)}...</p>
          <div className="card-actions">
            <Link to={`/order_card_id/${_id}`}>
              <button
                className="btn btn-outline btn-[#BB8506] 
              hover:text-[#BB8506] border-0 border-b-4 rounded-lg 
              border-[#BB8506]  text-xl font-semibold uppercase 
              text-[#BB8506] mt-6">
                add to cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
