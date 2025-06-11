import {
  techStackData,
  technicalSkills,
  softSkills,
  tools,
} from "../data/static_text.js";

//Greeting function
function showGreeting() {
  const element = document.getElementById("greeting");

  // Using localStorage to store the name and time
  let visitorData = JSON.parse(localStorage.getItem("visitorData"));

  const expTime = 10; // in minutes

  let name;

  if (visitorData) {
    const currentTime = new Date().getTime();
    const isExpired = currentTime - visitorData.time > expTime * 60 * 1000;

    if (!isExpired) {
      name = visitorData.name; // valid, not expired
    } else {
      // Data expired
      localStorage.removeItem("visitorData");
    }
  }

  // If no valid name found, prompt the user
  if (!name) {
    name = prompt("Please enter your name:");

    if (name && name.trim() !== "") {
      const visitorData = {
        name: name,
        time: new Date().getTime(), // store current time in ms
      };
      localStorage.setItem("visitorData", JSON.stringify(visitorData));
    } else {
      name = "Guest";
    }
  }

  element.textContent = `${name}!`;
}

//Form Handler
function formHandler() {
  //Using Tech Stack Data
  const form = document.getElementById("form");
  const output = document.getElementById("bounce-form-text");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formName = document.getElementById("form-name").value.trim();
    const formEmail = document.getElementById("form-email").value.trim();
    const formMessage = document.getElementById("form-message").value.trim();

    // Regular Expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errorMessages = [];

    if (formName === "") {
      errorMessages.push("Name is required.");
    }

    if (formEmail === "") {
      errorMessages.push("Email is required.");
    } else if (!emailPattern.test(formEmail)) {
      errorMessages.push("Please enter a valid email address.");
    }

    if (formMessage === "") {
      errorMessages.push("Message cannot be empty.");
    }

    if (errorMessages.length > 0) {
      e.preventDefault(); // Stop form from submitting
      alert(errorMessages.join("\n")); // Display all error messages
      return;
    }

    //name validation
    output.innerHTML = `Thank you for your message! <br/>
        Here is the summary information you have submitted:  <br/>
        <br/>
        Name: ${formName}  <br/>
        Email: ${formEmail}  <br/>
        Message: ${formMessage} <br/>
        <br/>
        Please kindly wait for our response`;
  });
}

//Image Slider
function imageSlider() {
//Using tech stack data
  let index = 0;

  const imgElement = document.getElementById("slider-image");
  const titleElement = document.getElementById("slider-title");
  const summaryElement = document.getElementById("slider-summary");
  const descriptionElement = document.getElementById("slider-description");

  function showSlide(index) {
    imgElement.setAttribute("src", techStackData[index].image);
    imgElement.setAttribute("alt", techStackData[index].title);
    titleElement.textContent = techStackData[index].title;
    summaryElement.textContent = techStackData[index].summary;
    descriptionElement.textContent = techStackData[index].description;

    techStackData[index].pros.forEach((pro, index) => {
      const prosItem = document.getElementById(`slider-pros-${index + 1}`);
      if (prosItem) {
        prosItem.textContent = pro;
      }
    });
  }

  //Show first slide
  showSlide(index);

  //Change the image every 5 seconds
  setInterval(() => {
    index = (index + 1) % techStackData.length;
    showSlide(index);
  }, 5000);
}

/**
 *
 * @param {string[]} array
 * @param {string} ulId
 * 
 * Static List Generator
 */
function listGenerator(array, ulId) {
  const ul = document.getElementById(ulId);
  array.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

//List of Skills, Tools, and SoftSkills

window.addEventListener("DOMContentLoaded", () => {
  formHandler();
  showGreeting();
  imageSlider();
  listGenerator(technicalSkills, "technical-skills");
  listGenerator(tools, "tools");
  listGenerator(softSkills, "soft-skills");
});
