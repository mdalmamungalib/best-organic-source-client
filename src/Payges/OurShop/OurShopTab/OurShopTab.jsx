import OrderCard from "../../../Components/OrderCard/OrderCard";

const OurShopTab = ({ items }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-6 mt-[60px] mb-10">
      {items.map((item) => (
        <OrderCard key={item._id} item={item}></OrderCard>
      ))}
    </div>
  );
};

export default OurShopTab;
