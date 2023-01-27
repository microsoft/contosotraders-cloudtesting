import React from 'react'

import { Grid, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Finalsection = () => {
  const history = useHistory()
  const startShopping = () => {
    history.push('/list/controllers')
  }
  return (
    <div className='final-section-container'>
      <Grid container className='grid-container'>
        <Grid item xs={7}>
        </Grid>
        <Grid item xs={5}>
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