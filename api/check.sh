# CHECKING ENV FILE

file=".env"

if [ -e "$file" ]; then
    echo "$file exists."
    echo "Running Dev Server..."
    node --watch .
else
    echo "$file file does not exist."
fi
