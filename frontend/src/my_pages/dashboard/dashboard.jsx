import React from "react"
//import ValueBox from '../../my_common/widget/valueBox'
//import Row from "../../my_common/form/row"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCount } from './dashboardActions'
import BoxGrid from '../../my_common/widget/BoxGrid'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Grid from '@material-ui/core/Grid'
import PageTitle from "../../components/PageTitle"

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCount()
  }

  render() {
    const { value } = this.props.totalClientes

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
              value={value}
              icone={<MonetizationOnOutlinedIcon style={{ fontSize: 80, color: 'white' }} />}
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
