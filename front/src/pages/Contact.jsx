import React, { useEffect, useState } from "react";
import "../styles/main/contact/contact.scss";

const maxLength = 300;

const Contact = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Variables
  const [messageLength, setMessageLength] = useState(0);

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
                <input type="text" name="name" id="name" />
              </div>
              <div className="input">
                <label htmlFor="email">Email Address :</label>
                <input type="email" name="email" id="email" />
              </div>
            </div>
            <div className="textarea">
              <label htmlFor="message">Message :</label>
              <textarea
                name="message"
                id="message"
                maxLength={maxLength}
                onChange={(e) =>
                  setMessageLength(maxLength - e.target.value.length)
                }
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
