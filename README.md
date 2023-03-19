   
     █████╗ ██████╗ ████████╗███████╗ ██████╗██╗██╗
    ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔════╝██║██║
    ███████║██████╔╝   ██║   ███████╗██║     ██║██║
    ██╔══██║██╔══██╗   ██║   ╚════██║██║     ██║██║
    ██║  ██║██║  ██║   ██║   ███████║╚██████╗██║██║
    ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝╚═╝
                                               
# Artscii

## By Anamika Nayak, Stuart Rimel, Eliza Sohn & Pete Wells

### CS 554 - Software Engineering Project

---

## Description

ARTSCII is a React-based AI Generative ASCII art generator. It uses the Dezgo API to generate images based off of your prompts and then converts the image to ASCII characters.
It was created for Portland State University's CS-554 "Software Engineering" class in the Winter of 2023.

## Installation

Note: You will need to sign up for a [Dezgo](https://rapidapi.com/dezgo/api/dezgo/details) API key in order to run this on your own machine.

1. Clone or download this repo. `git clone https://github.com/elizasohn/artscii.git`
2. Install the node modules by navigating to root and running `npm install` 
3. Create a file named .env and place it in the artscii folder. `[path_to_repository]/artscii/.env`
4. Create a variable for your Dezgo API key inside the .env file. `REACT_APP_STABLE_DIFFUSION_API_KEY = [your key here]`
5. Change into the artscii directory `cd [path_to_repo]/artscii` and run the project `npm start`

## Usage

[Try it out here!](https://artscii.elizasohn.com/)
Simply enter a search term, wait for the resulting ai generated image and press "ascify" to see the glrious ascii results!

## Technologies and References

1. [React](https://react.dev/). For our front-end web interface.
2. [Dezgo](https://rapidapi.com/dezgo/api/dezgo/details). For AI Image generation.
3. ASCII REFERENCE
