'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gStartFoodCount 

function init() {
    gStartFoodCount = -2
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if(board[i][j] === FOOD){
                gStartFoodCount++
            }
        }
    }
    console.log(board)
    console.log(gStartFoodCount)
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff

    const elScore= document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    openLoseModal()
    console.log('Game Over')
    // TODO
    gGame.isOn = false
}
function victory(){
    openWinModal()
    console.log('Victory!!')
    // TODO
    gGame.isOn = false
}

function openLoseModal(){
    const modal = document.querySelector('.modal')
    const modalH2 = document.querySelector('.modal h2')
    
    modalH2.innerText = 'Game Over'
    modal.style.display = 'inline-block'
}

function openWinModal(){
    const modal = document.querySelector('.modal')
    const modalH2 = document.querySelector('.modal h2')
    
    modalH2.innerText = 'Victory!!!'
    modal.style.display = 'inline-block'
}

function closeModal(){
    document.querySelector('.modal').style.display = 'none'
}
function restartBtn(elBtn){
    closeModal()
    resetGame()
    gGame.isOn = true
    console.log('hi')
}

function resetGame() {
    gStartFoodCount = -2
    gGame.score = 0
    gGame.isOn = false

    updateScore(0)
    gBoard = buildBoard()
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    console.log('Game has been reset')
}