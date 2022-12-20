
import React, { useRef, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import description_off from '../../../../../assets/images/original/Contoso_Assets/Icons/plus.png'
import description_on from '../../../../../assets/images/original/Contoso_Assets/Icons/minus.png'
import { useParams } from "react-router-dom";
const Accordion = withStyles({
  root: {
    // border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "white",
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiAccordionDetails);

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
      {/* <Accordion
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          className="panelSummary"
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={
            expanded === "panel2" ? (
              <img src={description_on} className="descpicon" alt=""/>
            ) : (
              <img src={description_off} className="descpicon" alt=""/>
            )
          }
        >
          <Typography>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} className="descpAttributes">
            <FormControlLabel
              control={
                <Checkbox
                  checked={color.yellow?color.yellow:false}
                  onChange={handleColorChange}
                  name="yellow"
                  color="primary"
                />
              }
              label={<Typography  style={{ color: color.yellow === true?'#2874F0':'' }}>Yellow</Typography>}
            />
            </Grid>
            <Grid item xs={12} className="descpAttributes">
            <FormControlLabel
              control={
                <Checkbox
                  checked={color.blue?color.blue:false}
                  onChange={handleColorChange}
                  name="blue"
                  color="primary"
                />
              }
              label={<Typography  style={{ color: color.blue === true?'#2874F0':'' }}>Blue</Typography>}
            />
            </Grid>
            <Grid item xs={12} className="descpAttributes">
            <FormControlLabel
              control={
                <Checkbox
                  checked={color.maroon_red?color.maroon_red:false}
                  onChange={handleColorChange}
                  name="maroon_red"
                  color="primary"
                />
              }
              label={<Typography  style={{ color: color.maroon_red === true?'#2874F0':'' }}>Maroon Red</Typography>}
            />
            </Grid>
            <Grid item xs={12} className="descpAttributes">
            <FormControlLabel
              control={
                <Checkbox
                  checked={color.crimpson_blue?color.crimpson_blue:false}
                  onChange={handleColorChange}
                  name="crimpson_blue"
                  color="primary"
                />
              }
              label={<Typography  style={{ color: color.crimpson_blue === true?'#2874F0':'' }}>Crimpson Blue</Typography>}
            />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          className="panelSummary"
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={
            expanded === "panel3" ? (
              <img src={description_on} className="descpicon" alt=""/>
            ) : (
              <img src={description_off} className="descpicon" alt=""/>
            )
          }
        >
          <Typography>Theme</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          className="panelSummary"
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={
            expanded === "panel4" ? (
              <img src={description_on} className="descpicon" alt=""/>
            ) : (
              <img src={description_off} className="descpicon" alt=""/>
            )
          }
        >
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          className="panelSummary"
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={
            expanded === "panel5" ? (
              <img src={description_on} className="descpicon" alt=""/>
            ) : (
              <img src={description_off} className="descpicon" alt=""/>
            )
          }
        >
          <Typography>Discount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          className="panelSummary"
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={
            expanded === "panel6" ? (
              <img src={description_on} className="descpicon" alt=""/>
            ) : (
              <img src={description_off} className="descpicon" alt=""/>
            )
          }
        >
          <Typography>Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}