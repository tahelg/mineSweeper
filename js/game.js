'use strict'

const EMOJI = '😎'
const LOSE = '🥴'
const WIN = '🤩'
const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isHint: false,
    safeCount: 0,
    isSevenBoom: false,
    manuallyPos: false,
    countManually: 0
}
var gLevel = {
    LEVEL: 0,
    SIZE: 4,
    MINES: 2,
    EMPTY: 14
}

var gManuallyInterval
var gTimerInterval

var gHints = []
var gMinePoses = []

var gBoard = []
var gIsFirstClick

var gElPlayAgain = document.querySelector('.play-again')
var gElBtnManually = document.querySelector('.manually')

function init() {

    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isHint: false,
        safeCount: 0,
        isSevenBoom: false,
        manuallyPos: false,
        countManually: 0
    }

    gIsFirstClick = true
    
    gElBtnManually.innerText = 'manually position💣'
    gElPlayAgain.innerText = EMOJI

    
    gBoard = createBoard()
    renderBoard(gBoard)


    restHints()
}

function createBoard() {
    console.log('create board was called')
    var count = gLevel.SIZE
    var board = []

    for (var i = 0; i < count; i++) {
        board.push([])

        for (var j = 0; j < count; j++) {
            board[i].push(createCell())
        }
    }
    return board
}

function renderBoard(board) {
    console.log("renderBoard was called")


    var boardHTML = '<table>\n'

    for (var i = 0; i < board.length; i++) {
        boardHTML += ' <tr>'

        for (var j = 0; j < board[i].length; j++) {
            var cellId = getIdByLoc({ i, j })
            boardHTML += `\n\t <td class= "cell"
             onclick="cellClicked(event,this, ${i}, ${j})" 
             oncontextmenu ="cellMarked(event,this, ${i}, ${j})"
             id="${cellId}" ></td>`
        }
        boardHTML += '\n </tr>'

    }
    boardHTML += "\n</table>"

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = boardHTML
}

function cellClicked(event, elCell, i, j) {

    if (!gGame.isOn) return

    if (gIsFirstClick) {
        createMines(i, j)
        setTimer()
    }

    var cell = gBoard[i][j]
    if (gGame.isHint) {
        showCell(cell, i, j)
        expandShown(i, j)
        gGame.isHint = false
        setTimeout(() => {
            gGame.isHint = false
            hideCells(i, j)
        }, 1000);
        return
    }

    if (cell.isMine) {
        showMines()
        gGame.isOn = false
        gElPlayAgain.innerText = LOSE

        clearTimer()
        return
    }

    if (cell.isShown) {
        return
    }

    showCell(cell, i, j)
    checkGameOver()
    if (!minesNegsCount(i, j)) expandShown(i, j)
}

function checkGameOver() {

    if (gGame.shownCount === gLevel.EMPTY && allMinesMarked()) {
        showMines()
        gGame.isOn = false
        clearTimer()
        gElPlayAgain.innerText = WIN
    }
}

function expandShown(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (j < 0 || j >= gBoard[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            var cell = gBoard[i][j]

            if (cell.isShown) continue

            showCell(cell, i, j)
            if (!minesNegsCount(i, j) && !gGame.isHint) expandShown(i, j)
        }
    }
}

function playAgain() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '0:0'
    clearTimer()
    init()
}

function showCell(cell, i, j) {

    if (!gGame.isHint) {
        cell.isShown = true
        gGame.shownCount++
    }

    var id = getIdByLoc({ i, j })
    var elCell = document.getElementById(id)
    elCell.classList.add('shown')
    if (gGame.isHint && cell.isMine) {
        elCell.innerText = MINE
        return
    }
    switch (cell.minesAroundCount) {
        case 1:
            elCell.classList.add('one')
            break
        case 2:
            elCell.classList.add('two')
            break
        case 3:
            elCell.classList.add('three')
            break
        case 4:
            elCell.classList.add('four')
            break
        case 5:
            elCell.classList.add('five')
            break
        case 6:
            elCell.classList.add('six')
            break
        case 7:
            elCell.classList.add('seven')
            break
        case 8:
            elCell.classList.add('eigth')
            break
    }
    elCell.innerText = (!cell.minesAroundCount) ? ' ' : cell.minesAroundCount
    checkGameOver()
}


function setTimer() {
    var seconds = 0
    var minutes = 0
    var elTimer = document.querySelector('.timer')

    gTimerInterval = setInterval(() => {
        gGame.secsPassed++
        console.log(gGame.secsPassed);
        seconds++
        if (seconds === 60) {
            seconds = 0
            minutes++
        }
        elTimer.innerText = minutes + ":" + seconds
    }, 1000);

}

var gCountScore = 0
function clearTimer() {
    localStorage.setItem( gCountScore++ ,gGame.secsPassed);
    clearInterval(gTimerInterval)
    setBestScore()
}

function setBestScore() {
    var elBestScore = document.querySelector('.score')
    elBestScore.innerText = checkBestScore()
}

function checkBestScore() {
    var max = 0
    console.log(localStorage);
    for (var item in localStorage) {
        var value = localStorage.getItem(localStorage.key(item))
        if (value > max) max = value
    }
    console.log(max);
    return max
}



init()






































