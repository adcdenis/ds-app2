import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ServidorLista from './servidorList'
import { create, update, excluir, init } from './servidorAction'
import PageTitle from "../../components/PageTitle/PageTitle"

class Servidor extends React.Component {

  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <>
      <PageTitle title="Servidores"/>
      <ServidorLista />
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init }, dispatch)
export default connect(null, mapDispatchToProps)(Servidor)
