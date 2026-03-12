const express = require('express')
const router = express.Router()

function generateReference(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

// Start page
router.get('/', function (req, res) {
  res.render('start')
})

// Is your child of school age (4 to 16 years old)?
router.get('/child-school-age', function (req, res) {
  res.render('child-school-age', { errors: null, data: req.session.data })
})

router.post('/child-school-age', function (req, res) {
  const answer = req.session.data['child-school-age']
  if (!answer || answer.trim() === '') {
    return res.render('child-school-age', {
      errors: { 'child-school-age': 'Select yes if your child is of school age' },
      data: req.session.data
    })
  }

  if (answer === 'No') {
    return res.redirect('/ineligible-child-school-age')
  }
  res.redirect('/child-name')
})

// Ineligible — child-school-age
router.get('/ineligible-child-school-age', function (req, res) {
  res.render('ineligible-child-school-age')
})

// What is your child\'s full name?
router.get('/child-name', function (req, res) {
  res.render('child-name', { errors: null, data: req.session.data })
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || answer.trim() === '') {
    return res.render('child-name', {
      errors: { 'child-name': 'Enter your child\'s full name' },
      data: req.session.data
    })
  }

  res.redirect('/child-date-of-birth')
})

// What is your child\'s date of birth?
router.get('/child-date-of-birth', function (req, res) {
  res.render('child-date-of-birth', { errors: null, data: req.session.data })
})

router.post('/child-date-of-birth', function (req, res) {
  const answer = req.session.data['child-date-of-birth']
  if (!answer || answer.trim() === '') {
    return res.render('child-date-of-birth', {
      errors: { 'child-date-of-birth': 'Enter your child\'s date of birth' },
      data: req.session.data
    })
  }

  res.redirect('/parent-national-insurance')
})

// What is your National Insurance number?
router.get('/parent-national-insurance', function (req, res) {
  res.render('parent-national-insurance', { errors: null, data: req.session.data })
})

router.post('/parent-national-insurance', function (req, res) {
  const answer = req.session.data['parent-national-insurance']
  if (!answer || answer.trim() === '') {
    return res.render('parent-national-insurance', {
      errors: { 'parent-national-insurance': 'Enter your National Insurance number' },
      data: req.session.data
    })
  }

  res.redirect('/receive-benefits')
})

// Do you receive any qualifying benefits?
router.get('/receive-benefits', function (req, res) {
  res.render('receive-benefits', { errors: null, data: req.session.data })
})

router.post('/receive-benefits', function (req, res) {
  const answer = req.session.data['receive-benefits']
  if (!answer || answer.trim() === '') {
    return res.render('receive-benefits', {
      errors: { 'receive-benefits': 'Select yes if you receive any qualifying benefits' },
      data: req.session.data
    })
  }

  res.redirect('/check-answers')
})

// Check answers
router.get('/check-answers', function (req, res) {
  res.render('check-answers', { data: req.session.data })
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

// Confirmation
router.get('/confirmation', function (req, res) {
  res.render('confirmation', { data: req.session.data })
})

module.exports = router
