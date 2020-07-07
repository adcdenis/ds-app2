import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ClienteLista from '../cliente/clienteList'
import { create, update, excluir, init } from '../cliente/clienteAction'
import PageTitle from "../../components/PageTitle/PageTitle"

class ClienteVencido extends React.Component {

  componentDidMount() {
    this.props.init(3)
  }

  render() {
    return (
      <>
      <PageTitle title='Lista de Clientes Vencidos'/>
      <ClienteLista/>
      </>
    )
  }
}

const mapStateToProps = (state) => ({  })
const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteVencido)
