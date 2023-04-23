const SQUARE_WIDTH = 25
const SQUARE_HEIGHT = 25
const SQUARES_COUNT_X = 8
const SQUARES_COUNT_Y = 5
const SHAPE_SQUARE_DEFAULT_COLOR = '#fff'

let game = document.querySelector('#game')
let isActive = false

// elCount qo'shish

const IMAGE_TEMPLATE = [
   [
      {
         "color": "",
         "id": "00",
         "shapeId": 1681673783485,
         "order": 0
      },
      {
         "color": "",
         "id": "01",
         "shapeId": 1681673783485,
         "order": 1
      },
      {
         "color": "#000000",
         "id": "02"
      },
      {
         "color": "#000000",
         "id": "03"
      },
      {
         "color": "#000000",
         "id": "04"
      },
      {
         "color": "#000000",
         "id": "05"
      },
      {
         "color": "#000000",
         "id": "06"
      },
      {
         "color": "#000000",
         "id": "07"
      }
   ],
   [
      {
         "color": "#000000",
         "id": "10"
      },
      {
         "color": "",
         "id": "11",
         "shapeId": 1681673783485,
         "order": 2
      },
      {
         "color": "#000000",
         "id": "12"
      },
      {
         "color": "#000000",
         "id": "13"
      },
      {
         "color": "#000000",
         "id": "14"
      },
      {
         "color": "#000000",
         "id": "15"
      },
      {
         "color": "",
         "id": "16",
         "shapeId": 1681673792893,
         "order": 0
      },
      {
         "color": "#000000",
         "id": "17"
      }
   ],
   [
      {
         "color": "#000000",
         "id": "20"
      },
      {
         "color": "#000000",
         "id": "21"
      },
      {
         "color": "#000000",
         "id": "22"
      },
      {
         "color": "#000000",
         "id": "23"
      },
      {
         "color": "#000000",
         "id": "24"
      },
      {
         "color": "",
         "id": "25",
         "shapeId": 1681673792893,
         "order": 1
      },
      {
         "color": "",
         "id": "26",
         "shapeId": 1681673792893,
         "order": 2
      },
      {
         "color": "#000000",
         "id": "27"
      }
   ],
   [
      {
         "color": "#000000",
         "id": "30"
      },
      {
         "color": "#000000",
         "id": "31"
      },
      {
         "color": "#000000",
         "id": "32"
      },
      {
         "color": "#000000",
         "id": "33"
      },
      {
         "color": "#000000",
         "id": "34"
      },
      {
         "color": "#000000",
         "id": "35"
      },
      {
         "color": "",
         "id": "36",
         "shapeId": 1681673792893,
         "order": 3
      },
      {
         "color": "#000000",
         "id": "37"
      }
   ],
   [
      {
         "color": "#000000",
         "id": "40"
      },
      {
         "color": "#000000",
         "id": "41"
      },
      {
         "color": "#000000",
         "id": "42"
      },
      {
         "color": "#000000",
         "id": "43"
      },
      {
         "color": "#000000",
         "id": "44"
      },
      {
         "color": "#000000",
         "id": "45"
      },
      {
         "color": "#000000",
         "id": "46"
      },
      {
         "color": "#000000",
         "id": "47"
      }
   ]
]
IMAGE_TEMPLATE.forEach(row => {
   row.forEach(column => {
      game.innerHTML += `
      <div
         ${column.shapeId ? `data-shape-id="${column.shapeId}"` : ``}
         ${column.shapeId ? `data-shape-order="${column.order}"` : ``}
         style="background-color: ${column.color || SHAPE_SQUARE_DEFAULT_COLOR}; width: ${SQUARE_WIDTH}px;height: ${SQUARE_HEIGHT}px;"
         class="game-block${column.shapeId ? ` part_of_shape` : ``}">
       </div>`
   })

   game.innerHTML += '<div class="game-nextline"></div>'
})

function toggleActive(shapeId, isAdd = true) {
   document.querySelectorAll(`[data-shape-id="${shapeId}"]`).forEach(item => {
      if (isAdd) {
         item.classList.add('_active')
      } else {
         item.classList.remove('_active')
      }
   })
}

function selectSquares() {
   const tagetId = activeResBlock.dataset.targetId
   if (activeShapeId === tagetId) {
      let isBreak = false
      let oldRowHasShape = false
      let count = 0
      let gameSquares = document.querySelectorAll(`[data-shape-id="${activeShapeId}"]`)
      let resSquares = document.querySelectorAll(`[data-target-id="${activeShapeId}"] .game-block`)
      for (let i = 0; i < IMAGE_TEMPLATE.length; i++) {
         if (isBreak) {
            break
         }
         const row = IMAGE_TEMPLATE[i]
         let currentRowHasShape = false
         for (let j = 0; j < row.length; j++) {
            const circle = row[j]
            if (circle.shapeId == activeShapeId) {
               currentRowHasShape = true
               const el = gameSquares[count]
               el.style.backgroundColor = resSquares[count].style.backgroundColor
               el.classList.remove('_active', 'part_of_shape')

               count++
            }
         }
         if (!currentRowHasShape && oldRowHasShape) {
            isBreak = true
         }
         oldRowHasShape = currentRowHasShape
      }
   } else {
      console.warn('wrong drop');
   }
}

// drag-and-drop

let resBlocks = document.querySelectorAll('.res-block')
let activeResBlock = null
let activeResBlockElement = null
let activeShapeId = null
let cloningResBlock = null

function handleDragStart(e) {
   activeResBlockElement = document.elementFromPoint(e.pageX, e.pageY)
   activeResBlock = e.target
   e.target.classList.add('_dragstart')

   cloningResBlock = this.cloneNode(true)
   // off-screen
   cloningResBlock.style.position = 'absolute'
   cloningResBlock.style.top = '0px'
   cloningResBlock.style.left = '-1000px'
   console.log(e);
   document.body.appendChild(cloningResBlock)
   e.dataTransfer.setDragImage(
      cloningResBlock,
      e.layerX,
      e.layerY
   )
}
function handleDragEnd(e) {
   e.target.classList.remove('_dragstart')
   activeResBlock = null
   activeResBlockElement = null
   cloningResBlock.style.display = 'none';
   cloningResBlock.remove()
}

resBlocks.forEach(item => {
   let rotateDeg = 90
   item.addEventListener('click', (e) => {
      item.querySelector('.res-block__inner').style.transform = `rotate(${rotateDeg}deg)`
      rotateDeg = (rotateDeg + 90) % 360
   })
   item.addEventListener('dragstart', handleDragStart)
   item.addEventListener('dragend', handleDragEnd)
})

function handleDragEnter(e) {
   const currentSquare = e.target
   if (currentSquare.classList.contains('game-block')) {
      const targetId = activeResBlock.dataset.targetId
      const shapeId = currentSquare.dataset.shapeId
      let transform = activeResBlock.querySelector('.res-block__inner').style.transform.slice(7)

      let deg = Number.parseInt(transform) || 0
      if (shapeId === targetId && activeResBlockElement.dataset.order === currentSquare.dataset.shapeOrder && deg === 0) {
         activeShapeId = shapeId
         toggleActive(targetId)
      }
      else {
         activeShapeId = null
         toggleActive(targetId, false)
      }
   }
}
function handleDragOver(e) {
   e.preventDefault()
}
function handleDrop(e) {
   e.preventDefault()
   selectSquares()
}

game.addEventListener('dragover', handleDragOver)
game.addEventListener('dragenter', handleDragEnter)
game.addEventListener('drop', handleDrop)
