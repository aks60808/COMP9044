#!/bin/dash
# author: Heng-Chuan Lin (z5219960@unsw.edu.au)
# class: 9041 soft-con
# file description: error : checkout without any commit
# written in 14/07/2019
if [ -d .legit ]
then
    rm -r .legit #just in case
fi
./legit-init
touch a
./legit-branch b1  #error : based on 2041 legit should print error:your repository does not have any commits yet
./legit-add a
./legit-commit -m first
./legit-checkout b1
./legit-rm --cached a
./legit-status
echo "done the script - passed"
rm -r .legit
rm a
