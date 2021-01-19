const Category = require('../models/Category');
const { ConflictError } = require('../errors');

class CategoryController {
    async createCategory(name) {
        const [category, hasBeenCreated] = await Category.findOrCreate({ where: { name } });
        if (!hasBeenCreated) throw new ConflictError('Category already exists');

        return category;
    }
}

module.exports = new CategoryController();