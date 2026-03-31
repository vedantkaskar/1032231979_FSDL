<?php
require_once __DIR__ . '/config.php';

$pdo = get_pdo();
$errors = [];
$success = '';

// Sanitize helper
function input(string $key, ?array $source = null): string
{
    $source = $source ?? $_POST;
    return isset($source[$key]) ? trim($source[$key]) : '';
}

// Simple server-side validation
function validate_student(array $data, bool $checkPassword = true): array
{
    $errors = [];
    if ($data['first_name'] === '')
        $errors[] = 'First name is required.';
    if ($data['last_name'] === '')
        $errors[] = 'Last name is required.';
    if ($data['roll_no'] === '')
        $errors[] = 'Roll No/ID is required.';
    if (!preg_match('/^[A-Za-z0-9_-]{2,32}$/', $data['roll_no'])) {
        $errors[] = 'Roll number should be 2-32 characters (letters, numbers, underscore, dash).';
    }
    if (!preg_match('/^[0-9]{7,15}$/', $data['contact'])) {
        $errors[] = 'Contact number should be 7-15 digits.';
    }
    if ($checkPassword) {
        if ($data['password'] === '' || $data['confirm_password'] === '') {
            $errors[] = 'Password and Confirm Password are required.';
        } elseif ($data['password'] !== $data['confirm_password']) {
            $errors[] = 'Password and Confirm Password must match.';
        } elseif (strlen($data['password']) < 6) {
            $errors[] = 'Password must be at least 6 characters.';
        }
    }
    return $errors;
}

// Handle operations
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($requestMethod === 'POST') {
    $action = input('action');
    $rollNo = input('roll_no');

    if ($action === 'create') {
        $data = [
            'first_name' => input('first_name'),
            'last_name' => input('last_name'),
            'roll_no' => $rollNo,
            'contact' => input('contact'),
            'password' => input('password'),
            'confirm_password' => input('confirm_password'),
        ];
        $errors = validate_student($data);
        if (!$errors) {
            $stmt = $pdo->prepare('INSERT INTO students (roll_no, first_name, last_name, password_hash, contact) VALUES (?, ?, ?, ?, ?)');
            try {
                $stmt->execute([
                    $data['roll_no'],
                    $data['first_name'],
                    $data['last_name'],
                    password_hash($data['password'], PASSWORD_DEFAULT),
                    $data['contact'],
                ]);
                $success = 'Student added successfully.';
            } catch (PDOException $e) {
                if ($e->getCode() === '23000') {
                    $errors[] = 'Roll number already exists.';
                } else {
                    $errors[] = 'Insert failed: ' . $e->getMessage();
                }
            }
        }
    } elseif ($action === 'update') {
        $data = [
            'first_name' => input('first_name'),
            'last_name' => input('last_name'),
            'roll_no' => $rollNo,
            'contact' => input('contact'),
        ];
        $errors = validate_student(array_merge($data, ['password' => 'x', 'confirm_password' => 'x']), false);
        if (!$errors) {
            $stmt = $pdo->prepare('UPDATE students SET first_name=?, last_name=?, contact=? WHERE roll_no=?');
            $stmt->execute([$data['first_name'], $data['last_name'], $data['contact'], $data['roll_no']]);
            if ($stmt->rowCount()) {
                $success = 'Student updated successfully.';
            } else {
                $errors[] = 'No record found with that Roll No.';
            }
        }
    } elseif ($action === 'delete') {
        if ($rollNo === '') {
            $errors[] = 'Roll No/ID is required to delete.';
        } else {
            $stmt = $pdo->prepare('DELETE FROM students WHERE roll_no = ?');
            $stmt->execute([$rollNo]);
            if ($stmt->rowCount()) {
                $success = 'Student deleted successfully.';
            } else {
                $errors[] = 'No record found with that Roll No.';
            }
        }
    }
}

