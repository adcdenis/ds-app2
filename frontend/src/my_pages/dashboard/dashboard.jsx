import React from "react"
//import ValueBox from '../../my_common/widget/valueBox'
//import Row from "../../my_common/form/row"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCount, getCountServidores, getCountPlanos, getCountAVencer, getCountVencidos} from './dashboardActions'
import BoxGrid from '../../my_common/widget/BoxGrid'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Grid from '@material-ui/core/Grid'
import PageTitle from "../../components/PageTitle"

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCount()
    this.props.getCountPlanos()
    this.props.getCountServidores()
    this.props.getCountAVencer(3)
    this.props.getCountVencidos()
  }

  render() {
    const { totalAVencer, totalClientes, totalServidores, totalPlanos, totalVencidos } = this.props.totais
    return (
      <>
        <PageTitle title="DashBoard" />
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} md={4}>
            <BoxGrid
              label='Vence em 3 dias'
              value={totalAVencer.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BoxGrid
              label='Vencidos'
              value={totalVencidos.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BoxGrid
              label='Clientes Ativos'
              value={totalClientes.value-totalVencidos.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BoxGrid
              label='Clientes Totais'
              value={totalClientes.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BoxGrid
              label='Servidores'
              value={totalServidores.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BoxGrid
              label='Planos'
              value={totalPlanos.value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
            />
          </Grid>
        </Grid>

      </>
    )
  }
}

const mapStateToProps = (state) => ({ totais: state.dashboard })
const mapDispatchToProps = (dispatch) => bindActionCreators({getCountVencidos, getCount, getCountServidores, getCountPlanos, getCountAVencer }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
