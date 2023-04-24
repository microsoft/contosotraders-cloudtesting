import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button, Grid } from '@mui/material'
import './corousel.scss'

export default function Corousel(props)
{
    const { items } = props;

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
    return (
        <div className="courousel-style" style={{ backgroundImage: 'url('+props.item.bg+')'}}>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12} className="BannerGrid">
                    <div className="BannerHeading">
                        {props.item.name}
                    </div>
                    <div className="BannerContent">
                        {props.item.description}
                    </div>
                    <div className="BannerButtondiv">
                    {props.item.buttons && props.item.buttons.map((btn, key) => {
                        return (
                            <Button
                                key={key}
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                                color={btn.color}
                                className={`box-shadow-0 text-transform-capitalize fw-regular ${btn.class}`}
                                endIcon={btn.endIcon}
                                size="large"
                                onClick={btn.onClickFn}
                            >
                                {btn.title}
                            </Button>
                        )
                    })}
                    </div>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        </div>
    )
}
