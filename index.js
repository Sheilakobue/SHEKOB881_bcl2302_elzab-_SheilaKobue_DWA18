//import React from "react"
//import ReactDOM from "react-dom"


function WhyReact() {
    return (
        <div>
            <img src="./react-logo.png" width="40px" />
            <h1>Reasons why i learn react</h1>
            <ol>
                <li>Popularity</li>
                <li>Reusability</li>
                <li>Virtual DOM</li>
                <li>One-Way Data Flow</li>
                <li>Large and Active Community</li>
            </ol>
        </div>
    )
}

ReactDOM.render(<WhyReact />, document.getElementById("root"))