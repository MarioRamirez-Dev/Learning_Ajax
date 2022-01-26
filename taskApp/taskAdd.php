<?php
    include('connectDB.php');

    $name = $_POST['name'];
    $description = $_POST['description'];
    if(isset($name)){
        $query = "INSERT into task(name, description) VALUES ('$name', '$description')";

        $result = mysqli_query($connection,$query);

        if(!$result){
            die('Query Failed');
        }
        else{
            echo ('Task Added Successfully');
        }
    }


?>