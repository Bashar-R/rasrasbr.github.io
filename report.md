# WAPH Individual Project 1 Report

**Course:** WAPH-Web Application Programming and Hacking  
**Instructor:** Dr. Phu Phung  
**Student:** Bashar Rasras  
**Email:** rasrasbr@mail.uc.edu

<img src="headshot.png" alt="Bashar R. headshot" width="150" height="150">

## Overview

This assignment required the design, implementation, and deployment of a professional profile website using front-end web development techniques and GitHub Pages hosting. The completed website includes a resume type profile, contact information, education and experience background, skills, a WAPH course page, JavaScript functionality from Lab 2, public API integrations, a page tracker, and client-side cookie behavior.

Through this project, I practiced building a complete static website with HTML, Bootstrap, custom CSS, jQuery, Chart.js, JavaScript timers, canvas drawing, `fetch()` API calls, and browser cookies.

**Deployed website:** [https://Bashar-R.github.io/waph-project1/](https://Bashar-R.github.io/waph-project1/)  
**GitHub project folder:** [https://github.com/Bashar-R/waph-project1](https://github.com/Bashar-R/waph-project1)

## General Requirements

### Professional Profile Website

I created `index.html` as the main professional profile page. It includes my name, profile image, contact information, GitHub link, education/background, experience summary, and technical skills. The page is structured for potential employers and presents the information in a resume-style layout.

### WAPH Course Page

I created `waph.html` and linked it from the profile navigation and hero section. This page introduces the Web Application Programming and Hacking course, lists the instructor, and summarizes the hands-on project work connected to the course.

## Non-Technical Requirements

### CSS Framework

The website uses Bootstrap 5 through the official CDN for responsive layout, navigation, buttons, and baseline styling. I also added custom CSS in `style.css` to create a more personalized professional design.

### Employer-Focused Presentation

The profile is written as a job-application style website. It emphasizes technical skills, professional interests, education, project experience, and contact information.

### Page Tracker

The footer includes a Flag Counter tracker image/link so the page can record visitor traffic when deployed publicly.

## Technical Requirements

### Digital Clock

The digital clock is implemented in `script.js` using JavaScript's `Date` object and `setInterval()`. It updates every second and displays the current local time.

### Analog Clock

The analog clock is implemented with the HTML5 `<canvas>` element. JavaScript redraws the clock face and hands every second based on the current hour, minute, and second.

### Show/Hide Email

The email visibility feature uses jQuery. The email is hidden by default, and the button toggles between showing and hiding the email address.

### Additional JavaScript Functionality

I added a theme toggle button that switches the page between light and dark visual modes. I also used Chart.js as an additional open-source JavaScript library to display a skills chart.

### JokeAPI Integration

The site integrates JokeAPI using:

```javascript
fetch("https://v2.jokeapi.dev/joke/Any?safe-mode")
```

The page loads a joke when opened and refreshes it every 60 seconds using `setInterval(loadJoke, 60000)`.

### Public Graphics API Integration

The site integrates Dog CEO's public API to display a random dog image:

```javascript
fetch("https://dog.ceo/api/breeds/image/random")
```

The returned image URL is displayed in the profile page as the required public API graphic/image content.

### Third-Party Content Disclaimer

The API section includes a disclaimer explaining that public third-party services generate the joke and image content, and that I am not responsible for the contents returned by those services.

### JavaScript Cookies

The website uses JavaScript cookies to remember the visitor. On a first visit, it displays:

```text
Welcome to my homepage for the first time!
```

On later visits, it displays:

```text
Welcome back! Your last visit was <the date/time of last visit>
```

The cookie value is updated on each visit so the next visit shows the previous date and time.
