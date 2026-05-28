import { configDotenv } from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

configDotenv()
await connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is lisning on PORT: ${PORT}`));
