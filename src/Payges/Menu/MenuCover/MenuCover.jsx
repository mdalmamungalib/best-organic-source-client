const MenuCover = ({ heading, subHeading, img }) => {
    return (
        <div>
            <div className="hero min-h-[600px] mt-[45px] overflow-hidden" style={{ backgroundImage: `url(${img})` }}>
                <div className="hero-content lg:w-[1096px] md:w-[548px] min-h-[350px] bg-black bg-opacity-60 text-center text-white ">
                    <div className="flex justify-center items-center h-full">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-[45px] font-semibold font-serif uppercase">{heading}</h1>
                            <p className="mb-5 text-[16px]">{subHeading}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuCover;
