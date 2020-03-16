<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


    /* server timezone */
    date_default_timezone_set("Asia/Dhaka");

    // Here Only store the info of Client Data and 
    $servername = "localhost";
    $username = "root";;
    $password = "";
    $dbname = "panel"; 


    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // get data from angular
    $data = file_get_contents('php://input'); // put the contents of the file into a variable
    $receive = json_decode($data); // decode the JSON feed
    
    // Get the bill
    $sql  = $receive->sql;

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    if ($conn->query($sql) === TRUE) 
    {
        $myArray[] = ["status" => "Done"];
        echo json_encode($myArray);
    } else {
       $myArray[] = ["status" => "Problem"];
        echo json_encode($myArray);
    }
    
    $conn->close();
?> 