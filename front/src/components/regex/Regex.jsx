// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React from "react";

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/g;
const namePattern = /^[A-Z a-z]+$/g;
const messagePattern = /^[\sA-Za-z0-9.,-/:;]+$/g;

export { emailPattern, namePattern, messagePattern };