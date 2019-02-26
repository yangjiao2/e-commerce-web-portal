import React, {Component} from 'react'
import './index.css'
import All from './all'
import Order from './order'
import Tools from './tools'
import Member from './member'

class My extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'all',
            param: {}
        }
    }

    changePageInMy = (page, param, hidden) => {
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
                return <All changePageInMy={this.changePageInMy} {...param}/>
            case 'order':
                return <Order changePageInMy={this.changePageInMy} {...param}/>
            case 'tools':
                return <Tools changePageInMy={this.changePageInMy} {...param}/>
            case 'member':
                return <Member changePageInMy={this.changePageInMy} {...param}/>
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

