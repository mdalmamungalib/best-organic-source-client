import { loadStripe } from "@stripe/stripe-js";
import HelmetTitle from "../../../Components/HelmetTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseCard from "../../../Hooks/UseCard";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);
    const [cards] = UseCard();
    const total = cards.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    return (
            <div className="w-full">
            <HelmetTitle
                title={"Payment"}
            ></HelmetTitle>
            <SectionTitle
                subHeading={"Payment"}
                heading={"Please Proses"}
            ></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cards={cards} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;