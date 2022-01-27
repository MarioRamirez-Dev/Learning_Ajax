<?php
    include('connectDB.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "UPDATE task  SET name = '$name', description = '$description' WHERE  id = '$id'";
    $result = mysqli_query($connection, $query);

    if(!$result){
        die('Query Failed');
    }

    echo "UPDATE TASK SUCCESSFULLY";



?>