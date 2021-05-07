# VCard Manager
Web GUI for vCard Parser. Front end client makes use of bootstrap and communicates with the server
using ajax. Back end server written in javascript and makes function calls to parser library written
in C
Module 1 involved the development of the GUI. app.js at this stage contained hard coded response values.
Module 2 involved the integration of the backend parser to the GUI developed in Module 1.
## Installation of Node App

### 1. Install

```Bash
# From the root of the directory
npm install
```

### 2. Running Server

```Bash
# PORT is your personally given port number, e.g. 1234
npm run dev PORT
# Server will be accessible at http://localhost:PORT
```

## Directory Structure

```Bash
# This contains the Backend Node Server, with our Web Application and API
app.js

# These are the package configuration files for npm to install dependencies
package.json
package-lock.json

# This is the Frontend HTML file that you see when you visit the document root
public/index.html

# This is the Frontend browser JavaScript file
public/index.js

# This is the Frontend Custom Style Sheet file
public/style.css

# This is the directory for uploaded .vcf files (empty at first)
upload/

# This is the directory where backend parser (Assignment 1 & 2) is found
parser/
```
Functionality is added to app.js, index.html, index.js and, optionally, style.css.


## Components

### Public Files, HTML, CSS, JavaScript

* These make up the "frontend", files that are directly accessed by users. They can see the source code
* To view these files from your browser, right click on something on the webpage and click "inspect element" to open your browsers "dev tools"
* Common tabs in the dev tools are:
    * Console: Displays errors, you can run JavaScript, see console.log() output
    * Inspector: See the current state of HTML on the webpage. HTML can be manipulated by JavaScript, it can update often. You can see the "raw" HTML returned from your server by right clicking the webpage and clicking "View Page Source"
    * Network: This Tab is important. It shows all your network requests, (fetching HTML, CSS, JavaScript files, and AJAX requests)
         * When you "refresh" the page, most browsers do a "soft" refresh, meaning that some assets are fetched from your "browser cache" and not directly updated. To "hard" refresh type Ctrl+Shift+R or Ctrl+Shift+F5

https://developer.mozilla.org/en-US/docs/Tools

#### Browser JavaScript

How to $.ajax: https://stackoverflow.com/a/22964077/5698848

```JavaScript
// We're using jQuery library
// document.ready just means this JS runs when the document element (body) is loaded
// Put all onload AJAX calls here, and event listeners
$(document).ready(function() {

// This is an Asynchronous JavaScript Request (AJAX) using jQuery
// We can use this to query our API endpoints
    // On page-load AJAX Example
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/someendpoint',
        success: function (data) {
            // Do something with returned JSON
        },
        fail: function(error) {
            // Non-200 return, do something with error
        }
    });

// When you "submit" an HTML form, the default action is to redirect to another page
// This overrides it and allows us to make an AJAX request and edit data on the page
    $('#someform').submit(function(e){
        e.preventDefault();
        $.ajax({});
    });
});
```

### HTTP Web Server

`https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server`

We are using NodeJS runtime to create a simple web server

## How does everything work together?

1. Install the dependencies (only need to do this once) and spin up our node server
    * Note: We're using "nodemon" (instead of say `node run dev`) because it hot-reloads app.js whenever it's changed

2. View at http://localhost:PORT

3. The HTML is loaded when you visit the page and see forms, tables, content

4. The CSS is also loaded, and you'll see the page has style 

5. The JavaScript file is loaded (index.js) and will run a bunch of "on load" AJAX calls to populate dropdowns, change elements

6. When buttons are clicked, more AJAX calls are made to the backend, that recieve a response update the HTML

7. An AJAX call is made from your browser, it makes an HTTP (GET, POST...) call to our web server

8. The app.js web server receives the request with the route, and request data (JSON, url parameters, files...)

9. Express looks for the route you defined, then runs the callback function you provided

10. Our callback function (for this module) should just return a hard coded JSON response

11. The AJAX call gets a response back from our server (either a 200 OK or maybe an error like a 404 not found) and either calls the "success" callback function or the "fail" function. If the success is called, "data" contains the returned JSON, and we can use it to update elements, e.g.`$('#elementId').html('<div>' + data["somekey"] + '</div>');` where there is a "div" somewhere with the "id" "elementId".
