import { Link } from "react-router-dom";
import MenuCover from "../MenuCover/MenuCover";

const MenuItems = ({ items, heading, subHeading, img }) => {
    return (
        <div>
            {heading && <MenuCover heading={heading} subHeading={subHeading} img={img}></MenuCover>}
            <div className="max-w-screen-xl mx-auto mt-[150px]">
                <div className=" grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10">
                    {
                        items.map(item => <div key={item?.id} className="flex space-x-4">
                            <img className="w-[118px] h-[104px]" style={{ "border-radius": "0px 200px 200px 200px" }} src={item?.imgURL} alt="" />
                            <div>
                                <h3 className="uppercase font-serif text-black">{item?.name} ------------------</h3>
                                <p className="text-[#737373]">{item?.recipe}</p>
                            </div>
                            <p className="text-[#BB8506]">${item?.price}</p>
                        </div>)
                    }
                </div>
                <div className="grid justify-center my-[45px]">
                    <Link to={`/ourShop/${heading}`}>
                        <button className="btn btn-outline btn-[#BB8506] hover:text-[#BB8506] border-0 border-b-4 rounded-lg border-[#1F2937]  text-xl font-semibold uppercase text-[#1F2937]">ORDER YOUR FAVORITE FOOD</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuItems;
