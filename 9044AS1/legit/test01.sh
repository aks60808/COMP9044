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
./legit-commit -m first_commit     # here cause issue with statement rangement  --fixed
if [ -f .legit/repo/master/index/a ]
then
    echo "error found a in index"
    exit 1
fi
./legit-add a 
./legit-commit -m first_commit
if [ ! -f .legit/repo/master/index/a ]
then
    echo "error :cant find a in index"
    exit 1
fi
echo 'haha' >> a
./legit-commit -a -m second_commit
output=`cat .legit/repo/master/commit/1/a`
if [ $output != 'haha' ]
then
    echo "error : wrong content of a"
    echo "should be $output"
    exit
fi
echo "done the $0 - passed"
rm -r .legit
rm a
