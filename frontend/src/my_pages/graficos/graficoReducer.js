const INITIAL_STATE = {
  totalClienteServidor: {},
  series: [
    {
      data: [10, 41, 3, 5],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function(chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    //colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['GF', 'CLUB TV', 'DUPLEX', 'P2P'],
      labels: {
        style: {
          //colors: colors,
          fontSize: '12px',
        },
      },
    },
  },
}

function montaDados(totalClienteServidor) {
  const result = totalClienteServidor

  let i = 0
  let dados = []
  let categorias = []
  for (i = 0; i < result.length; i++) {
    let total = result[i]
    dados[i] = total.count
    categorias[i] = total.servidor[0].nome
  }
  let retorno = {}
  retorno.options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function(chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    //colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: categorias,
      labels: {
        style: {
          //colors: colors,
          fontSize: '12px',
        },
      },
    },
  }

  retorno.series = [
    {
      data: dados,
    },
  ]
  return retorno;
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'TOTAL_CLIENTES_SERVIDOR':
      const retorno = montaDados(action.payload.data)
      return {
        ...state,
        totalClienteServidor: action.payload.data,
        series : retorno.series,
        options: retorno.options
      }
    default:
      return state
  }
}
