
import React, { useRef, createRef } from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import description_off from '../../assets/images/original/Contoso_Assets/Icons/plus.png'
import description_on from '../../assets/images/original/Contoso_Assets/Icons/minus.png'
import { useParams } from "react-router-dom";

const Accordion = (MuiAccordion);

const AccordionSummary = (MuiAccordionSummary);

const AccordionDetails = (MuiAccordionDetails);

export default function SidebarAccordion(props) {
  const [expanded, setExpanded] = React.useState("panel1");
  const { code } = useParams();
  const dataType = props.id;
  const checkRef = useRef([])
  checkRef.current = props.data && props.data.map((_, i) => checkRef.current[i] ?? createRef());
  // const [color, setColorState] = React.useState({ blue : true });
  const [checkedItems, setCheckedItems] =  React.useState(new Map());
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // const handleColorChange = (event) => {
  //   setColorState({ ...color, [event.target.name]: event.target.checked });
  // };
  const handleChangeBrands = (e, dataType) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems(checkedItems.set(item, isChecked));
    props.onFilterChecked(e, dataType);
  };

  React.useEffect(() => {
    
    if(code === 'all-products'){
      props.data && props.data.forEach((item)=>{
        setCheckedItems(new Map().set(`brand${item.id}`, false));
      });
      checkRef.current && checkRef.current.forEach((item)=>{
        if(item.current.checked && item.current.checked === true){
          item.current.checked = false;
          let ele = item.current;
          ele.target = item.current;
          ele.target.name = item.current.name;
          props.onFilterChecked(ele, dataType);
        }
      })      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  
  return (
    <div className="AccordionSection">
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          className="panelSummary"
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={
            expanded === "panel1" ? (
              <img src={description_on} className="descpicon" alt=""/>
            ) : (
              <img src={description_off} className="descpicon" alt=""/>
            )
          }
        >
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {props.data && props.data.map((item,key) => (
              <Grid key={key} item xs={12} className="descpAttributes">
                <input type='checkbox' 
                  className="MuiCheckbox-root"
                  ref={checkRef.current[key]} 
                  checked={checkedItems.get(`brand${item.id}`)} 
                  name={`brand${item.id}`} 
                  id={item.id}
                  onChange={(e)=>{
                    handleChangeBrands(e, dataType)
                  }}
                />
                <label className={`label ${checkedItems.get(`brand${item.id}`) ? "Mui-checked" : "" }`}>{item.name}</label>
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={checkRef.current[key]}
                      checked={checkedItems.get(item.name)}
                      onChange={(e)=>{
                        handleChangeBrands(e, dataType)
                      }}
                      name={`brand${item.id}`}
                      color="primary"
                      code={`${item.code || item.id}`}
                      id={item.id}
                    />
                  }
                  label={item.name}
                /> */}
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}