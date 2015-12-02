"use strict";

var contactSection = document.querySelector("section.contact-form"),
    contactForm = contactSection.querySelector("form"),
    inputName = contactForm.querySelector('[name="name"]'),
    inputEmail = contactForm.querySelector('[name="email"]'),
    textAreaMessage = contactForm.querySelector('[name="message"]'),
    sendButton = contactSection.querySelector("button"),
    isSending = !1,
    sentEmail = !1;

var sendEvent = sendButton.addEventListener("click", function(e) {
    if (e.preventDefault(), !isSending && !sentEmail && contactSection.classList.contains("open")) {
        isSending = !0, this.innerHTML = "Sending...";
        var t = new XMLHttpRequest;
        t.open("POST", "//formspree.io/craigmclarke@gmail.com", !0), t.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01"), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send("name=" + inputName.value + "&email=" + inputEmail.value + "&message=" + textAreaMessage.value), t.onloadend = function(e) {
            200 === e.target.status ? (isSending = !1, sentEmail = !0, contactSection.classList.add("email-sent"), sendButton.innerHTML = "Thanks!", sendButton.removeEventListener("click", sendEvent)) : (contactSection.classList.add("email-error"), sendButton.innerHTML = "Something went wrong, try again", setTimeout(function() {
                sendButton.innerHTML = "Send", isSending = !1, contactSection.classList.remove("email-error")
            }, 2e3))
        }
    }
});
