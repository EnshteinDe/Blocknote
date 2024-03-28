const express = require('express');
const { Notes } = require('../db/models');
const {Op} = require('sequelize')
const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    const notes = await Notes.findAll({include: {all: true}});
    res.json(notes);
  })
  .post(async (req, res) => {
    const newNote = await Notes.create({
      ...req.body,
    });
    res.json(newNote);
  });

router
  .route('/find') 
  .get(async (req, res) => {
    res.json([]);
  })  

router
  .route('/find/:text') 
  .get(async (req, res) => {
    const notes = await Notes.findAll({ where: {title: {
      [Op.iLike]: `%${req.params.text}%`
    }}});
    res.json(notes);
  })


router
  .route('/:id')
  .get( async (req, res) => {
    const notes = await Notes.findAll({where: {blocknoteId: req.params.id}})
    res.json(notes)
  })
  .delete(async (req, res) => {
    try {
      await Notes.destroy({ where: { id: req.params.id } });
      res.json(req.params.id);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      await Notes.update({ ...req.body }, { where: { id } });
      const updatedNote = await Notes.findOne({ where: { id } });
      return res.json(updatedNote);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  });

router
  .route('/get-one/:id')
  .get(async (req, res) => {
    const note = await Notes.findOne({ where: {id: req.params.id}});
    res.json(note);
  })

module.exports = router;
