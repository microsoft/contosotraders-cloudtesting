import React from "react";
import productdetailimg1 from "../../assets/images/original/Contoso_Assets/product_page_assets/product_image_main.jpg";
import productdetailimg2 from "../../assets/images/original/Contoso_Assets/product_page_assets/image_2.jpg";
import productdetailimg3 from "../../assets/images/original/Contoso_Assets/product_page_assets/image_3.jpg";
import productdetailimg4 from "../../assets/images/original/Contoso_Assets/product_page_assets/image_4.jpg";
import chevron_up from "../../assets/images/original/Contoso_Assets/product_page_assets/chevron_up.svg";
import chevron_down from "../../assets/images/original/Contoso_Assets/product_page_assets/chevron_down.svg";
import { Button } from "@mui/material";
import './imageSlider.scss'

function ImageSlider(props) {
  const [min, setMin] = React.useState(0)
  const [max, setMax] = React.useState(4)
  const sliderImages = [
    {
      id : 1,
      img : productdetailimg1
    },
    {
      id : 2,
      img : props.imageUrl
    },
    {
      id : 3,
      img : productdetailimg3
    },
    {
      id : 4,
      img : productdetailimg4
    },
    {
      id : 2,
      img : productdetailimg2
    },
    {
      id : 1,
      img : productdetailimg1
    },
    {
      id : 4,
      img : productdetailimg4
    },
    {
      id : 3,
      img : productdetailimg3
    },
  ];

  const decrementMinMax = () => {
    setMin(min-4)
    setMax(max-4)
  }
  const incrementMinMax = () => {
    setMin(min+4)
    setMax(max+4)
  }
  return (
    <div>
      <div className="slidesection">
        <div className="slideimagelist">
          <div> <Button className={`${min === 0 ? "chevron_btn disabled" : "chevron_btn"} chevron_prevbtn`} disabled={min === 0 ? true : false} onClick={() => decrementMinMax()} ><img src={chevron_up} alt=""/></Button> </div>
            {sliderImages.slice(min,max).map((item, key)=>(
               <div className={`${props.sliderImg === item.img ? "imgdiv active" : "imgdiv"}`}> <img src={item.img} alt="image1" className="slideimage" onClick={()=>props.setSliderImg(item.img)} /> </div>
            ))}
          <div> <Button className={`${max === sliderImages.length ? "chevron_btn disabled" : "chevron_btn"} chevron_nextbtn`} disabled={max === sliderImages.length ? true : false} onClick={() => incrementMinMax()} ><img src={chevron_down} alt=""/></Button> </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;