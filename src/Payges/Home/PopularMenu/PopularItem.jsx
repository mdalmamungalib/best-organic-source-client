const PopularItem = ({ item }) => {
  const { name, recipe, imgURL, price } = item;
  return (
    <div className="flex space-x-4">
      <img
        className="min-w-[118px] h-[104px]"
        style={{ "border-radius": "0px 200px 200px 200px" }}
        src={imgURL}
        alt=""
      />
      <div>
        <h3 className="uppercase font-serif text-black">
          {name} ------------------
        </h3>
        <p className="text-[#737373]">{recipe}</p>
      </div>
      <p className="text-[#BB8506]">${price}</p>
    </div>
  );
};

export default PopularItem;
