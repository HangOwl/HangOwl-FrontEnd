import React, { Component } from 'C:/Users/Admin/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
import { Link } from 'C:/Users/Admin/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-router-dom'

class Navitems extends Component {
    render() {
        return (
            <li id={this.props.item}>
                <Link to={this.props.tolink}>{this.props.item}</Link>
            </li>
        )
    }
}

export default Navitems;
