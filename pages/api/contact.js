import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function handler(req, res) {
  const { email, name, message } = req.body;

  if (req.method === "POST") {
    // data validation and sanitization
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim === "" ||
      !message ||
      message.trim === ""
    ) {
      res.status(400).json({ message: "All fields must be filled out" });
    }
  }

  //   store data in a database
  const newMessage = {
    email,
    name,
    message,
  };

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    if (client);
    console.log("Db connected");
  } catch (err) {
    console.log("Could not connect to client");
    res.status(500).json({ message: err.message });
  }

  try {
    const db = client.db('Messages');
    const result = await db.collection("Messages").insertOne(newMessage);
    newMessage.id = result.insertedId;
  } catch (err) {
    console.log("Could not log the new message to the database");
    // client.close();
    res.status(500).json({ message: "Storing message failed" });
  }

  client.close();

  res.status(201).json({
    message: "Successfully stored message",
    data: newMessage,
  });
}

export default handler;
