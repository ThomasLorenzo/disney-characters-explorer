document.addEventListener('DOMContentLoaded', function() {
    async function pegarDadosPersonagens() {
        const resposta = await fetch('https://api.disneyapi.dev/character');
        
        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados dos personagens da API');
        }        
        
        const dadosPersonagens = await resposta.json();

        return dadosPersonagens;
    }

    async function criarCardsPersonagens() {
        const dadosPersonagens = await pegarDadosPersonagens();

        const container = document.getElementById('container');

        dadosPersonagens.data.forEach(personagem => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.addEventListener('click', function() {
                window.open(personagem.sourceUrl, '_black');
            });
            
            const nome = document.createElement('span');
            nome.classList.add('card-nome');
            nome.classList.add('poppins-black');
            nome.textContent = personagem.name;

            card.appendChild(nome);

            const imagem = document.createElement('img');
            imagem.classList.add('card-imagem');
            imagem.src = personagem.imageUrl;

            card.appendChild(imagem);

            container.appendChild(card);
        });
    }

    criarCardsPersonagens();
});