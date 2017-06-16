window.CONFIG = {
    work: {
        name: "dirbam",
        alert: "Darbą baigėm - ilsėtis!",
        // sound: "https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3",
        sound: "https://www.soundjay.com/misc/dream-harp-08.mp3",
        duration: 45
    },
    rest: {
        name: "ilsimės",
        alert: "Poilsis baigėsi, einam dirbt",
        sound: "https://www.soundjay.com/misc/sounds/bell-ringing-03.mp3",
        duration: 8
    },
    stopped: {
        name: "dirbsim"
    },
    beepSound: "http://www.soundjay.com/button/beep-07.wav",
    clickSound: "https://www.soundjay.com/button/button-15.mp3",
    endWork: {
        name: "Darbo diena baigėsi",
        sound: "https://www.soundjay.com/footsteps/sounds/footsteps-4.mp3",
    },
    maxTotalTime: 490,
    muted: false,
    version: '0616-11'
};

if (process.env.NODE_ENV === 'development') {
    window.CONFIG.work.duration = 1;
    window.CONFIG.rest.duration = 2;
    window.CONFIG.maxTotalTime = 2;
}
