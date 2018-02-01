import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // Replace this with an actual fetch from a database
  return res.json([
    {
      id: 1,
      text: 'Learn React',
      completed: true
    },
    {
      id: 2,
      text: 'Learn Redux',
      completed: true
    },
    {
      id: 3,
      text: 'Start an app',
      completed: true
    },
    {
      id: 4,
      text: 'Make it universally rendered',
      completed: true
    },
    {
      id: 5,
      text: 'Enable code splitting',
      completed: true
    },
    {
      id: 6,
      text: 'Build a kick ass app',
      completed: false
    }
  ]);
});

export default router;
