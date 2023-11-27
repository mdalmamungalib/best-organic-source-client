import { Link, useNavigate } from "react-router-dom";
import logo_image from "../../../assets/logo_image.png"
import { TiShoppingCart } from "react-icons/ti";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from 'sweetalert2';
import UseCard from "../../../Hooks/UseCard";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cards] = UseCard();
    const [isAdmin] = useAdmin();

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Log Out Please Login Agin 😕 ',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/login")
            })
            .then(error => {
                console.log(error.message);
            })
    }
    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/ourShop/salad">Our Shop</Link></li>
        <li>
            <Link to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}>
                <p className="flex">
                    <TiShoppingCart className="h-[23px] w-[33px]"></TiShoppingCart>
                    <div className="badge badge-secondary -ml-4 -mt-3">+{cards?.length}</div>
                </p>
            </Link>
        </li>
        {
            user ? (<li onClick={handleLogout}><Link>Log Out</Link></li>) : (<li><Link to="/login">Login</Link></li>)
        }
    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-25 bg-base-300 text-white font-extrabold">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 uppercase">
                            {navOptions}
                        </ul>

                    </div>
                    <Link to="/">
                        <img className="h-[75px]" src={logo_image} alt="" />
                    </Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 uppercase">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;