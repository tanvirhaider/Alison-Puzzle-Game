

console.clear();

import $ from "cash-dom";									// loading a small lib to get some of the oldschool jquery shortcuts
import '../scss/style.scss'									// loading in the style
import { gsap } from "gsap";								// loading in the green sock library
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";	// loading in the green sock scroll trigger
import { Draggable } from "gsap/dist/Draggable";	// loading in the green sock scroll trigger
import Media from './Baymax.amazon.js';						// loading in the baymax audio player



gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

/* :::::::::: Code to update the percentage value :::::::::::: */
/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
} 

function initPos (xPos, yPos,whichItem) {

	//var leftPos = percentage(dropLast(whichItem.style.left));

	whichItem.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0px)";
	var WW = window.innerWidth;
	var WH = window.innerHeight;

	console.group("translate3D");
	console.log("left:", whichItem.style.left, percentage(dropLast(whichItem.style.left),WW));
	console.log("top:", whichItem.style.top);
	console.log("width:", whichItem.style.width);
	console.log("height:", whichItem.style.height);
	console.log("initPos", xPos, yPos);
	console.log(whichItem);
	console.groupEnd("translate3D");
}

function dropLast (whichOne) {
	return whichOne.substring(whichOne.length - 1,-1);
}





var PQT = [];
var PQL = [];
var PQH = [];
var PQW = [];

var ItemData = {
	actualVal:[],
	processedVal:[]
};

var cHeight = 1900;
var cWidth = 3950;



function init () {

	console.log(":::: init :::::");

  

	for (var i = 1; i <= 41; i++) {
		
		var tmpDOMitem = document.querySelector("#hs-" + i);
		var tmpIDOMitem = document.querySelector("#is-" + i);
		var tempItem = $('#hs-' + i);
		var tempPos = tempItem.position();
		var tempHeight = tempItem.height();
		var tempWidth = tempItem.width();

		var tempIte = ItemData.actualVal.push({
			"top":tempPos.top,
			"left":tempPos.left,
			"height": tempHeight,
			"width": tempWidth
		});

		var tempPros = ItemData.processedVal.push({
			"top": percentage(tempPos.top,cHeight),
			"left":percentage(tempPos.left,cWidth),
			"height": percentage(tempHeight,cHeight),
			"width": percentage(tempWidth,cWidth)
		});

		tmpDOMitem.style.top = percentage(tempPos.top,cHeight) + "%";
		tmpDOMitem.style.left = percentage(tempPos.left,cWidth) + "%";
		tmpDOMitem.style.height = percentage(tempHeight,cHeight) + "%";
		tmpDOMitem.style.width = percentage(tempWidth,cWidth) + "%";

		tmpIDOMitem.style.top = percentage(tempPos.top,cHeight) + "%";
		tmpIDOMitem.style.left = percentage(tempPos.left,cWidth) + "%";
		tmpIDOMitem.style.height = percentage(tempHeight,cHeight) + "%";
		tmpIDOMitem.style.width = percentage(tempWidth,cWidth) + "%";

		initPos(200, 500,tmpIDOMitem);



		//PQT.push(tempPos.top);
		//PQL.push(tempPos.left);
		//PQH.push(tempHeight);
		//PQW.push(tempWidth);
	//   var tempLeft = tempPos.left/$(window).width() * 100;
	//   var tempTop = tempPos.top/$(window).height() *100;
	//   tempItem.style.top = tempTop + "%";
	//   tempItem.style.left = tempLeft + "%"; 

   }

   console.log(ItemData);


  //see https://www.greensock.com/draggable/ for more details.

var droppables = $("#container div");
//var droppables = $(".is");

//the overlapThreshold can be a percentage ("50%", for example, would only trigger when 50% or more of the surface area of either element overlaps) or a number of pixels (20 would only trigger when 20 pixels or more overlap), or 0 will trigger when any part of the two elements overlap.
var overlapThreshold = "50%"; 

//we'll call onDrop() when a Draggable is dropped on top of one of the "droppables", and it'll make it "flash" (blink opacity). Obviously you can do whatever you want in this function.
function onDrop(dragged, dropped) {
  gsap.fromTo(dropped, {opacity:1}, {duration: 0.1, opacity:0, repeat:3, yoyo:true});
}



function enableDisable (what, which) {
	if (what == "enable") {
		which.classList.remove("disable");
	}
	else if (what == "disable") {
		which.classList.add("disable");
	}
}

function runED (what, which) {
	for (var i = 1; i <= 41; i++) {
		var tempItem = document.getElementById("hs-" + i);
		var tempItem2 = document.getElementById("is-" + i);

		if (what == 'disable') {
			if (i == which) {
				enableDisable("disable",tempItem); 
				enableDisable("disable",tempItem2); 
			}
			else {
				enableDisable("enable",tempItem); 
				enableDisable("enable",tempItem2); 
			}
		}
		else if (what == 'enable'){
			if (i == which) {
				enableDisable("enable",tempItem); 
				enableDisable("enable",tempItem2); 
			}
			else {
				enableDisable("disable",tempItem);
				enableDisable("disable",tempItem2); 
			}
		}
		else {
			tempItem.classList.remove("disable");
			tempItem2.classList.remove("disable");
		}
	}
}

var tempStop = true;
var tempCheck = 0;

function spanToPosition (whichOne) {
	var tempItem = document.getElementById("hs-" + whichOne);
	var tempTarg = document.getElementById("is-" + whichOne);

	var tempX = tempItem.style.left;
	var tempY = tempItem.style.top;

	tempTarg.style.left = tempX + "%";
	tempTarg.style.top = tempY + "%";

	//translate3d(258.114px, 66.3915px, 0px)

	gsap.to("#is-" + whichOne,{duration:1,x:0,y:0});

}

Draggable.create(droppables, {
  bounds:window,
  onDrag: function(e) {

	if (tempStop) {
		console.log(e.target.dataset.isIndex);
		//tempCheck = 
		runED ("enable",e.target.dataset.isIndex);
		tempStop = false;
	}

	
    var i = droppables.length;
		 while (--i > -1) {
       if (this.hitTest(droppables[i], overlapThreshold)) {
         $(droppables[i]).addClass("highlight");
		 
       } else {
         $(droppables[i]).removeClass("highlight");
       }
       
       /* ALTERNATE TEST: you can use the static Draggable.hitTest() method for even more flexibility, like passing in a mouse event to see if the mouse is overlapping with the element...
       if (Draggable.hitTest(droppables[i], e) && droppables[i] !== this.target) {
         $(droppables[i]).addClass("highlight");
       } else {
         $(droppables[i]).removeClass("highlight");
       }
       */
    }
  },
  onClick: function(e) {

  },
  onDragEnd:function(e) {

	tempStop = true;

	
	setTimeout(() => {runED (null,null);}, 100);

		var i = droppables.length;
		while (--i > -1) {
			if (this.hitTest(droppables[i], overlapThreshold)) {
				onDrop(this.target, droppables[i]);
				console.log(this.target.dataset.isIndex);
				spanToPosition (this.target.dataset.isIndex);
			}
		}

		
	}
});

}


$(function() {init ();});  // init will run after DOM elements are loaded 


