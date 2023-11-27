import HelmetTitle from "../../../Components/HelmetTitle";
import PageHeaderCover from "../../Shared/PageHeaderCover";
import coverImg from "../../../assets/menu/banner3.jpg"
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItems from "../MenuItems/MenuItems";
import useMenu from "../../../Hooks/UseMenu";
import dessertsImg from "../../../assets/menu/dessert-bg.jpeg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import Offered from "../Offered/Offered";
import { FadeLoader } from "react-spinners";

const Menu = () => {
    const [menu, isLoading] = useMenu();
    if(isLoading){
        return <FadeLoader
        className='grid mx-auto'
        color="#36d7b7"
        height={20}
    />
    }
    const desserts = menu.filter(item => item.category === 'DESSERTS');
    const soup = menu.filter(item => item.category === 'SOUPS');
    const salad = menu.filter(item => item.category === 'SALAD');
    const pizza = menu.filter(item => item.category === 'PIZZA');
    return (
        <div>
            <HelmetTitle
            title={"Menu"}
            ></HelmetTitle>
            <PageHeaderCover
            img={coverImg}
            heading={"OUR MENU"}
            subHeading={"Would you like to try a dish?"}
            ></PageHeaderCover>
            <SectionTitle
            heading={"Don't miss"}
            subHeading={"TODAY'S OFFER"}
            ></SectionTitle>
            <Offered></Offered>
            <MenuItems items={desserts} heading={"desserts"} subHeading={"Odio nostra quibusdam animi nunc cras proident cras, enim, amet."} img={dessertsImg}></MenuItems>
            <MenuItems items={soup} heading={"soup"} subHeading={"Odio nostra quibusdam animi nunc cras proident cras, enim, amet."} img={soupImg}></MenuItems>
            <MenuItems items={salad} heading={"salad"} subHeading={"Odio nostra quibusdam animi nunc cras proident cras, enim, amet."} img={saladImg}></MenuItems>
            <MenuItems  items={pizza} heading={"pizza"} subHeading={"Odio nostra quibusdam animi nunc cras proident cras, enim, amet."} img={pizzaImg}></MenuItems>
        </div>
    );
};

export default Menu;