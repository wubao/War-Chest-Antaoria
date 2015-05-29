// WAR CHEST

/*function generateTable()
	{
	var oCell = document.generateTable.columns.value;
	var oRow = document.generateTable.rows.value;	
	oCell = parseInt(oCell);
	oRow = parseInt(oRow);	

	} */

function fnInit()
{
	
	var cols = document.generateTable.columns.value;
	var rows = document.generateTable.rows.value;	
	cols = parseInt(cols);
	rows = parseInt(rows);	
    var l = (cols*rows);
 // alert(l);		
		
  // Declare variables and create the header, footer, and caption.
  var oTable = document.createElement("TABLE");
  var oTBody = document.createElement("TBODY");
  var oRow, oCell;
  var i, j;

  // Insert the created elements into oTable.
  oTable.appendChild(oTBody);
  
  // Set the table's border width and colors.
  oTable.border=1;
  oTable.bgColor="lightslategray";
  
  // Insert rows and cells into bodies.
  for (i=0; i<rows; i++)
  {
    var oBody = (i<2) ? oTBody : oTBody;
    oRow = document.createElement("TR");
    oBody.appendChild(oRow);
    for (j=0; j<cols; j++)
    {
      oCell = document.createElement("TD");
 	  oCell.setAttribute('id','element'+l);	  
      oCell.innerHTML = "cell "+l;
      oRow.appendChild(oCell);
	  l--;
    }
  }
  
  // Insert the table into the document tree.
  document.getElementById('oTableContainer').appendChild(oTable);
}