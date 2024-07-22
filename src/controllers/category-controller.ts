import { Request, Response } from 'express';
import categoryService from "../services/category-service";

export default class categoryController{
    static async createCategory(req: Request, res: Response){
        try{
          const {category} = req.body
          const newCategory = await categoryService.createCategory(category)
          return res
          .status(200)
          .json({ status: true, message: 'successful!', data: newCategory });
        } catch (err) {
            console.log(err);
            return res
              .status(500)
              .json({ status: false, message: 'something went wrong!', data: null });
          }
    }
    static async allCategories(req: Request, res: Response) {
        try{
          const categories = await categoryService.getAllCategories()
          return res
          .status(200)
          .json({ status: true, message: 'successful!', data: categories });
        } catch (err) {
            console.log(err);
            return res
              .status(500)
              .json({ status: false, message: 'something went wrong!', data: null });
          }
    }
}