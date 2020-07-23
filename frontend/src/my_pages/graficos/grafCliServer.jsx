import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { } from './graficoActions'
import PageTitle from "../../components/PageTitle/PageTitle"
import Chart from "react-apexcharts";

class GrafCliServ extends React.Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);

    this.state = {

      series: [{
        data: [10, 41, 3, 5]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        //colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            'GF',
            'CLUB TV',
            'DUPLEX',
            'P2P'
          ],
          labels: {
            style: {
              //colors: colors,
              fontSize: '12px'
            }
          }
        }
      },


    };
  }


  render() {
    return (
      <div className="app">
        <PageTitle title="Clientes por Servidores" />
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="70%"
            />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({ totais: state.dashboard })
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(GrafCliServ)
