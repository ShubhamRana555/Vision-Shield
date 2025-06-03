import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'licensePlatesDatabase.db');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const db = new sqlite3.Database(dbPath);

// Create users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'USER',
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const register = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        // Check if user exists
        db.get('SELECT id FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error checking user existence'
                });
            }

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            db.run(
                'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
                [email, hashedPassword, name, 'USER'],
                function(err) {
                    if (err) {
                        console.error('Error creating user:', err);
                        return res.status(500).json({
                            success: false,
                            message: 'Error creating user'
                        });
                    }

                    const token = jwt.sign(
                        { id: this.lastID },
                        JWT_SECRET,
                        { expiresIn: '7d' }
                    );

                    res.status(201).json({
                        success: true,
                        message: 'User created successfully',
                        token,
                        user: {
                            id: this.lastID,
                            email,
                            name,
                            role: 'USER'
                        }
                    });
                }
            );
        });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error finding user'
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign(
                { id: user.id },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.image
                }
            });
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const check = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        db.get('SELECT id, email, name, role, image FROM users WHERE id = ?', [decoded.id], (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error finding user'
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Token is valid',
                user
            });
        });
    } catch (error) {
        console.error('Error in check:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

export const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
}; 