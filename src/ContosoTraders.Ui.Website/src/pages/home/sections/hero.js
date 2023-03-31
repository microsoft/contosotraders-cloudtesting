import React from "react";
import Corousel from "../../../components/corousel/corousel";
import heroBg from '../../../assets/images/original/Contoso_Assets/Slider_section/hero_banner.jpg';
import heroBg2 from '../../../assets/images/original/Contoso_Assets/Slider_section/hero_banner-2.jpg'
import LocalMallIcon from '../../../assets/images/original/Contoso_Assets/Icons/cart-icon-copy.svg'
import { useNavigate } from "react-router-dom";
function Hero() {

        const history = useNavigate()
        const buyNow = (id) => {
            history('/product/detail/'+id)
        }
        const moreDetails = () => {
            history('/list/controllers')
        }
        const items = [
            {
                name: "The Fastest, Most Powerful Xbox Ever.",
                description: "Elevate your game with the all-new Xbox Wireless Controller - Lunar Shift Special Edition",
                bg: heroBg,
                buttons : [
                    {
                        title : 'Buy Now',
                        color : 'primary',
                        class : 'BannerButton1',
                        endIcon: <img src={LocalMallIcon} width={25} height='auto' alt=""/>,
                        onClickFn : () => buyNow(1)
                    },
                    {
                        title : 'More Details',
                        color : 'inherit',
                        class : 'BannerButton2',
                        endIcon : '',
                        onClickFn : () => moreDetails()
                    }
                ]
            },
            {
                name: "Xbox Wireless Controller - Mineral Camo Special Edition",
                description: "Textured triggers and bumpers | Hybrid D-pad | Button mapping | Bluetooth® technology",
                bg: heroBg2,
                buttons : [
                    {
                        title : 'Buy Now',
                        color : 'primary',
                        class : 'BannerButton1',
                        endIcon: <img src={LocalMallIcon} width={25} height='auto' alt=""/>,
                        onClickFn : () => buyNow(1)
                    },
                    {
                        title : 'More Details',
                        color : 'inherit',
                        class : 'BannerButton2',
                        endIcon : '',
                        onClickFn : () => moreDetails()
                    }
                ]
            },
        ]
        return (
            <div className="hero" data-testid="carousel">
                <Corousel items={items} />
            </div>
        );
}

export default Hero;
