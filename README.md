# GitHubRepoAPI
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github)
![API](https://img.shields.io/badge/API-black?style=for-the-badge)
[![LICENSE](https://img.shields.io/badge/Custom_LICENSE-black?style=for-the-badge)](./LICENSE)

Get the github repos of a user, with more options. It doesn't want to show all the repos if they are more than 30. If I fixed it it wouldn't work without an API key. I know the appendRepos() works but I don't know if the API ones completely work.

## How to use it
 Just load [the script](./api.js) and do `appendRepos(a, b);` (or use [the simplified edition](./#simplified-edition)).

> [!IMPORTANT]
> Each IP has a GitHub API rate limit of 60 requests per hour.

### Example
 ```html
 <script src="https://jgc.linkpc.net/GitHubRepoAPI/api.js"></script> <!-- Load the API -->
 <ul id="repo-list"></ul> <!-- Here will appear the repo list -->
 <script>
    const token = 'YOUR_API_KEY'; // Your API key with public repos read access
    appendRepos("YOUR_GH_USERNAME", repo-list); // Call appendRepos
</script> <!-- Use the API to get the list -->
 ```

### Simplified edition
> [`simplified.js`](http://jgc.linkpc.net/GitHubRepoAPI/simplified.js)

 ```html
 <meta name="github-username" content="YOUR_GH_USERNAME"> <!-- Define the user whose repos must be shown -->
 <script src="http://jgc.linkpc.net/GitHubRepoAPI/simplified.js"></script> <!-- Load the Simplified API -->
 <ul id="repo-list"></ul> <!-- Here will appear the repo list -->
 ```

It's a simplified version of the code with no sorting and which automatically appends the repos to the repo-list list element (`<ul id="repo-list"></ul>` or similar). Works without an API key but you have to specify the username in the html with `<meta name="github-username" content="your-github-username">`.

## Functions
Here are the functions that this program includes.

### appendRepos(username, repoListElement)
 Appends the repos of a given username to a list, with the links to them ordered by pinned and starcount.

### getReposbyUsername(username)
 Returns a (not sorted) list of all the repos for a given username.

### getSortedRepoList(username)
 Returns a (sorted by pinned and starcount) list of all the repos for a given username.

### IsPinned(owner, repo)
> Needs an API key, else returns false.

 Return if (true/false) a repo is pinned in the owners profile.

### starCount(owner, repo)
> Needs an API key, else returns 0.

 Returns the starcount of a given repo.

## Demo
<a hidden href="https://jgc.linkpc.net/GitHubRepoAPI/">Only availabe on the web!</a>

If it doesn't work click [here](./demo/).
 <iframe src="./demo/" width="100%" height="auto">Error loading the demo</iframe>

## Simplified Version Demo
<a hidden href="https://jgc.linkpc.net/GitHubRepoAPI/">Only availabe on the web!</a>

If it doesn't work click [here](./demo/simplified/).
<iframe src="./demo/simplified/" width="100%" height="auto">Error loading the simpliified demo</iframe>
