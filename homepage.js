//JavaScript file for hiding and unhiding the Instructions pop-up.
function unhide(divID){
var item= document.getElementById(divID);
    if (item){
        item.className=(item.className=='hidden')?'unhidden':'hidden';
    }//if
}//unhide

function unhideTwo(divID1, divID2){
    unhide(divID1);
    unhide(divID2);
}//unhideTwo