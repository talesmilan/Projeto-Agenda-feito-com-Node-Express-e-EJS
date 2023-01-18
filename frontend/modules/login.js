import validator from 'validator'

export default class Login {
    constructor(formClass, erroEmail, erroSenha) {
        this.form = document.querySelector(formClass)
        this.erroEmail = document.querySelector(erroEmail)
        this.erroSenha = document.querySelector(erroSenha)

    }

    init() {
        this.events()
    }

    events() {
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target
        const emailInput = el.querySelector('input[name="email"]')
        const senhaInput = el.querySelector('input[name="senha"]')
        let error = false

        if(!validator.isEmail(emailInput.value)) {
            this.erroEmail.innerText = "Você precisa digitar um email válido."
            error = true
        } else {
            this.erroEmail.innerText = ""
        }
        if(senhaInput.value.length < 6 || senhaInput.value.length >= 12 ) {
            this.erroSenha.innerText = "A senha precisa ter entre 6 e 12 caracteres."
            error = true
        } else {
            this.erroSenha.innerText = ""
        }

        if(!error) el.submit()

    }

}