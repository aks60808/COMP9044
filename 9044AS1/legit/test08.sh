#!/bin/dash
# author: Heng-Chuan Lin (z5219960@unsw.edu.au)
# class: 9041 soft-con
# file description: file checking 
# written in 14/07/2019
if [ -d .legit ]
then
    rm -r .legit #just in case
fi
./legit-init
touch a
echo 'unchanged' >a
./legit-add a
./legit-commit -m first
./legit-branch b1
echo 'changed' > a
./legit-checkout b1
out1=`cat a`
out2=`cat .legit/repo/b1/index/a`
if [ $out1 != 'changed' ]
then
    echo "error: a in curdir should be 'changed'"
    exit 1
fi
if [ $out2 != 'unchanged' ]
then
    echo "error: a in index of b1 should be 'unchanged'"
    exit 1
fi

./legit-commit -a -m sec
./legit-checkout master
out3=`cat a`
if [ ! -f a ]
then
    echo " a should be in cur dir"
    exit 1
fi
if [ $out3 != 'unchanged' ]
then
    echo " a in cur dir should be 'unchanged' "
    exit 1
fi
echo "done the script - passed"
rm a
rm -r .legit
