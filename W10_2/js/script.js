// function showAlert() {
//   let b = document.getElementById('box');
//   console.log(b);
//   b.innerHTML = "WOW!";
//   b.style.left = "150px";
//   b.style.height = "300px";
//   b.style.backgroundColor = "pink";
// }

let x = 50;
let g = 0

function addDiv() {
  //create a HTML
  let newElt = document.createElement("div");
  //change properties
  newElt.style.backgroundColor = "gray";
  newElt.style.width = "50px";
  newElt.style.height = "50px";
  newElt.style.margin = "30px";
  //attach the elt to the document
  document.getElementById("box").appendChild( newElt )
}

function change() {
  x += 20;
  g += 20

  let b = document.getElementById('box');
  console.log(b);
  b.innerHTML = "WOW!";
  b.style.left = x + "px";
  b.style.backgroundColor = "rgh(255, " + g + ", 0)";
}
