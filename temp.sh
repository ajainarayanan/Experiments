#!/bin/bash
# Target the src/components directory
find ./src/components -type f -name "*.js" | while read file; do
  mv "$file" "${file%.js}.jsx"
done
