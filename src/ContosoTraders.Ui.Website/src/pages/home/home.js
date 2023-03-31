import React, { useEffect } from "react";

import Hero from "./sections/hero";
import { ConfigService } from './../../services'
// import Slider from "./components/slider/slider";
// import Banner from "./components/Banner/banner";
import Gridsection from "./sections/gridSection";
import Finalsection from "./sections/finalSection";
const Home = ({ recommendedProducts, popularProducts, loggedIn }) => {
    // const [customerSupportEnabled, setCustomerSupportEnabled] = useState(false);
    useEffect(() => {
        async function loadSettings() {
            await ConfigService.loadSettings();
            // setCustomerSupportEnabled(ConfigService._customerSupportEnabled);
        }
        loadSettings();
    },[])
    return (
        <div className="home">
            <Hero />
            {/* <Slider firstHeading="Explore Awesome Products" secondHeading="RECOMMENDED FOR YOU"/> */}
            {/* <Banner firstHeading="Xbox Wireless Controller – Mineral Camo Special Edition" secondHeading="Textured triggers and bumpers | Hybrid D-pad | Button mapping | Bluetooth® technology"/> */}
            <Gridsection />
            <Finalsection />
            {/* <Recommended recommendedProductsData={recommendedProducts} loggedIn={loggedIn} /> */}
            {/* {loggedIn && <Popular popularProductsData={popularProducts} />}  */}
        </div>
    );
};

export default Home;
