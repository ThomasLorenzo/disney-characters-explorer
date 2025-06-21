document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar dados dos personagens da API
    async function fetchCharactersData() {
        try {
            const response = await fetch('https://api.disneyapi.dev/character?pageSize=50');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar dados dos personagens da API');
            }        
            
            const charactersData = await response.json();
            return charactersData;
        } catch (error) {
            console.error('Erro ao carregar personagens:', error);
            return null;
        }
    }

    // Função para criar os cards dos personagens
    async function createCharacterCards() {
        const charactersData = await fetchCharactersData();
        
        if (!charactersData) {
            console.error('Não foi possível carregar os dados dos personagens');
            return;
        }

        const charactersGrid = document.getElementById('characters-grid');

        charactersData.data.forEach(character => {
            // Criar o card principal
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.setAttribute('title', character.name);
            card.setAttribute('id', character._id);
            
            // Adicionar evento de clique para abrir a wiki do personagem
            card.addEventListener('click', function() {
                window.open(character.sourceUrl, '_blank');
            });
            
            // Criar elemento do nome
            const nameElement = document.createElement('span');
            nameElement.classList.add('character-name');
            nameElement.textContent = character.name;

            // Criar elemento da imagem
            const imageElement = document.createElement('img');
            imageElement.classList.add('character-image');
            imageElement.alt = character.name;
            
            // Definir source da imagem
            if (character.imageUrl) {
                imageElement.src = character.imageUrl;
            } else {
                imageElement.src = "images/image-not-found.png";
            }

            // Adicionar elementos ao card
            card.appendChild(imageElement);
            card.appendChild(nameElement);

            // Adicionar card ao grid
            charactersGrid.appendChild(card);
        });
    }

    // Inicializar a aplicação
    createCharacterCards();

    // TODO: Implementar funcionalidades futuras
    // - Sistema de paginação completo
    // - Funcionalidade da barra de pesquisa
    // - Loading placeholder enquanto cards carregam
});