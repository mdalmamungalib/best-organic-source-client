import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import img1 from "../../../assets/home/slide1.jpg";
import img2 from "../../../assets/home/slide2.jpg";
import img3 from "../../../assets/home/slide3.jpg";
import img4 from "../../../assets/home/slide4.jpg";
import img5 from "../../../assets/home/slide5.jpg";
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {

    const images = [
        { img: img1, text: "salads" },
        { img: img2, text: "pizza" },
        { img: img3, text: "sup" },
        { img: img4, text: "dasad" },
        { img: img5, text: "salads" },
    ]

    return (
        <section>
            <SectionTitle
                heading={"from 11:00am to 10:00pm"}
                subHeading={"Order Online"}
            ></SectionTitle>
            <div className='max-w-screen-md mx-auto mb-10'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        images.map(image => ( // Added parentheses here
                            <SwiperSlide key={image}>
                                <img src={image.img} alt="" />
                                <h1 className='text-center uppercase text-3xl -mt-16 text-white'>{image.text}</h1>
                            </SwiperSlide>
                        )) // Added closing parentheses here
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Category;
