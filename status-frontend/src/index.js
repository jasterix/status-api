const imgDiv = document.querySelector('.img-list')
const submitButton = document.querySelector("input.submit")
const saveButton = document.querySelector("#new-board-btn")
const saveBoard = document.querySelector(".saveBoard-container")
let addBoard = false;
let urls

const createTile = (gif) => {
  return(`
  <a class="blue card">
    <div class ="image ui list" >
    <img data-url = ${gif.images.original.url} class="img ui medium image" src ="${gif.images.original.url}">
    <input id="boardurls" data-url = ${gif.images.original.url} type = "hidden"> </input>
    </div>
    </a>`)
}

document.addEventListener('click', (e) => {
// console.log(e.target)
// console.log(e.target.dataset.url)




////Save your board event listener
saveBoard.addEventListener('submit', (event) => {
  let urlTags = document.querySelectorAll("#boardurls")
  let boardUrls = []
  urlTags.forEach(url => {
    boardUrls.push(url.dataset.url)
  })
  console.log(boardUrls)
  // let username = document.querySelector("#username").value
  event.preventDefault()
  // let a = event.target.name.name
  // console.log(event.target.dataset)
  // console.log(event.target.name.url.value)

  // fetch("http://localhost:3000/boards", {
  //   "method": "POST",
  //   "headers": {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   "body": JSON.stringify({
  //     name: event.target.name.value,
  //     search: event.target.image.value,
  //     urls: boardUrls
  //   })
  // })
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


fetch('https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=404&limit=2&offset=0&rating=G&lang=en')
    // .then(parsed => parsed.data[getRandomInt(0,100)].images.original.url)
  .then(response => response.json())
  .then(data => {
      // debugger
    data.data.forEach(gif => {
      imgDiv.innerHTML += createTile(gif)
    })
    getUrls(data)

  })

const getUrls = (data) => {
  urls = document.querySelectorAll("img")
  return urls
}





      // console.log(data)

          // <div class ="ui list">
          // <img class="ui small image" src = "${gif.images.original.url}">
          // </div>

          //
          // })

          //   <a class="blue card">
          //     <img class="img ui medium image" src ="${gif.images.original.url}">
          //     <img>
          //   </div>
          // </a>
