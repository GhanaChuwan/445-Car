import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion({result}) {
  return (
    <div>
      <Accordion sx={{backgroundColor:'black', color:'wheat'}}> 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>RESULT</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {result?.predictions.map(pre => <p>{`${pre.class} --> ${pre.confidence * 100}%`}</p>)}
          </Typography>
        </AccordionDetails>
      </Accordion>


    </div>
  );
}