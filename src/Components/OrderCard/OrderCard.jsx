import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import UseCard from "../../Hooks/UseCard";

const OrderCard = ({ item }) => {
    const { name, imgURL, price, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, , refetch] = UseCard();


    const handleAddToCart = item => {
        console.log(item);
        const orderData = { cardId: _id, name, imgURL, price, email: user?.email };
        if (user && user?.email) {
            fetch(`${import.meta.env.VITE_SERVER_URL}/cards`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: 'Added to the card',
                            showConfirmButton: false,
                            timer: 1500
                        });

                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login the order the product',
                text: "You won't be able to revert this!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };
    return (
        <div>
            <div className="card w-96 bg-[#F3F3F3] shadow-xl">
                <figure><img className="w-full" src={imgURL} alt="" /></figure>
                <p className="absolute right-0 mr-5 mt-5 bg-[#111827] text-white px-3">${price}</p>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-black text-xl">{name}</h2>
                    <p className="text-black">{recipe.slice(0, 80)}</p>
                    <div className="card-actions">

                        <button onClick={() => handleAddToCart(item)} className="btn btn-outline btn-[#BB8506] hover:text-[#BB8506] border-0 border-b-4 rounded-lg border-[#BB8506]  text-xl font-semibold uppercase text-[#BB8506] mt-6">add to cart</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;