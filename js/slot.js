const cache = {};

class Symbol {
    constructor(name = Symbol.random()) {
        this.name = name;

        if (cache[name]) {
            this.img = cache[name].cloneNode();
        } else {
            this.img = new Image();
            this.img.src = `./images/symbols/${name}.png`;

            cache[name] = this.img;
        }
    }

    static preload() {
        Symbol.symbols.forEach((symbol) => new Symbol(symbol));
    }

    static get symbols() {
        return [
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
    }

    static random() {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }
}

class Reel {
    constructor(reelContainer, idx, initialSymbols) {
        this.reelContainer = reelContainer;
        this.idx = idx;

        this.symbolContainer = document.createElement("div");
        this.symbolContainer.classList.add("icons");
        this.reelContainer.appendChild(this.symbolContainer);

        this.animation = this.symbolContainer.animate(
            [
                { top: 0, filter: "blur(0)" },
                { filter: "blur(2px)", offset: 0.5 },
                {
                    top: `calc((${Math.floor(this.factor) * 10} / 3) * -100% - (${
                        Math.floor(this.factor) * 10
                    } * 3px))`,

                    filter: "blur(0)",
                },
            ],
            {
                duration: this.factor * 1000,
                easing: "ease-in-out",
            }
        );
        this.animation.cancel();

        initialSymbols.forEach((symbol) =>
            this.symbolContainer.appendChild(new Symbol(symbol).img)
        );
    }

    get factor() {
        return 1 + this.idx / 2;
    }

    renderSymbols(nextSymbols) {
        const fragment = document.createDocumentFragment();

        for (let i = 3; i < 3 + Math.floor(this.factor) * 10; i++) {
            const icon = new Symbol(
                i >= 10 * Math.floor(this.factor) - 2
                    ? nextSymbols[i - Math.floor(this.factor) * 10]
                    : undefined
            );
            fragment.appendChild(icon.img);
        }
        console.log(this.factor)
        this.symbolContainer.appendChild(fragment);
    }

    spin() {
        const animationPromise = new Promise(
            (resolve) => (this.animation.onfinish = resolve)
        );
        const timeoutPromise = new Promise((resolve) =>
            setTimeout(resolve, this.factor * 1000)
        );

        this.animation.cancel();
        this.animation.play();

        return Promise.race([animationPromise, timeoutPromise]).then(() => {
            if (this.animation.playState !== "finished") this.animation.finish();

            const max = this.symbolContainer.children.length - 5;

            for (let i = 0; i < max; i++) {
                this.symbolContainer.firstChild.remove();
            }
        });
    }
}

class Slot {
    constructor(domElement, config = {}) {
        Symbol.preload();

        this.currentSymbols = [
            ["yellow", "yellow", "yellow", "yellow", "yellow"],
            ["yellow", "yellow", "yellow", "yellow", "yellow"],
            ["yellow", "yellow", "yellow", "yellow", "yellow"],
            ["yellow", "yellow", "yellow", "yellow", "yellow"],
            ["yellow", "yellow", "yellow", "yellow", "yellow"],
            ["yellow", "yellow", "yellow", "yellow", "yellow"],
        ];

        this.nextSymbols = [];

        this.container = domElement;

        this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
            (reelContainer, idx) =>
                new Reel(reelContainer, idx, this.currentSymbols[idx])
        );

        this.spinButton = document.getElementById("playNow");
        this.spinButton.addEventListener("click", () => this.spin());

        if (config.inverted) {
            this.container.classList.add("inverted");
        }

        this.config = config;
    }

    spin() {
        this.currentSymbols = this.nextSymbols;
        this.nextSymbols = [
            [Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random()],
            [Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random()],
            [Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random()],
            [Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random()],
            [Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random()],
            [Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random()],
        ];

        this.onSpinStart(this.nextSymbols);

        return Promise.all(
            this.reels.map((reel) => {
                reel.renderSymbols(this.nextSymbols[reel.idx]);
                return reel.spin();
            })
        ).then(() => this.onSpinEnd(this.nextSymbols));
    }

    onSpinStart(symbols) {
        this.spinButton.disabled = true;

        this.config.onSpinStart?.(symbols);
    }

    onSpinEnd(symbols) {
        this.spinButton.disabled = false;

        this.config.onSpinEnd?.(symbols);
    }
}

const config = {
    inverted: false,
    onSpinStart: (symbols) => {
        console.log("onSpinStart", symbols);
    },
    onSpinEnd: (symbols) => {
        console.log("onSpinEnd", symbols);
    },
};

const slot = new Slot(document.getElementById("slot"), config);