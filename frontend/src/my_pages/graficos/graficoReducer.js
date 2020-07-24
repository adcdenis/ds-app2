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

  //Categorias
  let opcoes = INITIAL_STATE.options
  opcoes.xaxis.categories = categorias
  console.log(categorias)

  //Valores
  let valores = INITIAL_STATE.series
  valores[0].data = dados
  console.log(valores)

  let retorno = {}
  retorno.options = opcoes
  retorno.series = valores
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
