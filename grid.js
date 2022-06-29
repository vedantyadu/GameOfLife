import { tick } from "./gameoflife.js"

export class Grid {
    constructor(parent, className, rowClass, cellClass, cellSize, gradient, bgColor) {
        this.parent = parent
        this.gridClass = className
        this.rowClass = rowClass
        this.cellClass = cellClass
        this.cellSize = cellSize
        this.gradient = gradient
        this.gradientIndex = 0
        this.table = document.createElement("div")
        this.table.className = this.gridClass
        this.parent.appendChild(this.table)
        this.rows = []
        this.height = Math.floor(this.parent.clientHeight / this.cellSize) + 1
        this.width = Math.floor(this.parent.clientWidth / this.cellSize) + 1
        this.running = false
        this.loop = null
        this.interval = 100
        this.bgColor = bgColor
        for (let i = 0; i < this.height; i++) {
            this.rows.push(new Row(this.table, this.rowClass, this.cellClass, this.width, this))
        }
    }
    start() {
        if (!this.running) {
            this.loop = setInterval(tick, this.interval, this)
            this.running = true
        }
    }
    stop() {
        if (this.running) {
            clearInterval(this.loop)
            this.running = false
        }
    }
}

class Row {
    constructor(table, className, cellClass, width, grid) {
        this.table = table
        this.row = document.createElement("div")
        this.row.className = className
        this.table.appendChild(this.row)
        this.cells = []
        for (let i = 0; i < width; i++) {
            this.cells.push(new Cell(this.row, cellClass, grid))
        }
    }
}

class Cell {
    constructor(row, className, grid) {
        this.grid = grid
        this.row = row
        this.cell = document.createElement("div")
        this.cell.addEventListener("mouseout", (e) => {
            if (e.buttons == 1) {
                this.toggle()
            }
        })
        this.cell.addEventListener("click", () => {
            this.toggle()
        })
        this.cell.className = className
        this.row.appendChild(this.cell)
        this.active = false
        this.nextActive = false
    }
    toggle() {
        if (this.active) {
            this.cell.classList.remove("active")
            this.cell.style.backgroundColor = `rgb(${this.grid.bgColor[0]}, ${this.grid.bgColor[1]}, ${this.grid.bgColor[2]})`
        }
        else {
            this.cell.classList.add("active")
            this.cell.style.backgroundColor = `rgb(${Math.floor(this.grid.gradient[this.grid.gradientIndex][0])}, ${Math.floor(this.grid.gradient[this.grid.gradientIndex][1])}, ${Math.floor(this.grid.gradient[this.grid.gradientIndex][2])})`
        }
        this.active = !this.active
    }
}
