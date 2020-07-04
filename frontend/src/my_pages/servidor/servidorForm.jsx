import React from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { init, cancelar } from './servidorAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SaveIcon from '@material-ui/icons/Save';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import Button from '@material-ui/core/Button';
import If from '../../my_common/operador/if'
import { renderTextField } from '../../my_common/MaterialUtil'
import Grid from '@material-ui/core/Grid'

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
        <Field
          name='nome'
          disabled={this.props.readonly}
          label='Nome'
          component={renderTextField}
          fullWidth
          autoFocus
          required
          style={{ marginRight: 20 }}
        />
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
              <Button onClick={() => this.props.onsubmit(this.props.servidor)} color="primary" variant="contained" startIcon={<SaveIcon />} >
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

const selector = formValueSelector('ServidorForm')
const mapStateToProps = state => ({ servidor: selector(state, '_id', 'nome') })

ServidorForm = reduxForm({ form: 'ServidorForm', validate, destroyOnUnmount: false })(ServidorForm)
const mapDispatchToProps = (dispatch) => bindActionCreators({ init, cancelar }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ServidorForm);
