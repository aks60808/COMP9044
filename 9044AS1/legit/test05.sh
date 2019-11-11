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
echo 'notchanged'>a
./legit-add a
./legit-branch b1
if [ -f .legit/repo/b1/commit/0/a ]
then
    echo "error: a shouldnt be in repo of b1"
    exit 1
fi
./legit-commit -m hahahah
echo 'changed' > a
./legit-branch b2
if [ ! -f .legit/repo/b2/commit/0/a ]
then
    echo "error: a should be in repo of b2"
    exit 1
fi
cur_Dir=`cat a`
repo_b2=`cat .legit/repo/b2/commit/0/a`
if [ $cur_Dir != 'changed' ]
then
    echo "error: a in current dir should be 'changed' "
    exit 1
fi
if [ $repo_b2 != "notchanged" ]
then
    echo "error: a in repo of b2 should be 'not changed'"
    exit 1
fi
echo "done the script - passed"
rm -r .legit
rm a
