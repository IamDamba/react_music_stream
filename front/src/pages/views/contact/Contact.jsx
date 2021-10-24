// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/contact/contact.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import checkIcon from "../../../media/toast/checkIcon.svg";
import errorIcon from "../../../media/toast/errorIcon.svg";
import warningIcon from "../../../media/toast/warningIcon.svg";

import {
  emailPattern,
  namePattern,
  messagePattern,
} from "../../../components/regex/Regex";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

// ||||||||||||||||||||||| Contact |||||||||||||||||||||||||

const Contact = () => {
  // Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  //redux
  const { toast_list, check_color, error_color, info_color, warning_color } =
    useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();

  //Variables
  const maxLength = 300;

  //Fuctions
  const handleNameField = (e) => {
    let value = e.target.value;
    setName(value);
  };
  const handleMessageField = (e) => {
    let value = e.target.value;

    if (value.length <= maxLength) {
      setMessageLength(maxLength - value.length);
      setMessage(value);
    } else {
      setMessage(message);
    }
  };
  const handleEmailField = (e) => {
    let value = e.target.value;
    setEmail(value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let emailBool = false;
    let nameBool = false;
    let messageBool = false;

    if (!email.match(emailPattern) === true) {
      const toast_item = {
        id: toast_list.length + 1,
        title: "Warning",
        description: "Email is not valid.",
        backgroundColor: warning_color,
        icon: warningIcon,
      };

      dispatch(setToastItemToReducer(toast_item));
      console.log("Error in email");
      return;
    } else {
      console.log("email is gooooooood....");
      emailBool = true;
    }

    if (!name.match(namePattern) === true) {
      const toast_item = {
        id: toast_list.length + 1,
        title: "Warning",
        description: "Name is not valid (Remove numbers/special characters).",
        backgroundColor: warning_color,
        icon: warningIcon,
      };

      dispatch(setToastItemToReducer(toast_item));
      console.log("Error in name");
      return;
    } else {
      console.log("name is gooooooood....");
      nameBool = true;
    }

    if (!message.match(messagePattern) === true) {
      const toast_item = {
        id: toast_list.length + 1,
        title: "Warning",
        description:
          "Message is not valid (Remove special characters exept '.'|','|'-'|'/'|':'|';').",
        backgroundColor: warning_color,
        icon: warningIcon,
      };

      dispatch(setToastItemToReducer(toast_item));
      console.log(!message.match(messagePattern));
      console.log("Error in message");
      return;
    } else {
      console.log("message is gooooooood....");
      messageBool = true;
    }

    if (!emailBool || !nameBool || !messageBool) {
      console.log("Can't send form");
    } else {
      await axios
        .post("/api/contactform", {
          name: name,
          email: email,
          message: message,
        })
        .then((res) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Success",
            description: res.data.message,
            backgroundColor: check_color,
            icon: checkIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
          console.log(res.data.message);

          setName("");
          setEmail("");
          setMessage("");
        })
        .catch((err) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Error",
            description: err.message,
            backgroundColor: error_color,
            icon: errorIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
          console.log(err.response.data.message);
        });
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
          <form onSubmit={handleFormSubmit.bind(this)}>
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
