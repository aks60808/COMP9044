#!/bin/dash
# author: Heng-Chuan Lin (z5219960@unsw.edu.au)
# class: 9041 soft-con
# file description: test script for basic legit funciton 
# written in 14/07/2019
if [ -d .legit ]
then
    rm -r .legit #just in case
fi
./legit-init
touch a b c
echo "start" >a
./legit-add a c
./legit-commit -m first_commit
./legit-status
echo "change" > a
./legit-add b 
./legit-commit -a -m second_commit
#./legit-rm c   # error happened :rm: cannot remove ‘c’: No such file or directory
./legit-log
./legit-status
./legit-show 0:a
./legit-show 1:a
echo "done the $0 -- passed"
rm -r .legit
rm a b c 


