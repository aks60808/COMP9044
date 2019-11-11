#!/bin/dash
# author: Heng-Chuan Lin (z5219960@unsw.edu.au)
# class: 9041 soft-con
# file description: file checking after branch & checkout
# written in 14/07/2019
if [ -d .legit ]
then
    rm -r .legit #just in case
fi
./legit-init 
touch a
echo this is a>a
./legit-add a
./legit-add a
./legit-branch b1
./legit-status
echo b>a
./legit-checkout b1
if [ ! -f .legit/repo/master/index/a ]
then
    echo "error : a should be found in index of master"
fi
./legit-status
output=`cat a`
if [ ! -f a ]
then
    echo "error: a should be in working dir"
    exit 1
fi
if [ $output != b ]
then
    echo "error: the content of a should be b"
    exit 1
fi
echo "done the script - passed"
rm -r .legit
rm a
