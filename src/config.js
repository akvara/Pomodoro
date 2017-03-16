var CONFIG = {
    work: {
        name: "dirbam",
        alert: "Darbą baigėm - ilsėtis!",
        sound: "https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3",
        duration: 45
    },
    rest: {
        name: "ilsimės",
        alert: "Poilsis baigėsi, einam dirbt",
        sound: "https://www.soundjay.com/misc/sounds/bell-ringing-03.mp3",
        duration: 10
    },
    stopped: {
        name: "dirbsim"
    },
    beepSound: "http://www.soundjay.com/button/beep-07.wav",
    version: '0315-21'
};

export default Object.freeze(CONFIG);
