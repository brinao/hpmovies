
//JSON variabel med titel, youtubeid og forsidebillede af filmene.
let hpmovie = {
    "movies": [
        {
            "youtubeid": "TipZCAg24og",
            "title": "Harry Potter and the Sorcerer's Stone",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Philosophers-Stone.jpg"
        },
        {
            "youtubeid": "C7jYc4-9mUw",
            "title": "Harry Potter and the Chamber of Secrets",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Chamber-of-Secrets.jpg"
        },
        {
            "youtubeid": "bXXQnLWQZeI",
            "title": "Harry Potter and the Prisoner of Azkaban",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Prisoner-of-Azkaban.jpg"
        },
        {
            "youtubeid": "WVNENtEJyMM",
            "title": "Harry Potter and the Goblet of Fire",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Goblet-of-Fire.jpg"
        },
        {
            "youtubeid": "WS8Jbm8Gob4",
            "title": "Harry Potter and the Order of the Phoenix",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Order-of-the-Phoenix.jpg"
        },
        {
            "youtubeid": "ivJtJOnw7z8",
            "title": "Harry Potter and the Half-Blood Prince",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Half-Blood-Prince.jpg"
        },
        {
            "youtubeid": "9hXH0Ackz6w",
            "title": "Harry Potter and the Deathly Hallows: Part 1",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Deathly-Hallows-Part-1.jpg"
        },
        {
            "youtubeid": "mObK5XD8udk",
            "title": "Harry Potter and the Deathly Hallows: Part 2",
            "picture":"https://www.coverwhiz.com/uploads/movies/Harry-Potter-and-the-Deathly-Hallows-Part-2.jpg"
        }
    ]
};




//finder hovedelementet som alle elementer skal ligge i
const app = document.getElementById('root');


//laver en boks som filmene skal ligge i
const container = document.createElement('div');
container.setAttribute('class', 'container');

//laver overskriften
let header = document.createElement('header');
header.setAttribute('src', 'header');
header.textContent = "Harry Potter Movies";

//laver en kort tekst som beskriver hvad der findes på siden.
let text = document.createElement('text');
text.setAttribute('src', 'text');
text.textContent = " This is a site where you can get an overall view of the Harry Potter movies and see the trailers.";

//Tilføjer overskrift, tekst og box(container) i hovedelementet i den ønskede rækkefølge som de skal komme i.
app.appendChild(header);
app.appendChild(text);
app.appendChild(container);


//laver url element som værende omdp api siden (en basis URL), hvor filmenes informationer skal komme fra samt en proxy url.
let url = 'https://www.omdbapi.com/?apikey=4e76ce53&t=';
let proxyurl = 'https://cors-anywhere.herokuapp.com/';

//Her laves en for-loop som kører igennem hpmovie variablen (øverst i scriptet) som bruges i fetchen senere.
for (let i = 0; i < hpmovie.movies.length; i++) {
    //vi laver titlen i hpmovie variablen om til en læselig url titel ved at erstatte mellemrum med "%20".
    let titleurl = hpmovie.movies[i].title.replace(/( )/g, "%20");

    // fetchen begynder ved at tilføje proxy url samt lægger titlen på "basis url'en"
    fetch(proxyurl + url + titleurl)
        //hvis fetchen lykkedes, så returnerer fetchen vores data i form af json format:
        .then(response => {
            return response.json();
        })
        .then(movie => {
        //Her kaldes URL'ens klasse for "movie" hvorefter vi kan bruge dataen fra URL'en.

            //Her laves et 'kort' som vil bestå af hver film.
            //For-loopet fra tidligere bliver brugt her for at gøre hvert kort unikt -
            // dvs. at første film som har i = 0, får kortet "card0". Dette er gjort for at kunne style hver kort unikt.
            const card = document.createElement('div');
            card.setAttribute('class', 'card'+i);

            //Her dannes h1 som er filmens titel og sætter indholdet til at være film titlen, fra fetchen.
            const h1 = document.createElement('h1');
            h1.textContent = movie.Title;

            //Her dannes billedevariablen og sætter indholdet til at være URL'en fra hpmovie variablen
            //Man kunne have brugt elementet "poster" fra Fetchen, men jeg brød mig ikke om disse posters.
            const picture = document.createElement('img');
            picture.setAttribute('src', hpmovie.movies[i].picture);

            //Her dannes variablen "age" og sætter indholdet til at være en tekststreng som
            // beskriver filmens udgivelsesår samt hvor gammel den er i forhold til nuværende år.
            const age = document.createElement('age');
            age.textContent = 'The movie was made in ' + movie.Year + ' which makes it ' + ("2020" - movie.Year) + ' years old';

            //Her dannes variablen "rate" og sætter indholdet til at være IMDB raten fra fetchen.
            const rate = document.createElement('rate');
            rate.textContent = 'IMDB rate: ' + movie.imdbRating;

            //Her dannes variablen "trailer" og sætter indholdet til at være videoen fra youtubeid'et i hpmovie variablen.
            const trailer = document.createElement('iframe');
            trailer.setAttribute('src',('https://www.youtube.com/embed/' + hpmovie.movies[i].youtubeid));



            // Her sørges for at hver kort indeholder titel, rate, billede, udgivelsesår/alder samt trailer.
            card.appendChild(h1);
            card.appendChild(rate);
            card.appendChild(picture);
            card.appendChild(age);
            card.appendChild(trailer);

            //Her indsættes hver kort i container.
            container.appendChild(card);
        })

        //Hvis der er fejl i fetchen, laves følgede fejlmeddelese:
        .catch(function(err) {
            // Do something for an error here
            //console.log('error' + err);
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "Gah, it's not working!";
            app.appendChild(errorMessage);
        })
}