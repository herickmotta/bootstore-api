const Category = require('../models/Category');
const { ConflictError, NotFoundError } = require('../errors');

class CategoriesController {
    async createCategory(name) {
        const [category, hasBeenCreated] = await Category.findOrCreate({ where: { name } });
        if (!hasBeenCreated) throw new ConflictError('Category already exists');

        return category;
    }

    getAll(limit = null, offset = null) {
        return Category.findAll({limit,offset});
    }

    async editCategory(id, name) {
        const category = await Category.findByPk(id);
        if (!category) throw new NotFoundError('Category not found');
        
        category.name = name;
        await category.save();

        return category;
    }

    async deleteCategory(id) {
        const category = await Category.findByPk(id);
        if(!category) throw new NotFoundError('Category not found');

        await category.destroy();
    }
}

module.exports = new CategoriesController();