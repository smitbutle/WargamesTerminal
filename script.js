function startMatrix() {
  // Initialising the canvas
  var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");

  // Setting the width and height of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Setting up the letters
  var letters =
    "ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789#*$ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789#*$ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789#*$ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789#*$ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789#*$";
  letters = letters.split("");

  // Setting up the columns
  var fontSize = 10,
    columns = canvas.width / fontSize;

  // Setting up the drops
  var drops = [];
  for (var i = 0; i < columns; i++) {
    // console.log(i);
    drops[i] = 1;
  }

  // Setting up the draw function
  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, .1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < drops.length; i++) {
      var text = letters[Math.floor(Math.random() * letters.length)];
      //   ctx.fillStyle = "#0f0";
      ctx.fillStyle = "#03a9f4";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
    }
  }

  // Loop the animation
  setInterval(draw, 33);
}

function checkDate() {
  fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    // fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata")
    .then(response => {
      // const dateString = response.headers.get("date");
      const dateString = response.json().then((data) => {
        console.log(data.unixtime);
        return data.unixtime;
      }).then((dateString) => {
        if (Math.floor(new Date(dateString).getTime() / 10) === Math.floor(Date.now() / 10000)) {
          document.getElementById("iframe_card").style.display = "block";
          document.getElementById("err_msg").style.display = "none";
        }
        else {
          document.getElementById("err_msg").style.display = "block";
          document.getElementById("iframe_card").style.display = "none";
        }
        console.log(Math.floor(Date.now() / 1000));
        console.log("Function executed on window load.");
        // You can perform any other operations after the fetch here
      });
      console.log(dateString);
    })

    .catch(error => {
      console.error("Error fetching UTC date:", error);
    });
}
window.addEventListener("load", checkDate);
  // document.getElementById("ref").onclick = checkDate;



//make an function load on website load

