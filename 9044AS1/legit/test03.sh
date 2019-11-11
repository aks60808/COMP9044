#!/bin/dash
# author: Heng-Chuan Lin (z5219960@unsw.edu.au)
# class: 9041 soft-con
# file description: error test for branch and status
# written in 14/07/2019
if [ -d .legit ]
then
    rm -r .legit #just in case
fi
./legit-init 
touch a
./legit-branch b1
./legit-status # error occured : didn't create such folders inside commit cause ls error - ls: cannot access .legit/repo/master/commit: No such file or directory
echo "done the script - passed"
rm -r .legit
rm a
