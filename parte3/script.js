document.addEventListener('DOMContentLoaded', () => {
    const dadosExtrato = {
        saldo: 4123.50,
        transacoes: [
            { tipo: 'venda', descricao: 'Venda - fone', valor: 249.90 },
            { tipo: 'pix', descricao: 'Pagamento fornecedor - Magalu', valor: -300.00 },
            { tipo: 'cashback', descricao: 'Campanha cashback', valor: 120.00 },
            { tipo: 'compra', descricao: 'Compra - Estoque SSDs NVMe', valor: -3000.00 },
            { tipo: 'venda', descricao: 'venda - Estoque SSDs NVMe', valor: 6000.00 },
        ]
    };

    const saldoElemento = document.getElementById('saldo-conta');
    const listaTransacoesElemento = document.getElementById('lista-transacoes');

    saldoElemento.textContent = `Saldo: ${dadosExtrato.saldo.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })}`;

    dadosExtrato.transacoes.forEach(transacao => {
        const itemLista = document.createElement('li');
        itemLista.classList.add('transacao');

        if (Math.abs(transacao.valor) >= 5000) {
            itemLista.classList.add('destaque');
        }

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(transacao.valor);

        itemLista.innerHTML = `
            <div class="transacao-info">
                <span>${transacao.descricao}</span>
                <span class="transacao-valor ${transacao.valor >= 0 ? 'positivo' : 'negativo'}">
                    ${valorFormatado}
                </span>
            </div>
        `;

        listaTransacoesElemento.appendChild(itemLista);
    });
});
