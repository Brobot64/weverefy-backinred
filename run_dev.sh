#!/bin/bash

# Define directories (replace with your actual paths)
baseDir="C:/Users/Brobot/Documents/Onprojects/weverefyd"
directories="account gateway identity"

# Loop through each directory
for dir in $directories; do
  echo "Running yarn dev in: $baseDir/$dir"
  cd "$baseDir/$dir" || exit 1
  # No need for "start" command, run directly
  yarn dev &  # "&" runs the command in the background
done

echo "All yarn dev processes started!"