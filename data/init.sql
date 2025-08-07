CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE
);

INSERT INTO posts (title, content, date) VALUES
('First Steps', 'We were overjoyed when the twins took their first steps.', '2021-06-15'),
('First Run', 'They ran across the yard laughing; a proud moment.', '2021-09-10'),
('First Bike Ride', 'Watching them cycle for the first time filled our hearts.', '2022-04-20');
