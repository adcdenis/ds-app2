import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from "../components/App";
import Auth from '../my_pages/auth/auth'
import Auth2 from '../my_pages/auth/auth2'
import { validateToken } from '../my_pages/auth/authActions'

class AuthOrApp extends Component {

    componentDidMount() {
        if (this.props.auth.user) {
            this.props.validateToken(this.props.auth.user.token)
        }
    }
    render() {
        const { user, validToken } = this.props.auth
        if (user && validToken) {
            axios.defaults.headers.common['authorization'] = user.token
            return <App>{this.props.children}</App>
        } else if (!user && !validToken) {
            return <Auth2 />
        } else {
            return false
        }
    }
}
const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken },
    dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)