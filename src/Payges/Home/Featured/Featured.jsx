import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed pt-14 mt-[130px]">
            <div className="mx-auto text-center md:w-3/12 mt-[79px] mb-[48px]">
                <p className="text-[#D99904] text-xl italic mb-3">--- Check it out ---</p>
                <h3 className="text-[40px] text-white border-y-2 uppercase" >FROM OUR MENU</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 justify-center items-center px-4 md:px-6 pb-6 md:pb-10  lg:px-[300px] lg:pb-[130px] gap-10 ">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="text-white">
                    <p className="text-2xl">March 20, 2023 </p>
                    <p className="text-2xl">WHERE CAN I GET SOME?</p>
                    <p>Risus repellat sociis debitis fringilla facilisis, fames unde convallis unde semper occaecati, harum. Id numquam hendrerit habitasse, tempore, penatibus tellus. Nam ducimus consectetuer mauris placeat occaecat consectetuer odit quisque alias. In tempore iaculis donec quam! A. Ipsa molestias, porttitor cursus, nibh. Varius, nihil eveniet elit? Inceptos habitasse ligula aliquip voluptatem.</p>
                    <button className="btn btn-outline hover:btn-[#1F2937] border-0 border-b-4 rounded-lg border-white  text-xl font-semibold uppercase text-white mt-6">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
