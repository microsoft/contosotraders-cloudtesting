import React from 'react';
import Breadcrump from '../../components/breadcrumb/breadcrumb'
import { useLocation } from 'react-router-dom';
const RefundPolicy = (props) => {
    const location = useLocation();
    const currentCategory = location.pathname.split("/").pop().replaceAll('-',' ');
    return (
        <>
            <div className='refund-policy-section'>
                <Breadcrump currentPath={currentCategory} />
                <div className="refund-policy">
                    <p className="mainHeading">Refund Policy</p>
                    <p className="subHeading">At Contoso Traders, we want our customers to be completely satisfied with their purchases.  </p>
                    <p className="paragraph">
                        1. If for any reason you are not satisfied with your purchase, you may return it within 30 days of the original purchase date for a full refund.  
                        <br/><br/>
                        2. To be eligible for a refund, the item must be in its original condition, unused, and with all original packaging and tags.  
                        <br/><br/>
                        3. To initiate a refund, please contact our customer service team at <a href="mailto: support@contosotraders.com">support@contosotraders.com</a>.  
                        <br/><br/>
                        4. Please note that original shipping charges are non-refundable, and the customer is responsible for the cost of return shipping. 
                        </p>
                </div>
            </div>
            <hr/>
        </>
     );
}

export default RefundPolicy;