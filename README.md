 ![Foodle](/static/favicon.ico)
 # FOODLE
### Video Demo: https://youtu.be/__GzTQLhIF0
## Description

Foodle is a web application that is an adaptation of the popular Wordle game. The game screens for a food name and if correct, routes you to another page that shows either a recipe of that food, a description if the recipe is unavailable, or a default message if the word definition is unavailable.
The project contains the following:
- app.py - This is a python file that initializes a Flask application and renders different HTML templates depending on what the user requests. It contains code used to validate user login credentials, register a new user, generate a unique session id for a logged in user and opens the file containing valid guessing words to be passed onto a HTML template through Jinja.
- foodle.db - This is a database that stores login user credentials. It contains a user id, username and hash of the user password.
- foodle.sql - This is an SQL file that contains the code used to create the foodle.db database.
- requirements.txt - This is a text file that defines the Flask application requirements.
- Templates
    - login.html - This is the default landing page. It contains a form that accepts the user login credentials and a link to a registration page for non-registered users.
    - register.html - This page is used to enter a new user into the database. It accepts a username and a password.
    - index.html - This is the main page that contains the foodle game. It contains a virtual keyboard, tiles for letter entry, and JavaScript code that parses the words list to json format and picks a random word out to be validated against the user entry.
    - recipe.html - This is page that is rendered when a user guesses the right word. It displays a recipe for the food guessed, a definition if recipe is unavailable and a default message if neither a recipe nor definition is available. The page contains JavaScript code that fetches a recipe corresponding to the guessed word from [TheMealDB API](https://www.themealdb.com/api.php). If a recipe is unavailable, it fetches a random definition of the word from [Free Dictionary API](https://dictionaryapi.dev/). If neither a recipe nor definition is available, a default message is displayed.
- Static
    - app.js - This a file containing JavaScript code linked to by index.html. It populates the index.html page with squares. It also updates an array with letters obtained from user entry through the virtual keyboard. Once a word is obtained and submitted, it checks the validity of the word. Each of the tiles is colored depending on accuracy; grey for wrong letter that is not in the correct word, orange for correct letter in the wrong position, and green for the correct letter in the correct position. Once the correct word is guessed, it routes to the recipe.html page.
    - foods.txt - This file contains 5-letter words of foods against which the user entry is validated.
    - styles.css - This is the main CSS document for the project that contains styling for all the html pages excluding recipe.html.
    - recipe.css - This CSS file contains styling for recipe.html. It contains some conflicting styling instructions that mandated a separated CSS file.
    -favicon.ico - Contains an icon used for the project title.

## Design Considerations
Flask framework was selected to host the web application within Python. This was due to its simplicity and a preference for Python authentication libraries. Client-side operations were coded in JavaScript with the main code linked out in a separate app.js file for simplicity. I decided to accept user entry if the word is either in the foods.txt file or the dictionary API. This is because there are words in my foods.txt file that are not found in the dictionary API and I would also like the user to be able to guess against any real 5-letter word to help arrive at a food guess. Initially, I set the user's entry to only be valid if it was in the foods.txt file i.e. words that are foods but I found it to be too difficult and takes away a lot of the fun. Some of the words in the foods.txt file are quite difficult to guess hence using any real valid words can also be a strategy employed to help guess.


## License
[MIT](https://choosealicense.com/licenses/mit/)
