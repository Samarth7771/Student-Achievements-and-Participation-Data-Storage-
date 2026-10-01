<?php
$successMessage = '';
if (isset($_GET['success']) && $_GET['success'] === '1') {
    $successMessage = 'Student record saved successfully.';
}

$records = [];
$recordsFile = __DIR__ . '/data/students.txt';
if (file_exists($recordsFile)) {
    $lines = file($recordsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $parts = explode('||', $line);
        if (count($parts) >= 9) {
            $records[] = [
                'student_name' => $parts[0],
                'roll_number' => $parts[1],
                'department' => $parts[2],
                'category' => $parts[3],
                'event_name' => $parts[4],
                'level' => $parts[5],
                'date' => $parts[6],
                'result' => $parts[7],
                'description' => $parts[8],
            ];
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Achievements & Participation</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="container">
        <header class="header">
            <div>
                <p class="small-title">University Student Records</p>
                <h1>Student Achievements & Participation</h1>
            </div>
        </header>

        <div class="main-grid">
            <section class="card form-card">
                <h2>Add Achievement Record</h2>

                <?php if ($successMessage): ?>
                    <div class="success-box"><?php echo htmlspecialchars($successMessage); ?></div>
                <?php endif; ?>

                <form action="save.php" method="POST" enctype="multipart/form-data">
                    <div class="two-col">
                        <div class="field">
                            <label for="student_name">Student Name</label>
                            <input type="text" id="student_name" name="student_name" placeholder="Enter full name" required />
                        </div>
                        <div class="field">
                            <label for="roll_number">Roll Number</label>
                            <input type="text" id="roll_number" name="roll_number" placeholder="e.g. FYIT-101" required />
                        </div>
                    </div>

                    <div class="two-col">
                        <div class="field">
                            <label for="department">Department / Class</label>
                            <input type="text" id="department" name="department" placeholder="e.g. FYIT / BSc IT" required />
                        </div>
                        <div class="field">
                            <label for="category">Category</label>
                            <select id="category" name="category" required>
                                <option value="Academic">Academic</option>
                                <option value="Technical">Technical</option>
                                <option value="Sports">Sports</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Extracurricular">Extracurricular</option>
                            </select>
                        </div>
                    </div>

                    <div class="two-col">
                        <div class="field">
                            <label for="event_name">Event / Competition</label>
                            <input type="text" id="event_name" name="event_name" placeholder="e.g. Hackathon" required />
                        </div>
                        <div class="field">
                            <label for="level">Level</label>
                            <select id="level" name="level" required>
                                <option value="College">College</option>
                                <option value="University">University</option>
                                <option value="State">State</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </select>
                        </div>
                    </div>

                    <div class="two-col">
                        <div class="field">
                            <label for="date">Date</label>
                            <input type="date" id="date" name="date" required />
                        </div>
                        <div class="field">
                            <label for="result">Position / Result</label>
                            <input type="text" id="result" name="result" placeholder="e.g. Winner / 1st Place" required />
                        </div>
                    </div>

                    <div class="field">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="4" placeholder="Briefly describe the achievement or participation..." required></textarea>
                    </div>

                    <div class="field">
                        <label for="document">Upload Certificate / Document</label>
                        <input type="file" id="document" name="document" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                    </div>

                    <button type="submit" class="submit-btn">Save Record</button>
                </form>
            </section>

            <section class="card records-card">
                <h2>Stored Records</h2>

                <?php if (empty($records)): ?>
                    <p class="empty-text">No student records added yet.</p>
                <?php else: ?>
                    <div class="record-list">
                        <?php foreach ($records as $record): ?>
                            <article class="record-item">
                                <div class="record-header">
                                    <h3><?php echo htmlspecialchars($record['student_name']); ?></h3>
                                    <span class="badge"><?php echo htmlspecialchars($record['category']); ?></span>
                                </div>
                                <p class="meta">
                                    <?php echo htmlspecialchars($record['roll_number']); ?> |
                                    <?php echo htmlspecialchars($record['department']); ?> |
                                    <?php echo htmlspecialchars($record['level']); ?>
                                </p>
                                <p><strong>Event:</strong> <?php echo htmlspecialchars($record['event_name']); ?></p>
                                <p><strong>Result:</strong> <?php echo htmlspecialchars($record['result']); ?></p>
                                <p><strong>Date:</strong> <?php echo htmlspecialchars($record['date']); ?></p>
                                <p><?php echo htmlspecialchars($record['description']); ?></p>
                            </article>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </section>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
