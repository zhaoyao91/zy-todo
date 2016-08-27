import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };

    render() {
        const {children, ...otherProps} = this.props;
        console.log(otherProps);
        return <div>
            <p>root layout</p>
            <ul role="nav">
                <li><IndexLink to="/">Index</IndexLink></li>
                <li><Link to="/test">Test</Link></li>
                <li><Link to="/test2">Test2</Link></li>
            </ul>
            <button onClick={()=> this.context.router.push('/')}>首页</button>
            {children}
        </div>
    }
}