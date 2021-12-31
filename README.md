# GitBurner
A BitBurner app to fetch/push GitHub code

<details>
  <summary>Showcase</summary>
  
  https://user-images.githubusercontent.com/61428759/147832588-fbac1738-9bba-46e5-9fde-a6ae7ebc5aa7.mp4
</details>

# Installing

Wget the installation script
```
wget https://raw.githubusercontent.com/kotakotik22/GitBurner/main/install.js installGitburner.js
```
Run the installation script
```
run installGitburner.js
```
Add alias
```
alias github="run /gitburner/github.js"
```
<details>
  <summary>If you want to be able to push to repositories</summary>
  
  If you want to be able to push, you need to use a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with public repo enabled
  
  This token is saved in the localstorage so it's not encoded into exported saves, but beware it's still not the most safe place to store tokens (it can be accessed by any script you run, for example)
  
  ```
  run /gitburner/settoken.js [your personal access token here]
  ```
</details>
Done!

# Notes:
* Tokens are saved in localstorage, while this is safer than storing them in a txt bitburner file, it's still not the safest since it can be accessed by any script you run
* I haven't tested this with conflicts yet

# Usage:
TODO :)
