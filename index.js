import { createGradient } from "./src/gradient.js"
import { Grid } from "./src/grid.js"

const gradient = createGradient([[255, 0, 255], [255, 255, 0], [255, 0, 255]], 25)
const grid = new Grid(document.querySelector(".game"), "grid", "row", "cell", 25, gradient, [22, 24, 26])

const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const clear = document.querySelector(".clear")
const slider = document.querySelector(".slider")

function startGame() {
    play.classList.add("hidden")
    pause.classList.remove("hidden") 
    grid.start()
}

function pauseGame() {
    play.classList.remove("hidden")
    pause.classList.add("hidden")
    grid.stop()
}

function clearGrid() {
    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            if (grid.rows[i].cells[j].active) {
                grid.rows[i].cells[j].toggle()
            }
        }
    }
}

play.addEventListener("click", () => {
    startGame()
})

pause.addEventListener("click", () => {
    pauseGame()
})

clear.addEventListener("click", () => {
    clearGrid()
})

document.addEventListener('keydown', (e) => {
    if (e.key == " ") {
        if (grid.running) {
            pauseGame()
        }
        else {
            startGame()
        }
    }
    else if (e.key == "x") {
        clearGrid()
    }
})

slider.addEventListener("change", () => {
    grid.interval = 500 - (10 * slider.value)
    if (grid.running) {
        grid.stop()
        grid.start()
    }
})
