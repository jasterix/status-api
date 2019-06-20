const imgDiv = document.querySelector('.img-list')
const submitButton = document.querySelector("input.submit")
const saveButton = document.querySelector("#new-board-btn")
const saveBoard = document.querySelector(".saveBoard-container")
const savedBoards = document.querySelector(".savedBoards")
let whole_board = []
let addBoard = false;
let urls

function createSavedBoardsLi(board){
  // debugger
  return `
    <a href="#"><li class="saved">${board.attributes.name}</li></a>
  `
}
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(5));
}

const statusCodes = ["200 OK", "300 Multiple Choices", "301 Moved Permanently", "302 Found", "304 Not Modified",
"307 Temporary Redirect", "400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found",
"410 Gone", "500 Internal Server Error", "501 Not Implemented", "503 Service Unavailable",
"550 Permission denied"]

const createTile = (code, description) => {
  return(`
  <a class="blue card" id="status-${code}">
    <div class ="image ui list">
    <h1 class = "statusCode" data-code =${code} id=${code}>${code} - ${description}</h1>
    </div>
    </a>`)
}

//////////////////////////////////////CREATE TILE TEMPLATES
statusCodes.forEach(statusCode => {
  let code = statusCode.split(" ")[0]
  let description = statusCode.split(" ").slice(1).join(" ")
    imgDiv.innerHTML += createTile(code, description)
})


////////////////////////////////FETCH GIFS FROM GIPHY FOR EACH STATUS CODE
statusCodes.forEach(statusCode => {
  let code = statusCode.split(" ")[0]
  let description = statusCode.split(" ").slice(1).join(" ")
  let target = document.querySelector(`#status-${code}`)
  let num = getRandomInt()

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=${description}&limit=1&offset=${num}&rating=G&lang=en`)
    .then(response => response.json())
    .then(data => {
      // debugger
      target.innerHTML += `<img class="img ui medium image" src="${data.data[0].images.original.url}">`
  })
})


fetch("http://localhost:3000/boards")
  .then(resp => resp.json())
  .then(boards => {
    let new_arr = boards.data.slice(-5)
    new_arr.forEach(board => {
      // debugger
      savedBoards.innerHTML += createSavedBoardsLi(board)
    })
  })

////Save your board event listener
saveBoard.addEventListener('submit', (event) => {
  event.preventDefault()
  let boardName = document.querySelector("#boardname").value


  ///////////SAVE THE URLS TO A LIST//////////////////////////////
  let boardUrls = []
  let urlTags = document.querySelectorAll(".img")
  urlTags.forEach(url => {
    boardUrls.push(url.src)

  })


  console.log(boardUrls)




/////////////////////////SAVE STATUS CODES TO A LIST//////////////////
let boardStatusCodes = []
let statusCodeTags = document.querySelectorAll(".statusCode")
statusCodeTags.forEach(code => {
  boardStatusCodes.push(code.textContent)
})
console.log(boardStatusCodes)


// console.log(board_content)




  //////////////////////////////SAVE THE CURRENT BOARD//////////////////////
  fetch("http://localhost:3000/boards", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "body": JSON.stringify({
      name: boardName,
      urls: boardUrls,
      codes: boardStatusCodes
    })
  })
})


//////////////////////////////DISPLAY SAVE BOARD FORM///////////////////////
saveButton.addEventListener('click', () => {
  addBoard = !addBoard
  if (addBoard) {
    saveBoard.style.display = 'block'
    // submit listener here
  } else {
    saveBoard.style.display = 'none'
  }
})

savedBoards.addEventListener("click", (event) => {
  let saved = document.querySelector("#saved")
  let images = document.querySelectorAll("#image")
  let clicked

  if (event.target.classList.contains("saved")){
    fetch("http://localhost:3000/boards")
      .then(resp => resp.json())
      .then(boards => {
        clicked = boards.data.find(board => board.attributes.name === event.target.innerHTML).attributes.urls

      
      })
    }
    debugger
})



////////
  // let board_content = {
  //   name: boardName,
  //   urls: boardUrls
  // }
  // whole_board.push(board_content)
