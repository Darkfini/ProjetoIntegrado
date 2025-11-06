const express = require('express');
const bodyParcer = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(bodyParcer.json());
const contas = {
    '12345': { saldo: 10000 },
    '67890': { saldo: 500 }
}

const transacoes = [];

app.post('/api/transferencia', (req, res) => {
    const { contaOrigem, ContaDestino, valor } = req.body;

    if (!contaOrigem || !ContaDestino || !valor === undefined) {
        return res.status(400).json({ mensagem: 'Dados incompletos' });
    }

    if (!contas[contaOrigem] || !contas[ContaDestino]) {
        return res.status(400).json({ mensagem: 'Conta origem ou conta destino não existe' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor da transferência deve ser maior que 0' });
    }

    if (contas[contaOrigem].saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente' });
    }

    const idTransacao = uuidv4();

    const novaTransacao = {
        id: idTransacao,
        contaOrigem,
        ContaDestino,
        valor,
        data: new Date().toISOString(),
        status: 'Concluida'

    }
    transacoes.push(novaTransacao);
    contas[contaOrigem].saldo -= valor;
    contas[ContaDestino].saldo += valor;
    return res.status(200).json({
        mensagem: 'Transferencia realizada',
        idTransacao,
        novoSaldoOrigem: contas[contaOrigem].saldo,
        novosaldoDestino: contas[ContaDestino].saldo
    });

});

app.listen(port, () => {
    console.log(`API rodando em http://localhost${port}`);
})