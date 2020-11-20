import React, { Component } from 'C:/Users/Admin/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
// import barpic from '../img/bars1.jpg'

class Bars extends Component {
    render() {
        return (
            <div className="condiv bars"> 
                <h1>Bar's Name</h1>
                <img src="https://bk.asia-city.com/sites/default/files/u142691/cube_fb.jpg" alt="bars" className="barpic"/>
                <h2>Pending Reserve</h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="button">Check Reserved</button>
                <div>Bar's Description: </div>
            </div>
        )
    }
}

export default Bars;