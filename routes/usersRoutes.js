const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { getToken, checkToken, allowRoles } = require('../middleware/Authentication');
const Users = require('../models/Users');
const ROLES = require('../constants/roles');

// Subscriber Registration
router.post('/register/subscriber', async (req, res) => {
    const { first_name, last_name, phone_number, email_address, password, profile_pic } = req.body;

    try {
        const existingUser = await Users.findOne({ email_address });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            first_name,
            last_name,
            phone_number,
            email_address,
            password: hashedPassword,
            profile_pic,
            role: ROLES.SUBSCRIBER,
            is_active: true
        });

        await newUser.save();
        res.status(201).json({ message: 'Subscriber registered', user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Registration
router.post('/register/admin', async (req, res) => {
    const { first_name, last_name, phone_number, email_address, password, profile_pic } = req.body;

    try {
        const existingUser = await Users.findOne({ email_address });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            first_name,
            last_name,
            phone_number,
            email_address,
            password: hashedPassword,
            profile_pic,
            role: ROLES.ADMIN,
            is_active: true
        });

        await newUser.save();
        res.status(201).json({ message: 'Admin registered', user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Subscriber Login
router.post('/login/subscriber', async (req, res) => {
    console.log(req);
    const { email_address, password } = req.body;

    try {
        const user = await Users.findOne({ email_address });
        if (!user || user.role !== ROLES.SUBSCRIBER ) {
            return res.status(401).json({ message: 'Invalid subscriber credentials', status: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password', status: false });

        const token = getToken(user);
        res.json({ message: 'Subscriber logged in', user, accessToken: token , status: true});
    } catch (err) {
        res.status(500).json({ message: err.message, status: false });
    }
});

// Admin Login
router.post('/login/admin', async (req, res) => {
    const { email_address, password } = req.body;

    try {
        const user = await Users.findOne({ email_address });
        if (!user || ![ROLES.ADMIN, ROLES.SUPERADMIN ].includes(user.role)) {
            return res.status(401).json({ message: 'Invalid admin credentials', status: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password', status: false });

        const token = getToken(user);
        res.json({ message: 'Admin logged in', user, accessToken: token, status: true });
    } catch (err) {
        res.status(500).json({ message: err.message, status: false });
    }
});

// -------Protected Routes--------- //

router.use(checkToken);

// Get all
router.get('/', async(req, res) => {
    try{
        const users = await Users.find();
        console.log(123)
        res.json(users);
    }
    catch(err){
        res.status(500).json({ message: err.message});
    }
});

// Get by id
router.get('/:id', async(req, res) => {
    try{
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User is not found' });
        res.json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message});
    }
});

// Update
router.put('/:id', async (req, res) => {
    const { first_name, last_name, phone_number, email_address, password, profile_pic, role, is_active } = req.body;
    try {
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User is not found' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user.first_name = first_name;
        user.last_name = last_name;
        user.phone_number = phone_number;
        user.email_address = email_address;
        user.password = hashedPassword;
        user.profile_pic = profile_pic;
        user.role = role;
        user.is_active = is_active;

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', allowRoles(ROLES.ADMIN, ROLES.SUPERADMIN), async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User is not found' });

        await user.deleteOne();
        res.json({ message: 'User is deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;