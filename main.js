// Descrizione
// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
// Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post. Ogni post dovrà avere le informazioni necessarie per stampare la relativa card: id del post, numero progressivo da 1 a n nome autore, foto autore, data in formato americano (mm-gg-yyyy), testo del post, immagine (non tutti i post devono avere una immagine), numero di likes.
// Non è necessario creare date casuali, per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
// Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// **BONUS
// 1 - Formattare le date in formato italiano (gg/mm/aaaa)
// 2 - Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3 - Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.


const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    },
    {
        "id": 6,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=176",
        "author": {
            "name": "Gino Spadaccino",
            "image": "https://unsplash.it/300/300?image=28"
        },
        "likes": 47,
        "created": "2021-03-05"
    }
];
//#popolo l'array in modo randomico
for (let i = 7; i < 20; i++){
    const post = {};
    post["id"]=i;
    post["content"] = "Placeat libero ipsa nobis ipsum quibusdam quas harum ut.";
    post["media"] = `https://unsplash.it/600/400?image=${randomIntFromInterval(1, 500)}`;
    post["author"] = {}
    post["author"]["name"] = 'Tizio Cai* Sempronia';
    post["author"]["image"] = randomProPic (randomIntFromInterval(1, 500));
    post["likes"] = randomIntFromInterval(1, 500);
    post["created"] = "2021-03-05";
    posts.push(post);
}
//#popolo l'HTML con l'array randomico di cui sopra
posts.forEach((element) =>{
    //console.log(element.created)
    //reverseString(element.created);
    //console.log(reverseString(element.created))
    document.getElementById('container').innerHTML += populatePosts(element)
})
//#aggiungo l'eventlistener 'click' con un foreach ad ogni pseudoelemento. Creo una lista di elementi 'buttons', da cui seleziono solo quello che corrisponde all'indice prestabilito ('cliccato') per aggiungere o togliere la classe 'attiva' e il counter dei likes
const likedPosts = [];
document.querySelectorAll('div.likes__cta').forEach((element, index) => {
    element.addEventListener('click', function(event){
        event.preventDefault()
        const buttons = document.querySelectorAll('a.like-button');
        let sum = 0;
        if(buttons[index].classList.contains('like-button--liked')){
            buttons[index].classList.remove('like-button--liked');
            sum = posts[index]['likes'];
            likedPosts.splice(likedPosts.indexOf(posts[index].id));
        } else {
            buttons[index].classList.add('like-button--liked');
            sum = posts[index]['likes'] + 1;
            likedPosts.push(posts[index].id)
            console.log(likedPosts)
        }
        document.querySelectorAll('.js-likes-counter')[index].innerHTML = sum;
    })
});
/**
 * This function creates a post from a given object element elements
 * @param {*} postElement //the element from which taking all the necessary infos
 * @returns //a fully populated post
 */
function populatePosts (postElement){
    const { id, content, media, author, likes, created} = postElement;
    if (author.image == null){
        let placeholder = firstLetters (author.name);
        return  `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${placeholder}                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${reverseString(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
        `
    } else {
        return `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${author.image}" alt="${author.name}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${reverseString(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
        `
    }
}
//*console.log(('Tizio Caio').split(' '));
//*console.log(('Tizio Caio').split(' ')[0].charAt(0));
/**
 * This function extrapolates the first letter of the first two words of a string to mimic a generic placeholder for missing names
 * @param {*} string //only the first two words of a string will be considered
 * @returns //a string of two carachters
 */
function firstLetters (string){
    let name = string.split(' ')[0].charAt(0);
    let surname = string.split(' ')[1].charAt(0);
    let placeholder = name + surname;
    return placeholder
}
//*console.log(firstLetters ('Tizio Caio'))
/**
 * Given a number, if it's a multiple of five, the result in null. Else you get a random image
 * @param {*} number insert a number 
 * @returns a "null" value or a random pic
 */
function randomProPic (number){
    if (number % 5 == 0){
        //*console.log('happening')
        return null
    }
    return `https://unsplash.it/300/300?image=${randomIntFromInterval(1, 99)}`
    
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reverseString(string){
    return string.split('-').reverse().join('-');
}