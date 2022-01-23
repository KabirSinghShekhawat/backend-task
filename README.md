# Back End Task

## Tech Overview
* Node.js 
* Express
* MongoDB
* Mongoose
* Docker
* Kubernetes
* [ingress-nginx controller][1]
* [error handling middleware][2]*


#### *Since the code was common to all modules, I published it to npm to use it as a common package across services. 
<p>&nbsp;</p>

## Installation

```sh
 git clone https://github.com/KabirSinghShekhawat/backend-task.git
 cd backend-task
 bash runMe.sh
```
<p>&nbsp;</p>

### runMe.sh takes just one argument

```sh
bash runMe.sh docker-id
```

<p>&nbsp;</p>

###  Check Pods 
```sh
 kubectl get pods
```

Architecture Diagram is in an [excalidraw][3] file called [HLD_v1.excalidraw](HLD_v1.excalidraw)

[1]: https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
[2]: https://www.npmjs.com/package/@uni-cron/pratilipi-common
[3]: https://excalidraw.com/