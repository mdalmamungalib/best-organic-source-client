import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";


const Banner = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_SERVER_URL}/banner`)
        return res.data;
    }
});
if (isLoading) {
  return <FadeLoader
      className='grid mx-auto'
      color="#36d7b7"
      height={20}
  />
}
  return (
    <div className="">
      <Carousel autoPlay>
        {banners.map((banner) => (
          <div key={banner._id}>
            <img src={banner.imgURL} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
