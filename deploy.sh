#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Some common configuration
TARGET_BRANCH="gh-pages"
SOURCE_DIR="./public"

REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone target branch for this repo
echo "**********************************************Cloning target branch ${TARGET_BRANCH} into temporary directory"
git clone $REPO out
cd ./out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
rm -rf *
cd ..

# Run the build
echo "**********************************************Executing build"
npm run build

# Copy the build contents to the repo
echo "**********************************************Copying build files from ${SOURCE_DIR} into clone of target branch ${TARGET_BRANCH}"
cp -R $SOURCE_DIR/* ./out

cd ./out

# Nothing to do if there are no files changed
if [[ -z `git diff --exit-code` ]]; then
	echo "**********************************************No changes for this push. Canceling pages deployment."
	# Cleaning up
	cd ..
	rm -rf ./out
	exit 0
fi

# Committing and pushing all changes
echo "**********************************************Committing and pushing changes made to clone of target branch ${TARGET_BRANCH}"
git add .
git commit -m "Automatically deploying build from working directory. Latest commit: ${SHA}"
git push origin $TARGET_BRANCH

# Cleaning up
echo "**********************************************Deleting temporary clone of target branch ${TARGET_BRANCH}"
cd ..
rm -rf ./out
