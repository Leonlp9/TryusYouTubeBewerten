let videos = [
    {
        youTubeUrl: "https://www.youtube.com/watch?v=ZNcrAQPTzVA",
        title: "Tryus montage",
        creator: "pookiefnr",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=6z9LsxEyMMg",
        title: "CHAMPIONS 🏆 (ft. Amar & Rezon)",
        creator: "LevoxX",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=BZNbusH7IFE",
        title: "Noord Africano | Kyrox Highlights #7",
        creator: "KyroxVFX",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=iytoD28PAyU",
        title: "NOKIA 🤳 | 2nd Red Bull FTW Lan ( +2500 $ ) ...",
        creator: "exqu777",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=wU4q-0w_LVE",
        title: "23 Island 🌴 | Bergii Highlights #114",
        creator: "Bergii",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=5hOWt_HukE8",
        title: "The Way I Are 💖| (Chapter 6 Fortnite Montage ) | Highlights #11",
        creator: "thebig_jj_",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=I6UyifuxDX8",
        title: "Amiri Trendsetter | Cryptic Highlight #1",
        creator: "Crypticfnr",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=0DhxKddARKc",
        title: "Blank Space 💙 |  Fortnite Montage #1",
        creator: "Twizzy",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=9xDVsE0S6mw",
        title: "KILL BILL (ft. @rezonay_ ) I Ryngo Highlights",
        creator: "R Y N G O",
        rating: null,
    }
];

// Shuffle videos
videos.sort(() => Math.random() - 0.5);
let currentVideoIndex = 0;
let selectedRating = 0;

const videoContainer = document.getElementById('videoContainer');
const ratingContainer = document.getElementById('ratingContainer');
ratingContainer.classList.add('hidden');
const nextButton = document.getElementById('nextButton');
const rankingContainer = document.getElementById('rankingContainer');
const counter = document.getElementById('counter');

function displayVideo() {
    videoContainer.innerHTML = "";
    ratingContainer.innerHTML = "";
    ratingContainer.classList.add('hidden');
    nextButton.style.display = "none";
    selectedRating = 0;

    if (currentVideoIndex >= videos.length) {
        displayRanking();
        return;
    }
    const video = videos[currentVideoIndex];

    // Info-Div (optional additional info)
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    infoDiv.classList.add('hidden');
    infoDiv.innerHTML = `<h2>${video.title}</h2><p>von ${video.creator}</p>`;
    videoContainer.appendChild(infoDiv);

    // Card-Container
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const card = document.createElement('div');
    card.classList.add('card');

    // Card Front
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.innerHTML = `<h2>${video.title}</h2><p>von ${video.creator}</p>`;


    //add to cart front an progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.style.width = `0%`;
    progressBar.appendChild(progress);
    cardFront.appendChild(progressBar);
    setTimeout(() => {
        progress.style.width = `100%`;
    }, 100);

    // Card Back
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const videoId = new URL(video.youTubeUrl).searchParams.get("v");

    // Assemble card
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardContainer.appendChild(card);
    videoContainer.appendChild(cardContainer);


    // Create stars
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('div');
        star.textContent = "★";
        star.classList.add('star');
        star.dataset.value = i;
        star.addEventListener('click', () => selectRating(i));
        ratingContainer.appendChild(star);
    }

    updateCounter();

    // Auto-flip after 3s
    setTimeout(() => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&start=${video.start || 0}&end=${video.end || 0}`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        cardBack.appendChild(iframe);

        card.classList.add('flipped');
        ratingContainer.classList.remove('hidden');
        infoDiv.classList.remove('hidden');
    }, 4000);
}

function selectRating(ratingValue) {
    if (selectedRating === ratingValue) {
        selectedRating = ratingValue - 0.5;
    } else if (selectedRating === ratingValue - 0.5) {
        selectedRating = ratingValue;
    } else {
        selectedRating = ratingValue;
    }
    updateStars();
    nextButton.style.display = "block";
}

function updateStars() {
    const stars = ratingContainer.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('selected', 'half');
        const val = parseInt(star.dataset.value, 10);
        if (val <= Math.floor(selectedRating)) star.classList.add('selected');
        else if (val === Math.floor(selectedRating) + 1 && selectedRating % 1 !== 0) star.classList.add('half');
    });
}

nextButton.addEventListener('click', () => {
    // Save rating
    videos[currentVideoIndex].rating = selectedRating;
    currentVideoIndex++;

    // If done, show ranking
    if (currentVideoIndex >= videos.length) {
        displayRanking();
        return;
    }

    // Grab current card elements
    const card = document.querySelector('.card');
    const cardFront = card.querySelector('.card-front');
    const cardBack = card.querySelector('.card-back');
    const nextVideo = videos[currentVideoIndex];

    // Hide controls and flip back to front
    ratingContainer.classList.add('hidden');
    nextButton.style.display = 'none';
    card.classList.remove('flipped');
    videoContainer.querySelector('.info').classList.add('hidden');

    // Update content
    cardFront.innerHTML = `<h2>${nextVideo.title}</h2><p>von ${nextVideo.creator}</p>`;
    const nextVideoId = new URL(nextVideo.youTubeUrl).searchParams.get("v");

    //add to cart front an progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.style.width = `0%`;
    progressBar.appendChild(progress);
    cardFront.appendChild(progressBar);

    setTimeout(() => {
        progress.style.width = `100%`;
    }, 100);

    //stop playing the current video
    const currentIframe = cardBack.querySelector('iframe');
    if (currentIframe) {
        setTimeout(() => {
            currentIframe.src = "";
        }, 300);
    }

    updateCounter();

    // After 3s, flip to back and show rating
    setTimeout(() => {
        selectRating(0);
        nextButton.style.display = 'none';
        card.classList.add('flipped');
        ratingContainer.classList.remove('hidden');
        videoContainer.querySelector('.info').classList.remove('hidden');
        videoContainer.querySelector('.info').innerHTML = `<h2>${nextVideo.title}</h2><p>von ${nextVideo.creator}</p>`;
        const nextIframe = cardBack.querySelector('iframe');
        nextIframe.src = `https://www.youtube.com/embed/${nextVideoId}?rel=0&autoplay=1`;
    }, 4000);
});

