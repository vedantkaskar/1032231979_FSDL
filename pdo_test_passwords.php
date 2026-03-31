<?php
$users = [['root',''], ['root','root'], ['root','xampp'], ['root','password'], ['root','123456'], ['root','12345678'], ['root','mysql']];
foreach ($users as $u) {
    list($user,$pass) = $u;
    try {
        $pdo = new PDO('mysql:host=127.0.0.1;charset=utf8mb4', $user, $pass);
        echo "SUCCESS: $user / $pass\n";
        break;
    } catch (Exception $e) {
        echo "FAIL: $user / $pass => " . $e->getMessage() . "\n";
    }
}
