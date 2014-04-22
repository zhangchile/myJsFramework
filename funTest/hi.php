<?php 
if($_SERVER['REQUEST_METHOD']=="POST") {
    sleep(2);
    echo $_POST['par'], ' ',$_POST['par2'];
} else {
    sleep(5);
    echo 'hi all, i am late  ', $_SERVER['REQUEST_METHOD'];
}

?>