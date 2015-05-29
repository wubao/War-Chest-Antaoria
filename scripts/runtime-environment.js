// War Chest
// Author: Tony Eleninovski
// Runtime Environment v1.1

/*

Global 
Objects
Functions
Variables
Math, coordx, coordy, document, generateEnvironment, generateLandPlots, generateRulerBonuses, generateTribes, i_step, inhabitants, land_cubes, land_plots, resources, territory, total, tribes
*/

/* RULER TYPES AND BONUSES 
ruler_type=new Array()
ruler_type[0]="AGGRESSIVE - ATTACK BONUS"
ruler_type[1]="PROTECTIVE - DEFENSE BONUS"
ruler_type[2]="COMMERCIAL - TRADE BONUS"
ruler_type[3]="INDUSTRIAL - RESOURCE BONUS"
ruler_type[4]="EXPANSIVE - EXPANSION BONUS" */

var ruler_type= [' ', ' ', ' ', ' ', ' '];
ruler_type[0]=[0.2, 0, 0, 0, 0]; // these are shown as a range of percentages 
ruler_type[1]=[0, 0.2, 0, 0, 0];
ruler_type[2]=[0, 0, 0.2, 0, 0];
ruler_type[3]=[0, 0, 0, 0.2, 0];
ruler_type[4]=[0, 0, 0, 0, 0.2];


/*	ENVIRONMENTAL VARIABLES	 */
var inhabitants;
var land_plots;
var territory;
var tribes =0;
var resources;
var total=0;
var coordx;
var coordy;
var land_cubes =0;
var i_step = 0;
var ruler_bonus;

/*	RESOURCE TYPES	 */
var gold;
var iron;
var wood;
var stone;
var food;


/* GAME VARIABLES 
  land_plots[]
  0 = INHABITANTS
  1 = COORDINATE X IN MAP
  2 = COORDINATE Y IN MAP
  3 = TRIBE STATUS
  4 = RESOURCES
  5 = LAND PLOT'S CUBE NUMBER
  6 = LAND PLOT'S POSITIONAL NUMBER IN THE 9-DIMENSIONAL CUBE

*/
	  var land_plots = [];

/*******************************/

function generateEnvironment()  
 	{
	  inhabitants = Math.floor((Math.random()*900)+100); // 100,000 is the maximum value and to reach a floor we minus 10,000.
	  document.getElementById('inhabitants').innerHTML = inhabitants;
	  
	  generateLandPlots();	
	  generateTribes();
	  generateRulerBonuses();

	  
		
	}
	
function generateLandPlots() 
	{
	var random_plot = Math.floor((Math.random()*30)+10); // find a random value between 10-40. minimum ratio 10:1 and normal ratio of 40:1
	land_plot = Math.ceil(inhabitants/random_plot); // The minimum number of inhabitants on each plot cannot be less than on a ratio fo 10:1	
	
	for(i=0;i<land_plot;i++)
	  {
		land_plots[i] = [' ', ' ', ' ', ' ', ' ', ' ', ' '];
	  }
	  
	/* SET INHABITANTS ON LAND PLOTS */
	for(i=0;i<land_plots.length;i++)
	  {
		land_plots[i][0] =  Math.floor((Math.random()*90)+10);
 		
//		alert(10*(land_plots.length-i)+total);		  
		  if (10*(land_plots.length-i)+total+90>inhabitants-10*(land_plots.length-i)) // set a buffer rule that states the newly created inhabitants for this Land Plot must be less than the Randomly Generated Inhabitants value minus 10% of the Total Inhabitants number, as a precaution.  In other words, can we fit the total + a minimum of 10 inhabitants in the remaining number of plots?
		  // the added 90 above the total is essential because the random number created earlier in the FOR LOOP is between 10 and 100, so over and above the minimum calculation for each plot, we need to add the possibility of a value of 100 (as in 10+90).
			 {
			    land_plots[i][0] = 10; // make the altered value the minimum possible value
			 } 
		  if(i==land_plots.length-2) // if there are less than 2 Plots Left
		     {
				land_plots[i][0] = Math.floor((inhabitants - total) / 2); // make the altered value the minimum possible value
				  if (land_plots[i][0] <0) { land_plots[i][0] = -(land_plots[i][0]);} // reciprocate the negative value to a positive value
			 }	
		  else if(i==land_plots.length-1) // if there are less than 2 Plots Left
		     {
				land_plots[i][0] = Math.floor(inhabitants - total); // make the altered value the minimum possible value
				  if (land_plots[i][0] <0) { land_plots[i][0] = -(land_plots[i][0]);} // reciprocate the negative value to a positive value
			 }				 
	
		 total = total + land_plots[i][0];
		 document.getElementById('land_plots').innerHTML = land_plots.length + "<br /><br />Land Cubes: " + (Math.ceil(land_plots.length/9));
		 document.getElementById('inhabitant_distribution').innerHTML = random_plot; // An Array has been created for Land Plots with undefined values	
		 document.getElementById('inhabitants').innerHTML = inhabitants + "<br /><br />Total Calculated Inhabitants: " + total;	
 		 document.getElementById('start-up').inhabitants.value = inhabitants;
  		 document.getElementById('start-up').land_plots.value = land_plots.length;
 
	  }
	
  		  if(inhabitants - total <0) // if the final results yield any negative value then adjust one of the other Land Plots.
	   		{
			for(i=0;i<=land_plots.length-1&&inhabitants - total <0;i++)
				  {	
				   if(land_plots[i][0] >=30)
				     {
						land_plots[i][0] += (inhabitants-total); // takes the excess off of the value
						total+=(inhabitants-total);
						 document.getElementById('inhabitants').innerHTML = inhabitants + "<br /><br />Total Calculated Inhabitants: " + total;		
						
					 }
				  }
				
			}
	}


function generateTribes() 
 	{

	for (i=0;i<land_plots.length;i++)
	  {
		if (land_plots[i][0] >= 40)
		{ // if the number of inhabitants on a Land Plot is greater than the Naturalization Value
		  land_plots[i][3] = ("Tribe"); // it becomes the "biggest"
		  tribes += 1;
		} // and the loop goes on until...
	document.getElementById('tribes').innerHTML = tribes;	
	 document.getElementById('start-up').tribes.value = tribes;	
	  }

	}		


function generateRulerBonuses()
	{
	var selectedValue = document.getElementById("ruler_type").value;	
	  if(selectedValue == "Aggressive")
	  	{
		  ruler_bonus = ruler_type[0];
		}
	  else if(selectedValue == "Defensive")
	  	{
		  ruler_bonus = ruler_type[1];			
		}	  
	  else if(selectedValue == "Commercial")
	  	{
		  ruler_bonus = ruler_type[2];			
		}	  
	  else if(selectedValue == "Industrial")
	  	{
		  ruler_bonus = ruler_type[3];			
		}	  
	  else if (selectedValue == "Expansive")
	  	{
		  ruler_bonus = ruler_type[4];			
		}	  
		
	  document.getElementById('start-up').ruler_bonus.value = ruler_bonus;
		
		
	}
