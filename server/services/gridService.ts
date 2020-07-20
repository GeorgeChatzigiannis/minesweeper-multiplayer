const columnsLength = 5
const rowsLength = 7
const totalMinesLength = 20

const mineNodes = []

export function createGrid() {
    let totalMines = 0
    // Generate grid with coordinates
    for (let i=0; i < rowsLength; i++) {
        mineNodes[i] = []
        for (let j = 0; j < columnsLength; j++) {
            mineNodes[i][j] = {
                x: i,
                y: j,
                isMine: false,
                mineIndicator: null,
                flagged: false,
                opened: false,
                openedBy: null
            }
        }
    }
    // Populate the grid nodes with mines randomly
    let remainingMines = totalMinesLength
    while(remainingMines > 0) {
        const randomRow = Math.floor(Math.random() * rowsLength)
        const randomColumn = Math.floor(Math.random() * columnsLength)
        if (!mineNodes[randomRow][randomColumn].isMine) {
            mineNodes[randomRow][randomColumn].isMine = true
            remainingMines -= 1
        }
    }
    // Calculate the number of mines around a single node that does not contain a mine
    for (let i=0; i < rowsLength; i++) {
        for (let j = 0; j < columnsLength; j++) {
            const currentNode = mineNodes[i][j]
            if (currentNode.isMine) continue
            // Top-left
            const topLeftNode = mineNodes[currentNode.x - 1] && mineNodes[currentNode.x - 1][currentNode.y - 1]
            if (topLeftNode && topLeftNode.isMine) {
                currentNode.mineIndicator += 1
            }
            // Top-center
            const topCenterNode = mineNodes[currentNode.x - 1] && mineNodes[currentNode.x - 1][currentNode.y]
            if (topCenterNode && topCenterNode.isMine) {
                currentNode.mineIndicator += 1
            }
            // Top-right row
            const topRightNode = mineNodes[currentNode.x - 1] && mineNodes[currentNode.x - 1][currentNode.y + 1]
            if (topRightNode && topRightNode.isMine) {
                currentNode.mineIndicator += 1
            }
            // Left row
            const leftNode = mineNodes[currentNode.x] && mineNodes[currentNode.x][currentNode.y - 1]
            if (leftNode && leftNode.isMine) {
                currentNode.mineIndicator += 1
            }
            // Right row
            const rightNode = mineNodes[currentNode.x] && mineNodes[currentNode.x][currentNode.y + 1]
            if (rightNode && rightNode.isMine) {
                currentNode.mineIndicator += 1
            }
            // Bottom-left
            const bottomLeftNode = mineNodes[currentNode.x + 1] && mineNodes[currentNode.x + 1][currentNode.y - 1]
            if (bottomLeftNode && bottomLeftNode.isMine) {
                currentNode.mineIndicator += 1
            }
            // Bottom-center
            const bottomCenterNode = mineNodes[currentNode.x + 1] && mineNodes[currentNode.x + 1][currentNode.y]
            if (bottomCenterNode && bottomCenterNode.isMine) {
                currentNode.mineIndicator += 1
            }
            // Bottom-right
            const bottomRightNode = mineNodes[currentNode.x + 1] && mineNodes[currentNode.x + 1][currentNode.y + 1]
            if (bottomRightNode && bottomRightNode.isMine) {
                currentNode.mineIndicator += 1
            }
        }
    }
    return mineNodes
}
export function updateGrid(mineNode: any) {
    mineNodes[mineNode.x][mineNode.y] = mineNode
    return mineNodes
}
