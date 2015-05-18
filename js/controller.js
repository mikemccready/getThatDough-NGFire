angular
	.module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$firebaseObject'];

    function MainController($firebaseObject){

    	var self = this;
        
        self.gameEvents = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/gameEvents");
            var gameEvents = $firebaseObject(ref);         
            return gameEvents;

        }();

        //returns array from firebase to set up the game board
        self.boxes = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/boxes");
            var boxes = $firebaseObject(ref);         
            return boxes;

        }();
  
        //determines what move is recorded with incrementing turn variable      
        self.playerMove = function(i){
            //square is taken
            if (self.boxes[i].text !== ""){
                console.log("taken");
            }
            else if (self.gameEvents.turn % 2 === 0){
                self.boxes[i].text = "X";
                self.gameEvents.turn ++;
                self.gameEvents.music = true;
            }else {
                self.boxes[i].text = "O";
                self.gameEvents.turn ++;   
            } 
            self.boxes[i].bag = false;            
            self.boxes.$save();
            self.gameEvents.$save();
            checkWin();  

        }

        //function establishes tie and win conditions
       function checkWin(){

            if( 
                //check rows for 3 o's
                    ((self.boxes[0].text === "O") && (self.boxes[1].text === "O") && (self.boxes[2].text === "O"))
                ||  ((self.boxes[3].text === "O") && (self.boxes[4].text === "O") && (self.boxes[5].text === "O"))
                ||  ((self.boxes[6].text === "O") && (self.boxes[7].text === "O") && (self.boxes[8].text === "O"))
                //check cols for 3 o's
                ||  ((self.boxes[0].text === "O") && (self.boxes[3].text === "O") && (self.boxes[6].text === "O"))
                ||  ((self.boxes[1].text === "O") && (self.boxes[4].text === "O") && (self.boxes[7].text === "O"))
                ||  ((self.boxes[2].text === "O") && (self.boxes[5].text === "O") && (self.boxes[8].text === "O"))
                //check diags for 3 o's
                ||  ((self.boxes[0].text === "O") && (self.boxes[4].text === "O") && (self.boxes[8].text === "O"))
                ||  ((self.boxes[2].text === "O") && (self.boxes[4].text === "O") && (self.boxes[6].text === "O"))
            ){ 
                // document.getElementsByClassName('winScreen')[0].innerHTML = '<iframe height="0" width="0" src="https://www.youtube.com/embed/lY7x292xoRo?autoplay=1" frameborder="0"></iframe>';             
                //a win condition is satisfied
                self.gameEvents.header = "Player  O  Wins";
                self.gameEvents.winScreen = true;
                self.gameEvents.music = false;
                self.gameEvents.musicWin = true;
                //board hidden
                self.gameEvents.board = false;
                //reset button appears
                self.gameEvents.resetButton = true;
                //win o tally increments
                self.gameEvents.tallyO ++;
                console.log('O wins')                
            }else if(
                //check rows for 3 x's
                   ((self.boxes[0].text === "X") && (self.boxes[1].text === "X") && (self.boxes[2].text === "X"))
                || ((self.boxes[3].text === "X") && (self.boxes[4].text === "X") && (self.boxes[5].text === "X"))
                || ((self.boxes[6].text === "X") && (self.boxes[7].text === "X") && (self.boxes[8].text === "X"))
                //check cols for 3 x's
                ||  ((self.boxes[0].text === "X") && (self.boxes[3].text === "X") && (self.boxes[6].text === "X"))
                ||  ((self.boxes[1].text === "X") && (self.boxes[4].text === "X") && (self.boxes[7].text === "X"))
                ||  ((self.boxes[2].text === "X") && (self.boxes[5].text === "X") && (self.boxes[8].text === "X"))
                //check diags for 3 x's
                ||  ((self.boxes[0].text === "X") && (self.boxes[4].text === "X") && (self.boxes[8].text === "X"))
                ||  ((self.boxes[2].text === "X") && (self.boxes[4].text === "X") && (self.boxes[6].text === "X"))
            ){  
                // document.getElementsByClassName('winScreen')[0].innerHTML = '<iframe height="0" width="0" src="https://www.youtube.com/embed/lY7x292xoRo?autoplay=1" frameborder="0"></iframe>';
                //a win condition is satisfied, run win events big party
                self.gameEvents.header = "Player  X  Wins";
                self.gameEvents.winScreen = true;
                self.gameEvents.music = false;
                self.gameEvents.musicWin = true;
                // document.getElementsByClassName('winScreen')[0].innerHTML = '<iframe height="0" width="0" src="https://www.youtube.com/embed/VBlFHuCzPgY?autoplay=1" frameborder="0"></iframe>';
                //board hidden
                self.gameEvents.board = false;
                //reset button appears                
                self.gameEvents.resetButton = true;
                //win x tally increments
                self.gameEvents.tallyX ++;
                console.log('X wins')               
            }else if( self.gameEvents.turn === 9 ){
                self.gameEvents.header = "It's a Tie";
                console.log("tie");
                self.gameEvents.resetButton = true;
            
            }

            self.gameEvents.$save();

        }    

        //defines function of the reset button
        self.reset = function(){

            for (var i = 0; i < 9; i ++){
                
                self.boxes[i].bag = true;
                self.boxes[i].text = "";
                self.boxes.$save();
                // document.getElementsByClassName('winScreen')[0].innerHTML = '';

            }

            self.gameEvents.winScreen = false;
            self.gameEvents.music = true;
            self.gameEvents.musicWin = false;
            self.gameEvents.board = true;
            self.gameEvents.header = "Get that Dough";
            self.gameEvents.resetButton = false;
            self.gameEvents.turn = 0;
            self.gameEvents.$save();                         

        }

        //clears the scoreboard
        self.clearBoard = function(){

            self.gameEvents.tallyO = 0;
            self.gameEvents.tallyX = 0;
            self.gameEvents.$save();  

        }

    
    };    


  



