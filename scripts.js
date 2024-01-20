// GitHub API endpoint
const apiUrl = 'https://api.github.com/users/';

// Function to fetch repositories based on username
async function fetchRepositories() {
    const username = document.getElementById('usernameInput').value;
    const repoListContainer = document.getElementById('repoList');
    const paginationContainer = document.getElementById('pagination');
    const loader = document.getElementById('loader');

    // Display loader
    loader.style.display = 'block';

    try {
        // Fetch repositories
        const response = await fetch(`${apiUrl}${username}/repos`);
        const repositories = await response.json();

        // Process repositories and update UI
        updateRepositoryList(repositories, repoListContainer, paginationContainer);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    } finally {
        // Hide loader after fetching data
        loader.style.display = 'none';
    }
}

// Function to update the UI with the repository list
function updateRepositoryList(repositories, repoListContainer, paginationContainer) {
    // Clear previous content
    repoListContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    // Display repositories
    repositories.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'card mb-2';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const repoTitle = document.createElement('h5');
        repoTitle.className = 'card-title';
        repoTitle.innerText = repo.name;

        const repoDescription = document.createElement('p');
        repoDescription.className = 'card-text';
        repoDescription.innerText = repo.description || 'No description available.';

        cardBody.appendChild(repoTitle);
        cardBody.appendChild(repoDescription);
        repoCard.appendChild(cardBody);
        repoListContainer.appendChild(repoCard);
    });

    // Implement pagination (You need to handle this based on the number of repositories)
    // You can use a library or custom logic to handle pagination controls.
}

// Call the fetchRepositories function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchRepositories();
});
