import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ClienteLista from './clienteList'
import { create, update, excluir, init, changeTela } from './clienteAction'
import PageTitle from "../../components/PageTitle"

class Cliente extends React.Component {

  componentDidMount() {
    //this.changeTela(1)
    console.log('didMount Cliente')
  }

  render() {
    this.props.init(1)
    return (
      <>
      <PageTitle title='Lista de Clientes'/>
      <ClienteLista/>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init, changeTela }, dispatch)
export default connect(null, mapDispatchToProps)(Cliente)
