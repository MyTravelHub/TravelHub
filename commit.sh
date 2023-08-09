#!/bin/bash

# Get the commit message from the user
echo "Enter commit message:"
read message

# Navigate to the frontend directory
cd frontend

# Run build for the React app
npm run build

# Go back to the root directory
cd ..

# Navigate to the backend directory
cd backend

# Run build for the Express app
npm run build

# Go back to the root directory
cd ..

# Check for changes
if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
else
    # Add all files to staging area
    git add .

    # Commit changes with the specified message
    git commit -m "$message"

    # Push changes to the current branch
    current_branch=$(git branch --show-current)
    git push origin "$current_branch"

    echo "Changes pushed to remote repository."
fi
