

// url =

const ulTag = document.querySelector('#status-container')

const createTile =(gif) => {
  return(`<li>
    <img src = "${gif.img_url}">
    </li>`)
  }


fetch('https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=success cat&limit=4&offset=0&rating=G&lang=en')
    // .then(parsed => parsed.data[getRandomInt(0,100)].images.original.url)
    .then(response => response.json())
    .then(data => {
      // debugger
      data.data.forEach(gif => {

        ulTag.innerHTML += createTile(gif)
      })
    })

      // console.log(data)
