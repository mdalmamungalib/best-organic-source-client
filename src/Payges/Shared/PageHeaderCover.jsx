const PageHeaderCover = ({ img, heading, subHeading }) => {
    return (
        <div className="hero min-h-[600px] overflow-hidden" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className=" hero-content lg:w-[1096px] md:w-[848px] min-h-[350px] bg-black bg-opacity-60 text-center text-white  flex flex-col justify-center items-center p-4">
                    <h1 className="mb-5 text-5xl font-bold text-[88px] font-serif text-white">{heading}</h1>
                    <p className="mb-5 text-[24px] text-white font-semibold">{subHeading}</p>
                </div>
            </div>
        </div>
    );
};

export default PageHeaderCover;
