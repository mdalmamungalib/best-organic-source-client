import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GiWallet } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FadeLoader } from "react-spinners";

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: status = {}, isLoading, refetch } = useQuery({
        queryKey: ['admin-status'],
        queryFn: async () => {
            const res = await axiosSecure("/admin-status");
            return res.data;
        }
    });

    if(isLoading){
        refetch();
        return <FadeLoader
            className='grid mx-auto'
            color="#36d7b7"
            height={20}
        />
    }
    return (
        <div className="w-full ml-[24px] mt-[50px]">
            <h1 className="text-[32px] text-black font-semibold font-serif ml-10">Hi, Welcome Back! {user?.displayName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center mt-[24px]">
                {/* box01 */}
                <div
                    style={{
                        "background": "linear-gradient(90deg, #BB34F5 0%, #FCDBFF 100%)"
                    }}
                    className="max-w-[293px] min-h-[150px] rounded-lg">
                    <div className="flex justify-center items-center p-11">
                        <GiWallet size={64} color="#fff"></GiWallet>
                        <div className="ml-6">
                            <h1 className="text-[40px] font-extrabold text-white">${status?.revenue}</h1>
                            <h3 className="text-2xl text-white">Revenue</h3>
                        </div>
                    </div>
                </div>
                {/* box02 */}
                <div
                    style={{
                        "background": "linear-gradient(90deg, #D3A256 0%, #FDE8C0 100%)"
                    }}
                    className="max-w-[293px] min-h-[150px] rounded-lg">
                    <div className="flex justify-center items-center p-11">
                        <FaUsers size={64} color="#fff"></FaUsers>
                        <div className="ml-6">
                            <h1 className="text-[40px] font-extrabold text-white">{status?.users}</h1>
                            <h3 className="text-2xl text-white">Customers</h3>
                        </div>
                    </div>
                </div>
                {/* box03 */}
                <div
                    style={{
                        "background": "linear-gradient(90deg, #FE4880 0%, #FECDE9 100%)"
                    }}
                    className="max-w-[293px] min-h-[150px] rounded-lg">
                    <div className="flex justify-center items-center p-11">
                        <MdProductionQuantityLimits size={64} color="#fff"></MdProductionQuantityLimits>
                        <div className="ml-6">
                            <h1 className="text-[40px] font-extrabold text-white">{status?.products}</h1>
                            <h3 className="text-2xl text-white">Products</h3>
                        </div>
                    </div>
                </div>
                {/* box04 */}
                <div
                    style={{
                        "background": "linear-gradient(90deg, #6AAEFF 0%, #B6F7FF 100%)"
                    }}
                    className="max-w-[293px] min-h-[150px] rounded-lg">
                    <div className="flex justify-center items-center p-11">
                        <TbTruckDelivery size={64} color="#fff"></TbTruckDelivery>
                        <div className="ml-6">
                            <h1 className="text-[40px] font-extrabold text-white">{status?.orders}</h1>
                            <h3 className="text-2xl text-white">Orders</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;