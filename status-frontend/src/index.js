const imgDiv = document.querySelector('.img-list')
const submitButton = document.querySelector("input.submit")
const saveButton = document.querySelector("#new-board-btn")
const saveBoard = document.querySelector(".saveBoard-container")
const saveBoardForm = document.querySelector(".save-board-form")
const savedBoards = document.querySelector(".savedBoards")
const tileContainer = document.querySelector(".cardContainer")
let whole_board = []
let addBoard = false;
let urls

function displaySaved(){
  fetch("http://localhost:3000/boards")
    .then(resp => resp.json())
    .then(boards => {
      let new_arr = boards.data.slice(-5)
      new_arr.forEach(board => {
        // debugger
        savedBoards.innerHTML = createSavedBoardsLi(board) + savedBoards.innerHTML
      })
    })
}
function createSavedBoardsLi(board){
  // debugger
  return `
    <h3><a href="#"><li class="saved">${board.attributes.name}</li></a></h3>
  `
}
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(10));
}

const statusCodes = ["100 Continue", "101 Switching Protocols", "102 Processing", "103 Early Hints", "200 OK", "201 Created", "202 Accepted", "203 Non - Authoritative Information", "204 No Content", "205 Reset Content", "206 Partial Content", "207 Multi - Status", "208 Already Reported", "226 IM Used", "300 Multiple Choices", "301 Moved Permanently", "302 Found", "303 See Other", "304 Not Modified", "305 Use Proxy", "307 Temporary Redirect", "308 Permanent Redirect", "400 Bad Request", "401 Unauthorized", "402 Payment Required", "403 Forbidden", "404 Not Found", "405 Method Not Allowed", "406 Not Acceptable", "407 Proxy Authentication Required", "408 Request Timeout", "409 Conflict", "410 Gone", "411 Length Required", "412 Precondition Failed", "413 Payload Too Large", "414 URI Too Long", "415 Unsupported Media Type", "416 Range Not Satisfiable", "417 Expectation Failed", "421 Misdirected Request", "422 Unprocessable Entity", "423 Locked", "424 Failed Dependency", "425 Too Early", "426 Upgrade Required", "428 Precondition Required", "429 Too Many Requests", "431 Request Header Fields Too Large", "451 Unavailable For Legal Reasons", "500 Internal Server Error", "501 Not Implemented", "502 Bad Gateway", "503 Service Unavailable", "504 Gateway Timeout", "505 HTTP Version Not Supported", "506 Variant Also Negotiates", "507 Insufficient Storage", "508 Loop Detected", "510 Not Extended", "511 Network Authentication Required"]

let search = ["100 continue", "101 switching", "102 processing", "103 hints", "200 ok", "201 create", "202 accepted", "203 bad information", "204 nothing", "205 reset", "206 partial", "207 status", "208 reported", "226 used", "300 choices", "301 moved", "302 found", "303 see other", "304 no change", "305 proxy", "307 redirect", "308 redirect", "400 bad request", "401 unauthorized", "402 payment required", "403 forbidden", "404 not found", "405 not allowed", "406 not acceptable", "407 authentication required", "408 request timeout", "409 conflict", "410 one", "411 length required", "412 failed", "413 too large", "414 too long", "415 fall", "416 finish line", "417 expectation failed", "421 misdirected", "422 unprocessable entity", "423 locked", "424 failed dependency", "425 too early", "426 upgrade", "428 terms", "429 too many requests", "431 request too large", "451 legal", "500 internal server error", "501 not implemeneted", "502 bad gateway", "503 service unavailable", "504 gateway timeout", "505 version not supported", "506 negotiate", "507 insufficient storage", "508 loop", "510 short", "511 authentication"]

const createTile = (code, description) => {
  return(`
  <a class="purple card" id="status-${code}">
    <div class ="image ui list">
    <h3 class = "statusCode" data-code =${code} id=${code}>${code} - ${description}</h3>
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
search.forEach(statusCode => {
  let code = statusCode.split(" ")[0]
  let description = statusCode.split(" ").slice(1).join(" ")
  let target = document.querySelector(`#status-${code}`)
  let num = getRandomInt()

  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'

  fetch(proxyUrl + `https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=${description}&limit=1&offset=${num}&rating=G&lang=en`)
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
      savedBoards.innerHTML = createSavedBoardsLi(board) + savedBoards.innerHTML
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


  //////////////////////////////SAVE THE CURRENT BOARD//////////////////////
  fetch("http://localhost:3000/boards", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "body": JSON.stringify({
      name: boardName,
      urls: boardUrls
    })
  }).then(resp => resp.json())
  .then(board => {
    savedBoards.lastElementChild.remove()
    savedBoards.innerHTML = `<h3><a href="#"><li class="saved">${board.name}</li></a></h3>` + savedBoards.innerHTML
  })

  saveBoardForm.reset()
})



/////////////////////////////////////////HIDE FORM////////////////////////
saveBoardForm.addEventListener("submit", () => {
  addBoard = !addBoard
  if (addBoard) {
    saveBoard.style.display = 'block'
    // submit listener here
  } else {
    saveBoard.style.display = 'none'
  }
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
  let images = document.querySelectorAll(".medium")
  let clicked

  if (event.target.classList.contains("saved")){
    fetch("http://localhost:3000/boards")
      .then(resp => resp.json())
      .then(boards => {
        clicked = boards.data.find(board => board.attributes.name === event.target.innerHTML).attributes.urls
        clicked = clicked.slice(2, -2).split(`\", \"`)

        for (let i = 0; i < clicked.length; i++) {
          images[i].src = clicked[i]
          // debugger
        }
      })
    }
})

tileContainer.addEventListener("click", (event) => {
  tile = document.querySelector(".medium")
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  if (event.target.classList.contains("medium")){
    let code = event.target.parentElement.innerText.split(" - ")[0]
    let description = event.target.parentElement.innerText.split(" - ")[1]
    let target = document.querySelector(`#status-${code}`)
    let num = getRandomInt()
    // debugger

    fetch(proxyUrl + `https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=${description}&limit=1&offset=${num}&rating=G&lang=en`)
      .then(response => response.json())
      .then(data => {
        // debugger
        target.querySelector('img').src = data.data[0].images.original.url
      })


  }
})


// Create the measurement node
var scrollDiv = document.createElement("div");
scrollDiv.className = "scrollbar-measure";
document.body.appendChild(scrollDiv);

// Get the scrollbar width
var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
// console.warn(scrollbarWidth); // Mac:  15
scrollbar
// Delete the DIV
document.body.removeChild(scrollDiv);
