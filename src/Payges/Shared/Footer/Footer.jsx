import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { Link } from "react-router-dom";
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <footer className="bg-gradient-to-r from-gray-700  to-slate-900 py-10">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between text-white">
                    <div className="text-center w-full lg:w-1/2">
                        <p className="text-center text-2xl font-medium mb-6">CONTACT USE</p>
                        <p>123 ABS Street, Uni 21, Bangladesh</p>
                        <p>+88 123456789</p>
                        <p>Mon - Fri: 08:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>
                    <div className="text-center w-full lg:w-1/2">
                        <p className="text-center text-2xl font-medium mb-6">FLOW US</p>
                        <p>Join us on social media</p>
                        <div className="flex text-4xl justify-center gap-2 mt-4">
                            <Link to="https://www.facebook.com/bestorganicsource?mibextid=ZbWKwL">
                                <BiLogoFacebook></BiLogoFacebook>
                            </Link>
                            <Link to="">
                                <BiLogoInstagram></BiLogoInstagram>
                            </Link>
                            <Link to="">
                                <BiLogoTwitter></BiLogoTwitter>
                            </Link>

                        </div>
                    </div>
                </div>
            </footer>

            <div className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © {currentYear} - Best Organic Source</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;