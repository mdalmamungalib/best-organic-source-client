import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Recommends = () => {
    const [recommends, setRecommends] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/items`)
            .then(res => res.json())
            .then(data => {
                const popular = data.filter(item => item.category === "POPULAR");
                setRecommends(popular);
            })
    }, []);

    console.log("recommends", recommends)

    return (
        <div>
            <SectionTitle
                heading={"Should Try"}
                subHeading={"CHEF RECOMMENDS"}
            ></SectionTitle>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-6">
                {
                    recommends.slice(0, 3).map(recommend => <div key={recommend?._id} className=" w-96 bg-[#F3F3F3] shadow-xl">
                        <img className="w-full" src={recommend?.imgURL} alt="" />
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-black text-xl">{recommend?.name}</h2>
                            <p className="text-black">{recommend?.recipe}</p>
                            <div className="card-actions">
                                <Link to="/ourShop/:category">
                                    <button className="btn btn-outline btn-[#BB8506] hover:text-[#BB8506] border-0 border-b-4 rounded-lg border-[#BB8506]  text-xl font-semibold uppercase text-[#BB8506] mt-6">add to cart</button>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Recommends;