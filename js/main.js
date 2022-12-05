// adding local storage
 if (typeof(Storage !== "undefined")) {
     if (!localStorage.getItem("scores")) {
          localStorage.setItem("scores", 0)
     }else if (!localStorage.getItem("score")) {
       localStorage.setItem("score", 0)
     }
 }else{
   console.log("Storage error")
 }





//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
 
 let deckId = "";
  
  const api = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
fetch(api)
   .then(res => res.json())
   .then(data =>{
    // console.log(data)
     deckId = data.deck_id
         
   })
   .catch(error =>{
     console.log(`error ${error}`);
   })
    
     let x = 0;
     let y = 0;
   
     let score = localStorage.getItem('score')
      let scores = localStorage.getItem("scores")
      
    
   function getFetch(){
     const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
      fetch(url)
        .then(res => res.json())
         .then(data => {
          // console.log(data)
          document.querySelector('#player1').src = data.cards[0].image
          document.querySelector('#player2').src = data.cards[1].image
            let player1 = convertCardsToNum(data.cards[0].value);
            let player2 = convertCardsToNum(data.cards[1].value);
              if (player1 > player2) {
          document.querySelector('#celes').innerHTML = 'Player wins'
          for (let i = 0; i < 1; i++) {
            y++;
            let scoreVal = Number(localStorage.getItem("scores"));
              scoreVal += 1 
             localStorage.setItem("scores", scoreVal)
         }
         document.querySelector(".know").innerHTML  = `${y}`
            
              } else if (player1 < player2) {
                document.querySelector('#celes').innerHTML = 'Computer wins'
                for (let i = 0; i < 1; i++) {
                   x++;
                  
                let scoreVal = Number(localStorage.getItem("score"));
                scoreVal += 1 
                localStorage.setItem("score", scoreVal)

                }
              
               document.querySelector("#jets").innerHTML  = `${x}`
              }else{
                document.querySelector('#celes').innerHTML = 'Its a tie'
              }

         })

    .catch(err =>{
       console.log(`error ${err}`)
    })

  
  }

  function convertCardsToNum(value) {
     if (value === 'ACE') {
       return 14;
     } else if (value ==='KING') {
      return 13;
    }else if (value === 'QUEEN') {
      return 12;
    }else if (value === 'JACK') {
      return 11;
    }else{
      return Number(value);
    }
  }

  document.querySelector(".com").innerHTML = score;
  document.querySelector(".plays").innerHTML = scores;
