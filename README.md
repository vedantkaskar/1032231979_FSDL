# Assign4 – PHP CRUD Demo

Minimal Student Registration CRUD using PHP 8 + MySQL (XAMPP friendly). Features:
- Insert, update (by roll no), delete (by roll no), search and list.
- Server-side validation + client-side JS hints.
- Auto-creates database `assign4_db` and table `students` on first run.

## Quick Start
1) Copy the `Assign4` folder into your XAMPP `htdocs` directory.  
2) Update `config.php` if your MySQL credentials differ (defaults to `root` with empty password).  
3) Start Apache and MySQL from XAMPP Control Panel.  
4) Visit: `http://localhost/Assign4/index.php`  
5) Try inserting a student, then update/delete using the same Roll No.

## Database structure
Table `students`  
```
id INT AUTO_INCREMENT PRIMARY KEY
roll_no VARCHAR(32) UNIQUE NOT NULL
first_name VARCHAR(64) NOT NULL
last_name VARCHAR(64) NOT NULL
password_hash VARCHAR(255) NOT NULL
contact VARCHAR(20) NOT NULL
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

## Changing the domain example
You can adapt the fields for Library / Employee / Flight systems by:
- Tweaking the form fields and validation rules in `index.php`.
- Adjusting the table definition in `config.php`.
- Updating the `INSERT` / `UPDATE` statements to match the new schema.

## Notes
- Passwords are stored hashed (`password_hash`) for safety; adapt as needed for your coursework.
- PDO with prepared statements is used to avoid SQL injection.
- Server-side validation remains the source of truth; JS only improves UX.
