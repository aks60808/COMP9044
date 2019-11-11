#!/bin/dash
# author: Heng-Chuan Lin (z5219960@unsw.edu.au)
# class: 9041 soft-con
# file description: check the add and commit funciton
# written in 14/07/2019
if [ -d .legit ]
then
    rm -r .legit #just in case
fi
./legit-init
touch a 
./legit-add a 
./legit-commit -m first_commit
if [ ! -f .legit/repo/master/index/a ]
then
    echo "error :cant find a in index"
    exit 1
fi
rm a            
./legit-commit -a -m second_commit    # error : the file a still in index  --fixed
if [ -f .legit/repo/master/index/a ]
then
    echo "error: a shouldnt be in the index"
    exit 1
fi
if [ -f .legit/repo/master/commit/1/a ]
   echo "error: a shouldnt be in the repo"
   exit 1
fi
echo "done the script - passed"
rm -r .legit
