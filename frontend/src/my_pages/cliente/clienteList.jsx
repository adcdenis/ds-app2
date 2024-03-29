import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, showCliente, create, excluir, update, updateVencimento } from './clienteAction'
import MaterialTable from "material-table";
import ClientForm from './clienteForm'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { formatarFromJsonDiaMesAno } from '../../my_common/DateUtil'
import WhatsCall from './whatsAppCall'
import Fade from '@material-ui/core/Fade';
import AutorenewIcon from '@material-ui/icons/Autorenew';

class ClienteList extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log(this.props.action)
    switch (this.props.action) {
      case 'LISTAR':
        return (
          <Fade in={true}>
            <MaterialTable
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar',
                  onClick: (event, rowData) => this.props.showCliente(rowData, 'EDITAR')
                },
                {
                  icon: 'delete',
                  tooltip: 'Apagar',
                  onClick: (event, rowData) => this.props.showCliente(rowData, 'EXCLUIR')
                },
                {
                  icon: () => <AddBoxOutlinedIcon />,
                  tooltip: 'Adicionar',
                  isFreeAction: true,
                  onClick: () => this.props.showCliente()
                }
              ]}
              options={{
                actionsColumnIndex: -1,
                exportButton: true,
                rowStyle: x => {
                  if (!(x.tableData.id % 2)) {
                    return { backgroundColor: "#f2f2f2" }
                  }
                }, headerStyle: {
                  backgroundColor: '#536DFE',
                  color: '#FFF'
                }
              }}
              columns={[
                {
                  title: "Vencimento", field: "vencimento", type: "date", render: (rowData) => (
                    <div onClick={() => this.props.showCliente(rowData, 'EDITAR')} style={{ cursor: 'pointer' }}>
                      {formatarFromJsonDiaMesAno(rowData.vencimento)}
                    </div>
                  ), width: '10%'
                },
                {
                  title: "Nome", field: "nome", width: '30%', render: (rowData) => (
                    <div onClick={() => this.props.showCliente(rowData, 'EDITAR')} style={{ cursor: 'pointer' }}>
                      {rowData.nome}
                    </div>
                  )
                },
                { title: "Alerta", field: "telefone", width: '10%', render: (rowData) => (<WhatsCall cliente={rowData} />) },
                { title: "Renovar", field: "telefone", width: '5%', render: (rowData) => <div onClick={() => this.props.updateVencimento(rowData)} style={{ cursor: 'pointer' }}><AutorenewIcon /></div> },
                { title: "Observação", field: "observacao", width: '15%' },
                { title: "Servidor", field: "servidor.nome", width: '15%' },
                { title: "Plano", field: "plano.nome", width: '15%' },
              ]}
              localization={{
                header: {
                  actions: 'Ações'
                },
                body: {
                  emptyDataSourceMessage: 'Nenhum registro para exibir'
                },
                toolbar: {
                  searchTooltip: 'Pesquisar',
                  searchPlaceholder: 'Pesquisar',
                },
                pagination: {
                  labelRowsSelect: 'linhas',
                  labelDisplayedRows: '{count} de {from}-{to}',
                  firstTooltip: 'Primeira página',
                  previousTooltip: 'Página anterior',
                  nextTooltip: 'Próxima página',
                  lastTooltip: 'Última página'
                }
              }

              }
              data={this.props.list}
              title=""
            />
          </Fade>
        )
      case 'NOVO':
        return (
          <ClientForm buttonLabel='Salvar' onSubmit={this.props.create} />
        )
      case 'EDITAR':
        return (
          <ClientForm buttonLabel='Editar' onSubmit={this.props.update} />
        )
      case 'EXCLUIR':
        return (
          <ClientForm buttonLabel='Excluir' onsubmit={this.props.excluir} readonly={true} />
        )
      default:
        return <div></div>
    }
  }
}

const mapStateToProps = (state) => ({ tipoTela: state.cliente.tipoTela, list: state.cliente.list, action: state.cliente.action })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getList, showCliente, create, update, excluir, updateVencimento }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteList)
