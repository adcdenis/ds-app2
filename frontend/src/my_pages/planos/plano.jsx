import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import PlanoLista from './planoList'
import { create, update, excluir, init } from './planoAction'
import PageTitle from "../../components/PageTitle/PageTitle"

class Plano extends React.Component {

  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <>
      <PageTitle title="Planos"/>
      <PlanoLista />
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, excluir, init }, dispatch)
export default connect(null, mapDispatchToProps)(Plano)
