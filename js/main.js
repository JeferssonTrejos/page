//Declarciones
const cardsContainer = document.getElementById('cardsContainer');
const add = document.getElementById('add');
let page = 1;

//Obtener datos de la api
function fetchData() {
    let pageSize = 10;  /*<- max 40*/
    let url = `https://api.rawg.io/api/games?key=c6e6612a7b484271bc575b4db34a4316&page=${page}&page_size=${pageSize}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results)
            getData(data.results);
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
};

//Extraer datos del json
function getData(arrayData) {
    for (i in arrayData) {

        let card = `
        <div id="data">
            ID: ${arrayData[i].id}<br>
            Nombre: ${arrayData[i].name}<br>
            Lanzamiento: ${arrayData[i].released}<br>
            Generos: ${getGenders(arrayData[i].genres)}<br>
            Calificacion: ${arrayData[i].rating}<br>
            Metacritic: ${arrayData[i].metacritic}<br>
        </div>
        `;

        let cardGame = `
        <div class="main__cardMovies--card">
            <img class="card__img" src="${arrayData[i].background_image}">
            <p class="card__name">${arrayData[i].name}</p>
            <button class="card__btnMore">Más</button>
        </div>
        `;

        cardsContainer.insertAdjacentHTML('beforeend', cardGame);

    };

    function getGenders(arrayGenres){
        let gen = ''
        for (o in arrayGenres) {
            gen = gen + arrayGenres[o].name+' - '
        }
        return gen;
    }
};

// add.addEventListener('click', () => {
//     page++
// });

fetchData();