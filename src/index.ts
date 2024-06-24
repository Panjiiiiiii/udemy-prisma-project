import express, {Express} from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app:Express = express();

app.use(express.json())
app.use('/api', rootRouter)

export const prismaClient = new PrismaClient ({
  log:[`query`]
}).$extends({
  result:{
    address:{
      formattedAddress : {
        needs: {
          lineOne : true,
          lineTwo: true,
          city: true,
          country: true,
          pinecode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}-${addr.pinecode}`
        }
      }
    }
  }
})

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("App working");
});
