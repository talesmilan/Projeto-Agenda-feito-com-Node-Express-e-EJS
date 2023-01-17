const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true }
  });

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
      this.body = body;
      this.errors = [];
      this.user = null;
    }

    async login() {
      this.valida();
      if(this.errors.length > 0) return;

      this.user = await LoginModel.findOne({email: this.body.email})

      if (!this.user) {
        this.errors.push("Esse email não esta cadastrado no sistema.")
        return
    }

      if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
        this.errors.push("Senha inválida")
        this.user = null
        return
      }

    }


    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists()

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync()
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
        
        this.user = await LoginModel.create(this.body);

    }

    async userExists() {
      this.user = await LoginModel.findOne({email: this.body.email})

      if (this.user) this.errors.push("Email já cadastrado no sistema.")

    }

    valida() {
        // Validação
        this.cleanUp()    
        
        if (!validator.isEmail(this.body.email)) {
            this.errors.push("Você precisa digitar um email válido.")
        }
        if (this.body.senha.length < 6 || this.body.senha.length >= 12 ) {
            this.errors.push("A senha precisa ter entre 6 e 12 caracteres.")
        }
    }


    cleanUp() {
        for(const key in this.body) {
          if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
          }
        }
    
        this.body = {
          email: this.body.email,
          senha: this.body.senha
        };
      }

}

module.exports = Login