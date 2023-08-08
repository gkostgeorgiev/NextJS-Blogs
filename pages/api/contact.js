function handler(req, res) {
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

  res.status(201).json({
    message: "Successfully stored message",
    data: newMessage,
  });
}

export default handler;
