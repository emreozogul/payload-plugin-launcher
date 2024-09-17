import React from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';


export default function PluginViewPage() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <h1>{id}</h1>
            <h1>Plugin View Page</h1>
            <Link to='/main/plugins'>Back</Link>
        </div>

    )

}
