socket.on("consoleUpdate", stdout => {
  document.getElementById("console").innerHTML = stdout;
})

function clearConsole() {
  socket.emit("clearConsole");
}