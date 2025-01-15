// Made by Jgc7 (https://github.com/jgc777)
async function getReposbyUsername(username) {
  username = username.toLowerCase();
  if (!username) {
    console.warn(`No username provided!`);
    return ["No username provided!"];
  }
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (response.status === 403) return ["You have exceeded the API rate limit!"];
  if (!response.ok) {
    console.warn(`Error fetching repos`);
    return ["Error fetching repos"];
  }
  const repos = await response.json();
  return repos.filter(repo => repo.name.toLowerCase() !== username && repo.name.toLowerCase() !== `${username}.github.io`);
}
async function appendRepos() {
  const repoList = await getReposbyUsername(getGitHubUsername());
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement) {
    repoListElement.innerHTML = '';
    repoList.forEach(repo => {
      listItem = document.createElement("li");
      if (repo.name) {
        link = document.createElement("a");
        link.href repo.has_pages `https://${repo.owner.login}.github.io/${repo.name}` : repo.html_url; // Link to the repo or the github pages site
        link.textContent = repo.name ? repo.name : repo;
      } else listItem.textContent = repo;
      listItem.appendChild(link);
      repoListElement.appendChild(listItem);
    });
  }
}
function getGitHubUsername() {
  const metaTag = document.querySelector('meta[name="github-username"]');
  return metaTag ? metaTag.getAttribute('content') : null;
}
let attempts = 0;
const intervalId = setInterval(() => {
  console.log(`Appending the repo list (attempt #${++attempts})`);
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement && repoListElement.children.length === 0) {
    appendRepos().then(() => clearInterval(intervalId));
  }
}, 1000);
