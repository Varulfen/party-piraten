

const videoContainer = document.getElementById("video-container");
const playPauseButtonIcon = document.getElementById('play-pause-button-icon');
const controlBtnGrp = document.querySelectorAll("#control-button-grp button");

let player;  // YouTube Player-Objekt
let playing = false;


// Funktion zum Einbetten des Videos
function embedVideo(url) {
    // RegEx, um die Video-ID aus der URL zu extrahieren
    const regex = /(?:https?:\/\/(?:www\.|music\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match) {
        const videoId = match[1];  // Video-ID extrahieren

        // Video in den Container einfügen
        videoContainer.innerHTML = `<div id="player"></div>`;

        // Den YouTube-Player erstellen
        player = new YT.Player('player', {
            height: '315',
            width: '560',
            videoId: videoId,
            host: 'https://www.youtube-nocookie.com',
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError,
                'onStateChange': onPlayerStateChange
            }
        });

        // disable buttons while player loads
        disableControlButtons();
    } else {
        showMessage("Ungültige URL: " + url);
    }
}

function disableControlButtons() {
    controlBtnGrp.forEach(btn => {
        if (!btn.disabled) {
            btn.disabled = true;
        }
        if (!btn.classList.contains("disabled")) {
            btn.classList.add("disabled");
        }
    });
}
function enableControlButtons() {
    controlBtnGrp.forEach(btn => {
        if (btn.disabled) {
            btn.disabled = false;
        }
        if (btn.classList.contains("disabled")) {
            btn.classList.remove("disabled");
        }
    });
}

function onPlayerReady() { // event
    playVideo();
    enableControlButtons();
}
function onPlayerError() {
    showMessage("Player Error");
}
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        stopPlayer();
    }
}

// control functions
function playOrPauseVideo() {
    if(playing) {
        pauseVideo();
    }
    else {
        playVideo();
    }
}
function playVideo() {
    if (player) {
        player.playVideo();
        playing = true;
        setIcon(playPauseButtonIcon, "fa-pause");
    }
}
function pauseVideo() {
    if (player) {
        player.pauseVideo();
        playing = false;
        setIcon(playPauseButtonIcon, "fa-play");
    }
}
// 10 sec forwards
function seekForward() {
    if (player) {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime + 10, true);
    }
}
// 10 sec backwards
function seekBackward() {
    if (player) {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime - 10, true);
    }
}
function stopPlayer() {
    pauseVideo();
    if (player) {
        player.destroy();  // stop video
        videoContainer.innerHTML = ''; // remove embedded video
        player = null;
    }
    playing = false;
    disableControlButtons();
    //hideConclusion(); // hide solution todo
}