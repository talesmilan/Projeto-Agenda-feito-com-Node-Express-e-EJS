//import './assets/css/style.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/login'
import Contato from './modules/contato'


const login = new Login('.form-login', '.login-email-erro', '.login-senha-erro')
const cadastro = new Login('.form-cadastro', '.cadastro-email-erro', '.cadastro-senha-erro')

login.init()
cadastro.init()



const contato = new Contato('.form-contato', '.nomeErro', '.emailErro', '.telefoneErro')

contato.init()