import React from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import WishlistIcon from '../../../../assets/images/original/Contoso_Assets/Icons/wishlist_icon.svg'
import { useHistory } from 'react-router-dom';
const theme = createTheme()
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const history = useHistory()
  const  { prodImg, imageUrl, name, price, id, type } = props;
  const productDetailPage = (id = 1) => {
    history.push('/product/detail/'+id)
  }
  return (
    <Card className="productCard" onClick={() => productDetailPage(id)}>
      <CardMedia
        className={classes.media}
        image={prodImg?prodImg:imageUrl}
        title={name?name:''}
      />
      <CardContent>
        <div style={{display:'flex',alignItems:'center',marginBottom:'8.25px'}}>
            <Typography variant="h6" color="initial" component="h6" className='productName' style={{marginRight:'auto'}}>
                {name?name:'Lunar Shift Special Edition'}
            </Typography>
            <IconButton className='wishlist_icon' aria-label="add to favorites">
                {/* <img src={WishlistIcon} alt="like"/> */}
            </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className='productType' component="p">
          {type?type.name:'Controller'}
        </Typography>
        <div style={{display:'flex',alignItems:'center',paddingTop:'10px'}}>
            <Typography variant="h6" color="initial" component="h6" style={{marginRight:'auto'}} className="productOrgPrice m-0 mr-1">
                ${price?price.toFixed(2):'39.49'}
            </Typography>
            <Typography paragraph color="textSecondary" className="productOldPrice m-0 mr-1">
                $78.46
            </Typography>
            <Typography paragraph color="error" className="productOffer m-0 mr-1 ">
                50% OFF
            </Typography>
        </div>
      </CardContent>
    </Card>
  );
}