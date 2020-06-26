import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, showCliente, create, excluir, update } from './clienteAction'
import MaterialTable from "material-table";
import ClientForm from './clienteForm'
import Button from '@material-ui/core/Button';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
//import Fab from '@material-ui/core/Fab';
//import AddIcon from '@material-ui/icons/Add';

/*<Fab color="primary" aria-label="add">
<AddIcon />
</Fab>*/
class ClienteList extends React.Component {
  componentDidMount() {
    this.props.getList()
  }

  render() {
    console.log(this.props.action)
    switch (this.props.action) {
      case 'LISTAR':
        return (
          <div>
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
                  icon:  () => <Button variant="contained" color="primary" onClick={() => this.props.showCliente()} startIcon={<AddBoxOutlinedIcon />}>Novo</Button>,
                  tooltip: 'Adicionar',
                  isFreeAction: true,
                  onClick: () => this.props.showCliente()
                }
              ]}
              options={{
                actionsColumnIndex: -1
              }}
              columns={[
                { title: "Nome", field: "nome" },
                { title: "Vencimento", field: "vencimento", type: "date" },
                { title: "Telefone", field: "telefone", type: "numeric" }
              ]}
              localization={{
                body: {
                  emptyDataSourceMessage: 'Nenhum registro para exibir'
                },
                toolbar: {
                  searchTooltip: 'Pesquisar',
                  searchPlaceholder: 'Pesquisar'
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
          </div>
        )
      case 'NOVO':
        return (
          <ClientForm buttonLabel='Salvar' icon='fa-edit' onSubmit={this.props.create} />
        )
      case 'EDITAR':
        return (
          <ClientForm buttonLabel='Editar' icon='fa-edit' onSubmit={this.props.update} />
        )
      case 'EXCLUIR':
        return (
          <ClientForm buttonLabel='Excluir' icon='fa-trash' onSubmit={this.props.excluir} />
        )
      default:
        return <div></div>
    }
  }
}

const mapStateToProps = (state) => ({ list: state.cliente.list, action: state.cliente.action })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getList, showCliente, create, update, excluir }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteList)
