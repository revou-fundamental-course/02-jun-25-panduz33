function showGreeting() {
    const element = document.getElementById("greeting");

    // Using localStorage to store the name and time
    let visitorData = JSON.parse(localStorage.getItem("visitorData"));

    const expTime = 10; // in minutes

    let name;

    if (visitorData) {
        const currentTime = new Date().getTime();
        const isExpired = (currentTime - visitorData.time) > expTime * 60 * 1000;

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
                time: new Date().getTime() // store current time in ms
            };
            localStorage.setItem("visitorData", JSON.stringify(visitorData));
        } else {
            name = "Guest";
        }
    }

    element.textContent = `${name}!`;
}


function formHandler(){
    const form = document.getElementById("form");
    const output = document.getElementById("bounce-form-text");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const formName = document.getElementById("form-name").value;
        const formEmail = document.getElementById("form-email").value;
        const formMessage = document.getElementById("form-message").value;
        if(formName === "" || !formMessage === "" || formEmail === ""){
            alert(`Please fill in all fields`);
            return;
        }
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

// function imageSlider(){
//     const images = document.querySelectorAll(".image-slider img");
//     let currentIndex = 0;
//     function showImage(index){
//         images.forEach((image, i) => {
//             image.classList.toggle("active", i === index);
//         });
//     }

//     setInterval( () => {
//         currentIndex = (currentIndex + 1) % images.length;
//         showImage(currentIndex);
//     }, 5000);
// }

function imageSlider(){
    const data = [
        {
            image : "assets/android-http-toolkit.jpg",
            title : "Android with HTTP Toolkit",
            summary : "Mobile Testing & Network Debugging",
            description : "The Android Device Emulator combined with HTTP Toolkit provides a powerful environment for testing mobile applications and debugging network traffic. This combination allows developers to intercept, view and mock HTTP(S) from Android emulators, helping to identify and fix issues in mobile app communication.",
            pros : ['Real device simulation', 'Network traffic inspection', 'API debugging', 'Performance monitoring']
        },
        {
            image : "assets/codecept-mocha.jpg",
            title : "Codecept JS with Mocha JS",
            summary : "End-to-End Testing Framework",
            description : "CodeceptJS is a modern end-to-end testing framework with a focus on developer experience. It provides a high-level API over popular testing tools like Playwright, Puppeteer, and Selenium WebDriver, allowing you to write tests in a user-centric way.",
            pros : ['Easy-to-read syntax', 'Multiple drivers support', 'Parallel testing', 'BDD-style assertions']
        },
        {
            image : "assets/katalon.jpg",
            title : "Katalon",
            summary : "Unified Quality Management Platform",
            description : "Katalon is an all-in-one test automation solution that helps teams of any size deliver high-quality software. It provides capabilities for API, web, mobile, and desktop application testing with both codeless and code-based approaches.",
            pros : ['Codeless automation', 'Cross-platform testing', 'CI/CD integration', 'Comprehensive reporting']
        },
        {
            image : "assets/mocha-axios-chai.jpg",
            title : "Mocha JS with Axios and Chai JS",
            summary : "JavaScript Testing & HTTP Client Stack",
            description : "This powerful combination provides a complete solution for JavaScript testing. Mocha offers a feature-rich testing framework, Chai delivers an expressive assertion library with multiple styles, and Axios handles HTTP requests with an elegant promise-based API. Together they create a robust stack for testing APIs and JavaScript applications.",
            pros : ['Flexible test structure', 'Expressive assertion library', 'Promise-based HTTP requests', 'Great for API testing']
        },
        {
            image : "assets/node-red.jpg",
            title : "Node RED",
            summary : "Flow-based Programming Tool",
            description : "Node-RED is a flow-based programming tool for connecting hardware devices, APIs, and online services. It provides a browser-based editor that makes it easy to wire together flows using a wide range of nodes, and then deploy them with a single click.",
            pros : ['Visual programming interface', 'Large library of nodes', 'Easy integration with IoT devices', 'Low-code development']
        },
        {
            image : "assets/postman-newman-htmlextra.jpg",
            title : "Postman, Newman Runner, HTML Extra Reporter",
            summary : "API Testing & Development",
            description : "Postman is a popular API client that makes it easy to create, share, test, and document APIs. It offers a user-friendly interface for sending requests, receiving responses, setting up automated tests, and generating documentation.",
            pros : ['User-friendly interface', 'Extensive testing capabilities', 'Great for collaboration', 'Automated testing support']
        },
        {
            image : "assets/webdriver-io.jpg",
            title : "Webdriver IO",
            summary : "Next-gen Browser & Mobile Automation",
            description : "WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and stable test suite.",
            pros : ['Modern JavaScript support', 'Cross-browser testing', 'Mobile testing capabilities', 'Extensive plugin ecosystem']
        }
    ]

    let index = 0;

    const imgElement = document.getElementById("slider-image");
    const titleElement = document.getElementById("slider-title");
    const summaryElement = document.getElementById("slider-summary");
    const descriptionElement = document.getElementById("slider-description");
    
    function showSlide(index){
        imgElement.setAttribute("src", data[index].image);
        imgElement.setAttribute("alt", data[index].title);
        titleElement.textContent = data[index].title;
        summaryElement.textContent = data[index].summary;
        descriptionElement.textContent = data[index].description;

        data[index].pros.forEach((pro, index) => {
            const prosItem = document.getElementById(`slider-pros-${index + 1}`);
            if(prosItem){
                prosItem.textContent = pro;
            }
        });    
    }

    //Show first slide
    showSlide(index);

    //Change the image every 3 seconds
    setInterval(() => {
        index = (index + 1) % data.length;
        showSlide(index);
    }, 3000);
}

window.addEventListener('DOMContentLoaded', () => {
    formHandler();
    showGreeting();
    imageSlider();
});