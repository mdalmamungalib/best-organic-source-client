import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const { data: menu = [], isLoading, refetch } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/items`)
            return res.json();
        }
    })
    return [menu, isLoading, refetch];
};

export default useMenu;
