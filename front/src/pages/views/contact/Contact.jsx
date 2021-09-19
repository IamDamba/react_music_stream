import "../../../styles/main/contact/contact.scss";
import React, { useState, useEffect } from "react";
import {
  validEmail,
  validField,
  validMessage,
} from "../../../components/regex/Regex";

const Contact = () => {
  // Variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const maxLength = 300;

  //Fuctions
  const handleNameField = (e) => {
    let value = e.target.value;
    value = value.replace(validField, "");
    setName(value);
  };

  const handleMessageField = (e) => {
    let value = e.target.value;
    value = value.replace(validMessage, "");
    setMessageLength(maxLength - value.length);
    setMessage(value);
  };

  const handleEmailField = (e) => {
    let value = e.target.value;
    var re = /\S+@\S+\.\S+/g;

    if (re.test(value)) {
      setEmail(value);
    }
  };

  useEffect(() => {
    setMessageLength(maxLength);
  }, []);

  return (
    <main className="contact">
      <div className="content">
        <div className="content_header">
          <h1>Conctact Us</h1>
          <h2>Don't hesitate to send a little message</h2>
        </div>
        <div className="contact_form">
          <form>
            <div className="fields">
              <div className="input">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameField.bind(this)}
                />
              </div>
              <div className="input">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailField.bind(this)}
                />
              </div>
            </div>
            <div className="textarea">
              <label htmlFor="message">Message :</label>
              <textarea
                name="message"
                id="message"
                maxLength={maxLength}
                value={message}
                onChange={handleMessageField.bind(this)}
              ></textarea>
              <p className="textarea_maxlength">{messageLength}</p>
            </div>
            <div className="button">
              <button type="submit">Take Contact</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
