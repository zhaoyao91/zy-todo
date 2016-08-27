import React from 'react';
import _ from 'lodash';

export default function (options) {
    return function (Component) {
        return class ConnectSimpleObservable extends React.Component {
            constructor(props) {
                super(props);
                this.state = _.mapValues(options, (so)=> {
                    so = typeof so === 'function' ? so(props) : so;
                    return so.get();
                })
            }

            componentWillMount() {
                this._stops = _.mapValues(options, (so, name)=> {
                    so = typeof so === 'function' ? so(this.props) : so;
                    return so.subscribe((value)=> {
                        this.setState({[name]: value});
                    })
                })
            }

            componentWillReceiveProps(nextProps) {
                _(options).pickBy(so=>typeof so === 'function').forEach((so, name)=> {
                    this._stops[name]();
                    this._stops[name] = so(nextProps).subscribe((value)=> {
                        this.setState({[name]: value});
                    });
                })
            }

            componentWillUnmount() {
                _.forEach(this._stops, stop=>stop());
            }

            render() {
                return <Component {..._.assign({}, this.state, this.props)}/>
            }
        }
    }
}