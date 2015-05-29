// War Chest
// Author: Tony Eleninovski
// Land Generation Mechanism v1.0

/* 
The objective of the Land Generation Mechanism is to create a static World with its initial size defined by three Dimensional Attributes
  •	Inhabitants
	o	The number of inhabitants will decide the initial size of the World
  •	Territory
	o	The inhabitants will be Grouped into Tribes and divided into Territories.  Some Territories will remain blank.
  •	Resources
	o	A formula will decide the total quantity of resources available.  
	o	A second equation will determine the resource type
	o	A third equation will decide the Resource location on the Map (which polygon owns the resource).
*/



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

// THESE ARE THE X AND Y COORDINATES OF HOW THE DISTRIBUTION OF ADJACENT LAND PLOTS WILL TAKE PLACE
	  var xycoords = new Array()
	  xycoords[0]=new Array(-1, 0);
	  xycoords[1]=new Array(+1, 0);
	  xycoords[2]=new Array(0, +1);
	  xycoords[3]=new Array(0, -1);
	  xycoords[4]=new Array(-1, +1);
	  xycoords[5]=new Array(+1, -1);
	  xycoords[6]=new Array(-1, -1);
	  xycoords[7]=new Array(+1, +1);
	  
	  var cubepos = new Array()
	  cubepos[0]=new Array(0, 0);
	  cubepos[1]=new Array(100, 0);
	  cubepos[2]=new Array(200, 0);	  
	  cubepos[3]=new Array(0, 100);
	  cubepos[4]=new Array(100, 100);
	  cubepos[5]=new Array(200, 100);
	  cubepos[6]=new Array(0, 200);
	  cubepos[7]=new Array(100, 200);
	  cubepos[8]=new Array(200, 200);	  
	  

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
	//  plotMap();
	  generateTerritory();
	  generateTribes();
	//  drawCubeWrappers();	  
	  drawLandPlots();		
	//  sortLandPlots();
	  
		
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

function plotMap() 
	{ 
	  
	  for(i=0;i<land_plots.length;i++)
	    { // create cubes of 9 Land Plots
		 
	  	   for(x=0;x<9;x++) // create a loop within a loop the 9 points of the cube.
		     {
				land_plots[i_step][5] = i; // you now belong to a cube
				land_plots[i_step][6] = x; // you now have a positional number in the cube
				i_step++;
				  if(i_step==land_plots.length)
				  {
					i_step=0;
				   	return
				  };
				  
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
	  }

	}		
	
function drawCubeWrappers()
	{
		var land_cube = (Math.ceil(land_plots.length/9)) // define how many cubes of 9 plots we can make
		 for(i=0;i<land_cube;i++) 
	   		{
			  var newDiv;
			  var my_div;
			  // create a new div element
			  // and give it some content
			  newDiv = document.createElement("div");	  
			  newDiv.style.border = '1px solid red';  
			  newDiv.className= "cubewrapper"+land_plots[i][5];	
			  // add the newly created element and it's content into the DOM
			  my_div = document.getElementById("polygon_map");
			  my_div.appendChild(newDiv);
			}
		
			
		
		
	}
	
function drawLandPlots() 
	{ 
	  for(i=0;i<land_plots.length;i++) 
	    {
	
			  var newDiv;
			  var my_div;
			  // create a new div element
			  // and give it some content
			  newDiv = document.createElement("div");	  
			  newDiv.style.border = '1px solid red';  
			  newDiv.className= "cube"+land_plots[i][5]+" pos"+land_plots[i][6];
			  newDiv.innerHTML = "<p> Plot " + [i+1] + "<br /> Inhabitants:"+ land_plots[i][0] + "<br />Land Cube: " + land_plots[i][5] + "<br />Cube Position : " + land_plots[i][6] + "</p>";
			  	if (land_plots[i][3] == "Tribe")
					{
					 newDiv.innerHTML = "<p> Plot " + i + "<br /> Inhabitants:"+ land_plots[i][0] + "<br />Land Cube: " + land_plots[i][5] + land_plots[i][5] + "<br />Cube Position : " + land_plots[i][6] + "<br /><span> " + land_plots[i][3] + "</span></p>";	
					}
			
			  // add the newly created element and it's content into the DOM
			  my_div = document.getElementById("polygon_map");
			  my_div.appendChild(newDiv);
			  
			
		}

  my_div.style.visibility="visible";
		
		
	}
	

function sortLandPlots() 
	{
	  for(i=0;i<land_plots.length;i++)		
		 	   
			   for(x=0;x<9;x++) // loop the cube so they can be positioned and wrapped with another DIV
		     {
				cubepos[land_plots[i][6]] // the cube position in position absolute terms
			 }
	   
	   
		
		
	}
	
	
function generateTerritory()	
	{
	territory = Math.ceil(inhabitants/40); // The naturalized number of inhabitants on each plot of Land will be on a ratio of 40:1
	document.getElementById('territory').innerHTML = territory;
	
	}


	
	
function showHidePanel(state) 
	{
		if (state=="on")
		  {
			document.getElementById('polygon_map').style.opacity = .15;
			document.getElementById('polygon_map').style.filter  = "alpha(opacity=" + 15 + ")";
		  }
		else if (state=="off")
		  {
			document.getElementById('polygon_map').style.opacity = 1;
			document.getElementById('polygon_map').style.filter  = "alpha(opacity=" + 100 + ")";
		  }		  
	
	}
	
function biggestValue()
	{

	var biggest = land_plots[0]; // set lower than any image width
	for (x=0;x<land_plots.length;x++)
	  {
	if (land_plots[x] > biggest)
		{ // if the value is greater...
	biggest = land_plots[x] // it becomes the "biggest"
		} // and the loop goes on until...
	  }

	alert(biggest);	
	
	
	}