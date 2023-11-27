import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";


const CheckoutForm = ({ price, cards }) => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [axiosSecure] = useAxiosSecure();
    const [clientSecrete, setClientSecrete] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");


    useEffect(() => {
        if (price > 0) {
            console.log(price);
            axiosSecure.post("/create-payment-intent", { price })
                .then(result => {
                    console.log("payment response", result.data.clientSecret);
                    setClientSecrete(result.data.clientSecret);
                })
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        console.log("card", card);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });
        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecrete,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous"
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent);

        setProcessing(false);
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            //TODO: fot next step
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                quantity: cards.length,
                cartItemsId: cards.map(item => item?.cardId),
                itemsId: cards.map(item => item?._id),
                status: "service pending",
                itemName: cards.map(item => item?.name)
            };

            axiosSecure.post("/payments", payment)
                .then(res => {
                    console.log(res.data.insertResult);
                    if (res.data.result) {
                        //
                    }
                })
        }
    }
    return (

        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="mt-[64px]">
                    <button className="w-[412px] min-h-[64px] bg-[#570DF8] rounded-lg text-white text-xl font-bold" type="submit" disabled={!stripe || !clientSecrete || processing}>
                        Pay
                    </button>
                </div>
            </form>
            {
                cardError && <p className="text-center text-red-600 mt-5">{cardError}</p>
            }
            {
                transactionId && <p className="text-green-500">Transaction completed width transaction ID: {transactionId}</p>
            }
        </div>
    );
};

export default CheckoutForm;