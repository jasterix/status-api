const imgDiv = document.querySelector('.img-list')
const submitButton = document.querySelector("input.submit")
const saveButton = document.querySelector("#new-board-btn")
const saveBoard = document.querySelector(".saveBoard-container")
let addBoard = false;
let urls

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(30));
}

const statusCodes = ["200 OK", "300 Multiple Choices", "301 Moved Permanently", "302 Found", "304 Not Modified", 
"307 Temporary Redirect", "400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found", 
"410 Gone", "500 Internal Server Error", "501 Not Implemented", "503 Service Unavailable", 
"550 Permission denied"]

const createTile = (gif, code, description) => {
  return(`
  <a class="blue card">
    <div class ="image ui list">
    <h1 id=${code}>${code} - ${description}</h1>
    <img class="img ui medium image" src="${gif.images.original.url}">
    </div>
    </a>`)
}

statusCodes.forEach(statusCode => {
  let code = statusCode.split(" ")[0]
  let description = statusCode.split(" ").slice(1).join(" ")
  let num = getRandomInt()

fetch(`https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=${description}&limit=1&offset=${num}&rating=G&lang=en`)
  .then(response => response.json())
  .then(data => {
      imgDiv.innerHTML += createTile(data.data[0], code, description)
  })
})

////Save your board event listener
saveBoard.addEventListener('submit', (event) => {
  event.preventDefault()
  let boardName = document.querySelector("#boardname")
  let urlTags = document.querySelectorAll(".image")
  let boardUrls = []
  urlTags.forEach(url => {
    boardUrls.push(url.src)
  })
  console.log(boardUrls)

  debugger
  fetch("http://localhost:3000/boards", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "body": JSON.stringify({
      name: event.target.name.value,
      urls: boardUrls
    })
  })
})

saveButton.addEventListener('click', () => {
  // hide & seek with the form
  // orginal code bellow
  addBoard = !addBoard
  if (addBoard) {
    saveBoard.style.display = 'block'
    // submit listener here
  } else {
    saveBoard.style.display = 'none'
  }
})