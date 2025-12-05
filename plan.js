const express = require('express');
const router = express.Router(); // Create a router instance
const Plan = require('../models/Plan'); // Import MongoDB collection

// display all plans on the home page
router.get('/', async (req, res) => {
  try {
    // fetch all plans from MongoDB
    const plans = await Plan.find().sort({ dateCreated: -1 });
    //renders index.ejs and passes plans data
    res.render('index', { plans });
  } catch (err) {
    console.error(err);
    //if error redirect to home
    res.redirect('/');
  }
});

// Create plan form
router.get('/create', (req, res) => {
  res.render('create'); //renders create.ejs
});

// Create new plan
router.post('/create', async (req, res) => {
  try {
    const { title, destination, content, imageURL } = req.body;
    const finalImageURL = imageURL || '/images/image1.png'; // default image if none provided
    await Plan.create({ title, destination, content, imageURL: finalImageURL });
    //redirest to home after creation
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/create'); //redirect back to create form on error
  }
});

// Edit plan form
router.get('/edit/:id', async (req, res) => {
  try {
    //find plan by ID
    const plan = await Plan.findById(req.params.id);
    //renders edit.ejs with plan data
    res.render('edit', { plan });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Update plan
router.put('/edit/:id', async (req, res) => {
  try {
    const { title, destination, content, imageURL } = req.body;
    //update plan by ID
    await Plan.findByIdAndUpdate(req.params.id, { title, destination, content, imageURL });
    res.redirect('/'); //redirect to home after update
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Delete confirmation page
router.get('/delete/:id', async (req, res) => {
  try {
    //find plan by ID
    const plan = await Plan.findById(req.params.id);
    //renders delete.ejs with plan data
    res.render('delete', { plan });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Delete plan
router.delete('/delete/:id', async (req, res) => {
  try {
    //delete plan by ID
    await Plan.findByIdAndDelete(req.params.id);
    //redirect to home after deletion
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router; // Export the router