function updateCounter() {
    counter.innerHTML = `Video ${currentVideoIndex + 1} von ${videos.length}`;
}

function displayRanking() {
    videoContainer.innerHTML = "";
    ratingContainer.innerHTML = "";
    ratingContainer.classList.add('hidden');
    nextButton.style.display = "none";
    rankingContainer.innerHTML = "";

    // Videos nach Rating sortieren
    const sorted = videos.slice().sort((a, b) => b.rating - a.rating);

    // Erstelle das Podest-Container
    const podiumContainer = document.createElement('div');
    podiumContainer.classList.add('podium-container');

    // Erstelle die Podestplätze in Reihenfolge: Platz 3, Platz 2, Platz 1
    const places = [
        { idx: 1, label: '2. Platz' },
        { idx: 0, label: '1. Platz' },
        { idx: 2, label: '3. Platz' },
    ];

    places.forEach(place => {
        if (sorted[place.idx]) {
            const podiumSpot = document.createElement('div');
            podiumSpot.classList.add('podium-spot');
            podiumSpot.innerHTML = `<h3>${place.label}</h3>
                                    <p>${sorted[place.idx].creator} - ${sorted[place.idx].rating} Sterne</p>`;


            const videoId = new URL(sorted[place.idx].youTubeUrl).searchParams.get("v");
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&start=${sorted[place.idx].start || 0}`;
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
            iframe.setAttribute("allowfullscreen", "");
            iframe.style.width = "100%";
            iframe.style.aspectRatio = "16/9";
            podiumSpot.appendChild(iframe);

            podiumContainer.appendChild(podiumSpot);
        }
    });

    rankingContainer.appendChild(podiumContainer);

    // Button für weitere Anzeigen nur anzeigen, wenn mehr als 3 Videos vorhanden sind
    if (sorted.length > 3) {
        const button = document.createElement('button');
        button.textContent = "Weitere Anzeigen";
        button.classList.add('show-more-button');
        button.addEventListener('click', () => {
            // Liste der restlichen Videos ab Platz 4
            const ol = document.createElement('ul');
            for (let i = 3; i < sorted.length; i++) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = sorted[i].youTubeUrl;
                a.target = "_blank";
                a.innerHTML = `#${i+1} ${sorted[i].title} - ${sorted[i].creator}: ${sorted[i].rating} Sterne`;
                li.style.animationDelay = `${i * 0.1}s`;
                li.appendChild(a);
                ol.appendChild(li);
            }
            // Entferne den Button und füge die Liste hinzu
            button.remove();
            rankingContainer.appendChild(ol);
        });
        rankingContainer.appendChild(button);
    }

    setTimeout(
        () => {
            //play fortnite-victory-royale-sound-effect-made-with-Voicemod.mp3
            const audio = new Audio('fortnite-victory-royale-sound-effect-made-with-Voicemod.mp3');
            audio.volume = 0.5;
            audio.play();
        },
        3000
    )
}

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('start').classList.add('hidden');
    videoContainer.classList.remove('hidden');
    displayVideo();
});