
export function tick(grid) {

    const neighbours = [[1, 1], [-1, -1], [1, -1], [-1, 1], [1, 0], [0, 1], [-1, 0], [0, -1]]
    let index, active_neighbours

    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {

            active_neighbours = 0

            for (let k = 0; k < neighbours.length; k++) {
                index = [i + neighbours[k][0], j + neighbours[k][1]]
                if (0 <= index[0] && index[0] < grid.height && 0 <= index[1] && index[1] < grid.width && grid.rows[index[0]].cells[index[1]].active) {
                    active_neighbours++
                }
            }

            if (grid.rows[i].cells[j].active && (active_neighbours == 2 || active_neighbours == 3)) {
                grid.rows[i].cells[j].nextActive = true
            }
            else if (!grid.rows[i].cells[j].active && active_neighbours == 3) {
                grid.rows[i].cells[j].nextActive = true
                grid.rows[i].cells[j].cell.style.backgroundColor = `rgb(${Math.floor(grid.gradient[grid.gradientIndex][0])}, ${Math.floor(grid.gradient[grid.gradientIndex][1])}, ${Math.floor(grid.gradient[grid.gradientIndex][2])})`
            }
            else {
                grid.rows[i].cells[j].nextActive = false
                grid.rows[i].cells[j].cell.style.backgroundColor = grid.bgColor
            }
        }
    }
    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            if (grid.rows[i].cells[j].nextActive != grid.rows[i].cells[j].active) {
                grid.rows[i].cells[j].toggle()
            }
        }
    }

    grid.gradientIndex = grid.gradientIndex < grid.gradient.length - 1 ? grid.gradientIndex + 1 : 0

}
