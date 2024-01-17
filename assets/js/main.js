document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');

    const maxRecords = 151;
    const limit = 10;
    let offset = 0;

    if (loadMoreButton && window.location.pathname === '/index.html') {
        loadMoreButton.addEventListener('click', () => {
            offset += limit;
            const qtdRecordsWithNextPage = offset + limit;

            if (qtdRecordsWithNextPage >= maxRecords) {
                const newLimit = maxRecords - offset;
                loadPokemonItems(offset, newLimit);

                // Remove o botão após atingir o número máximo de registros
                loadMoreButton.parentElement.removeChild(loadMoreButton);
            } else {
                loadPokemonItems(offset, limit);
            }
        });
    } else {
        console.error('Elemento loadMoreButton não encontrado no DOM ou não na página principal.');
    }

    function loadPokemonItems(offset, limit) {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML += newHtml;
            registerPokemonClickEvent();
        });
    }

    // Chama a função apenas se estiver na página principal
    if (window.location.pathname === '/index.html') {
        loadPokemonItems(offset, limit);
    }

    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `;
    }

    function registerPokemonClickEvent() {
        const pokemonElements = document.querySelectorAll('.pokemon');
        pokemonElements.forEach((pokemonElement) => {
            pokemonElement.addEventListener('click', openDetails);
        });
    }

    function openDetails(event) {
        const clickedPokemon = event.currentTarget;
        if (clickedPokemon) {
            const pokemonId = clickedPokemon.dataset.id;
            getDetails(pokemonId);
        }
    }

    function getDetails(pokemonId) {
        window.location.href = `details.html?id=${pokemonId}`;
        
        console.log('Detalhes do Pokémon com ID:', pokemonId);
    }
});
