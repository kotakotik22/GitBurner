# GitBurner
###### yeah, very original name, i know
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
  <summary>If you want to be able to push to repositories using PAT's (check the 'Pushing' section below)</summary>
  
  If you want to be able to push, you need to use a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 
  with public repo enabled
  
  This token is saved in the localstorage so it's not encoded into exported saves, but beware it's still not the most safe place to store tokens (it can be accessed by any script you run, for example)
  
  ```
  run /gitburner/settoken.js [your personal access token here]
  ```
</details>
Done!

# Pushing:
To push, you need to log into your GitHub account, you can do this two ways:

## PAT's
[Personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
allow you to create a token that will be used by this app

Check the installations section for info on how to setup one

### **BUT BEWARE, THIS CAN BE UNSAFE**

The PAT is saved in LocalStorage, so it's not saved in a BitBurner file (so it's not encoded into exported saves), but any script can still access them

And there is no way to limit the repositories a PAT can modify, so if someone finds this token, they can modify any repository you can modify

## Temporary app auth
You can also temporarily authenticate, the login is not saved anywhere so it's saved than the above way, but you'll have to login for every push you make

If you have no token set, the push operation will automatically print instructions:

```
	Install the GitBurner app: (you only have to do this once per account)
	   https://github.com/apps/gitburner-bitburner

	To authenticate, go to:
	   https://github.com/login/device
	And enter the code
	   XXXX-XXXX
	We will automatically proceed once you have accepted
```

# Notes:
* I haven't tested this with conflicts yet
* Reading GitHub projects is cached to 5 minutes, so pushing two commits withing 5 minutes of each other might break things

# Usage:

### Clone repo
```
github get [repo owner]/[repo name] [path]
```
Path is optional, if omitted, it will find current

Example:
```
github get kotakotik22/BitBurnerGithubTest
```
### Pull from GitHub
```
github get [repo owner]/[repo name]
```
Repo information is optional, if omitted, it will find the repo name of the directory you are currently in

If repo information is provided, it will ignore where you currently are and update where the matching repo is

**THIS WILL OVERWRITE ANY CHANGES YOU MADE SINCE THE LAST PULL!!**

Example:
```
github get
```
### Push to GitHub
```
github push [repo owner]/[repo name] -m "[message]"
```
Just like pulling from GitHub, the repo information is optional

Message is also optional

Example:
```
github push
```
### Changing PATs
To change your PAT:
```
run /gitburner/settoken.js [token]
```
To reset it:
```
run /gitburner/resettoken.js
```
### Folder & branch link
Folders are linked to repo branches in ``/gitburner/repos.txt``, if you want to unlink one, you currently have to manually edit that file.
### File list
Every repo has a ``files.txt``, this is the list of files that should be synced between GitHub and BitBurner, you'll have to manually add every file you want to be synced if you made them before creating the repo, but if you are making files after, you can use a command:
```
github touch [file name]
```
If the file name doesn't end in an accepted file format (.txt, .script, .js), a .txt will automatically be added to it
