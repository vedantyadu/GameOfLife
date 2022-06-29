
export function createGradient(colors, defination) {

    const curIncrement = {}
    const curColor = {}
    const gradient = []

    for (let i = 0; i < colors.length - 1; i++) {

        curColor.r = colors[i][0]
        curColor.g = colors[i][1]
        curColor.b = colors[i][2]

        curIncrement.r = (colors[i + 1][0] - colors[i][0]) / defination
        curIncrement.g = (colors[i + 1][1] - colors[i][1]) / defination
        curIncrement.b = (colors[i + 1][2] - colors[i][2]) / defination

        gradient.push([curColor.r, curColor.g, curColor.b])

        for (let j = 0; j < defination; j++) {
            curColor.r = curColor.r + curIncrement.r
            curColor.g = curColor.g + curIncrement.g
            curColor.b = curColor.b + curIncrement.b
            gradient.push([curColor.r, curColor.g, curColor.b])
        }

    }
    
    return gradient
}
