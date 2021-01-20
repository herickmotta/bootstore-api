const Product = require('../models/Product');
const { ConflictError, NotFoundError } = require('../errors');
const CategoryProduct = require('../models/CategoryProduct');
const Category = require('../models/Category');

class ProductController {
    async createProduct(productData) {
        console.log(productData);
        const product = await Product.create(productData);
        //if (!hasBeenCreated) throw new ConflictError('Product already exists');

        return product;
    }

    getAll(limit = null,offset = null) {
        return Product.findAll({
            limit,
            offset,
            include: [{
                model: Category,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }]
        });
    }

    async getProductById(id) {
        const product = await Product.findByPk(id);
        if (!product) throw new NotFoundError('Product not found');

        return product;
    }

    async editProduct(id, productData) {
        const { name, price, description, units, mainPicture } = productData;
        const product = await Product.findByPk(id);
        if (!product) throw new NotFoundError('Product not found');

        if (name) {
            product.name = name;
        }
        if (price) {
            product.price = price;
        }
        if (description) {
            product.description = description;
        }
        if (units) {
            product.units = units;
        }
        if (mainPicture) {
            product.mainPicture = mainPicture;
        }

        await product.save();

        return product;
    }

    async deleteProduct(id) {
        const product = await Product.findByPk(id);
        if (!product) throw new NotFoundError('Product not found');

        await product.destroy();
    }

    async createCategoryProduct(productId, categoryId) {
        const product = await Product.findByPk(productId);
        if (!product) throw new NotFoundError('Product not found');

        const category = await Category.findByPk(categoryId);
        if (!category) throw new NotFoundError('Category not found');

        const categoryProduct = await CategoryProduct.findOne({ where: { productId, categoryId } });
        if (categoryProduct) {
            throw new ConflictError('Relation already exists');
        }

        await CategoryProduct.create({ productId, categoryId });
    }

    async deleteCategoryProduct(id) {
        const categoryProduct = await CategoryProduct.findOne({ where: { id } });
        if (!categoryProduct) {
            throw new NotFoundError('Relation not found');
        }
        await categoryProduct.destroy();
    }

    getCategoryProducts(limit = null, offset = null){
        return CategoryProduct.findAll({limit,offset});
    }
}

module.exports = new ProductController();