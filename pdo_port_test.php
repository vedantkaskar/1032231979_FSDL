<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;port=3307;charset=utf8mb4', 'root', '');
    echo "OK\n";
} catch (Exception $e) {
    echo $e->getMessage() . "\n";
}
