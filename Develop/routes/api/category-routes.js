const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catagoriesData = await Category.findAll({
      where: { 
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['product_name'],
      },
    })
    res.status(200).json(catagoriesData);
  } catch (err) {
    if (!catagoriesData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catagoriesData = await Category.findByPk(req.params.id);
    if (!catagoriesData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(catagoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const catagoriesData = await Category.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(catagoriesData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catagoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!catagoriesData[0]) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(catagoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catagoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!catagoriesData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(catagoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
