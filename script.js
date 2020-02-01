
var playerHealth = 5;
var computerHealth = 5;

var button = document.getElementById('rock');
var button2 = document.getElementById('paper');
var button3 = document.getElementById('scissors');

/* list of choices for computer */
var choices = ['rock', 'paper', 'scissors'];

function startGame(choice) {
	// If player of computer have health let player make move
	if(playerHealth > 0 && computerHealth > 0) {
		// disable buttons
		button.disabled = true;
		button2.disabled = true;
		button3.disabled = true;
		playerChoice(choice)
	} else {
		location.reload();
	}
		
	
	/* plays out round with choices to check who wins */
	function playRound(playerChoice, computerChoice){
		if ((playerChoice === 'rock' && computerChoice === 'paper') || 
		(playerChoice == 'paper' && computerChoice === 'scissors') || 
		(playerChoice === 'scissors' && computerChoice === 'rock')){
			winner = 'computer';		

	}		

		else if (playerChoice === computerChoice){	
			winner = 'draw';
		
	}
		else{
			winner = 'player';
		
			
	}	

		setTimeout(moveElement, 1700, winner);
		/* end round and return winner */
		endRound(winner); 
		
	}
	function endRound(winner){
		console.log(winner + " wins");
		return;
	}
		

	function computerChoice(choices){
		/* Make random choice for computer out of array for choices, returns number */
		var choice = Math.floor(Math.random() * choices.length);

		// make comptuers choice and save as variable
		choice = choices[choice]

		// remove choice image from computer side
		// removeElement(`comp-${choice}`)

		// add back after a few seconds
		//setTimeout(addElement, 3000, `comp-${choice}`)

		// add choice to the playzone
		addElement(choice, 'computer')

		/* Display choice on console */
		console.log(`computer picked ${choice}`);

		/* Make computerChoice = choice */
		return choice;

	}

	function playerChoice(choice){
		// Remove choice
		//removeElement(choice);
		console.log(choice);
		


		// add choice to playzone
		addElement(choice, 'player');
			
		/* Prompt player to select rock paper or scissors and make playerChoice = input*/
		playRound(choice, computerChoice(choices));
		

	}

	function addElement(choice, turn){
		// Create image element
		var elem = document.createElement("img");
		elem.setAttribute("src", `${choice}.png`);
		elem.setAttribute('id', 'playzone-img');
		elem.setAttribute('class', turn);

		// Add image to playzone
		document.getElementById("plays").appendChild(elem);
		
	}
	function moveElement(winner) {
		if(winner != 'draw')
			removeHeart(winner);
		if(winner == 'player'){
			index = 1;
			// remove health
			computerHealth -= 1;
		} else if(winner == 'computer'){
			// remove health
			playerHealth -= 1;
			index = 0;
		} else {
			removeBothElements();
		}
		var element = document.getElementById('plays').childNodes[index];
		element.parentNode.removeChild(element);
		setTimeout(removeFinalElement, 1500);
		
		// Show winner
		showWinner(winner);
		
		
	}
	function removeFinalElement() {
		var element = document.getElementById('plays').childNodes[0];
		element.parentNode.removeChild(element);
		// enable buttons
		button.disabled = false;
		button2.disabled = false;
		button3.disabled = false;
	} 
	function removeBothElements() {
		removeFinalElement();
		removeFinalElement();
		return;
	}
	function removeHeart(winner) {
		if(winner == 'player') {
			loser = 'computer';
		} else if(winner == 'computer') {
			loser = 'player';
		}
		// Remove heart of person who lost
		var element = document.getElementById(`${loser}-health`).children[0];
		element.parentNode.removeChild(element)
		addEmptyHeart(loser)
	}
	function addEmptyHeart() {
		// Create empty hear element
		var elem = document.createElement("img");
		elem.setAttribute("src", "heartEmpty.png");
		elem.setAttribute('id', 'empty');
		elem.setAttribute('class', 'emptyHeart');

		// Add image to playzone
		document.getElementById(`${loser}-health`).appendChild(elem);
		
	}
	function showWinner(winner){
		var text = document.createElement("p");
		if(winner == 'player') {
			// Add 'Player wins' to player-results
			text.innerHTML = "Player Wins";
			text.style.color = "blue";
			document.getElementById('player-results').appendChild(text);
		} else if(winner == 'computer') {
			// Add 'Computer wins' to computer-results
			text.innerHTML = "Computer Wins";
			text.style.color = "red";
			document.getElementById('computer-results').appendChild(text);
		}
		setTimeout(resetResults, 2000, winner);
		setTimeout(finalResult, 2000);
	}
	function resetResults(winner) {
		var element = document.getElementById(`${winner}-results`).children[0];
		element.parentNode.removeChild(element)
		return;
	}
	function finalResult(){
		var text = document.createElement('p');
		text.style.fontSize = "50px"
		if(playerHealth == 0){
			// create img element
			var image = document.createElement('img');
			image.setAttribute("src", "cat.gif")
			image.setAttribute("id", "cat")

			// create text element
			text.innerHTML = "You Lose!";
			text.style.color = "red";

			// add elements to divs
			document.getElementById('final-results').appendChild(text);
			document.getElementById('plays').appendChild(image);

		} else if(computerHealth == 0){
			console.log(computerHealth);
			// create img element
			var image = document.createElement('img');
			image.setAttribute("src", "crown.gif")
			
			// create text element
			text.innerHTML = "You Win!";
			text.style.color = "blue";

			// add elements to div
			document.getElementById('final-results').appendChild(text);
			document.getElementById('plays').appendChild(image);

		}
	}
}
