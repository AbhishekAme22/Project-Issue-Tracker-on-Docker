USE issue_tracker;

CREATE TABLE issues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectName VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  priority INT,
  added TIMESTAMP,
  lastUpdated TIMESTAMP
);
