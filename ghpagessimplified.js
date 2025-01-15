// Made by Jgc7 (https://github.com/jgc777)
async function getReposbyUsername(username) {
  username = username.toLowerCase();
  if (!username) {
    console.warn(`No username provided!`);
    return ["No username provided!"];
  }
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      console.warn(`Error fetching repos`);
      return ["Error fetching repos"];
    }
    const repos = await response.json();
    return repos.filter(repo => repo.name.toLowerCase() !== username && repo.name.toLowerCase() !== `${username}.github.io`);
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return ["Error fetching repos"];
  }
}

async function appendRepos() {
  const repoList = await getReposbyUsername("{{ site.github.owner_name }}");
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement) {
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
}

let attempts = 0;
const intervalId = setInterval(() => {
  console.log(`Appending the repo list (attempt #${++attempts})`);
  const repoListElement = document.getElementById('repo-list');
  if (repoListElement && repoListElement.children.length === 0) {
    appendRepos().then(() => clearInterval(intervalId));
  }
}, 1000);
