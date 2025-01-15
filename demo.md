---
layout: default
theme: jekyll-theme-midnight
show_downloads: "false"
github:
  owner_url: http://jgc777.github.io/
  owner_name: Jgc7
title: ""
description: ""
---

<title>GitHubRepoAPI Demo</title> <!-- Title -->
<!-- Ik I left this here -->
<script>const token = "github_pat_".concat("11AVUWJ7I0tuimieFyMoqz_I80XwaPEIn7zJRVlHQRgtJ3DwKhhDpuHtYEREzfQAimFUOLFRIFy960aeM0");</script> <!-- Configure the token -->
<input type="search" id="username" placeholder="GitHub username" autocomplete="off"> <!-- Input box -->
<button onclick="appendRepos(document.getElementById('username').value, document.getElementById('repo-list'))">Get User Repos</button> <!-- Button -->
<ul id="repo-list"></ul> <!-- Here will appear the list -->
<script src="../GitHubRepoAPI.js"></script> <!-- Load the "API" -->
