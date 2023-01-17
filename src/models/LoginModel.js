const mongoose = require('mongoose');
const { clearCustomQueryHandlers } = require('puppeteer');
const validator = require('validator')

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

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        
        try {
            this.user = await LoginModel.create(this.body);
        } catch(e) {console.log(e)}

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