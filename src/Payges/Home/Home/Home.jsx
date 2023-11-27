import HelmetTitle from "../../../Components/HelmetTitle";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import HomeCover from "../HomeCover/HomeCover";
import Number from "../Number/Number";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommends from "../Recommends/Recommends";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <HelmetTitle
            title={"Home"}
            ></HelmetTitle>
            <Banner></Banner>
            <Category></Category>
            <HomeCover></HomeCover>
            <PopularMenu></PopularMenu>
            <Number></Number>
            <Recommends></Recommends>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;