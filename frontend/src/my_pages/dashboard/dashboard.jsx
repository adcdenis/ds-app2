import React from "react"
//import ValueBox from '../../my_common/widget/valueBox'
//import Row from "../../my_common/form/row"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCount, getCountServidores, getCountPlanos } from './dashboardActions'
import BoxGrid from '../../my_common/widget/BoxGrid'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Grid from '@material-ui/core/Grid'
import PageTitle from "../../components/PageTitle"

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCount()
    this.props.getCountPlanos()
    this.props.getCountServidores()
  }

  render() {

    return (
      <>
        <PageTitle title="DashBoard" />
        <Grid
          container
          spacing={2}
        >
          <Grid item>
            <BoxGrid
              label='Total de Clientes'
              value={this.props.totalClientes.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
          <Grid item>
            <BoxGrid
              label='Total de Servidores'
              value={this.props.totalServidores.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
          <Grid item>
            <BoxGrid
              label='Total de Planos'
              value={this.props.totalPlanos.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
        </Grid>

      </>
    )
  }
}

const mapStateToProps = (state) => ({ totalClientes: state.dashboard.totalClientes, totalServidores: state.dashboard.totalServidores, totalPlanos: state.dashboard.totalPlanos })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getCount, getCountServidores, getCountPlanos }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
