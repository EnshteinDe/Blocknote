const express = require('express');
const { Blocknotes } = require('../db/models');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    const blocknotes = await Blocknotes.findAll({ include: { all: true } });
    res.json(blocknotes);
  })
  .post(async (req, res) => {
    const newBlocknote = await Blocknotes.create(
      {
        ...req.body,
        userId: req.session?.user?.id || 1,
        Notes: [],
      },
      { where: { include: { all: true } } }
    );
    res.json(newBlocknote);
  });

router
  .route('/:id')
  .delete(async (req, res) => {
    try {
      const blocknote = await Blocknotes.findOne({
        where: { id: req.params.id },
        include: { all: true },
      });
      await blocknote.destroy();
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      await Blocknotes.update({ ...req.body }, { where: { id } });
      const updatedBlocknote = await Blocknotes.findOne({ where: { id } });
      return res.json(updatedBlocknote);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  });

module.exports = router;
