# I. Check the current remote origin
```
git remote -v
```
The result will be as below
```
origin	https://github.com/hitmyanmar/repository-1.git (fetch)
origin	https://github.com/hitmyanmar/repository-1.git (push)
```

# II. Change the remote URL
```
git remote set-url origin https://gitlab.com/hitmyanmar/repository-1.git
```
This command done both "remove remote URL" and "set new remote URL"

# III. Just remove remote URL
```
git remote remove origin
```

# IV. Reference
https://kodekloud.com/blog/change-remote-origin-in-git/
