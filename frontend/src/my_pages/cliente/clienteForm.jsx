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
import Fade from '@material-ui/core/Fade';

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
      <Fade in={true}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            justify='flex-start'
            direction="row"
          >
            <Grid item xs='12'>
              <Field
                name='nome'
                disabled={this.props.readonly}
                label='Nome'
                helperText='Digite seu nome'
                component={renderTextField}
                fullWidth
                required
                autoFocus
                inputProps={{
                  maxLength: 50
                }}
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='usuario'
                label='Usuário'
                component={renderTextField}
                disabled={this.props.readonly}
                required
                inputProps={{
                  maxLength: 20
                }}
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='email'
                label='Email'
                component={renderTextField}
                disabled={this.props.readonly}
                inputProps={{
                  maxLength: 50
                }}
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='vencimento'
                label='Vencimento'
                component={renderTextField}
                type='date'
                disabled={this.props.readonly}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='telefone'
                label='Telefone'
                type="number"
                component={renderTextField}
                disabled={this.props.readonly}
                inputProps={{
                  maxLength: 12
                }}
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name="servidor._id"
                label="servidor"
                component={renderSelectField}
                disabled={this.props.readonly}
              >
                {this.props.listaServidor.map((servidor, i) => {
                  return (
                    <MenuItem key={servidor._id} value={servidor._id} primaryText={servidor.nome} />
                  )
                })}
              </Field>
            </Grid>
            <Grid item xs='6'>
              <Field
                name="plano._id"
                label="plano"
                component={renderSelectField}
                disabled={this.props.readonly}
              >
                {this.props.listaPlano.map((elem, i) => {
                  return (
                    <MenuItem key={elem._id} value={elem._id} primaryText={elem.nome} />
                  )
                })}
              </Field>
            </Grid>
          </Grid>
          <Grid item xs='12'>
            <Field
              name='observacao'
              label='Observação'
              component={renderTextField
              }
              fullWidth
              multiline
              disabled={this.props.readonly}
              inputProps={{
                maxLength: 500
              }}
            />
          </Grid>
          <br /><br />
          <Grid
            container
            spacing={2}
            justify="center"
          >
            <Grid item>
              <Button variant="contained" onClick={() => this.props.cancelar()}
                startIcon={<BackspaceOutlinedIcon />} style={{ marginLeft: 20 }} >
                Cancelar
            </Button>
            </Grid>
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
          </Grid>
        </form >
      </Fade>
    )
  }
}

const selector = formValueSelector('ClienteForm')
const mapStateToProps = state => ({ cliente: selector(state, '_id', 'nome'), listaServidor: state.servidor.list, listaPlano: state.plano.list })
ClienteForm = reduxForm({ form: 'ClienteForm', validate, destroyOnUnmount: false })(ClienteForm)
const mapDispatchToProps = (dispatch) => bindActionCreators({ init, cancelar, getList, getListPlano }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
