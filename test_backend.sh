#!/bin/bash
cd ./backend/repo/
echo "===== Running Repo Package Unit Tests ======"
go test -v

# cd into other packages and add tests as they are completed...
