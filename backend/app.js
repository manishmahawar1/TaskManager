import express from "express";
import cors from "cors";
import taskRouter from "./routes/taskRoute.js";
import apiRouter from "./routes/apiRoute.js";


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/", taskRouter);
app.use("/api", apiRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});