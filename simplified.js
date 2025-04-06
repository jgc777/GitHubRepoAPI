// Made by Jgc7 (https://github.com/jgc777)
console.log("Simplified GithubRepoAPI (https://jgc.corefn.xyz/GitHubRepoAPI) loaded");
const username = document.querySelector('meta[name="github-username"]').getAttribute('content').toLowerCase();
async function getRepos() {
  if (username === "") {
    console.error("No username provided!");
    return ["Error: no username provided"];
  }
  response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (response.status === 403) {
    console.error("API rate limit exceeded!");
    return ["Error: you have exceeded the API rate limit!"];
  } else if (response.ok) {
    const repos = await response.json();
    return repos;
  } else {
    console.error(`Couldn't fetch repos: ${response.status} ${response.statusText}`);
    return [`Error: couldn't fetch repos (${response.status})`];
  }
}
async function appendRepos() {
  const repoList = await getRepos();
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement) {
    repoListElement.innerHTML = '';
    repoList.forEach(repo => {
      const listItem = document.createElement("li");
      if (repo.name) {
        if (repo.name.toLowerCase() !== username && repo.name.toLowerCase() !== `${username}.github.io`) {
        const link = document.createElement("a");
        link.href = repo.homepage ? repo.homepage: repo.has_pages ? `https://${repo.owner.login}.github.io/${repo.name}` : repo.html_url;
        link.textContent = repo.name;
        listItem.appendChild(link);
        repoListElement.appendChild(listItem);
        } else console.log(`Skipping the repo "${repo.name}"`);
      } else {
        const errorText = document.createElement("p");
        errorText.textContent = repo;
        listItem.appendChild(errorText);
        repoListElement.appendChild(listItem);
        return;
      }
    });
  } else console.error(`Couldn't find the repo list element!`);
}
let attempts = 0;
const interval = setInterval(() => {
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement && repoListElement.children.length === 0) {
    appendRepos().then(() => {
      clearInterval(interval);
      console.log(`Appended the repo list (#${++attempts})!`);
    }).catch(e => console.error(`Couldn't append the repo list: ${e} (#${++attempts})`));
  } else if (attempts > 10) {
    clearInterval(interval);
    console.error(`Couldn't append the repo list after 10 attempts (closing)!`);
  }
}, 1000);
