import React from 'react';
import Breadcrump from '../../components/breadcrumb/breadcrumb'
import { useLocation } from 'react-router-dom';
import './legals.scss'

const AboutUs = (props) => {
    const location = useLocation();
    const currentCategory = location.pathname.split("/").pop().replaceAll('-',' ');
    return (
        <>
            <div className='refund-policy-section'>
                <Breadcrump currentPath={currentCategory} />
                <div className="refund-policy">
                    <p className="mainHeading">About Us</p>
                    {/* <p className="subHeading">Our Mission</p> */}
                    <p className="paragraph">
                        Contoso Traders is an e-commerce platform that specializes in electronic items. Our website offers a wide range of electronics, including smartphones, laptops, and other popular gadgets.
                        <br/><br/>
                        We pride ourselves on providing high-quality products at competitive prices, and our dedicated customer service team is always on hand to assist with any queries or concerns. With fast and secure shipping, convenient payment options, and a user-friendly interface, Contoso Traders is the perfect place to shop for all your electronic needs. 
                    </p>
                </div>
            </div>
            <hr/>
        </>
     );
}

export default AboutUs;