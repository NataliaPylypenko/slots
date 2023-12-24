const refs = {
    btnPlay: document.querySelector(".btn-play"),
    currentStep: 0,
    idModal: 'modalSpin',
    audioMusic: document.querySelector("#snd-music"),
    audioReels: document.querySelector("#snd-reels"),
    audioWin: document.querySelector("#snd-win"),
    audioPopup_1: document.querySelector("#snd-popup-1"),
    audioPopup_2: document.querySelector("#snd-popup-2"),
};

const ANIMATION_TIMES = {
    time1: 200,
    time2: 350,
    time3: 500,
    time4: 1000,
};

const symbols = [
    "blue",
    "green",
    "krown",
    "orange",
    "purple",
    "ring",
    "scatter_win",
    "wild_win",
    "yellow",
];

const columns = [
    ".slot-column-1",
    ".slot-column-2",
    ".slot-column-3",
    ".slot-column-4",
    ".slot-column-5",
    ".slot-column-6"
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const random = () => symbols[Math.floor(Math.random() * symbols.length)];

const combos = [
    [
        [random(), random(), random(), random(), random()],
        [random(), random(), random(), random(), random()],
        [random(), random(), random(), random(), random()],
        [random(), random(), random(), random(), random()],
        [random(), random(), random(), random(), random()],
        [random(), random(), random(), random(), random()],
    ],
    [
        [random(), random(), "scatter_win", random(), random()],
        [random(), random(), "scatter_win", random(), random()],
        [random(), random(), "scatter_win", random(), random()],
        [random(), random(), "scatter_win", random(), random()],
        [random(), random(), "scatter_win", random(), random()],
        [random(), random(), "scatter_win", random(), random()],
    ]
];

const stopColumnAnimation = async () => {
    for (const columnSelector of columns) {
        const column = document.querySelector(columnSelector);
        column.classList.remove("slot-column-moving");
        column.classList.add("slot-column-end");
        await delay(ANIMATION_TIMES.time1);
    }

    await delay(ANIMATION_TIMES.time3);

    refs.audioReels.pause();
    await delay(ANIMATION_TIMES.time2);

    showModal(refs.idModal);
};

const changeCombos = () => {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const item = combos[refs.currentStep][i][j];
            console.log(item);

            const column = document.querySelector(`.slot-column-${i + 1}`);
            column.querySelector(`.slot-element-${j + 1}`).setAttribute("src", `./images/symbols/${item}.png`);
        }
    }
};

const startColumnsAnimation = () => {
    for (let i = 1; i <= 6; i++) {
        const column = document.querySelector(`.slot-column-${i}`);
        column.classList.remove("slot-column-end");
        column.classList.add("slot-column-moving");
    }

    refs.audioMusic.volume = 0.5;
    refs.audioMusic.play();

    refs.audioReels.currentTime = 0;
    refs.audioReels.play();

    setTimeout(async () => {
        changeCombos();
        await stopColumnAnimation();
    }, ANIMATION_TIMES.time4);
};

const startSlotAnimation = () => {
    refs.btnPlay.removeEventListener("click", startSlotAnimation);
    refs.btnPlay.classList.add("disabled");
    startColumnsAnimation();
};

refs.btnPlay.addEventListener("click", startSlotAnimation);


const showModal = (idModal) => {
    document.querySelector(`#${idModal}`).classList.add("show");

    if(idModal === 'modalSpin') {
        document.querySelector("#btnSpin").addEventListener("click", hideModalSpin);
        refs.currentStep++;
        refs.idModal = 'modalGetBonus';
        refs.audioPopup_1.play();
    } else if (idModal === 'modalGetBonus') {
        document.querySelector("#btnGetBonus").addEventListener("click", hideModalGetBonus);
        refs.audioPopup_2.play();

        setTimeout(() => {
            refs.audioMusic.currentTime = 0;
            refs.audioMusic.play();
        }, ANIMATION_TIMES.time3)
    }
};

const hideModalSpin = () => {
    document.querySelector("#modalSpin").classList.remove("show");
    document.querySelector("#btnSpin").removeEventListener("click", hideModalSpin);

    startColumnsAnimation();
};

const hideModalGetBonus = () => {
    document.querySelector("#modalGetBonus").classList.remove("show");
    document.querySelector("#btnGetBonus").removeEventListener("click", hideModalGetBonus);

    showModalRegistration();
};

const showModalRegistration = () => {
    document.querySelector('#modalRegistration').classList.add("show");
    document.querySelector(".modal__close").addEventListener("click", hideModalRegistration);
};

const hideModalRegistration = () => {
    document.querySelector("#modalRegistration").classList.remove("show");
    document.querySelector(".modal__close").removeEventListener("click", hideModalRegistration);
};