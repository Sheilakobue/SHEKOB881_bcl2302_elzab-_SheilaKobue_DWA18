//import React,{useEffect,useState} from 'react'; 
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function PodcastGrid(props) {
    return (
        <div className="ag-theme-alpine" 
            style={{ height: props.height, width: props.width }}>
            <AgGridReact >
            </AgGridReact>
        </div>
    );
}