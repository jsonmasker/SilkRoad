#!/bin/bash

# Script to remove i18n attributes from HTML files

# Find all HTML files and process them
find /home/masker/MySources/LulusiaKingdom -name "*.html" -type f | while read -r file; do
    echo "Processing: $file"
    # Use sed to remove i18n attributes and i18n-* attributes
    sed -i 's/ i18n="[^"]*"//g' "$file"
    sed -i 's/i18n="[^"]*" //g' "$file"
    sed -i 's/i18n="[^"]*"//g' "$file"
    sed -i 's/ i18n-[^=]*="[^"]*"//g' "$file"
    sed -i 's/i18n-[^=]*="[^"]*" //g' "$file"
    sed -i 's/i18n-[^=]*="[^"]*"//g' "$file"
done

echo "Done removing i18n attributes from all HTML files"
