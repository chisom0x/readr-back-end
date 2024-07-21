import { Router } from "express";
import authRouter from './auth-routes.ts'
import userRouter from './user-routes.ts'
import categoryRouter from './category-routes.ts'
import bookRouter from './book-routes.ts'

const router = Router()

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/category", categoryRouter)
router.use("/books", bookRouter)

export default router