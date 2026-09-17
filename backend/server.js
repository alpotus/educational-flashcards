
// Import Express framework
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Temporary in-memory storage (We will link a real SQL database next)
let flashcardSets = [
    {
        id: 1,
        title: "JavaScript Basics",
        cards: [
            { front: "What is JavaScript?", back: "A programming language used to make web pages interactive." },
            { front: "How do you declare a variable?", back: "Using let, const, or var." }
        ],
        likes: 14,
        comments: [
            { username: "Learner99", text: "This helped a lot!" },
            { username: "CodeNinja", text: "Clear and concise." }
        ]
    }
];

// 1. API Route: Get all flashcard sets (for the public feed)
app.get('/api/sets', (req, res) => {
    res.json(flashcardSets);
});

// 2. API Route: Create a new flashcard set (from Admin Dashboard)
app.post('/api/sets', (req, res) => {
    const { title, front, back } = req.body;
    
    if (!title || !front || !back) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const newSet = {
        id: flashcardSets.length + 1,
        title: title,
        cards: [
            { front: front, back: back }
        ],
        likes: 0,
        comments: []
    };

    flashcardSets.push(newSet);
    res.json({ success: true, message: "Flashcard set created successfully!", set: newSet });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
