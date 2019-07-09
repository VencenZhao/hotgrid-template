#/bin/bash
cd ..

git add * 

if [[ `$1` == "" ]]; then
  echo here
  git commit -m "modify something"
else
  git commit -m "$1"
fi

git push

cd ./shell