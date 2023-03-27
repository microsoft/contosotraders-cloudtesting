import React from 'react';
import Breadcrump from '../../components/breadcrumb/breadcrumb'
import { useLocation } from 'react-router-dom';
const TermsOfService = (props) => {
    const location = useLocation();
    const currentCategory = location.pathname.split("/").pop().replaceAll('-',' ');
    return (
        <>
            <div className='refund-policy-section'>
                <Breadcrump currentPath={currentCategory} />
                <div className="refund-policy">
                    <p className="mainHeading">Terms Of Service</p>
                    {/* <p className="subHeading">OVERVIEW</p> */}
                    <p className="paragraph">
                        <b>Introduction</b>
                        <br/>
                        These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Website Name accessible at Contoso traders. 
                        <br/><br/>
                        By using our website, you accepted these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website. 
                        <br/><br/>
                        <b>Intellectual Property Rights </b>
                        <br/>
                        Unless otherwise stated, we or our licensors own the intellectual property rights on the website and material on the website. Subject to the license below, all these intellectual property rights are reserved. 
                        <br/><br/>
                        <b>License to use website </b>
                        <br/>
                        You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions. 
                        <br/><br/>
                        <b>You must not: </b>
                        <ul>

                        <li>republish material from this website (including republication on another website); </li>

                        <li>sell, rent or sub-license material from the website. </li>

                        <li>show any material from the website in public. </li>

                        <li>reproduce, duplicate, copy or otherwise exploit material on our website for a commercial purpose. </li>

                        <li>Edit or otherwise modify any material on the website; or </li>

                        <li>Redistribute material from this website except for content specifically and expressly made available for redistribution. </li>

                        </ul>
                        Where content is specifically made available for redistribution, it may only be redistributed within your organisation. 
                        <br/><br/>
                        <b>Acceptable use </b>
                        <br/>
                        - You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity. 
                        <br/><br/>
                        - You must not use our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit, or other malicious computer software. 
                        <br/><br/>
                        - You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to our website without our express written consent. 
                        <br/><br/>
                        - You must not use our website to transmit or send unsolicited commercial communications. 
                        <br/><br/>
                        - You must not use our website for any purposes related to marketing without our express written consent. 
                        <br/><br/>

                        <b>Restricted access </b>
                        <br/>
                        We reserve the right to restrict access to areas of our website, or indeed our whole website, at our discretion and without notice. 
                        <br/><br/>
                        <b>User content </b>
                        <br/>
                        In these terms and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to our website, for whatever purpose. 
                        <br/><br/>
                        You grant to us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your user content in any existing or future media. You also grant to us the right to sub-license these rights, and the right to bring an action for infringement of these rights. 
                        <br/><br/>
                        Your user content must not be illegal or unlawful, must not infringe any third party's legal rights, and must not be capable of giving rise to legal action whether against you or us or a third party (in each case under any applicable law). 
                        <br/>
                    <br/></p>
                </div>
            </div>
            <hr/>
        </>
     );
}

export default TermsOfService;