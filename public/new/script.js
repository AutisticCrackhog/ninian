function showSlideBar() {
  document
    .querySelector("#slidebarbutton")
    .classList.toggle("slideButtonAnimation");
  let slidebar = document.querySelector("#slidebar");
  slidebar.classList.toggle("slidebarOn");
  slidebar.classList.toggle("slidebarOff");

  let dragonstone = document.querySelector("#dragonstone");
  dragonstone.classList.toggle("dragonstoneVisible");
  dragonstone.classList.toggle("dragonstoneInvisible");

  let spark4 = document.querySelector("#spark4");
  let spark5 = document.querySelector("#spark5");

  spark4.classList.toggle("dragonsparkVisible");
  spark4.classList.toggle("dragonsparkInvisible");

  spark5.classList.toggle("dragonsparkVisible");
  spark5.classList.toggle("dragonsparkInvisible");
}

function setup() {
  let slidebarbuttonHammer = new Hammer(
    document.querySelector("#slidebarbutton")
  );
  slidebarbuttonHammer.on("tap", showSlideBar);

  let bodyHammer = new Hammer(document.querySelector("body"));
  bodyHammer.on("swipeleft", () => {
    let slidebar = document.querySelector("#slidebar");
    if (slidebar.classList.contains("slidebarOff")) {
      let slidebar = document.querySelector("#slidebar");
      slidebar.classList.replace("slidebarOff", "slidebarOn");

      let dragonstone = document.querySelector("#dragonstone");
      dragonstone.classList.replace(
        "dragonstoneInvisible",
        "dragonstoneVisible"
      );

      let spark4 = document.querySelector("#spark4");
      let spark5 = document.querySelector("#spark5");

      spark4.classList.replace("dragonsparkInvisible", "dragonsparkVisible");

      spark5.classList.replace("dragonsparkInvisible", "dragonsparkVisible");
    }
  });
  bodyHammer.on("swiperight", () => {
    let slidebar = document.querySelector("#slidebar");
    if (slidebar.classList.contains("slidebarOn")) {
      let slidebar = document.querySelector("#slidebar");
      slidebar.classList.replace("slidebarOn", "slidebarOff");

      let dragonstone = document.querySelector("#dragonstone");
      dragonstone.classList.replace(
        "dragonstoneVisible",
        "dragonstoneInvisible"
      );

      let spark4 = document.querySelector("#spark4");
      let spark5 = document.querySelector("#spark5");

      spark4.classList.replace("dragonsparkVisible", "dragonsparkInvisible");

      spark5.classList.replace("dragonsparkVisible", "dragonsparkInvisible");
    }
  });
}
