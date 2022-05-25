'use strict'


document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
var width = 10
var mineAmount = 20
var flags = 0
var squares = []
var minesArray = []
var isGameOver = false

function createBoard() {
const mineArray = Array(mineAmount).fill('mine')
const emptyArray = Array(width*width - mineAmount).fill('valid')
const gameArray = emptyArray.concat(minesArray)
const shuffledArray = gameArray.sort(() => Math.random() -0.5)


        for(var i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            square.addEventListener('click', function(e){
                click(square)
            })



        }

for (var i = 0; i < squares.length; i++){
    var total = 0
    const isLeftEdge = (i % width === 0)
    const isRightEdge = (i % width === width -1)

    if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('mine')) total ++
        if (i > 9 && !isRightEdge && squares[i + 1 -width].classList.contains('mine')) total ++
        if (i > 10 && squares[i -width].classList.contains('mine')) total ++
        if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('mine')) total ++
        if (i < 98 && !isRightEdge && squares[i +1].classList.contains('mine')) total ++
        if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('mine')) total ++
        if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('mine')) total ++
        if (i < 89 && squares[i +width].classList.contains('mine')) total ++
        squares[i].setAttribute('data', total)
    }

}

    }
    createBoard()

    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags > mineAmount)) {
        if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = '🚩'
            flags ++
        } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags --
    }
    }
    }

function click(square) {
    var currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('mine')){
        gameOver(square)
        console.log('game over')
    } else {
        var total = square.getAttribute('data')
        if (total !=0) {
            square.classList.add('checked')
            square.innerHTML = total
            return
        }
        checkSquare(square, currentId)
    }
    square.classList.add('checked')
}

function checkSquare(square, currentId){
    var isLeftEdge = (currentId % width === 0)
    var isRightEdge = (currentId % width === width -1)

    setTimeout(() => {
if (currentId > 0 && !isLeftEdge) {
    var newId = squares[parseInt(currentId) -1].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId > 9 && !isRightEdge){
    var newId = squares[parseInt(currentId) +1 -width].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId > 10) {
    var newId = squares[parseInt(currentId -width)].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId > 11 && !isLeftEdge) {
    var newId = squares[parseInt(currentId) -1 -width].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId < 98 && !isRightEdge){
    var newIdc = squares[parseInt(currentId) +1].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}
if(currentId < 90 && !isLeftEdge){
    var newId = squares[parseInt(currentId) -1 +width].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}
if(currentId < 88 && !isRightEdge){
    var newId = squares[parseInt(currentId) +1 +width].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId < 89){
    var newId = squares[parseInt(currentId) +width].id
    var newSquare = document.getElementById(newId)
    click(newSquare)
}

}, 10)
}

function gameOver(square) {
    console.log('game over')
    isGameOver = true

    squares.forEach(square => {
        if (square.classList.contains('mine')) {
            square.innerHTML = '💣'
        }
    })
}





})