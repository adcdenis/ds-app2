import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getTotalClienteServidor } from './graficoActions'
import PageTitle from "../../components/PageTitle/PageTitle"
import Chart from "react-apexcharts";

class GrafCliServ extends React.Component {

  componentDidMount() {
    this.props.getTotalClienteServidor()
  }

  render() {
    console.log(this.props.result.options)
    console.log(this.props.result.series)
    return (
      <>
        <PageTitle title={`Clientes por Servidores`} />
        <Chart
          options={this.props.result.options}
          series={this.props.result.series}
          type="bar"
          width="95%"
          height="70%"
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({ result: state.grafico })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getTotalClienteServidor }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(GrafCliServ)
