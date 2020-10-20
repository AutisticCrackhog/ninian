
refresh();
function refresh() {
  fetch("/refresh")
    .then((response) => response.json())
    .then(data => {
    
    document.getElementById("cracky").src = data[2][0];
    document.getElementById("dense").src = data[2][1];
    
    // Data in eine Tabelle
    
    var table = document.createElement("table");
    table.id = "cmds";
    for (const i in data[0]) {
      var tr = document.createElement("tr");
      
      var name = document.createElement("td");
      name.classList.add("tdname");
      name.innerHTML = data[0][i];
      
      var descr = document.createElement("td");
      descr.classList.add("tddescr")
      descr.innerHTML = data[1][i];
      
      tr.appendChild(name);
      tr.appendChild(descr);
      
      table.appendChild(tr);
    }
    
    document.body.appendChild(table);
  });
}

function dance() {
  
}

