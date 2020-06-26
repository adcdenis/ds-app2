import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { init, cancelar } from './clienteAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TextField } from 'redux-form-material-ui';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import Button from '@material-ui/core/Button';

/*import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));*/

/*const renderInput = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      InputLabelProps={{ shrink: true }}
      {...input}
      {...custom}
    />
  )*/

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

  if (values.telefone <= 0) {
    errors.telefone = 'Digite um valor maior que zero!'
  }

  return errors
}

class ClienteForm extends React.Component {

  render() {
    //const classes = useStyles();
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        
          <div>
            <Field
              name='nome'
              label='Nome'
              hintText='Digite seu nome'
              floatingLabelText="Nome (*)"
              component={TextField}
              fullWidth
              style={{ marginRight: 20 }}
            />
          </div>
          <div>
            <Field
              name='usuario'
              label='Usuário (*)'
              floatingLabelText="Usuário"
              hintText='Digite seu usuário'
              component={TextField}
              style={{ marginRight: 20 }}
            />
            <Field
              name='email'
              label='Email'
              hintText='Digite seu e-mail'
              floatingLabelText="E-Mail"
              component={TextField}
              style={{ marginRight: 20 }}
            />
          </div>
          <br />
          <div>
            <Field
              name='vencimento'
              label='Vencimento'
              floatingLabelText="Vencimento (*)"
              component={TextField}
              type='date'
              style={{ marginRight: 20 }}
            />
            <Field
              name='telefone'
              label='Telefone'
              type="number"
              hintText='Digite seu telefone'
              floatingLabelText="Telefone"
              component={TextField}
              style={{ marginRight: 20 }}
            />
          </div>
          <br />
          <div>
            <Field
              name='observacao'
              label='Observação'
              hintText='Digite observações'
              floatingLabelText="Observação"
              component={TextField}
              fullWidth
              multiline={true}
              style={{ marginRight: 20, marginTop: 5 }}
            />
          </div>
          <div className='box-footer'>
          <Button type='submit' variant="contained" color="primary" startIcon={<SaveIcon />} >
            {this.props.buttonLabel}
          </Button>
          <Button variant="contained" onClick={() => this.props.cancelar()} startIcon={<BackspaceOutlinedIcon />} style={{ marginLeft: 20 }} >
            Cancelar
              </Button>

        </div>

      </form >
    )
  }
}

//const selector = formValueSelector('ClienteForm')
//const mapStateToProps = state => ({credits: selector(state, 'credits'), debts: selector(state, 'debts') })
const mapStateToProps = state => ({})
ClienteForm = reduxForm({ form: 'ClienteForm', validate, destroyOnUnmount: false })(ClienteForm)
const mapDispatchToProps = (dispatch) => bindActionCreators({ init, cancelar }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
