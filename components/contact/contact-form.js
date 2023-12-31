import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData( enteredEmail, enteredName, enteredMessage ) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  // return data;
}

function ContactForm() {
  const [enteredEmail, setEmail] = useState("");
  const [enteredName, setName] = useState("");
  const [enteredMessage, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success' or 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");
    // add client-side validation
    try {
      await sendContactData(
        enteredEmail,
        enteredName,
        enteredMessage,
      );
      setRequestStatus("success");
      setMessage("");
      setName("");
      setEmail("");
    } catch (err) {
      setRequestError(err.message);
      setRequestStatus("error");
    }
  }

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Message submitted!",
      message: "Your message has been successfully submitted!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Sending message failed.",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I be of service?</h1>
      <form
        action="POST"
        className={classes.form}
        onSubmit={sendMessageHandler}
      >
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="5"
            value={enteredMessage}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
