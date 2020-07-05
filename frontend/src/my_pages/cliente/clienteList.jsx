import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, showCliente, create, excluir, update } from './clienteAction'
import MaterialTable from "material-table";
import ClientForm from './clienteForm'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { formatarFromJsonDiaMesAno } from '../../my_common/DateUtil'
import WhatsCall from './whatsAppCall'

class ClienteList extends React.Component {
  componentDidMount() {
    this.props.getList(this.props.tipoTela)
  }

  render() {
    console.log(this.props.action)
    switch (this.props.action) {
      case 'LISTAR':
        return (
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
                icon: () => <AddBoxOutlinedIcon/>,
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
              },headerStyle: {
                backgroundColor: '#536DFE',
                color: '#FFF'
              }
            }}
            columns={[
              { title: "Nome", field: "nome", width: '50%' },
              { title: "Vencimento", field: "vencimento", type: "date", render: (rowData) => (formatarFromJsonDiaMesAno(rowData.vencimento)), width: '10%' },
              { title: "Alerta", field: "telefone", width: '10%', render: (rowData) => (<WhatsCall cliente={rowData}/>) },
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
  bindActionCreators({ getList, showCliente, create, update, excluir }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteList)
