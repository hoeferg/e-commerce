const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const catagoriesData = await Product.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id'],
    }
  }).catch((err) => {
    res.json(err);
  });
  res.json(catagoriesData);

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const catagoriesData = await Product.findByPk({
      req.params.id;
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      }
    });
    if (!catagoriesData) {
      res.status(404).json({ message: 'No Product with this id!' });
      return;
    }
    res.status(200).json(catagoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const catagoriesData = await Product.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(catagoriesData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const catagoriesData= await Product.findByPk(req.params.id);
    if (!catagoriesData) {
      res.status(404).json({ message: 'No Product with this id!' });
      return;
    }
    res.status(200).json(catagoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const catagoriesData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!catagoriesData) {
      res.status(404).json({ message: 'No Product with this id!' });
      return;
    }
    res.status(200).json(catagoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
