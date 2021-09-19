// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React from "react";

export const validField = /[0-9!@#$%^&*(),.?":{}|<>\[\]=]/g;
export const validMessage = /[!@#$%^&*(),?":{}|<>\[\]=]/g;
export const validEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export const validPassword = () => {
  new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
};
