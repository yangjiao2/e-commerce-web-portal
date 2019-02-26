import React, {Component} from 'react'
import './index.css'
import All from './all'
import Order from './order'

class My extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'all',
            param: {}
        }
    }

    changePageInHome = (page, param, hidden) => {
        this.props.changeTabBar('my', hidden !== undefined ? hidden : true)
        this.setState({
            page,
            param: param ? param : {}
        })
    }

    renderPage = () => {
        let {page, param} = this.state

        switch (page) {
            case 'all':
                return <All changePageInHome={this.changePageInHome} {...param}/>
            case 'order':
                return <Order changePageInHome={this.changePageInHome} {...param}/>
            default:
                return <div>这个页面不应该出现是</div>
        }
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                {
                    this.renderPage()
                }
            </div>
        )
    }
}

export default My

