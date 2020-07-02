import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, show, create, excluir, update } from './planoAction'
import MaterialTable from "material-table";
import PlanoForm from './planoForm'
import Button from '@material-ui/core/Button';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

class PlanoList extends React.Component {
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
                onClick: (event, rowData) => this.props.show(rowData, 'EDITAR')
              },
              {
                icon: 'delete',
                tooltip: 'Apagar',
                onClick: (event, rowData) => this.props.show(rowData, 'EXCLUIR')
              },
              {
                icon: () => <Button variant="contained" color="primary" startIcon={<AddBoxOutlinedIcon onClick={() => this.props.show()} />}>Novo</Button>,
                tooltip: 'Adicionar',
                isFreeAction: true,
                onClick: () => this.props.show()
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
              { title: "Nome", field: "nome" },
              { title: "Valor", field: "valor", type: "numeric", render: (rowData) => (`R$ ${rowData.valor}`) }
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
          <PlanoForm buttonLabel='Salvar' onSubmit={this.props.create} />
        )
      case 'EDITAR':
        return (
          <PlanoForm buttonLabel='Editar' onSubmit={this.props.update} />
        )
      case 'EXCLUIR':
        return (
          <PlanoForm buttonLabel='Excluir' onsubmit={this.props.excluir} readonly={true} />
        )
      default:
        return <div></div>
    }
  }
}

const mapStateToProps = (state) => ({ list: state.plano.list, action: state.plano.action })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getList, show, create, update, excluir }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PlanoList)
