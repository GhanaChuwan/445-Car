import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Result from './Result'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid({ submitButton, uploadFileButton , apiData, result}) {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {uploadFileButton()}
        </Grid>
        <Grid item xs={6}>
          {submitButton()}
        </Grid>
                <Grid item xs={12} sx={{justifyContent:'center', alignContent:'center'}}>
        <img
              src={apiData}
              alt={apiData}
              loading="lazy"
              width={"75%"}
              height={"100%"}
            />
            
        </Grid>
        <Grid item xs={12}>
          <Result result={result}/>
        </Grid>
        

      </Grid>
    </Box>
  );
}