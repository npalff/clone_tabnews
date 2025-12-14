# Git Commands
This document describes the main Git commands and useful Git procedures. Keeping this reference handy will simplify future pull requests, integrations, and help maintain a clean, consistent codebase.

# Main commands

## Rebase and change the commit tree:
FYI: Check inside rebase menu for the commands you want to perform

<details>
<summary>Rebase menu</summary>

**Commands:**

```text
p, pick <commit>        = use commit
r, reword <commit>      = use commit, but edit the commit message
e, edit <commit>        = use commit, but stop for amending
s, squash <commit>      = use commit, but meld into previous commit
f, fixup [-C | -c]      <commit> = like "squash" but keep only the previous
                          commit's log message, unless -C is used, in which case
                          keep only this commit's message; -c is same as -C but
                          opens the editor
x, exec <command>       = run command (the rest of the line) using shell
b, break                = stop here (continue rebase later with 'git rebase --continue')
d, drop <commit>        = remove commit
l, label <label>        = label current HEAD with a name
t, reset <label>        = reset HEAD to a label
m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
                        = create a merge commit using the original merge commit's
                          message (or the oneline, if no original merge commit was
                          specified); use -c <commit> to reword the commit message
u, update-ref <ref>     = track a placeholder for the <ref> to be updated
```
</details>


```
git rebase -i HEAD~2
# f, fixup : can help getting 2 commits in only one - Good to keep a clean commit history

Git push --force
```
## Cheat sheet
```
git clone <repository_url> - Clone a remote repository to the local environment  

git status - Show the current repository status  
git log - Show commit history

## BRANCH COMMANDS:
git branch - List local branches  
git branch <branch_name> - Create a new branch  
git branch -d <branch_name> - Delete a local branch  

git checkout <branch_name> - Switch to a branch  
git checkout -b <branch_name> - Create and switch to a new branch

git diff - Show file differences  
git diff --staged - Show staged differences  

git cherry-pick <commit_hash> - Apply a specific commit to the current branch  

```

<details>
<summary>Cheat Sheet - full</summary>
  
```
git clone <repository_url> - Clone a remote repository to the local environment  
git init - Initialize a new local Git repository  

git status - Show the current repository status  
git log - Show commit history  
git log --oneline --graph --decorate - Show compact commit history with graph  

git add <file> - Stage a specific file  
git add . - Stage all modified and new files  
git commit -m "message" - Create a commit with a message  
git commit --amend - Amend the last commit  

git branch - List local branches  
git branch <branch_name> - Create a new branch  
git branch -d <branch_name> - Delete a local branch  

git checkout <branch_name> - Switch to a branch  
git checkout -b <branch_name> - Create and switch to a new branch  

git switch <branch_name> - Switch to a branch (modern alternative)  
git switch -c <branch_name> - Create and switch to a new branch  

git merge <branch_name> - Merge a branch into the current branch  
git rebase <branch_name> - Rebase current branch onto another branch  
git rebase -i HEAD~<n> - Interactive rebase for the last n commits  

git cherry-pick <commit_hash> - Apply a specific commit to the current branch  

git pull - Fetch and merge changes from the remote repository  
git pull --rebase - Fetch and rebase instead of merge  
git fetch - Fetch changes without merging  

git push - Push local commits to the remote repository  
git push -u origin <branch_name> - Push and set upstream branch  
git push --force - Force push changes (use with caution)  

git stash - Save uncommitted changes temporarily  
git stash list - List stashed changes  
git stash show - Show stashed changes  
git stash pop - Restore and remove the latest stash  

git reset --soft HEAD~1 - Undo last commit, keep changes staged  
git reset --mixed HEAD~1 - Undo last commit, keep changes unstaged  
git reset --hard HEAD~1 - Undo last commit and discard changes  

git diff - Show file differences  
git diff --staged - Show staged differences  

git tag - List tags  
git tag <tag_name> - Create a lightweight tag  
git tag -a <tag_name> - Create an annotated tag  

git remote - List remotes  
git remote -v - Show remote URLs  
git remote add origin <url> - Add a remote repository  
```
</details>


# Procedures
# Git Workflows
This section organizes common git processes

## Perform modifications, but keep it in only 1 commit

```
git add <files_to_commit> 
git commit --amend --no-edit
git push -f
```

## Sync a branch with another while preserving local changes
*Objective*: Update a development branch to integrate changes from a release branch without losing current local changes, also facilitating integration when a PR is created.
<details>
<summary>Sumarized - stash</summary>

```
git reset --soft HEAD~1
git add your_files_to_shash
git stash

#To view the changeset in the stash do
git stash list
git stash show

git reset --hard
  
#In any case, you will have to do afterwards:
git checkout <release_branch>
git pull
git checkout <dev_branch>
git rebase <release_branch>

git stash pop
```
</details>

There are 2 ways of doing that: Stash or Diff both will be disclosed here.

If your change is already commited you will need to change the head:
```
#Removes the last commit but keeps all changes staged.
git reset --soft HEAD~1
```
#### Store local changes
```
### With Stash:
git add <your_files_to_shash>
git stash

# To view the changeset in the stash do
git stash list
git stash show

### OR with DIFF
git diff <your_files_to_stash> > mydiff.diff 

```
Finish this by cleaning the working tree:
```  
# Clean the working tree
git reset --hard

```

#### Update the release branch and rebase the development branch

```  
# Go to release branch that you want to integrate to the development one
# with git pull you can retrieve from the current release branch all changes merged.
git checkout <release_branch>
git pull

# Back to development branch to rebase from release
git checkout <development_branch>
git rebase <release_branch>
```
#### Recover your changes

```
# Recover all your changes:
## Stash
git stash pop
## Diff
patch -p1 < mydiff.diff

```

## Retrieve commits from a PR

For that we will use gh commands from GitHub command-line interface in the terminal. The first
time the GitHub CLI is used in a container a first setup is needed to authenticate and authorize
it.

>[!NOTE]
>You will need to have gh cli installed in your machine - MAC: brew install gh

```
gh auth login
gh repo set-default
gh pr checkout <PR Number>
```
The command will create and automatically checkout to a new branch that will clone from the
PR state.

From there we can both choose to use stash to get the code from branch to branch, or the best
will even be to use git cherry-pick command directly from the working branch for all the needed
commits. Please notice that the working branch is not necessarily the default created from this
procedure.


```
git cherry-pick <commit hash>
```


<details>
  <summary>Using stash</summary>

We use this to move the changes from one branch to another, please notice this way we lose
the history from the previous commit.
  ```
  git reset --soft HEAD~1
 # HEAD~1 will move only 1 commit, 1 then can be replaced for the number of commits
 # its need to take the code from
 git add <to all files you want to stash>
 git stash
 git checkout <branch you want to add the stashed code>
 git stash pop
  ```
  
</details>
