const characterBar = document.querySelector('#character-bar');
const detailedInfo = document.querySelector('#detailed-info');
const nameEl = document.querySelector('#name');
const imageEl = document.querySelector('#image');
const voteCountEl = document.querySelector('#vote-count');
const votesForm = document.querySelector('#votes-form');
const votesInput = document.querySelector('#votes');
const resetBtn = document.querySelector('#reset-btn');

fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(data => {
      data.forEach(character => {
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${character.name}`;
      nameSpan.addEventListener('click', () => {
        nameEl.textContent = character.name;
        imageEl.src = character.image;
        voteCountEl.textContent = character.votes;
        votesForm.dataset.id = character.id;
      });
      characterBar.appendChild(nameSpan);
    });
  });

votesForm.addEventListener('submit', event => {
  event.preventDefault();

  const id = votesForm.dataset.id;
  const votes = parseInt(votesInput.value);
  fetch(`http://localhost:3000/characters/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ votes: votes })
  })
  .then(response => response.json())
  .then(data => {
    voteCountEl.textContent = data.votes;
    voteCountEl.textContent = parseInt(voteCountEl.textContent) + votes;
    votesInput.value = '';
  });
});

resetBtn.addEventListener('click', () => {
  const id = votesForm.dataset.id;
  fetch(`http://localhost:3000/characters/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ votes: 0 })
  })
  .then(response => response.json())
  .then(data => {
    voteCountEl.textContent = data.votes;
  });
});



