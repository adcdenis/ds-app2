import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, show, create, excluir, update } from './servidorAction'
import MaterialTable from "material-table";
import ServidorForm from './servidorForm'
import Button from '@material-ui/core/Button';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

class ServidorList extends React.Component {
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
                icon: () => <Button variant="contained" color="primary" onClick={() => this.props.show()} startIcon={<AddBoxOutlinedIcon />}>Novo</Button>,
                tooltip: 'Adicionar',
                isFreeAction: true,
                onClick: () => this.props.show()
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              exportButton: true
            }}
            columns={[
              { title: "Nome", field: "nome" },
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
          <ServidorForm buttonLabel='Salvar' onSubmit={this.props.create} />
        )
      case 'EDITAR':
        return (
          <ServidorForm buttonLabel='Editar' onSubmit={this.props.update} />
        )
      case 'EXCLUIR':
        return (
          <ServidorForm buttonLabel='Excluir' onsubmit={this.props.excluir} readonly={true}/>
        )
      default:
        return <div></div>
    }
  }
}

const mapStateToProps = (state) => ({ list: state.servidor.list, action: state.servidor.action })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getList, show, create, update, excluir }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ServidorList)
