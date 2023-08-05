#! /bin/bash

# Checkout main
git checkout main

# Build the project
elm make src/Main.elm

# Ensure the diff is clean using git diff
if [[ -n $(git diff) ]]; then
    echo "Git diff is not clean. Please commit all changes before deploying."
    exit 1
fi

# Get commit hash
commit_hash=$(git rev-parse HEAD)

# Build and deploy
git checkout gh-pages
git checkout main -- index.html
git add .
git commit -m "Deploying commit $commit_hash"
git push

# Back to main
git checkout main