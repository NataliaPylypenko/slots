const refs = {
    btnPlay: document.querySelector(".btn-play"),
    currentStep: 0,
    idModal: 'modalSpin',
    audioMusic: document.querySelector("#snd-music"),
    audioReels: document.querySelector("#snd-reels"),
    audioWin: document.querySelector("#snd-win"),
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

const random = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
};

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

const stopColumnAnimation = () => {
    const time1 = 200;
    const time2 = 500;
    const time3 = 750;

    const column1 = document.querySelector(".slot-column-1");
    const column2 = document.querySelector(".slot-column-2");
    const column3 = document.querySelector(".slot-column-3");
    const column4 = document.querySelector(".slot-column-4");
    const column5 = document.querySelector(".slot-column-5");
    const column6 = document.querySelector(".slot-column-6");

    column1.classList.remove("slot-column-moving");
    column1.classList.add("slot-column-end");

    setTimeout(() => {
        column2.classList.remove("slot-column-moving");
        column2.classList.add("slot-column-end");

        setTimeout(() => {
            column3.classList.remove("slot-column-moving");
            column3.classList.add("slot-column-end");

            setTimeout(() => {
                column4.classList.remove("slot-column-moving");
                column4.classList.add("slot-column-end");

                setTimeout(() => {
                    column5.classList.remove("slot-column-moving");
                    column5.classList.add("slot-column-end");

                    setTimeout(() => {
                        column6.classList.remove("slot-column-moving");
                        column6.classList.add("slot-column-end");

                        refs.audioReels.pause();

                        setTimeout(showModal, time3, refs.idModal);
                    }, time3);
                }, time2);
            }, time2);
        }, time1);
    }, time1);
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

    setTimeout(() => {
        changeCombos();
        stopColumnAnimation();
    }, 1000);
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
        // refs.audioPopup_1.play();
    } else if (idModal === 'modalGetBonus') {
        document.querySelector("#btnGetBonus").addEventListener("click", hideModalGetBonus);
        // refs.audioPopup_2.play();

        setTimeout(() => {
            refs.audioMusic.currentTime = 0;
            refs.audioMusic.play();
        }, 500)
    }
};

const hideModalSpin = () => {
    document.querySelector("#modalSpin").classList.remove("show");
    document.querySelector("#btnSpin").removeEventListener("click", hideModalSpin);

    // document.querySelector("#modalSpin").addEventListener("animationend", delModal);
    startColumnsAnimation();
};

const hideModalGetBonus = () => {
    document.querySelector("#modalGetBonus").classList.remove("show");
    document.querySelector("#btnGetBonus").removeEventListener("click", hideModalGetBonus);

    // document.querySelector("#modalShow").addEventListener("animationend", delModal);
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