searchBar = document.querySelector(".searchBar")
submitButton = document.querySelector(".submitButton")
const gameContainer = document.querySelector(".main")


const apiKey = '2c80b02fad8b4f65872780867579ae94';

const searchGames = async (query) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page_size=10`);
        const data = await response.json();
        displayGames(data.results);
        console.log(data.results);
    } catch(error) {
        console.error('Error fetching data from RAWG API', error);
    } 
};

const displayGames = (games) => {
    const gameContainer = document.querySelector(".main")
    gameContainer.innerHTML = "";

    games.forEach(game => {

        const gameCard = document.createElement('div');
        gameCard.classList.add('gameCard');


        
        gameCard.innerHTML = 
        `<h3>${game.name}</h3>
        <img src="${game.background_image}" alt="${game.name}" />
        <div class="details">
        <p class="rating">rating :${game.rating}</p>
        <p class="release-date">Date released: ${game.released}</p></div>
        `;
        
        gameContainer.appendChild(gameCard)
    })

} /*
        THIS IS FOR DESIGINING ONLY !

    for (let i = 0; i < 12; i++) {
        const gameCard = document.createElement('div');
        gameCard.classList.add('gameCard');
    
        gameCard.innerHTML = `
            <h3>League of Legends: Wild Rift</h3>
            <img src="https://media.rawg.io/media/games/3c7/3c773379b9a4161528bf12a2c9346e93.jpg" />
            <div class="details">
                <p class="rating">Rating: ${"48.4035"}</p>
                <p class="release-date">Release Date: ${"2020-10-27"}</p>
            </div>
        `;
    
        gameContainer.appendChild(gameCard);
    }
    */

    submitButton.addEventListener('click', () => {
        const query = searchBar.value.trim();
        if (query) {
          searchGames(query); 
        }
      });