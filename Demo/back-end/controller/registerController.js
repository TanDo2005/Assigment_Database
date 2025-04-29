import bcrypt from 'bcryptjs';
import { sql } from '../config/db.js';


export const doingNothing = (req, res) => {
  res.send('Doing nothing');
}



export const register = async (req, res) => {
  // (username, password, dateofbirth, address, phone, email)

  const { Username, Password, DateOfBirth, Address, Phone, Email } = req.body;

  if (!DateOfBirth || !Username || !Password || !Address || !Phone || !Email ) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  // Kiểm tra định dạng dữ liệu
  if (!Username.match(/^[a-zA-Z0-9]+$/)) {
    return res.status(400).json({ success: false, message: 'Username can only contain letters and numbers' });
  }
  if (Password.length < 6 || Password.length > 20) {
    return res.status(400).json({ success: false, message: 'Password must be between 6 and 20 characters long' });
  }
  if (!Email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  try {
    // Kiểm tra xem Username đã tồn tại chưa
    const existingUser = await sql`
      SELECT "customerid", "username", "password", "email" 
      FROM "User" 
      WHERE "username" = ${Username}
    `;

    if (existingUser.length > 0) {
      console.log('Username already exists:', existingUser[0]);
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert the new user into the database
    const newUser = await sql`
      INSERT INTO "User" (username, password, dateofbirth, address, phone, email)
      VALUES (${Username}, ${Password}, ${DateOfBirth}, ${Address}, ${Phone}, ${Email})
      RETURNING customerid, username, email, dateofbirth
    `;

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser[0].customerid,
        username: newUser[0].username,
        email: newUser[0].email,
        dateOfBirth: newUser[0].dateofbirth
      }
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};