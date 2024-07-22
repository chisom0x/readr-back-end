import { Router } from "express";
import authRouter from './auth-routes'
import userRouter from './user-routes'
import categoryRouter from './category-routes'
import bookRouter from './book-routes'

const router = Router()

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/category", categoryRouter)
router.use("/books", bookRouter)

export default router