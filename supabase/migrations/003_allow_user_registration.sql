-- Allow user registration (insert into users table)
DROP POLICY IF EXISTS "Allow user registration" ON users;
CREATE POLICY "Allow user registration" ON users FOR INSERT WITH CHECK (true);