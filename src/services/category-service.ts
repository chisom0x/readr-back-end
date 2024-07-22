import Category from '../models/category-model'

export default class categoryService {
    static async createCategory(category: string){
        try{
          const newCategory = await Category.create({
            category: category
          })
          return newCategory
        } catch(err){
            throw err;
        }
    }
    static async getAllCategories(){
        try{
            const category = await Category.find()
            return category
        } catch(err){
            throw err;
        }
    };
    static async getCategoryByName(name: string){
        try{
            const query = {
              category: { $regex: name, $options: 'i' }
            };
            const category = await Category.findOne(query)
            return category;
          } catch(err){
            throw err
          }
    }
}