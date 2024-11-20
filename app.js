searchBar = document.querySelector(".searchBar")
submitButton = document.querySelector(".submitButton")
const gameContainer = document.querySelector(".main")
const savedGames = []


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

    const paginationContainer = document.createElement('div');

   

    paginationContainer.innerHTML = 

    gameContainer.innerHTML = "";

    games.forEach(game => {

        const gameCard = document.createElement('div');
        gameCard.classList.add('gameCard');
        
        
        
        gameCard.innerHTML = 
        `<h3>${game.name}</h3>
        <img src="${game.background_image}" alt="${game.name}" />
        <div class="information">
        <img src="love.png" class="likeButton">
        <div class="details">
        <div class="rating">
        <img src="star.png" class="ratingIcon"> 
        <span>${game.rating}</span>
        </div>
        <p class="release-date">Date released: ${game.released}</p></div></div>
        `;

        const likeButton = gameCard.querySelector('.likeButton');
        likeButton.addEventListener("click", () => {
            console.log(game)
            savedGames.push(game)

            localStorage.setItem('localSavedGames', JSON.stringify(savedGames));
            const lol = JSON.parse(localStorage.getItem('localSavedGames'));
            console.log(lol)
        });

 
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


const rankingsButton = document.querySelector('.rankings');


rankingsButton.addEventListener("click", () => {

    rankGames()

})

const rankGames = async () => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?ordering=-metacritic&key=${apiKey}&page_size=50`)
        const data = await response.json();
        displayGames(data.results);
        
    }   catch(error) {
        console.error('Error fetching data from RAWG API', error)
    }
}

const games = document.querySelector(".games")

games.addEventListener('click', () => {
    gameContainer.innerHTML = "";
})

const likedGames = document.querySelector('.likedGames');
likedGames.addEventListener('click', () => {

    gameContainer.innerHTML = "";
    displayGames(savedGames);
})

