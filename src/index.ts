import { createServer} from "./app"
import mongoose from "mongoose";


const DB = 'mongodb://0.0.0.0:27017/readr'

mongoose.connect(DB).then(() => {
  console.log('DB Connected')
})






const server = createServer()
const port = 8080
server.listen(port, () => {
    console.log(`api running on ${port}`);
  });