import React, { useState } from 'react';
import NavItems from './NavItems';

export default function Navbar() {
    const [ Navactive, setNavactive ] = useState(false);

    return (
        <nav>
            <ul>
                <NavItems item="bars" tolink="/bars"></NavItems>
                <NavItems item="profile" tolink="/profile"></NavItems>
                <NavItems item="reserved" tolink="/reserved"></NavItems>
            </ul>
        </nav>
    )
}