// Fetch students (optionally filtered)
$filterRoll = input('search_roll', $_GET);
if ($filterRoll !== '') {
    $stmt = $pdo->prepare('SELECT * FROM students WHERE roll_no LIKE ? ORDER BY created_at DESC');
    $stmt->execute(['%' . $filterRoll . '%']);
    $students = $stmt->fetchAll();
} else {
    $students = $pdo->query('SELECT * FROM students ORDER BY created_at DESC')->fetchAll();
}
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Student CRUD (PHP + MySQL)</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 24px;
            background: #f5f7fb;
            color: #222;
        }

        h1 {
            margin-bottom: 8px;
        }

        form {
            background: #fff;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
            margin-bottom: 16px;
        }

        label {
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
        }

        input[type=text],
        input[type=password],
        input[type=date],
        input[type=number] {
            width: 100%;
            padding: 8px;
            margin-bottom: 12px;
            border: 1px solid #ccd2da;
            border-radius: 4px;
        }

        .row {
            display: flex;
            gap: 12px;
        }

        .row .col {
            flex: 1;
        }

        .actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        button {
            padding: 10px 14px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .primary {
            background: #1f7aec;
            color: white;
        }

        .warn {
            background: #f0ad4e;
            color: #fff;
        }

        .danger {
            background: #e74c3c;
            color: #fff;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #e3e6eb;
            text-align: left;
        }

        th {
            background: #f0f4f8;
        }

        .message {
            margin-bottom: 12px;
            padding: 10px;
            border-radius: 4px;
        }

        .error {
            background: #fdecea;
            color: #c0392b;
        }

        .success {
            background: #e6f4ea;
            color: #1e7d34;
        }

        .note {
            font-size: 13px;
            color: #555;
        }
    </style>
</head>

<body>
    <h1>Student Registration CRUD</h1>
    <p class="note">Uses PHP PDO + MySQL. Update DB credentials in <code>config.php</code> and place this folder inside
        XAMPP <code>htdocs</code>.</p>

    <?php if ($errors): ?>
        <div class="message error">
            <?= implode('<br>', array_map('htmlspecialchars', $errors)) ?>
        </div>
    <?php elseif ($success): ?>
        <div class="message success"><?= htmlspecialchars($success) ?></div>
    <?php endif; ?>

    <form id="studentForm" method="post" novalidate>
        <div class="row">
            <div class="col">
                <label for="first_name">First Name*</label>
                <input type="text" name="first_name" id="first_name" required>
            </div>
            <div class="col">
                <label for="last_name">Last Name*</label>
                <input type="text" name="last_name" id="last_name" required>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for="roll_no">Roll No/ID*</label>
                <input type="text" name="roll_no" id="roll_no" required>
            </div>
            <div class="col">
                <label for="contact">Contact Number*</label>
                <input type="text" name="contact" id="contact" required pattern="\\d{7,15}">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for="password">Password*</label>
                <input type="password" name="password" id="password" minlength="6">
            </div>
            <div class="col">
                <label for="confirm_password">Confirm Password*</label>
                <input type="password" name="confirm_password" id="confirm_password" minlength="6">
            </div>
        </div>
        <div class="actions">
            <button class="primary" type="submit" name="action" value="create">Insert</button>
            <button class="warn" type="submit" name="action" value="update">Update (by Roll No)</button>
            <button class="danger" type="submit" name="action" value="delete">Delete (by Roll No)</button>
        </div>
    </form>

    <form method="get" style="margin-bottom:16px;">
        <label for="search_roll">Search by Roll No</label>
        <div class="row">
            <div class="col">
                <input type="text" name="search_roll" id="search_roll" value="<?= htmlspecialchars($filterRoll) ?>">
            </div>
            <div class="col" style="max-width:160px;">
                <button class="primary" type="submit">Search</button>
            </div>
        </div>
    </form>

    <table>
        <thead>
            <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Created</th>
                <th>Updated</th>
            </tr>
        </thead>
        <tbody>
            <?php if (!$students): ?>
                <tr>
                    <td colspan="5">No records found.</td>
                </tr>
            <?php else: ?>
                <?php foreach ($students as $s): ?>
                    <tr>
                        <td><?= htmlspecialchars($s['roll_no']) ?></td>
                        <td><?= htmlspecialchars($s['first_name'] . ' ' . $s['last_name']) ?></td>
                        <td><?= htmlspecialchars($s['contact']) ?></td>
                        <td><?= htmlspecialchars($s['created_at']) ?></td>
                        <td><?= htmlspecialchars($s['updated_at']) ?></td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>

    <script>
        // Client-side validation for quicker feedback (keeps server-side as source of truth)
        document.getElementById('studentForm').addEventListener('submit', function (e) {
            const action = e.submitter?.value;
            const roll = document.getElementById('roll_no').value.trim();
            const contact = document.getElementById('contact').value.trim();
            const pass = document.getElementById('password').value;
            const confirm = document.getElementById('confirm_password').value;
            const errors = [];

            if (!roll) errors.push('Roll No is required.');
            if (!/^[A-Za-z0-9_-]{2,32}$/.test(roll)) errors.push('Roll No should be 2-32 letters/numbers/_/-.');
            if (!/^[0-9]{7,15}$/.test(contact)) errors.push('Contact must be 7-15 digits.');

            if (action === 'create') {
                if (pass.length < 6) errors.push('Password must be at least 6 chars.');
                if (pass !== confirm) errors.push('Passwords must match.');
            }
            if (errors.length) {
                e.preventDefault();
                alert(errors.join('\\n'));
            }
        });
    </script>
</body>

</html>