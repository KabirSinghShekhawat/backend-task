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
For testing, you need to edit your network host file and add at the very bottom (also mentioned in the diagram)
```
127.0.0.1 testapi.com
```
This is the host name defined in the ingress config file and used in Postman collections as well.
[1]: https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
[2]: https://www.npmjs.com/package/@uni-cron/pratilipi-common
[3]: https://excalidraw.com/
