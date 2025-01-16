// Made by Jgc7 (https://github.com/jgc777)
console.log("Simplified GithubRepoAPI by Jgc7 loaded");
const username = document.querySelector('meta[name="github-username"]').getAttribute('content').toLowerCase();
async function getRepos() {
  if (username === "") {
    console.warn(`No username provided!`);
    return ["Error: no username provided!"];
  }
  response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (response.status === 403) return ["Error: you have exceeded the API rate limit!"];
  if (response.ok) {
    const repos = await response.json();
    return repos.filter(repo => repo.name.toLowerCase() !== username && repo.name.toLowerCase() !== `${username}.github.io`);
  } 
  console.warn(`Error fetching repos`);
  return ["Error: couldn't fetch repos"];
}
async function appendRepos() {
  const repoList = await getRepos();
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement) {
    repoListElement.innerHTML = '';
    repoList.forEach(repo => {
      const listItem = document.createElement("li");
      if (repo.name) {
        const link = document.createElement("a");
        link.href = repo.has_pages ? `https://${repo.owner.login}.github.io/${repo.name}` : repo.html_url;
        link.textContent = repo.name;
        listItem.appendChild(link);
      } else {
        const errorText = document.createElement("p");
        errorText.textContent = repo;
        listItem.appendChild(errorText);
      }
      repoListElement.appendChild(listItem);
    });
  } else console.error(`Couldn't find the repo list element!`);
}
let attempts = 0;
const interval = setInterval(() => {
  console.log(`Appending the repo list (attempt #${++attempts})`);
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement && repoListElement.children.length === 0) {
    appendRepos().then(() => clearInterval(interval));
  }
}, 1000);
