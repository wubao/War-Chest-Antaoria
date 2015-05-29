<?php

/**
 * @author Tony Eleninovski 
 * @copyright 2009
 */

# posts arrayed attribute variables #
$username = check_input($_POST['username']);
$password = check_input($_POST['password']);
$kingdom = check_input($_POST['kingdom']);
$ruler_type = check_input($_POST['ruler_type']);
$ruler_bonus = check_input($_POST['ruler_bonus']);

$inhabitants = check_input($_POST['inhabitants']);
$territory = check_input($_POST['land_plots']);
$tribes = check_input($_POST['tribes']);


$ruler_bonus = explode(",", $ruler_bonus);


// we connect 
$link = mysql_connect('localhost', 'root', "");
if (!$link) {
	die('ERROR: Could not connect. ' . mysql_error());
}
// make player profiles the current database
$db_selected = mysql_select_db('war_chest', $link);
if (!$db_selected) {
	die('<p>unable to locate the database</p>');
	}


/* Insertion into User Table */
mysql_query ("INSERT INTO `war_chest`.`users` (
`username` ,
`password` ,
`user_id`
)
VALUES (
'$username', '$password', NULL
);")

or die(mysql_error());  

$iLastID = mysql_insert_id(); // obtain the last auto incremented ID

mysql_query ("INSERT INTO `war_chest`.`ruler` (
`user_id` ,
`Kingdom` ,
`Ruler Type` ,
`Attack Bonus` ,
`Defense Bonus` ,
`Trade Bonus` ,
`Resources Bonus` ,
`Expansion Bonus` 
)
VALUES (
'$iLastID', '$kingdom', '$ruler_type', $ruler_bonus[0], $ruler_bonus[1], $ruler_bonus[2], $ruler_bonus[3], $ruler_bonus[4]
);")

or die(mysql_error()); 

/* Insertion into Territory Object Table */
mysql_query ("INSERT INTO `war_chest`.`territory` (
`Inhabitants` ,
`Resources` ,
`Ruler` ,
`Land Mass` ,
`Ownership` ,
`id`
)
VALUES (
'$inhabitants', NULL , NULL , NULL , NULL , NULL
);")

or die(mysql_error());  

/* Insertion into World Object Table */
mysql_query ("INSERT INTO `war_chest`.`world` (
`id` ,
`Territory`
)
VALUES (
NULL , '$territory'
);")

or die(mysql_error());  



$result =mysql_query("
SELECT 
  users.username,
  users.password,
  ruler.Kingdom,
  ruler.`Ruler Type`
FROM
  ruler,
  users
WHERE
  users.user_id = ruler.user_id")

or die(mysql_error());

// Print out the contents of each row into a table 
while($row = mysql_fetch_array($result)){
	echo $row['username']. " - ". $row['password']. " - ". $row['Kingdom']. " - ". $row['Ruler Type'];
	echo "<br />";
}

  
mysql_close($link);

?>


<?php
function check_input($data, $problem='')
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if ($problem && strlen($data) == 0)
    {
        show_error($problem);
    }
    return $data;
}

function show_error($myError)
{
?>
    <html>
    <body>

    <b>Please correct the following error:</b><br />
    <?php echo $myError; ?>

    </body>
    </html>
<?php
exit();
}
?>