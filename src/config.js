window.CONFIG = {
  work: {
    name: 'dirbam',
    alert: 'Darbą baigėm - ilsėtis!',
    sound: '/sounds/work.wav',
    duration: 45,
  },
  rest: {
    name: 'ilsimės',
    alert: 'Poilsis baigėsi, einam dirbt',
    sound: '/sounds/rest.wav',
    duration: 8,
  },
  stopped: {
    name: 'dirbsim',
  },
  beepSound: '/sounds/beep.wav',
  clickSound: '/sounds/click.wav',
  endWork: {
    name: 'Darbo diena baigėsi',
    sound: '/sounds/end.wav',
  },
  maxTotalTime: 490,
  muted: false,
  version: '6.11.07.13',
};

if (import.meta.env.DEV) {
  window.CONFIG.work.duration = 1;
  window.CONFIG.rest.duration = 2;
  window.CONFIG.maxTotalTime = 2;
}
