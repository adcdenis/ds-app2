import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, showCliente, create, excluir, update } from './clienteAction'
import MaterialTable from "material-table";
import ClientForm from './clienteForm'
import Button from '@material-ui/core/Button';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import {formatarFromJsonDiaMesAno} from '../../my_common/DateUtil'
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
                icon: () => <Button variant="contained" color="primary" onClick={() => this.props.showCliente()} startIcon={<AddBoxOutlinedIcon />}>Novo</Button>,
                tooltip: 'Adicionar',
                isFreeAction: true,
                onClick: () => this.props.showCliente()
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              exportButton: true
            }}
            columns={[
              { title: "Nome", field: "nome" },
              { title: "Vencimento", field: "vencimento", type: "date", render:(rowData)=>(formatarFromJsonDiaMesAno(rowData.vencimento)) },
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
          <ClientForm buttonLabel='Excluir' onsubmit={this.props.excluir} readonly={true}/>
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
