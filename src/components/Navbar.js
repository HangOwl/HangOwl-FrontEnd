import React, { Component } from 'C:/Users/Admin/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
import Navitems from './Navitems'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'NavItemActive': ''
        }
    }

    render() {
        return (
            <nav>
                <ul>
                    <Navitems item="bars" tolink="/bars"></Navitems>
                    <Navitems item="reservations" tolink="/reservations"></Navitems>
                    
                </ul>
            </nav>
        )
    }
}

export default Navbar;