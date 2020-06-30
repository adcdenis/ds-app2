import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { init, cancelar } from './servidorAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TextField } from 'redux-form-material-ui';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import Button from '@material-ui/core/Button';
import If from '../../my_common/operador/if'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'nome'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Obrigatório'
    }
  })

  return errors
}

class ServidorForm extends React.Component {

  render() {
    //const classes = useStyles();
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name='nome'
            disabled={this.props.readonly}
            label='Nome'
            hintText='Digite seu nome'
            floatingLabelText="Nome (*)"
            component={TextField}
            fullWidth
            style={{ marginRight: 20 }}
          />
        </div>
        <br /><br />
        <If rendered={!this.props.readonly}>
          <Button type='submit' variant="contained" color="primary" startIcon={<SaveIcon />} >
            {this.props.buttonLabel}
          </Button>
        </If>
        <If rendered={this.props.readonly}>
          <Button onClick={this.props.onsubmit} color="primary" variant="contained" startIcon={<SaveIcon />} >
            {this.props.buttonLabel}
          </Button>
        </If>
        <Button variant="contained" onClick={() => this.props.cancelar()}
        startIcon={<BackspaceOutlinedIcon />} style={{ marginLeft: 20 }} >
          Cancelar
        </Button>
      </form >
    )
  }
}

const mapStateToProps = state => ({})
ServidorForm = reduxForm({ form: 'ServidorForm', validate, destroyOnUnmount: false })(ServidorForm)
const mapDispatchToProps = (dispatch) => bindActionCreators({ init, cancelar }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ServidorForm);