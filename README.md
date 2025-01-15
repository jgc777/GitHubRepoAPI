# GithubRepoAPI
Get the github repos of a user, with more options. It doesn't want to show all the repos if they are more than 30. I'm working on a new version to fix this.
## I know the appendRepos() works but I don't know if the API ones work.

## How to use it
 Just load [the script](./api.js) and do `appendRepos(a, b);`. Check the Functions info down this page.
### Example
 ```html
 <script src="https://cdn.jsdelivr.net/gh/jgc777/GitHubRepoAPI@latest/api.js"></script> <!-- Load the API -->
 <ul id="repo-list"></ul> <!-- Here will appear the repo list -->
 <script>
    const token = 'YOUR_API_KEY'; // Your API key with public repos read access
    appendRepos("jgc777", repo-list); // Call appendRepos
</script> <!-- Use the API to get the list -->
 ```

 It may work without the API key. Also check my [github pages code](https://github.com/jgc777/jgc777.github.io/blob/main/README.md?plain=1) and the [demo code](https://github.com/jgc777/GetReposbyUsername/blob/main/demo/index.html?plain=1).

## Functions
Here are the functions that this program includes.

### appendRepos(username, repoListElement)
 Appends the repos of a given username to a list, with the links to them ordered by pinned and starcount.

### getReposbyUsername(username)
 Returns a (not ordered) list of all the repos for a given username.

### getOrderedRepoList(username)
 Returns a (ordered by pinned an starcount) list of all the repos for a given username.

### IsPinned(owner, repo)
> Needs an API key, else returns false.

 Return if (true/false) a repo is pinned in the owners profile.

### starCount(owner, repo)
> Needs an api key

 Returns the starcount of a given repo.

## Demo
(It only shows in the web. If it doesn't work click [here](./demo/).
 <iframe src="./demo/" width="100%" height="auto">Error loading the demo</iframe>

## License
[![License](https://img.shields.io/github/license/jgc777/GetReposbyUsername?style=for-the-badge)](./LICENSE)

I would appreciate if you didn't remove the comment on the javascript code.
