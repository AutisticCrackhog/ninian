fetch("/dances")
  .then(response => response.json())
  .then(str => {
  document.getElementById("dances").innerHTML = str;
})