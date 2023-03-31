import React from 'react'

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Finalsection = () => {
  const history = useNavigate()
  const startShopping = () => {
    history('/list/controllers')
  }
  return (
    <div className='final-section-container'>
      <Grid container className='grid-container'>
        <Grid item lg={7} md={7} xs={12}>
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <div className='content-section'>
            <h1>Play more, wait less</h1>
            <p>A streamlined dashboard designed to get you into the games and entertainment you love quickly.</p>
            <Button className='start-btn' variant="outlined" onClick={()=>startShopping()} >Start Shopping</Button>
            </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Finalsection