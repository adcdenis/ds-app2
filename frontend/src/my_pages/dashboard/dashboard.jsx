import React from "react"
//import ValueBox from '../../my_common/widget/valueBox'
//import Row from "../../my_common/form/row"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCount } from './dashboardActions'
import BoxGrid from '../../my_common/widget/BoxGrid'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Grid from '@material-ui/core/Grid';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCount()
  }

  render() {
    const { value } = this.props.totalClientes

    return (
      <>
        <Grid
          container
          spacing={2}
        >
          <Grid item>
            <BoxGrid
              label='Total de Clientes'
              value={value}
              icone={<MonetizationOnIcon style={{ fontSize: 80 }} />}
            />
          </Grid>
          <Grid item>
            <BoxGrid
              label='Total de Clientes'
              value={value}
              icone={<MonetizationOnIcon style={{ fontSize: 80 }} />}
            />
          </Grid>
          <Grid item>
            <BoxGrid
              label='Total de Clientes'
              value={value}
              icone={<MonetizationOnIcon style={{ fontSize: 80 }} />}
            />
          </Grid>
          <Grid item>
            <BoxGrid
              label='Total de Clientes'
              value={value}
              icone={<MonetizationOnIcon style={{ fontSize: 80 }} />}
            />
          </Grid>


        </Grid>

      </>
    )
  }
}

const mapStateToProps = (state) => ({ totalClientes: state.dashboard.totalClientes })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getCount }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
