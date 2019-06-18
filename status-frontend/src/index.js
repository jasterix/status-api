

// url =

const mainTag = document.querySelector('main')
const imgDiv = mainTag.querySelector('div')

const createTile =(gif) => {
  return(`<a class="red card">
    <div class ="image ui list">
    <img class="ui medium image" src ="${gif.images.original.url}">
    </div>
    </a>`)
  }

    // <div class ="ui list">
    // <img class="ui small image" src = "${gif.images.original.url}">
    // </div>


fetch('https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=404&limit=2&offset=0&rating=G&lang=en')
    // .then(parsed => parsed.data[getRandomInt(0,100)].images.original.url)
    .then(response => response.json())
    .then(data => {
      // debugger
      data.data.forEach(gif => {

        imgDiv.innerHTML += createTile(gif)
      })
    })

      // console.log(data)
