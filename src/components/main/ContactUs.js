import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";

import classes from "./ContactUs.module.css";
import { alertActions } from "../../store/alert-slice";

const ContactUs = () => {
  const dispatch = useDispatch();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5d6l9y4",
        "template_k6dhh8p",
        form.current,
        "feVNQAAxVXWJT65jH"
      )
      .then(
        (result) => {
          dispatch(
            alertActions.setState({
              message:
                "Email sent succssfully! We will get back to you as soon as possible.",
              status: "success",
            })
          );
        },
        (error) => {
          dispatch(
            alertActions.setState({
              message:
                "There was an error sending your email, please try again later or copy our email and email us direct from your mailbox",
              status: "error",
            })
          );
        }
      );

    e.target.reset();
  };

  return (
    <form className={classes.form} ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" className={classes.input} />
      <label>Email</label>
      <input type="email" name="email" className={classes.input} />
      <label>Message</label>
      <textarea name="message" className={classes.textarea} />
      <button type="submit" value="Send">
        Send email
      </button>
    </form>
  );
};

export default ContactUs;
