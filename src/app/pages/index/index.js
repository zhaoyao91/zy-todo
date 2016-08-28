import React from 'react';
import PageContainer from 'comps/page-container';
import {Link} from 'react-router';

export default (props)=>{
    return <PageContainer>
        <h1>Index Page</h1>
        <ul>
            <li><Link to="/todos">Todos</Link></li>
        </ul>
    </PageContainer>
}