import { TiShoppingCart, TiHome } from "react-icons/ti";
import { GiShoppingBag } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoMenu } from "react-icons/io5";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { ImAddressBook } from "react-icons/im";
import { RiMailStarFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import { MdManageHistory } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";
import UseCard from "../Hooks/UseCard";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
    const [cards] = UseCard();
    const [isAdmin] = useAdmin();
    // const isAdmin = true;
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-slate-100">
                <div className="flex justify-end mt-5 mr-2">
                    <label htmlFor="my-drawer-2" className="btn border-none bg-[#D1A054] drawer-button lg:hidden text-2xl text-white"><GiHamburgerMenu></GiHamburgerMenu></label>
                </div>
                <div className="flex flex-col items-center">
                    <Outlet></Outlet>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar"
                    className="drawer-overlay bg-[#D1A054]"></label>

                <ul className="menu p-4 w-80 mt-0 min-h-full bg-[#D1A054] text-black font-bold uppercase">
                    {/* Sidebar content here */}
                    <div className="text-center font-serif uppercase">
                        <h1 className="text-[23.322px] font-extrabold">Best Organic Source</h1>
                        <p style={{ "letter-spacing": "5px" }} className="text-[17.492px]">Online Shope</p>
                    </div>
                    {
                        isAdmin ? <>
                            {/* admin dashBoard */}
                            <li className="mt-[60px]"><NavLink to="/dashboard/adminHome"><TiHome></TiHome>Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addBanner"><MdNoteAdd></MdNoteAdd>Add Banner</NavLink></li>
                            <li><NavLink to="/dashboard/addItem"><GiForkKnifeSpoon></GiForkKnifeSpoon> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems"><TfiMenuAlt></TfiMenuAlt> Manage Items</NavLink></li>
                            <li>
                                <NavLink to="/dashboard/manageOrders"><ImAddressBook></ImAddressBook>Manage Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers"><FaUsers></FaUsers>All Users
                                </NavLink>
                            </li>
                        </> : <>

                            {/* users dashBoard */}
                            <li className="mt-[60px]"><NavLink to="/dashboard/userHome"><TiHome></TiHome>User Home</NavLink></li>
                            <li>
                                <NavLink to="/dashboard/myCart"><TiShoppingCart></TiShoppingCart> My Cart
                                    <span className="badge badge-secondary">+{cards?.length}</span>
                                </NavLink>
                            </li>
                            <li><NavLink to="/dashboard/addReview"><RiMailStarFill></RiMailStarFill> Add Review</NavLink></li>
                            <li><NavLink to="/dashboard/manageReview"><MdManageHistory></MdManageHistory>Manage Review</NavLink></li>
                        </>
                    }
                    <div className="divider bg-white w-[233px] h-[1px]"></div>
                    <li><NavLink to="/"><TiHome></TiHome> Home</NavLink></li>
                    <li><NavLink to="/menu"><IoMenu></IoMenu> Menu</NavLink></li>
                    <li><NavLink to="/ourShop/salad"><GiShoppingBag></GiShoppingBag> Shop</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;