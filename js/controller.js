angular
	.module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$firebaseObject'];

    function MainController($firebaseObject){

    	var self = this;
        
        self.win = false;
        self.board = true;
        self.resetButton = false;
        self.tallyX = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/tallyX");
            var tallyX = $firebaseObject(ref); 
            return tallyX;       

        }(); 

        self.tallyO = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/tallyO");
            var tallyO = $firebaseObject(ref); 
            return tallyO;       

        }();
        
        //sets player object with alternating turn property from "x" to "o"
        self.player = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/player");
            var player = $firebaseObject(ref); 
            return player;       

        }();           
               

        self.boxes = function(){

            var ref = new Firebase("https://getthatdough.firebaseio.com/boxes");
            var boxes = $firebaseObject(ref);         
            return boxes;

        }();

        self.playerMove = function(i){

            if (self.boxes[i].text !== ""){
                console.log("taken");
            }
            else if (self.player.turn === "x"){
                self.boxes[i].text = "X";
                self.player.turn = "o";
            }else {
                self.boxes[i].text = "O";
                self.player.turn = "x";   
            } 
            self.boxes[i].bag = false;            
            self.boxes.$save();
            self.player.$save();
            checkWin();  

        }


       function checkWin(){
            
            if(
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
                document.getElementsByClassName('winScreen')[0].innerHTML = '<iframe height="0" width="0" src="https://www.youtube.com/embed/lY7x292xoRo?autoplay=1" frameborder="0"></iframe>';
                //a win condition is satisfied, run win events big party
                self.win = true;
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
                document.getElementsByClassName('winScreen')[0].innerHTML = '<iframe height="0" width="0" src="https://www.youtube.com/embed/lY7x292xoRo?autoplay=1" frameborder="0"></iframe>';             
                //a win condition is satisfied, run win events big party
                self.win = true;
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


        self.reset = function(){

            for (var i = 0; i < 9; i ++){
                self.boxes[i].bag = true;
                self.boxes[i].text = "";
                self.win = false;
                self.board = true;
                self.resetButton = false;
                self.boxes.$save();
                document.getElementsByClassName('winScreen')[0].innerHTML = '';
            } 

        }

        self.clearBoard = function(){
            console.log("click");
            self.tallyO.wins = 0;
            self.tallyX.wins = 0;
            self.tallyO.$save();
            self.tallyX.$save();  
        }

    
    };    


  







    
    // 	self.boxes = [{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true}]
    //     self.win = false;
    //     self.board = true;
    //     self.turn = false;
    //     self.resetButton = false;
    //     self.tallyX = "0";
    //     self.tallyO = "0";

    //     self.checkWin = function(){
    //         if( 
    //                 //check rows for x
    //                   ((self.boxes[0].text === "x") && (self.boxes[1].text === "x") && (self.boxes[2].text === "x"))
    //                 ||((self.boxes[3].text === "x") && (self.boxes[4].text === "x") && (self.boxes[5].text === "x"))
    //                 ||((self.boxes[6].text === "x") && (self.boxes[7].text === "x") && (self.boxes[8].text === "x"))
    //                   //check cols for x
    //                 ||((self.boxes[0].text === "x") && (self.boxes[3].text === "x") && (self.boxes[6].text === "x"))
    //                 ||((self.boxes[1].text === "x") && (self.boxes[4].text === "x") && (self.boxes[7].text === "x"))
    //                 ||((self.boxes[2].text === "x") && (self.boxes[5].text === "x") && (self.boxes[8].text === "x"))
    //                   //check diags for x
    //                 ||((self.boxes[0].text === "x") && (self.boxes[4].text === "x") && (self.boxes[8].text === "x"))
    //                 ||((self.boxes[2].text === "x") && (self.boxes[4].text === "x") && (self.boxes[6].text === "x"))
    //         )            
    //         {
    //             self.win = true;
    //             self.board = false;
    //             document.getElementsByClassName('winScreen')[0].innerHTML = '<iframe height="0" width="0" frameborder="0" src="https://www.youtube.com/embed/iSJv10QN_8g?autoplay=1"></iframe>';
    //             self.resetButton = true;
    //             self.tallyX ++;
    //             console.log('X wins')               
    //         }  
    //         else if(   //check rows for x
    //                   ((self.boxes[0].text === "o") && (self.boxes[1].text === "o") && (self.boxes[2].text === "o"))
    //                 ||((self.boxes[3].text === "o") && (self.boxes[4].text === "o") && (self.boxes[5].text === "o"))
    //                 ||((self.boxes[6].text === "o") && (self.boxes[7].text === "o") && (self.boxes[8].text === "o"))
    //                   //check cols for x
    //                 ||((self.boxes[0].text === "o") && (self.boxes[3].text === "o") && (self.boxes[6].text === "o"))
    //                 ||((self.boxes[1].text === "o") && (self.boxes[4].text === "o") && (self.boxes[7].text === "o"))
    //                 ||((self.boxes[2].text === "o") && (self.boxes[5].text === "o") && (self.boxes[8].text === "o"))
    //                   //check diags for x
    //                 ||((self.boxes[0].text === "o") && (self.boxes[4].text === "o") && (self.boxes[8].text === "o"))
    //                 ||((self.boxes[2].text === "o") && (self.boxes[4].text === "o") && (self.boxes[6].text === "o"))
    //         )                
    //         {
    //             self.win = true;
    //             self.board = false;
    //             self.resetButton = true;
    //             self.tallyO ++;
    //             console.log('O wins')                
    //         }
    //     }                   


    // 	self.playerMove = function(i){
    //         if (self.boxes[i].text !== ""){
    //             console.log("taken")
    //         }else if (self.turn === false){
    //              
    //             self.boxes[i].bag=false;
    //             console.log("X");
    //             self.turn = true;
    //         }else {
    //             self.boxes[i].text= "o"; 
    //             self.boxes[i].bag=false;                               
    //             console.log("O"); 
    //             self.turn = false;
    //         }
    //         self.checkWin();
    //     };

    //     self.reset = function(){
    //       self.boxes = [{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true},{text:"", bag:true}]
    //       self.win = false;
    //       self.board = true; 
    //       self.resetButton = false;
    //       document.getElementsByClassName('winScreen')[0].innerHTML = ''; 
    //     }




    // };      


