import React, {useState} from 'react'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container,Paper,Button} from '@material-ui/core';

export default function Penguin() {
    const paperStyle={padding:'50px 20px', width:600, margin:'20px Auto'}
    const[nameSpecie,setNameSpecie]=useState('')
    const[price,setPrice]=useState('')
    const[description,setDescription]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const penguin={nameSpecie,price,description}
        console.log(penguin)
    }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Container >
        <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:'blue'}}>Add student</h1>
                <TextField id="outlined-basic1" label="specie name" variant="outlined" fullWidth
                value={nameSpecie}
                onChange={(e)=>setNameSpecie(e.target.value)}/>

                <TextField id="outlined-basic2" label="price" variant="outlined" fullWidth
                value={price}
                onChange={(e)=>setPrice(e.target.value)}/>

                <TextField id="outlined-basic3" label="description" variant="outlined" fullWidth
                value={description}
                onChange={(e)=>setDescription(e.target.value)}/>

                <Button onClick={handleClick}>Submit</Button>
        </Paper>
      </Container>
      
    </Box>
  );
}
