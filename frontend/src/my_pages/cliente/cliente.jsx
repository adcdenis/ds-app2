import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ClienteLista from './clienteList'
import { create, update, excluir, init, changeTela } from './clienteAction'
import PageTitle from "../../components/PageTitle"

class Cliente extends React.Component {

  componentDidMount() {
    this.props.init()
  }

  render() {
    //this.props.changeTela(this.props.tela);
    return (
      <>
      <PageTitle title={this.props.titulo ? this.props.titulo : 'Lista de Clientes'}/>
      <ClienteLista/>
      </>
    )
  }
}

const mapStateToProps = (state) => ({ tipoTela: state.cliente.tipoTela })
const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init, changeTela }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Cliente)
