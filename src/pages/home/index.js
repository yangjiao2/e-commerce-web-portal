import React, {Component} from 'react'
import './index.css'
import {Switch, Route} from 'react-router-dom'
import All from './all'
import Kind from './kind'
import Detail from './detail'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <Switch>
                    <Route exact path="/" component={All}/>
                    <Route path="/home" component={All}/>
                    <Route path="/home/all" component={All}/>
                    <Route path="/home/kind" component={Kind}/>
                    <Route path="/home/detail" component={Detail}/>
                </Switch>
            </div>
        )
    }
}

export default Home

