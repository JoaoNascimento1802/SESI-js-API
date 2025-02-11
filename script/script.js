let produtos = []; // Inicializa um array vazio

// Função para buscar os produtos do arquivo JSON
async function carregarProdutos() {
    try {
        const response = await fetch('produtos.json'); // Busca o arquivo JSON
        produtos = await response.json(); // Converte o JSON em um array JavaScript
        exibirProdutos(); // Exibe os produtos após o carregamento
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao carregar os produtos. Consulte o console para mais detalhes.');
    }
}

function adicionarProduto() {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const disponivel = document.getElementById('disponivel').value === 'true';

    if (nome && !isNaN(preco)) {
        const novoProduto = {
            nome: nome,
            preco: preco,
            disponivel: disponivel,
        };

        produtos.push(novoProduto); // Adiciona ao array

        // Limpar o formulário
        document.getElementById('nome').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('disponivel').value = 'true';

        exibirProdutos(); // Atualizar a exibição dos produtos
    } else {
        alert("Por favor, preencha o nome e o preço do produto.");
    }
}

function exibirProdutos() {
    const listaProdutosDiv = document.getElementById('lista-produtos');
    listaProdutosDiv.innerHTML = ''; // Limpa a lista antes de exibir

    produtos.forEach((produto, index) => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');

        const nomeH3 = document.createElement('h3');
        nomeH3.textContent = produto.nome;

        const precoP = document.createElement('p');
        precoP.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;

        const disponibilidadeP = document.createElement('p');
        disponibilidadeP.textContent = `Disponibilidade: `;

        const spanDisponibilidade = document.createElement('span');

        spanDisponibilidade.textContent = produto.disponivel ? 'Disponível' : 'Indisponível';
        
        spanDisponibilidade.classList.add(produto.disponivel ? 'disponivel' : 'indisponivel');

        disponibilidadeP.appendChild(spanDisponibilidade);

        produtoDiv.appendChild(nomeH3);
        produtoDiv.appendChild(precoP);
        produtoDiv.appendChild(disponibilidadeP);

        listaProdutosDiv.appendChild(produtoDiv);
    });
}

// Carregar os produtos quando a página carregar
carregarProdutos();