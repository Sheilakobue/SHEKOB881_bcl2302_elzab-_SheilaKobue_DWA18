import React from 'react'
import Card from './components/Card'
import {useState} from 'react'
import Grid from '@mui/material/Grid'



function App(){
    const [count, setCount] = useState(null)

function card(){
        fetch("https://podcast-api.netlify.app/shows")
        .then(response=>response.json())
        .then(data =>{
            console.log(data)
  
            const mapData = data.map((dataMapping)=>{
                return (<Card
                    key={dataMapping.id}
                    titles = {dataMapping.title}
                    descriptions = {dataMapping.description}
                    seasons = {dataMapping.season}
                    images = {dataMapping.image}

                    />)
            })
            setCount(mapData)
        })
    }
    return(
        <>
                 
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>{count} </Grid>
        {card()} 
        </>
    )
}
export default App