import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from "../components/App";
import Auth from '../my_pages/auth/auth'
import { validateToken } from '../my_pages/auth/authActions'

const AuthOrApp = (props) => {

    const { user, validToken } = props.auth
    const { validateToken } = props

    useEffect(() => {
        if (user) {
            validateToken(user.token)
        }
    }, [user, validateToken])

    if (user && validToken) {
        axios.defaults.headers.common['authorization'] = user.token
        return <App>{props.children}</App>
    } else if (!user && !validToken) {
        return <Auth />
    } else {
        return false
    }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken },
    dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)