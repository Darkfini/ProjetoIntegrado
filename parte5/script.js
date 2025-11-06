document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    const cpfInput = document.getElementById('cpf');
    const dataNascimentoInput = document.getElementById('data-nascimento');
    const telefoneInput = document.getElementById('telefone');

    const cpfError = document.getElementById('cpf-error');
    const dataError = document.getElementById('data-error');
    const telefoneError = document.getElementById('telefone-error');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        // --- CPF ---
        const cpf = cpfInput.value.replace(/\D/g, '');
        if (cpf.length !== 11 || !/^[0-9]+$/.test(cpf)) {
            cpfError.textContent = "CPF inválido";
            isValid = false;
        } else {
            cpfError.textContent = '';
        }

        // --- Data de nascimento ---
        const dataNascimento = new Date(dataNascimentoInput.value);
        const hoje = new Date();
        if (isNaN(dataNascimento.getTime()) || dataNascimento > hoje) {
            dataError.textContent = "Data inválida";
            isValid = false;
        } else {
            dataError.textContent = '';
        }

        // --- Telefone ---
        const telefone = telefoneInput.value.replace(/\D/g, '');
        if (telefone.length < 10 || telefone.length > 11 || !/^[0-9]+$/.test(telefone)) {
            telefoneError.textContent = "Telefone inválido";
            isValid = false;
        } else {
            telefoneError.textContent = '';
        }

        // --- Sucesso ---
        if (isValid) {
            alert("Formulário enviado com sucesso!");
        }
    });
});
