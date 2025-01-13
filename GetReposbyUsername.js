// Made by Jgc7 (https://github.com/jgc777)
async function GetReposbyUsername(username, repoList) {
    repoList.innerHTML = '';
    if (username === "") {
      const errorElement = document.createElement("a");
      errorElement.innerHTML = "No username given!";
      repoList.appendChild(errorElement);
      return;
    }
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      const errorElement = document.createElement("a");
      errorElement.innerHTML = "Error obtaining repos";
      repoList.appendChild(errorElement);
      return;
    }
    const repos = await response.json();
    repos.forEach(repo => {
      const repoNameLower = repo.name.toLowerCase();
      const usernameLower = username.toLowerCase();
      if (repoNameLower === usernameLower || repoNameLower === `${usernameLower}.github.io`) return;
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      const pagesUrl = `https://${username}.github.io/${repo.name}`;
      link.href = repo.has_pages ? pagesUrl : repo.html_url;
      link.textContent = repo.name;
      listItem.appendChild(link);
      repoList.appendChild(listItem);
    });
  }
