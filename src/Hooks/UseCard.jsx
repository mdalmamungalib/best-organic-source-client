import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const UseCard = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { isLoading, refetch, data: cards = [] } = useQuery({
        queryKey: ["card", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/cards?email=${user?.email}`)
            return res.data;
        },
    });
    return [cards, isLoading, refetch];
};

export default UseCard;
