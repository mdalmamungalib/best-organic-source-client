
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-3/12 mt-[50px] mb-[48px]">
            <p className="text-[#D99904] text-xl italic mb-3">---{heading}---</p>
            <h3 className="text-[40px] text-black border-y-2 uppercase">{subHeading}</h3>
        </div>
    );
};

export default SectionTitle;