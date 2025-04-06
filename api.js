// Made by Jgc7 (https://github.com/jgc777)
console.log("GithubRepoAPI (https://jgc.corefn.xyz/GitHubRepoAPI) loaded");
const currentScript = Array.from(document.scripts).find(script => script.src.includes('api.js'));
const token = new URL(currentScript.src).searchParams.get('token'); // Get the token from the script URL
async function getReposbyUsername(username) { // Get the list with the repos of a user
  username = username.toLowerCase();
  if (username === "") {
    console.warn(`No username provided!`);
    return ["Error: no username provided!"];
  }
  response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (response.status === 403) return ["Error: you have exceeded the API rate limit!"];
  if (response.ok) {
    const repos = await response.json();
    return repos;
  } 
  console.warn(`Error fetching repos`);
  return ["Error: couldn't fetch repos"];
}
async function getSortedRepoList(username) { // Get the ordered repo list
  let repoList = await getReposbyUsername(username);
  if (repoList.length === 1 && repoList[0].includes('Error')) return repoList;
  let pinnedRepos = [];
  let otherRepos = [];
  await repoList.forEach(repo => {
    if (IsPinned(repo.owner.login, repo.name)) pinnedRepos.push(repo);
  }); // Pinned repos first
  repoList.forEach(repo => {
    if (!pinnedRepos.includes(repo)) otherRepos.push(repo);
  }); // Rest of the repos
  pinnedRepos = pinnedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count); // Sort by stars
  otherRepos = otherRepos.sort((a, b) => b.stargazers_count - a.stargazers_count); // Sort by stars
  return [...pinnedRepos, ...otherRepos];
}
async function IsPinned(owner, repo) { // Check if a repo is pinned. Needs the token to work
  const query = `
    query {
      user(login: "${owner}") {
        pinnedItems(first: 10, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              url
            }
          }
        }
      }
    }
  `;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  if (!response.ok) {
    console.warn(`Error fetching pinned repos`);
    return false;
  }
  const data = await response.json();
  return data.data.user.pinnedItems.nodes.includes(repo);
}
async function starCount(owner, repo) { // Get the number of stars for a repo. Needs the token to work
  const url = `https://api.github.com/repos/${owner}/${repo}/stargazers`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    console.warn(`Error getting the starcount`);
    return 0;
  }
  const data = await response.json();
  return data.length;
}
async function appendRepos(username, repoListElement) { // Append the repos to a list, ordered by pinned and stars
  repoList = await getSortedRepoList(username);
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
      }
    });
  } else console.error(`Couldn't find the repo list element!`);
}
