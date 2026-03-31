<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;charset=utf8mb4', 'pma', '');
    echo "OK";
} catch (Exception $e) {
    echo $e->getMessage();
}
