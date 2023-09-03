const charactersDiv = document.getElementById('characters');
const characterDetailsDiv = document.getElementById('characterDetails');
let page = 1;

function fetchCharacters() {
    fetch(`/api/characters/${page}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(character => {
                const img = document.createElement('img');
                img.src = character.image;
                img.alt = character.name;
                img.onclick = () => showCharacterDetails(character.id);
                charactersDiv.appendChild(img);
            });

            if (data.info.next) {
                const observer = new IntersectionObserver(entries => {
                    if (entries[0].isIntersecting) {
                        page++;
                        fetchCharacters();
                        observer.disconnect();
                    }
                }, { threshold: 1 });

                observer.observe(charactersDiv.lastChild);
            }
        })
        .catch(error => console.error('Error:', error));
}

function showCharacterDetails(id) {
    fetch(`/api/character/${id}`)
        .then(response => response.json())
        .then(character => {
            characterDetailsDiv.innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}">
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Type: ${character.type}</p>
                <p>Gender: ${character.gender}</p>
                <button onclick="backToList()">Back to List</button>
            `;
            charactersDiv.style.display = 'none';
            characterDetailsDiv.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

function backToList() {
    characterDetailsDiv.style.display = 'none';
    charactersDiv.style.display = 'block';
}

// Initially fetch characters
fetchCharacters();
