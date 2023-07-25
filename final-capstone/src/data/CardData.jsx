import {useState} from 'react'
import Grid from '@mui/material/Grid'



export default function CardData(){
    const [count, setCount] = useState(null)

function Card(){
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
        {Card()} 
        </>
    )
}

import React from "react"
import CardData from "../data/CardData"
import {Grid} from '@mui/material'

export default function Card(props){

    return (
        <Grid item xs={3}>
        <p>{props.id}</p>
        <h3>{props.titles}</h3>
        <h4>{props.descriptions.substring(0,150)}</h4>
        <h4>{props.seasons}</h4>
        <img className="card--image" src={props.images}></img>
        </Grid>
    )
}
