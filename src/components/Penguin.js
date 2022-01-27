import React, {useEffect, useState} from 'react'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container,Paper,Button} from '@material-ui/core';
import Gif from '../assets/pinguino.gif'
import { LaptopWindowsRounded } from '@material-ui/icons';

export default function Penguin() {
  const paperStyle={padding:'50px 20px', width:600, margin:'20px Auto'}
  const[nameSpecie,setNameSpecie]=useState('')
  const[price,setPrice]=useState('')
  const[description,setDescription]=useState('')
  const[penguins,setPenguins]=useState([])


  function refresh(){
    window.location.reload(true);
  }
  
  const handleClick = (e) =>{
      e.preventDefault()
      const penguin={nameSpecie,price,description}
      console.log(penguin)
      fetch("http://localhost:8080/penguin/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(penguin)

      }).then( () =>{
        console.log("New Penguin added")
        refresh();
      })

  }

  useEffect(()=>{
    fetch("http://localhost:8080/penguin/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setPenguins(result);
    }
    )
  },[])
  

  const deleteById = id =>{

    fetch("http://localhost:8080/penguin/" + id, {method:"DELETE"})
    .then( () => {
      console.log("delete successful") 
      refresh();
    });

  }
    
  return (
    <Box
      component="form"
      sx= {{ '& > :not(style)': { m: 1, width: '25ch' },}}
      noValidate
      autoComplete="off"
    >
      <Container >
        <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:'blue'}}>Add Penguin</h1>
                <TextField id="outlined-basic1" label="specie name" variant="outlined" fullWidth
                value={nameSpecie}
                onChange={(e)=>setNameSpecie(e.target.value)}/>

                <TextField id="outlined-basic2" label="price" variant="outlined" fullWidth
                value={price}
                onChange={(e)=>setPrice(e.target.value)}/>

                <TextField id="outlined-basic3" label="description" variant="outlined" fullWidth
                value={description}
                onChange={(e)=>setDescription(e.target.value)}/>

                <Button variant="contained" color="secondary" onClick={handleClick}>Submit</Button>
        </Paper>

        <h1>Penguins</h1>

        <img src={Gif} alt="loading..." />

        <Paper elevation={3} style={paperStyle}>

          {penguins.map(penguin=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={penguin.id}>

              NameSpecie:{penguin.nameSpecie}<br/>
              Price:{penguin.price}<br/>
              Description:{penguin.description}

              <Button variant="contained" color="primary" >Edit</Button>
              <Button variant="contained" color="secondary" onClick={() => deleteById(penguin.id)}>Delete</Button>

            </Paper>
          ))}

        </Paper>

      </Container>
      
    </Box>
  );
}
