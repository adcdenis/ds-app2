import React from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { init, cancelar } from './planoAction'
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
    'nome',
    'valor'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Obrigatório'
    }
  })

  return errors
}

class PlanoForm extends React.Component {

  render() {
    const { handleSubmit } = this.props
    console.log(this.props.plano)
    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
        >
          <Grid item>
            <Field
              name='nome'
              disabled={this.props.readonly}
              label='Nome'
              component={renderTextField}
              fullWidth
              required
              autoFocus
              style={{ marginRight: 20 }}
              inputProps={{
                maxlength: 20
              }}
            />
          </Grid>
          <Grid item>
            <Field
              name='valor'
              label='Valor'
              type="number"
              required
              component={renderTextField}
              disabled={this.props.readonly}
              style={{ marginRight: 20 }}
              inputProps={{
                maxlength: 20
              }}
            /></Grid>
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
              <Button onClick={() => this.props.onsubmit(this.props.plano)} color="primary" variant="contained" startIcon={<SaveIcon />} >
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

const selector = formValueSelector('PlanoForm')
const mapStateToProps = state => ({ plano: selector(state, '_id', 'nome') })

//const mapStateToProps = state => ({})
PlanoForm = reduxForm({ form: 'PlanoForm', validate, destroyOnUnmount: false })(PlanoForm)
const mapDispatchToProps = (dispatch) => bindActionCreators({ init, cancelar }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PlanoForm);
