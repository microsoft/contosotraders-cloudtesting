import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button, Grid } from '@material-ui/core'
import LocalMallIcon from '../../../../assets/images/original/Contoso_Assets/Icons/cart-icon-copy.svg'
import heroBg from '../../../../assets/images/original/Contoso_Assets/Slider_section/hero_banner.jpg'
import { useHistory } from 'react-router-dom';
export default function Corousel(props)
{
    var items = [
        {
            name: "The Fastest, Most Powerful Xbox Ever.",
            description: "Elevate your game with the all-new Xbox Wireless Controller - Lunar Shift Special Edition",
            bg: heroBg
        },
        {
            name: "The Fastest, Most Powerful Xbox Ever.",
            description: "Elevate your game with the all-new Xbox Wireless Controller - Lunar Shift Special Edition",
            bg: heroBg
        },
    ]

    return (
        <Carousel
            navButtonsAlwaysVisible={true}
            autoPlay={false}
            navButtonsProps={{
                style: {
                    border: '1px solid #C4C4C4',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#000'
                }
            }}
            indicatorContainerProps={{
                style: {
                    zIndex:'1',
                    display: 'flex',
                    position:'absolute',
                    justifyContent:'center',
                    bottom:'20px'
                }
        
            }}
            indicatorIconButtonProps={{
                style: {
                    color:'white',
                    backgroundColor:'white',
                    margin:'0 2px'
                }
        
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    color:'#2874F0',
                    backgroundColor:'#2874F0',
                    margin:'0 2px'
                }
        
            }}
            >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    const history = useHistory()
    const buyNow = (id) => {
        history.push('/product/detail/'+id)
    }
    const moreDetails = () => {
        history.push('/list/controllers')
    }
    return (
        <div className="courousel-style" style={{ backgroundImage: 'url('+props.item.bg+')'}}>
            <Grid container spacing={3}>
                <Grid item xs={6} className="BannerGrid">
                    <div className="BannerHeading">
                        {props.item.name}
                    </div>
                    <div className="BannerContent">
                        {props.item.description}
                    </div>
                    <div className="BannerButtondiv">
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            className="box-shadow-0 text-transform-capitalize fw-regular BannerButton1"
                            endIcon={<img src={LocalMallIcon} width={25} height='auto' alt=""/>}
                            size="large"
                            onClick={()=>buyNow(1)}
                        >
                            Buy Now
                        </Button>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="default"
                            className="box-shadow-0 text-transform-capitalize fw-regular BannerButton2"
                            size="large"
                            onClick={()=>moreDetails()}
                        >
                            More Details
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        </div>
    )
}