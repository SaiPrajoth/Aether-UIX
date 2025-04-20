// Function to simulate fetching user data asynchronously
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { name: 'Alice', age: 25 },
        2: { name: 'Bob', age: 30 },
        3: { name: 'Charlie', age: 35 },
      };
      const user = users[userId];
      user ? resolve(user) : reject('User not found');
    }, 1000);
  });
}

// Function to create a user card element
function createUserCard(user) {
  const card = document.createElement('div');
  card.classList.add('user-card');
  card.innerHTML = `
    <h2>${user.name}</h2>
    <p>Age: ${user.age}</p>
  `;
  return card;
}

// Function to display user data on the webpage
function displayUser(userId) {
  const container = document.getElementById('user-container');
  container.innerHTML = 'Loading...';

  fetchUserData(userId)
    .then(user => {
      container.innerHTML = '';
      const userCard = createUserCard(user);
      container.appendChild(userCard);
    })
    .catch(error => {
      container.innerHTML = `<p>Error: ${error}</p>`;
    });
}

// Event listener to handle user selection
document.getElementById('user-select').addEventListener('change', (event) => {
  const userId = event.target.value;
  displayUser(userId);
});
