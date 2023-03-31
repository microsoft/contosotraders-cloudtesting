import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import description_off from "../../assets/images/original/Contoso_Assets/product_page_assets/description_off_icon.svg";
import description_on from "../../assets/images/original/Contoso_Assets/product_page_assets/description_on_icon.svg";
import './accordion.scss'

const Accordion = (MuiAccordion);

const AccordionSummary = (MuiAccordionSummary);

const AccordionDetails = (MuiAccordionDetails);

export default function CustomizedAccordions(props) {
  const { accordionItems } = props
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="AccordionSection">
      {accordionItems.map((item, key) => {
        return(
          <Accordion
            key={key}
            square
            expanded={expanded === item.name}
            onChange={handleChange(item.name)}
          >
            <AccordionSummary
              className="panelSummary"
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={
                expanded === item.name ? (
                  <img src={description_on} className="descpicon" alt=""/>
                ) : (
                  <img src={description_off} className="descpicon" alt=""/>
                )
              }
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.body}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  );
}