import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import authRoutes from "./routes/auth"; // Add this line
import dotenv from "dotenv"; // Add this line for environment variables

dotenv.config(); // Load environment variables

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add authentication routes
app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.om35k.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });

// import express, { Express } from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import todoRoutes from "./routes";

// const app: Express = express();

// const PORT: string | number = process.env.PORT || 4000;

// app.use(cors());
// // Add these two lines for body parsing
// app.use(express.json()); // Parses JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
// app.use(todoRoutes);

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.om35k.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
// const options = { useNewUrlParser: true, useUnifiedTopology: true };
// mongoose.set("useFindAndModify", false);

// mongoose
//   .connect(uri, options)
//   .then(() =>
//     app.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     )
//   )
//   .catch((error) => {
//     throw error;
//   });
