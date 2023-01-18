import validator from 'validator'

export default class Contato {
    constructor(formClass, nomeErro, emailErro, telefoneErro) {
        this.form = document.querySelector(formClass)
        this.nomeErro = document.querySelector(nomeErro)
        this.emailErro = document.querySelector(emailErro)
        this.telefoneErro = document.querySelector(telefoneErro)

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
        const nomeInput = el.querySelector('input[name="nome"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')
        let error = false

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            this.emailErro.innerText = "Você precisa digitar um email válido."
            error = true
        } else {
            this.emailErro.innerText = ""
        }

        if (nomeInput.value.length === 0) {
            this.nomeErro.innerText = "Nome é um campo obrigatório."
            error = true
        } else {
            this.nomeErro.innerText = ""
        }

        if (!emailInput.value && !telefoneInput.value) {
            this.telefoneErro.innerText = "Pelo menos um contato precisa ser enviado: email ou telefone."
            this.emailErro.innerText = "Pelo menos um contato precisa ser enviado: email ou telefone."
            error = true
        } else {
            this.telefoneErro.innerText = ""
            this.emailErro.innerText = ""
        }

        if(!error) el.submit()


    }

}