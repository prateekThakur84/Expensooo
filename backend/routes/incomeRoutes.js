const express = require('express');
const { addIncome, getAllIncomes, deleteIncome, downloadIncomeExcel } = require('../controllers/incomeController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncomes);
router.delete('/:id', protect, deleteIncome);
router.get('/downloadexcel', protect, downloadIncomeExcel);

module.exports = router;