/////////////////////////////////////////HIDE FORM////////////////////////
saveBoardForm.addEventListener("submit", () => {
  addBoard = !addBoard;
  if (addBoard) {
    saveBoard.style.display = "block";
    // submit listener here
  } else {
    saveBoard.style.display = "none";
  }
});

//////////////////////////////DISPLAY SAVE BOARD FORM///////////////////////
saveButton.addEventListener("click", () => {
  addBoard = !addBoard;
  if (addBoard) {
    saveBoard.style.display = "block";
    // submit listener here
  } else {
    saveBoard.style.display = "none";
  }
});

savedBoards.addEventListener("click", (event) => {
  let likeButton = event.target;
  let images = document.querySelectorAll(".medium");
  let clicked;
  let likesText = parseInt(likeButton.innerText.split(" ")[0]);

  if (event.target.classList.contains("saved")) {
    fetch("http://localhost:3000/boards")
      .then((resp) => resp.json())
      .then((boards) => {
        clicked = boards.data.find(
          (board) => board.id === event.target.dataset.id
        ).attributes.urls;
        clicked = clicked.slice(2, -2).split(`\", \"`);

        for (let i = 0; i < clicked.length; i++) {
          images[i].src = clicked[i];
        }
      });
  } else if (event.target.classList.contains("like-btn")) {
    let updatedLikes = (likesText += 1);
    console.log(event.target);
    fetch(`http://localhost:3000/boards/${event.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((board) => {
        likeButton.innerHTML = board.data.attributes.likes + " 💜";
      });
  }
});

tileContainer.addEventListener("click", (event) => {
  tile = document.querySelector(".medium");
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  if (event.target.classList.contains("medium")) {
    console.log("hi");
    let code = event.target.parentElement.innerText.split(" - ")[0];
    let description = event.target.parentElement.innerText.split(" - ")[1];
    let target = document.querySelector(`#status-${code}`);

    let num = getRandomInt();
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=${description}&limit=1&offset=${num}&rating=G&lang=en`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(target.querySelector("img").src);
        debugger;
        target.querySelector("img").src = data.data[0].images.original.url;
      });
  }
});
