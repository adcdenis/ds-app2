import React from "react"
import Content from "../common/template/content"
import ContentHeader from "../common/template/contentHeader"
import ValueBox from "../../common_my/widget/valueBox"
import Row from "../common/template/row"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCount } from './dashboardActions'

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCount()
  }

  render() {
    const { value } = this.props.totalClientes

    return (
      <div>
        <ContentHeader title="Dashboard" small="Versão 1.0" />
        <Content>
          <Row>
            <ValueBox
              cols="12 4"
              color="blue"
              icon="users"
              value={`${value}`}
              text="Total de Clientes"
            />
          </Row>
        </Content>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ totalClientes: state.dashboard.totalClientes })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getCount }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
