import React,{Component} from 'react';
import {Link} from 'react-router';
import Header from '../components/partials/Header';

export default class AppMaster extends Component{
    render(){
        //console.log(this.props.children)
        return (
            <div className="animsition">
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}