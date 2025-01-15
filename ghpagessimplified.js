// Made by Jgc7 (https://github.com/jgc777)
async function getReposbyUsername(username) { // Get the list with the repos of a user
    username = username.toLowerCase();
    if (username === "") {
      console.warn(`No username provided!`);
      return ["No username provided!"];
    }
    const response = await fetch(`https://api.github.com/users/${username}/repos`); // Fetch the repos
    if (!response.ok) {
      console.warn(`Error fetching repos`);
      return ["Error fetching repos"];
    }
    const repos = await response.json();
    let repoList = [];
    repos.forEach(repo => {
        if (repo.name.toLowerCase() === username || repo.name.toLowerCase() === `${username}.github.io`) return; // Skip the user's profile repo and github pages repo
        repoList.push(repo);
    });
    return repoList;
}
async function appendRepos() { // Append the repos to a list, ordered by pinned and stars
    let RepoList = await getReposbyUsername("{{ site.github.owner_name }}");
    const repoListElement = document.getElementById('repo-list');
    repoListElement.innerHTML = '';
    repoList.forEach(repo => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = repo.has_pages ? `https://${repo.owner.login}.github.io/${repo.name}` : repo.html_url;
      link.textContent = repo.name;
      listItem.appendChild(link);
      repoListElement.appendChild(listItem);
    });
}
let attempts = 0;
function checkRepoList() {
    console.log(`Appending the repo list (attempt #${++attempts})`);
    const repoListElement = document.getElementById('repo-list');
    if (repoListElement && repoListElement.children.length === 0) appendRepos();
    else clearInterval(intervalId);
}
const intervalId = setInterval(checkRepoList, 1000);
