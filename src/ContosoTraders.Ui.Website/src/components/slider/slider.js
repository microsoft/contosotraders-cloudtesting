import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Grid } from '@mui/material'
import Product from '../productCard/product';
import productImg1 from '../../assets/images/original/Contoso_Assets/Caurosal/product_1.jpg'
import productImg2 from '../../assets/images/original/Contoso_Assets/Caurosal/product_2.jpg'
import productImg3 from '../../assets/images/original/Contoso_Assets/Caurosal/product_3.jpg'
import productImg4 from '../../assets/images/original/Contoso_Assets/Caurosal/product_4.jpg'
import productImg5 from '../../assets/images/original/Contoso_Assets/Caurosal/product_5.jpg'

export default function Slider(props) {
    var items = [
        {
            name: "The Fastest, Most Powerful Xbox Ever.",
            description: "Elevate your game with the all-new Xbox Wireless Controller - Lunar Shift Special Edition",
            page: 1
        },
        {
            name: "The Fastest, Most Powerful Xbox Ever.",
            description: "Elevate your game with the all-new Xbox Wireless Controller - Lunar Shift Special Edition",
            page: 2
        },
    ]

    return (
        <div className='slider-section'>
            <div className='topSection'>
                <div className="LapHeadSection">
                    <div className="LapHead">{props.firstHeading}</div>
                    <p className="LapHeadmain">{props.secondHeading}</p>
                </div>
                <div className='LapButtonSection'>
                    <button className='outlined-primary-btn'>See All</button>
                </div>
            </div>
            <Carousel
                className='product-slider-corousel'
                navButtonsAlwaysVisible={true} autoPlay={false} indicators={false} animation='slide'
                navButtonsWrapperProps={{
                    style:{
                        top: '-70px',
                    }
                }}
                navButtonsProps={{
                    style: {
                        border: '1px solid #C4C4C4',
                        background: 'rgba(255, 255, 255, 0.5)',
                        color: '#000'
                    }
                }}
            >
                {
                    items.map((item, i) => <Item key={i} item={item} {...props} />)
                }
            </Carousel>
        </div>
    )
}

function Item(props) {
    return (
        <div className="slider-style">
            <Grid container spacing={1} className="slider-grid">
                <Grid item xs={12}>
                    {/* <div className='topSection'>
                        <div className="LapHeadSection">
                            <div className="LapHead">{props.firstHeading}</div>
                            <p className="LapHeadmain">{props.secondHeading}</p>
                        </div>
                        <div className='LapButtonSection'>
                            <button className='outlined-primary-btn'>See All</button>
                        </div>
                    </div> */}
                    <div className="LapSectionContent">
                        {props.item.page === 1 ?
                            <Grid container justifyContent="center" spacing={4}>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg1} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg2} />
                                </Grid>
                                <Grid item xs={3} >
                                    <Product prodImg={productImg3} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg4} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg5} />
                                </Grid>
                            </Grid>
                            : null}
                        {props.item.page === 2 ?
                            <Grid container justifyContent="center" spacing={4}>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg5} />
                                </Grid>
                                <Grid item xs={3} >
                                    <Product prodImg={productImg3} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg2} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg4} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Product prodImg={productImg1} />
                                </Grid>
                            </Grid>
                            : null}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}