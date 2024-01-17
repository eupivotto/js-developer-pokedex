// details.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    getPokemonDetails(pokemonId)
        .then((pokemon) => {
            // Preencher a div com os detalhes do Pokémon
            displayPokemonDetails(pokemon);
        })
        .catch((error) => {
            console.error('Erro ao obter detalhes do Pokémon:', error);
        });
    // buscar os detalhes do Pokémon
    console.log('Detalhes do Pokémon com ID:', pokemonId);
});

function getPokemonDetails(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon); // Reutilizando a função existente
}

function displayPokemonDetails(pokemon) {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');
    console.log('Chamando displayPokemonDetails');

    
    pokemonDetailsContainer.innerHTML = `
        <div class="pokemon ${pokemon.type}">
            <span class="number-page">#${pokemon.number}</span>
            <span class="name-page">${pokemon.name}</span>

            <div class="detail-page">
                <ol class="types-page">
                    ${pokemon.types.map((type) => `<li class="type-page ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

            </div>
            
            <div class="abilities-page">
                
                <ul>

                    <div class="ability-data">
                    <h3>Abilities:</h3>
                    ${pokemon.abilities?.map((ability) => `
                    <li class="ability-content">${ability?.ability?.name}</li> `).join('')}
                    </div>

                    <div class="ability-data">
                    <h3>Experience:</h3>
                    <li class="ability-content">${pokemon?.base_experience}</li>
                    </div>

                    <div class="ability-data">
                    <h3>Height:</h3>
                    <li class="ability-content">${pokemon?.height}</li>
                    </div>

                    <div class="ability-data">
                    <h3>Order:</h3>
                    <li class="ability-content">${pokemon?.order}</li>
                    </div>
                </ul>

            </div>

        </div>
    `;

    console.log('Detalhes do Pokémon:', pokemon);
}

function goBack() {
    window.history.back();
}
