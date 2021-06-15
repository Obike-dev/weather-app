console.log('fucking client side js');

const form = document.querySelector('form');
const userInput = document.querySelector('input');

const firstParagraph = document.querySelector('.first-paragraph');
const secondParagraph = document.querySelector('.second-paragraph');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInputValue = userInput.value;

  firstParagraph.textContent = 'Loading...';
  secondParagraph.textContent = '';

  fetch(`http://localhost:3000/weather?address=${userInputValue}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          firstParagraph.textContent = data.error;
        } else if (userInputValue === '') {
          firstParagraph.textContent = 'please enter a location';
        } else {
          firstParagraph.textContent = data.location;
          secondParagraph.textContent = data.forecastData;
        }
      });
    }
  );
});
