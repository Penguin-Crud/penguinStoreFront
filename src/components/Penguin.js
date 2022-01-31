import React, {useEffect, useState} from 'react'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Paper,Button} from '@material-ui/core';
import Gif from '../assets/pinguino.gif'

export default function Penguin() {
  const paperStyle={padding:'50px 20px', width:600, margin:'20px Auto'}
  const[nameSpecie,setNameSpecie]=useState('')
  const[price,setPrice]=useState('')
  const[description,setDescription]=useState('')
  const[penguins,setPenguins]=useState([]) 


  // function refresh(){
  //   window.location.reload(true);
  // }
  
  const create = (e) =>{
      e.preventDefault() 
      const penguin={nameSpecie,price,description}
      console.log(penguin)
      fetch("http://localhost:8080/penguin/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(penguin)

      }).then( () =>{
        console.log("New Penguin added")
        //refresh();
        setPenguins([...penguins, penguin])
      })

  }

  useEffect(() => {
      setPenguins();
      console.log(setPenguins())
    },[]
  )

  setPenguins(()=>{
    fetch("http://localhost:8080/penguin/getAll")
    .then(res=>res.json())
    .then((result)=>{
      return [result];
    }
    )
  })

  const deleteById = id =>{

    fetch("http://localhost:8080/penguin/" + id, {method:"DELETE"})
    .then( () => {
      console.log("delete successful");
    })
    .then(setPenguins())
  }



  return (
    <Box component="form" sx= {{ '& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
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

                <Button variant="contained" color="secondary" style={{ margin: '2%' }} onClick={create}>Submit</Button>
        </Paper>

        <Paper elevation={3} style={paperStyle}>

            <h1 style={{color:'blue'}}>Penguins</h1>

            <img src={Gif} alt="loading..." />

          {penguins.map(penguin=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={penguin.id}>

              NameSpecie : {penguin.nameSpecie}<br/>
              Price : {penguin.price}<br/>
              Description : {penguin.description}

              <div className='divButton'>
                <Button variant="contained" color="primary" style={{margin:"2%"}}>Edit</Button>
                <Button variant="contained" color="secondary" style={{margin:"2%"}} onClick={() => deleteById(penguin.id)}>Delete</Button>
              </div>

            </Paper>
          ))}

        </Paper>  
    </Box>
  );
}


/* 
En el then del edit habra que hacer los seters de cada parametro en los inputs de la antigua data y crear un boton que ejecute el update
Update es hacer fetch con el metodo put pasandole un objeto penguin ya editado y un id como el delete
*/