#!/bin/bash
# Author: Kabir Singh Shekhawat

# names of images to build
declare -A images

images[0]="content"
images[1]="event-bus"
images[2]="user"
images[3]="interaction"

# folders
declare -A folders

folders[0]="content"
folders[1]="event-bus"
folders[2]="user"
folders[3]="user-interaction"

# Declare a for loop that will iterate over all the folders
for n in {0..3}
    do
        # Create tag for image
        img_name="$1/${images[$n]}"
        # build the image in the current folder's context
        build="docker build -t  $img_name ."
        # push to docker hub
        push="docker push $img_name"
        # run all cmds
        eval "cd ${folders[$n]} && $build && $push"
		eval "cd .."
        # change back to root folder
        echo "built and pushed image: $img_name"
    done

ingress_nginx="https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml"
eval "cd infra/k8s && kubectl apply -f $ingress_nginx && kubectl apply -f ."

