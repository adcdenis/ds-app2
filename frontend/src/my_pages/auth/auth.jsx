import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup } from './authActions'
import If from '../../my_common/operador/if'
import Messages from '../../my_common/msg/msg'
//import { TextField } from 'redux-form-material-ui';

const renderInput = ({
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
    )

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                CanutoBR
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const onSubmit = (values, props, loginMode) => {//continuar aqui
    const { login, signup } = props
    //this.state.loginMode ? login(values) : signup(values)
    loginMode ? login(values) : signup(values)
}

const Auth = (props) => {
    const classes = useStyles();
    const [loginMode, setLoginMode] = useState(true);
    const { handleSubmit } = props
    return (
        <>
            <Messages />
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {loginMode ? 'Entrar' : 'Registrar'}
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(v => onSubmit(v, props, loginMode))}>
                            <If rendered={!loginMode}>
                                <Field component={renderInput}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    autoComplete="nome"
                                    autoFocus
                                />
                            </If>
                            <Field component={renderInput}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Field component={renderInput}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <If rendered={!loginMode}>
                                <Field component={renderInput}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    label="Confirmar senha"
                                    type="password"
                                    id="confirm_password"
                                    autoComplete="current-password"
                                />
                            </If>

                            {/*<FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lembrar"
                        />*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {loginMode ? 'Entrar' : 'Registrar'}
                            </Button>

                            <Grid container>
                                {/*<Grid item xs>
                                <Link href="#" variant="body2">
                                   Esqueceu a senha?
                                </Link>
                            </Grid>*/}
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => setLoginMode(!loginMode)}>
                                        {loginMode ? 'Não tem uma conta? Crie a sua' : 'Já tem conta? Efetue o login.'}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

const AuthForm = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(AuthForm)
