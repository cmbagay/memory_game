const gameContainer = document.getElementById("game");
let card1 = '';
let card2 = '';
let clickCheck = 0;
let cardsMatched = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  const testCard = event.target;
  //TEST IF CARD IS ALREADY MATCHED
  if(testCard.classList.contains('matched')) return;
  //sets bgcolor as class of testCard
  testCard.style.backgroundColor = testCard.classList[0];

  //FIRST CARD by testing how many clicks have been done
  if(clickCheck === 0){
    card1 = testCard;
    clickCheck++;

  }

  //SECOND CARD, and Card Comparison
  else{
    card2 = testCard;
    clickCheck = 0;
  
    //if cards are the same, remove event Listener, make pairs
    if(card1.classList[0] === card2.classList[0]){
      //make card pairs
      card1.classList.add('matched');
      card2.classList.add('matched'); 
      console.log('Card 1: ', card1);
      console.log('Card 2: ', card2);  
      
      cardsMatched+=2;
      console.log('Colors Matched = ',cardsMatched);
      
      //makes card pair unclickable
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick); 

      //clear cards
      card1 = '';
      card2 = '';
    }

    //cards ARE NOT the same
    else{
      //color change delay 
      setTimeout(function(){
        console.log('Card 1 ', card1, 'is not the same as Card 2 ', card2);  

        //reset card colors
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
  
        //clear cards
        card1 = '';
        card2 = '';
      }, 1000); 
      
    }  
  }

  //CHECKS IF MAX # OF COLORS HAVE BEEN MATCHED
  if(cardsMatched === COLORS.length){
    alert('GG! YOU WON!');
  } 
  
}
// when the DOM loads
createDivsForColors(shuffledColors);
