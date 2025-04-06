// Made by Jgc7 (https://github.com/jgc777)
const apiKey = "github_pat_".concat("11AVUWJ7I0tuimieFyMoqz_I80XwaPEIn7zJRVlHQRgtJ3DwKhhDpuHtYEREzfQAimFUOLFRIFy960aeM0"); // Define the token
// I know this is not the way to store a token, but this is just a demo and it doesn't have any perms
const script = document.createElement('script'); // Create a script element
script.src = `https://cdn.jsdelivr.net/gh/jgc777/GitHubRepoAPI@main/api.js?token=${apiKey}`; // Get the token defined up here and pass it to the script
document.head.appendChild(script); // Append the script to the html document
