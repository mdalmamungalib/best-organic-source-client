import { Helmet } from "react-helmet-async";

const HelmetTitle = ({ title }) => {
    return (
        <div>
            <Helmet>
                <title>{title} | Best Organic Source</title>
            </Helmet>
        </div>
    );
};

export default HelmetTitle;