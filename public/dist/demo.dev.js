"use strict";

$('po').onclick = function () {
  var token = localStorage.getItem("e-token");

  if (token) {
    localStorage.removeItem("e-token");
    msg.er('Logout success .');
  } else {
    login({
      username: $('un').value,
      password: $('psw').value
    });
  }
};