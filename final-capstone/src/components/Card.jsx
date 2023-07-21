import React from "react"
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