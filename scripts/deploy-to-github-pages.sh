#!/bin/bash
set -o errexit

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"
GIT_USER_EMAIL="admin@travis-ci.org"
GIT_USER_NAME="Travis CI"
BUILD_PATH="build"
SHA=$(git rev-parse --verify HEAD) # reference to commit deployed to TARGET_BRANCH
COMMIT_MSG="Deploy to Github Pages: ${SHA}"

# Don't deploy if
# 1. Pull request
# 2. Not target branch
if [[ ("$TRAVIS_PULL_REQUEST" != "false") || ("$TRAVIS_BRANCH" != "$SOURCE_BRANCH") ]]; then
    echo 'Not deploying';
    exit 0
fi

# config
git config --global user.email "$GIT_USER_EMAIL"
git config --global user.name "$GIT_USER_NAME"

# deploy
cd $BUILD_PATH
git init
git add .
git commit -m "$COMMIT_MSG"

git push -f --quiet "https://${GITHUB_TOKEN}@github.com/${REPO_SLUG}.git" $SOURCE_BRANCH:$TARGET_BRANCH > /dev/null 2>&1
