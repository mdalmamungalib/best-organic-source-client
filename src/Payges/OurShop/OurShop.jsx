import PageHeaderCover from "../Shared/PageHeaderCover";
import shop from "../../assets/shop/banner2.jpg"
import HelmetTitle from "../../Components/HelmetTitle";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Hooks/UseMenu";
import OurShopTab from "./OurShopTab/OurShopTab";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const OurShop = () => {
    const categories = ["salad", "pizza", "soup", "desserts", "drinks"];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu, isLoading] = useMenu();
    console.log("menu", menu)
    if(isLoading){
        return <FadeLoader
        className='grid mx-auto'
        color="#36d7b7"
        height={20}
    />
    }
    const salad = menu.filter(item => item?.category === "SALAD");
    const pizza = menu.filter(item => item?.category === "PIZZA");
    const soup = menu.filter(item => item?.category === "SOUPS");
    const desserts = menu.filter(item => item?.category === "DESSERTS");
    const drinks = menu.filter(item => item?.category === "DRINKS");

    console.log("desserts", desserts);

    return (
        <div>
            <HelmetTitle
                title={"Shop"}
            ></HelmetTitle>
            <PageHeaderCover
                img={shop}
                heading={"OUR SHOP"}
                subHeading={"Would you like to try a dish?"}
            ></PageHeaderCover>

            <div className="mt-[130px] max-w-screen-xl mx-auto">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <div className="grid justify-center">
                        <TabList className="text-2xl font-medium uppercase ">
                            <Tab>Salad</Tab>
                            <Tab>pizza</Tab>
                            <Tab>soups</Tab>
                            <Tab>desserts</Tab>
                            <Tab>drinks</Tab>
                        </TabList>
                    </div>
                    <TabPanel>
                        <OurShopTab items={salad}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={pizza}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={soup}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={desserts}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={drinks}></OurShopTab>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default OurShop;