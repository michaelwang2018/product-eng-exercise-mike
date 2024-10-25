import cors from "cors";
import express from "express";
import { router } from "./endpoint";

const port = 5002;

async function main() {
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5001',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use("/", router);

  app.listen(port, () => {
    console.info(`🚀 Server running on port ${port}`);
  });
}

main();
