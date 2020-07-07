import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ClienteLista from './clienteList'
import { create, update, excluir, init } from './clienteAction'
import PageTitle from "../../components/PageTitle"

class Cliente extends React.Component {

  componentDidMount() {
    this.props.init(1)
  }

  render() {
    return (
      <>
      <PageTitle title='Lista de Clientes'/>
      <ClienteLista/>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init }, dispatch)
export default connect(null, mapDispatchToProps)(Cliente)
