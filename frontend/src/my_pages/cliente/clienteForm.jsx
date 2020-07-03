import React from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { init, cancelar } from './clienteAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SaveIcon from '@material-ui/icons/Save';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import Button from '@material-ui/core/Button';
import If from '../../my_common/operador/if'
import { getList } from '../../my_pages/servidor/servidorAction'
import { getList as getListPlano } from '../../my_pages/planos/planoAction'
import MenuItem from 'material-ui/MenuItem'
import { renderTextField, renderSelectField } from '../../my_common/MaterialUtil'
import Grid from '@material-ui/core/Grid'

/*import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));*/

const validate = values => {
  const errors = {}
  const requiredFields = [
    'nome',
    'usuario',
    'vencimento'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Obrigatório'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Endereço de E-Mail inválido'
  }

  //if (values.telefone <= 0) {
  //errors.telefone = 'Digite um valor maior que zero!'
  //}

  return errors
}

class ClienteForm extends React.Component {

  componentDidMount() {
    this.props.getList()
    this.props.getListPlano()
  }
  render() {
    //const classes = useStyles();
    console.log(this.props.listaServidor)
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Field
                name='nome'
                disabled={this.props.readonly}
                label='Nome'
                hintText='Digite seu nome'
                floatingLabelText="Nome"
                component={renderTextField}
                fullWidth
                required
                inputProps={{
                  maxlength: 50
                }}
              /></Grid>
            <Grid item>
              <Field
                name='usuario'
                label='Usuário'
                floatingLabelText="Usuário"
                hintText='Digite seu usuário'
                component={renderTextField}
                disabled={this.props.readonly}
                required
                inputProps={{
                  maxlength: 20
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Field
                name='email'
                label='Email'
                hintText='Digite seu e-mail'
                floatingLabelText="E-Mail"
                component={renderTextField}
                disabled={this.props.readonly}
                inputProps={{
                  maxlength: 50
                }}
              />
            </Grid>
            <Grid item>
              <Field
                name='vencimento'
                label='Vencimento'
                floatingLabelText="Vencimento"
                component={renderTextField}
                type='date'
                disabled={this.props.readonly}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item>
              <Field
                name='telefone'
                label='Telefone'
                type="number"
                hintText='Digite seu telefone'
                floatingLabelText="Telefone"
                component={renderTextField}
                disabled={this.props.readonly}
                inputProps={{
                  maxlength: 12
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Field
                name="servidor._id"
                label="servidor"
                component={renderSelectField}
                hintText="Servidor"
                floatingLabelText="Servidor"
                disabled={this.props.readonly}
              >
                {this.props.listaServidor.map((servidor, i) => {
                  return (
                    <MenuItem key={servidor._id} value={servidor._id} primaryText={servidor.nome} />
                  )
                })}
              </Field></Grid>

            <Grid item>
              <Field
                name="plano._id"
                label="plano"
                component={renderSelectField}
                hintText="Plano"
                floatingLabelText="Plano"
                disabled={this.props.readonly}
              >
                {this.props.listaPlano.map((elem, i) => {
                  return (
                    <MenuItem key={elem._id} value={elem._id} primaryText={elem.nome} />
                  )
                })}
              </Field></Grid>
          </Grid>
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Field
                name='observacao'
                label='Observação'
                hintText='Digite observações'
                floatingLabelText="Observação"
                component={renderTextField
                }
                fullWidth
                multiline="true"
                disabled={this.props.readonly}
                inputProps={{
                  maxlength: 500
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <br /><br />
        <Grid
          container
          spacing={2}
          justify="center"
        >
          <Grid item>
            <If rendered={!this.props.readonly}>
              <Button type='submit' variant="contained" color="primary" startIcon={<SaveIcon />} >
                {this.props.buttonLabel}
              </Button>
            </If>
            <If rendered={this.props.readonly}>
              <Button onClick={() => this.props.onsubmit(this.props.cliente)} color="primary" variant="contained" startIcon={<SaveIcon />} >
                {this.props.buttonLabel}
              </Button>
            </If>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => this.props.cancelar()}
              startIcon={<BackspaceOutlinedIcon />} style={{ marginLeft: 20 }} >
              Cancelar
        </Button>
          </Grid>
        </Grid>
      </form >
    )
  }
}

const selector = formValueSelector('ClienteForm')
const mapStateToProps = state => ({ cliente: selector(state, '_id', 'nome'), listaServidor: state.servidor.list, listaPlano: state.plano.list })
ClienteForm = reduxForm({ form: 'ClienteForm', validate, destroyOnUnmount: false })(ClienteForm)
const mapDispatchToProps = (dispatch) => bindActionCreators({ init, cancelar, getList, getListPlano }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
