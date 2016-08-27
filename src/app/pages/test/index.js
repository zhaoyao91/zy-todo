import React from 'react';

import AppState from '../../../states/app';
import connect from '../../../lib/connect-simple-observable';

let Page = class extends React.Component {
    componentDidUpdate(oldProps, newProps) {
        console.log(oldProps, newProps);
    }

    render() {
        let props = this.props;
        return <div>
            <p>Test Page</p>
            <p>count: {props.count}</p>
            <p>other: {props.other}</p>
            <button onClick={()=>AppState.count1.update(AppState.count1.get() + 1)}>add</button>
            <button onClick={()=>AppState.count2.update(AppState.count2.get() - 1)}>sub</button>
            <button onClick={()=>AppState.app.show.update(AppState.app.show.get() === 1 ? 2 : 1)}>toggle</button>
        </div>
    }
};

Page = connect({
    count: AppState.count1,
    other: (props)=> props.show === 1 ? AppState.count1 : AppState.count2
})(Page);

Page = connect({
    show: AppState.app.show
})(Page);

export default Page;