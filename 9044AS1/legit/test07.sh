#!/bin/dash
# author: Heng-Chuan Lin (z5219960@unsw.edu.au)
# class: 9041 soft-con
# file description: error :checkout the current branch
# written in 14/07/2019
if [ -d .legit ]
then
    rm -r .legit #just in case
fi
./legit-init
touch a
./legit-add a
./legit-commit -m first
./legit-branch b1
./legit-checkout master # should say its already in master!!! ---fixed
echo "done the script - passed"
rm a
rm -r .legit
