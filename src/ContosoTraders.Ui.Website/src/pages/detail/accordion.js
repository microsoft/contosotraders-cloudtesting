import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import description_off from "../../assets/images/original/Contoso_Assets/product_page_assets/description_off_icon.svg";
import description_on from "../../assets/images/original/Contoso_Assets/product_page_assets/description_on_icon.svg";
import discount_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/discount.png";
import { Link } from "react-router-dom";

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
    // borderTop: "1px solid rgba(0, 0, 0, .125)",
    
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
    padding: '16px 0',
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState(null);
  const features = props.features

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={4} className="descpAttributes">
              Model Number
            </Grid>
            <Grid item xs={8} className="descpDetails">
              Xbox Series X
            </Grid>
            <Grid item xs={4} className="descpAttributes">
              Sales Package
            </Grid>
            <Grid item xs={8} className="descpDetails">
              1 Series X Console, 1 Controller, 1 Ultra High Speed HDMI Cable
              and 1 Power Cord.
            </Grid>
            <Grid item xs={4} className="descpAttributes">
              Additional Content
            </Grid>
            <Grid item xs={8} className="descpDetails">
              Series X console, One Wireless Controller, A high-speed HDMI Cable
              and Power Cable
            </Grid>
            <Grid item xs={4} className="descpAttributes">
              Console Type
            </Grid>
            <Grid item xs={8} className="descpDetails">
              Console
            </Grid>
            <Grid item xs={4} className="descpAttributes">
              Sound
            </Grid>
            <Grid item xs={8} className="descpDetails">
              L-PCM, up to 7.1, Dolby Digital 5.1, DTS 5.1, Dolby TrueHD with
              Atmos
            </Grid>
            <Grid item xs={4} className="descpAttributes">
              Motion Controller Included
            </Grid>
            <Grid item xs={8} className="descpDetails">
              Yes
            </Grid>
            <Grid item xs={4} className="descpAttributes">
              RAM
            </Grid>
            <Grid item xs={8} className="descpDetails">
              16GB GDDR6 w/320 bit-wide bus
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
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
          <Typography>Offers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="OffersSection">
          <div className="Offerslist">
            <span><img src={discount_icon} className="discount_icon" alt=""/></span>
            <span>
              10% off on SBI Credit Card, up to ₹1,750, on orders of ₹5000 and
              above <Link to="/" className="TClink">T&C</Link>
            </span>
          </div>
          <div className="Offerslist">
          <span><img src={discount_icon} className="discount_icon" alt=""/></span>
            <span>
              10% off on SBI Credit Card EMI Transactions, up to ₹2,250, on
              orders of ₹5000 and above <Link to="/" className="TClink">T&C</Link>
            </span>
          </div>
          <div className="Offerslist">
          <span><img src={discount_icon} className="discount_icon" alt=""/></span>
            <span>
              Additional ₹750 discount on SBI Credit Card and EMI txns on net
              cart value of INR 29,999 and above <Link to="/" className="TClink">T&C</Link>
            </span>
          </div>
          <div className="Offerslist">
          <span><img src={discount_icon} className="discount_icon" alt=""/></span>
            <span>
              No cost EMI ₹8,815/month. Standard EMI also available <Link to="/" className="TClink">View plans</Link>
            </span>
          </div>
          </div>
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
          <Typography>Questions and Answers</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ul>
              {features && features.map((feature, index) => (
                <li className="detail_feature" key={index}>
                  <Typography className="detail_feature-title">{`${feature.title}:`}</Typography>
                  <Typography className="detail_feature-description">
                    {feature.description}
                  </Typography>
                </li>
              ))}
            </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}