const { Category } = require('../models');

class CategoryRepository {
  async findAll() {
    const categories = await Category.findAll();

    return categories;
  }

  async create(_category) {
    const categoryCreated = await Category.create({
      name: _category.name,
    });

    return categoryCreated;
  }

  async update(_category) {
    const categoryUpdated = await Category.update({
      name: _category.name,
    }, {
      where: {
        id: _category.id,
      },
    });

    return categoryUpdated;
  }

  async delete(_id) {
    const categoryDeleted = await Category.destroy({
      where: {
        id: _id,
      },
    });

    return categoryDeleted;
  }
}

module.exports = new CategoryRepository();
