import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import PopularItem from "./PopularItem";
import useMenu from "../../../Hooks/UseMenu";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const PopularMenu = () => {
    const [menu, loading] = useMenu();

    const popular = menu.filter(item => item?.category === "POPULAR");
    if(loading){
        return <FadeLoader
        className='grid mx-auto'
        color="#36d7b7"
        height={20}
    />
    }
    return (
        <div>
            <SectionTitle
                heading={"Check it out"}
                subHeading={"FROM OUR MENU"}
            ></SectionTitle>

            <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10">
                {
                    popular.map(item => <PopularItem
                        key={item._id}
                        item={item}
                    ></PopularItem>)
                }
            </div>
            <div className="grid justify-center mt-[44px]">
                <Link to="/menu">
                <button className="btn btn-outline btn-[#1F2937] border-0 border-b-4 rounded-lg border-[#1F2937]  text-xl font-semibold uppercase text-[#1F2937] mt-6">View Full  Menu</button>
                </Link>
            </div>
        </div>
    );
};

export default PopularMenu;