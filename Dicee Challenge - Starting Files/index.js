var randomNo1 = Math.ceil(Math.random() * 6);
var randomNo2 = Math.ceil(Math.random() * 6);
document.querySelector(".img1").setAttribute("src", "images/dice" + randomNo1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNo2 + ".png");
if(randomNo1===randomNo2)
{
  document.querySelector("h1").innerHTML = "Sorry,try again!!";
}
else if(randomNo1 > randomNo2)
{
  document.querySelector("h1").innerHTML = "🚩Player 1 Wins!";
}
else
{
  document.querySelector("h1").innerHTML = "Player 2 Wins!🚩";
}
