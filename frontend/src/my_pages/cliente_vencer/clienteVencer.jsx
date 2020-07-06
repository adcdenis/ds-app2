import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ClienteLista from '../cliente/clienteList'
import { create, update, excluir, init, changeTela } from '../cliente/clienteAction'
import PageTitle from "../../components/PageTitle/PageTitle"

class ClienteVencer extends React.Component {

  componentDidMount() {
    //this.props.init()
  }

  render() {
    this.props.init(3)
    return (
      <>
      <PageTitle title='Lista de Clientes a vencer em 3 dias'/>
      <ClienteLista/>
      </>
    )
  }
}

const mapStateToProps = (state) => ({  })
const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init, changeTela }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteVencer)
