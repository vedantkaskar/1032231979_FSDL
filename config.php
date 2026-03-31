<?php
// Database configuration for the CRUD demo.
// Update these constants to match your local MySQL credentials.
const DB_HOST = 'localhost';
const DB_PORT = 3307;
const DB_NAME = 'assign4_db';
const DB_USER = 'root';
const DB_PASS = '';

/**
 * Get a PDO connection; create database/table on first run.
 */
function get_pdo(): PDO
{
    $dsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Create database and table if they do not exist.
    $pdo->exec('CREATE DATABASE IF NOT EXISTS `' . DB_NAME . '`');
    $pdo->exec('USE `' . DB_NAME . '`');
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            roll_no VARCHAR(32) NOT NULL UNIQUE,
            first_name VARCHAR(64) NOT NULL,
            last_name VARCHAR(64) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            contact VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );

    return $pdo;
}
