angular
	.module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$firebaseObject'];

    function MainController($firebaseObject){

    	var self = this;
        
        self.winScreen = false;
        self.board = true;
        self.resetButton = false;

        //sets up header to announce outcome
        self.header = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/header");
            var header = $firebaseObject(ref);         
            return header;

        }();

        //returns array from firebase to set up the game board
        self.boxes = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/boxes");
            var boxes = $firebaseObject(ref);         
            return boxes;

        }();

        //sets up p1 win tally
        self.tallyX = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/tallyX");
            var tallyX = $firebaseObject(ref); 
            return tallyX;       

        }(); 
       
        //sets up p2 win tally
        self.tallyO = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/tallyO");
            var tallyO = $firebaseObject(ref); 
            return tallyO;       

        }();
        
        //sets player turn variable
        self.player = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/player");
            var player = $firebaseObject(ref); 
            return player;       

        }();  

        //determines what move is recorded with incrementing turn variable      
        self.playerMove = function(i){
            //square is taken
            if (self.boxes[i].text !== ""){
                console.log("taken");
            }
            else if (self.player.turn % 2 === 0){
                self.boxes[i].text = "O";
                self.player.turn ++;
            }else {
                self.boxes[i].text = "X";
                self.player.turn ++;   
            } 
            self.boxes[i].bag = false;            
            self.boxes.$save();
            self.player.$save();
            console.log(self.player.turn)
            checkWin();  

        }

        //function establishes tie and win conditions
       function checkWin(){

            if( self.player.turn > 8 ){
                self.header.text = "It's a Tie";
                self.header.$save();
                console.log("tie");
                self.resetButton = true;
            
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
                self.header.text = "Player 1 Wins";
                self.header.$save();
                self.winScreen = true;
                // document.getElementsByClassName('winScreen')[0].innerHTML = '<iframe height="0" width="0" src="https://www.youtube.com/embed/iSJv10QN_8g?autoplay=1" frameborder="0"></iframe>';
                //board hidden
                self.board = false;
                //reset button appears                
                self.resetButton = true;
                //win x tally increments
                self.tallyX.wins ++;
                self.tallyX.$save();
                console.log('X wins')               
            }else if( 
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
                self.header.text = "Player 2 Wins";
                self.header.$save();
                self.winScreen = true;
                //board hidden
                self.board = false;
                //reset button appears
                self.resetButton = true;
                //win o tally increments
                self.tallyO.wins ++;
                self.tallyO.$save();
                console.log('O wins')                
            }
        }    

        //defines function of the reset button
        self.reset = function(){

            for (var i = 0; i < 9; i ++){
                
                self.boxes[i].bag = true;
                self.boxes[i].text = "";
                self.winScreen = false;
                self.board = true;
                self.boxes.$save();
                document.getElementsByClassName('winScreen')[0].innerHTML = '';

            }
            
            self.header.text = "Get that Dough";
            self.header.$save();
            self.resetButton = false; 
            self.player.turn = 0;
            self.player.$save();            

        }

        //clears the scoreboard
        self.clearBoard = function(){

            self.tallyO.wins = 0;
            self.tallyX.wins = 0;
            self.tallyO.$save();
            self.tallyX.$save();  

        }

    
    };    


  



