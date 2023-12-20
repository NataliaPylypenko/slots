const refs = {
    btnPlay: document.querySelector(".btn-play"),
    currentStep: 0,
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
console.log(combos[refs.currentStep][3][3]);

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

    if (refs.currentStep === 0) {
        column1.classList.remove("slot-column-moving");
        column1.classList.add("slot-column-end");

        setTimeout(() => {
            column2.classList.remove("slot-column-moving");
            column2.classList.add("slot-column-end");

            setTimeout(() => {
                column3.style.opacity = "0.85";
                column4.style.opacity = "0.85";
                column5.style.opacity = "0.85";
                column6.style.opacity = "0.85";

                setTimeout(() => {
                    column3.classList.remove("slot-column-moving");
                    column3.classList.add("slot-column-end");

                    column3.style.opacity = "1";

                    setTimeout(() => {
                        column4.classList.remove("slot-column-moving");
                        column4.classList.add("slot-column-end");

                        column4.style.opacity = "1";

                        setTimeout(() => {
                            document.querySelector(".slot-column-5").style.animationDuration = "0.1s";

                            setTimeout(() => {
                                column5.classList.remove("slot-column-moving");
                                column5.classList.add("slot-column-end");

                                column5.style.opacity = "1";
                                column5.style.animationDuration = "";

                                setTimeout(() => {
                                    column6.classList.remove("slot-column-moving");
                                    column6.classList.add("slot-column-end");

                                    column6.style.opacity = "1";
                                    refs.audioReels.pause();

                                    setTimeout(showPopup, time2, 1);
                                }, time3);
                            }, time2);
                        }, time1);
                    }, time2);
                }, time2);
            }, time1);
        }, time1);
    }
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
