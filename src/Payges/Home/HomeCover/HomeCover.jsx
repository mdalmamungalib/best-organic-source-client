import coverImg from "../../../assets/shop/banner2.jpg"

const HomeCover = () => {
    return (
        <div className="max-w-screen-xl mx-auto mt-[137px]">
            <div className="hero min-h-[572px]" style={{ backgroundImage: `url(${coverImg})` }}>
                <div className="hero-content text-center text-neutral-content border bg-white">
                    <div className="max-w-[1096px] min-h-[333.667px] text-black text-center flex flex-col justify-center items-center h-full">
                        <h1 className="mb-5 text-5xl font-serif uppercase ">Hello there</h1>
                            <p className="mb-5 lg:px-[167px] text-justify">Excepturi quae placerat risus nisi neque orci vivamus! Penatibus penatibus blanditiis nesciunt, justo condimentum eum etiam euismod est? Elit faucibus velit. Architecto, quam vel, mollis volutpat, asperiores tincidunt, eleifend. Bibendum repudiandae sapien accumsan. Mattis sint lectus, eget duis facilis? Ridiculus habitant eros adipiscing cupiditate erat, vero dolore itaque! Aliquid ratione.</p>                 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCover;