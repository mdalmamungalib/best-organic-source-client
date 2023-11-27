import useMenu from '../../../Hooks/UseMenu';

const Offered = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'OFFERED');
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className=" grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10">
                {
                    offered.map(item => <div key={item?.id} className="flex space-x-4">
                        <img className="w-[118px] h-[104px]" style={{ "border-radius": "0px 200px 200px 200px" }} src={item?.imgURL} alt="" />
                        <div>
                            <h3 className="uppercase font-serif text-black">{item?.name} ------------------</h3>
                            <p className="text-[#737373]">{item?.recipe}</p>
                        </div>
                        <p className="text-[#BB8506]">${item?.price}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Offered;