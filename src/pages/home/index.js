import React, {Component} from 'react'
import './index.css'
import All from './all'
import Kind from './kind'
import Detail from './detail'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'all',
            param: {}
        }
    }

    changePageInHome = (page, param, hidden) => {
        this.props.changeTabBar('home', hidden !== undefined ? hidden : true)
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
            case 'kind':
                return <Kind changePageInHome={this.changePageInHome} {...param}/>
            case 'detail':
                return <Detail changePageInHome={this.changePageInHome} {...param}/>
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

export default Home

