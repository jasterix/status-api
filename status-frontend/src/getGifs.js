function createSavedBoardsLi(board) {
  return `
      <h3>
      <a href="#"><li class="saved" data-id="${board.id}" >${board.attributes.name}</li></a><button class="like-btn" style="background-color: transparent; border: none;" data-id="${board.id}">${board.attributes.likes} 💜 </button>
      </h3>
    `;
}
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(10));
}

const statusCodes = [
  "100 Continue",
  "101 Switching Protocols",
  "102 Processing",
  "103 Early Hints",
  "200 OK",
  "201 Created",
  "202 Accepted",
  "203 Non - Authoritative Information",
  "204 No Content",
  "205 Reset Content",
  "206 Partial Content",
  "207 Multi - Status",
  "208 Already Reported",
  "226 IM Used",
  "300 Multiple Choices",
  "301 Moved Permanently",
  "302 Found",
  "303 See Other",
  "304 Not Modified",
  "305 Use Proxy",
  "307 Temporary Redirect",
  "308 Permanent Redirect",
  "400 Bad Request",
  "401 Unauthorized",
  "402 Payment Required",
  "403 Forbidden",
  "404 Not Found",
  "405 Method Not Allowed",
  "406 Not Acceptable",
  "407 Proxy Authentication Required",
  "408 Request Timeout",
  "409 Conflict",
  "410 Gone",
  "411 Length Required",
  "412 Precondition Failed",
  "413 Payload Too Large",
  "414 URI Too Long",
  "415 Unsupported Media Type",
  "416 Range Not Satisfiable",
  "417 Expectation Failed",
  "421 Misdirected Request",
  "422 Unprocessable Entity",
  "423 Locked",
  "424 Failed Dependency",
  "425 Too Early",
  "426 Upgrade Required",
  "428 Precondition Required",
  "429 Too Many Requests",
  "431 Request Header Fields Too Large",
  "451 Unavailable For Legal Reasons",
  "500 Internal Server Error",
  "501 Not Implemented",
  "502 Bad Gateway",
  "503 Service Unavailable",
  "504 Gateway Timeout",
  "505 HTTP Version Not Supported",
  "506 Variant Also Negotiates",
  "507 Insufficient Storage",
  "508 Loop Detected",
  "510 Not Extended",
  "511 Network Authentication Required",
];

let search = [
  "100 continue",
  "101 switching",
  "102 processing",
  "103 early",
  "200 ok",
  "201 diy",
  "202 accept",
  "203 transform",
  "204 nothing",
  "205 reset",
  "206 partial",
  "207 multi",
  "208 report",
  "226 used",
  "300 choices",
  "301 moved",
  "302 found",
  "303 see+other",
  "304 same",
  "305 vpn",
  "307 redirect",
  "308 redirect",
  "400 bad+request",
  "401 unauthorized",
  "402 payment",
  "403 403+forbidden",
  "404 404+not+found",
  "405 not+allowed",
  "406 unacceptable",
  "407 authentication",
  "408 request+timeout",
  "409 conflict",
  "410 one",
  "411 length+required",
  "412 fail",
  "413 too+large",
  "414 too+long",
  "415 fall",
  "416 finish+line",
  "417 expectation+failed",
  "421 misdirected",
  "422 unable+to+process",
  "423 locked",
  "424 failed+dependency",
  "425 too+early",
  "426 upgrade",
  "428 terms",
  "429 too+many+requests",
  "431 request+too+large",
  "451 legal",
  "500 internal+server+error",
  "501 not+implemeneted",
  "502 bad+gateway",
  "503 service+unavailable",
  "504 gateway+timeout",
  "505 version+not+supported",
  "506 negotiate",
  "507 insufficient-storage",
  "508 loop",
  "510 short",
  "511 authentication",
];
const createTile = (code, description) => {
  return `
    <a class="purple card" id="status-${code}">
      <div class ="image ui list">
      <h3 class = "statusCode" data-code =${code} id=${code}>${code} - ${description}</h3>
      </div>
      </a>`;
};

//////////////////////////////////////CREATE TILE TEMPLATES
statusCodes.forEach((statusCode) => {
  let code = statusCode.split(" ")[0];
  let description = statusCode.split(" ").slice(1).join(" ");
  imgDiv.innerHTML += createTile(code, description);
});

////////////////////////////////FETCH GIFS FROM GIPHY FOR EACH STATUS CODE
search.forEach((statusCode) => {
  let code = statusCode.split(" ")[0];
  let description = statusCode.split(" ").slice(1).join(" ");
  let target = document.querySelector(`#status-${code}`);
  let num = getRandomInt();

  var proxyUrl = "https://cors-anywhere.herokuapp.com/";

  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=HDgQlOddDbNfFqqzsbHvWi17CPZ6X4JP&q=${description}&limit=1&offset=${num}&rating=G&lang=en`
  )
    .then((response) => response.json())
    .then((data) => {
      target.innerHTML += `<img class="img ui medium image" src="${data.data[0].images.original.url}">`;
    });
});

// fetch("http://localhost:3000/boards")
//   .then((resp) => resp.json())
//   .then((boards) => {
//     let new_arr = boards.data;
//     new_arr.forEach((board) => {
//       savedBoards.innerHTML =
//         createSavedBoardsLi(board) + savedBoards.innerHTML;
//     });
//   });

// ////Save your board event listener
// saveBoard.addEventListener("submit", (event) => {
//   event.preventDefault();
//   let boardName = document.querySelector("#boardname").value;

//   ///////////SAVE THE URLS TO A LIST//////////////////////////////
//   let boardUrls = [];
//   let urlTags = document.querySelectorAll(".img");
//   urlTags.forEach((url) => {
//     boardUrls.push(url.src);
//   });
// });
