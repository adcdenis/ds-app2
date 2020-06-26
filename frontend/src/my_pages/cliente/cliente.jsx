import React from "react"
import Content from "../common/template/content"
import ContentHeader from "../common/template/contentHeader"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ClienteLista from './clienteList'
import { create, update, excluir, init } from './clienteAction'

class Cliente extends React.Component {

  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <div>
        <ContentHeader title="Clientes" small="Versão 1.0" />
        <Content>
          <ClienteLista />
        </Content>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init }, dispatch)
export default connect(null, mapDispatchToProps)(Cliente)
