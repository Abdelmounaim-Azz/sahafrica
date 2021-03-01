docker build -t abdelmounaimazz/auth:latest -t abdelmounaimazz/auth:$SHA -f ./auth/Dockerfile ./auth
docker build -t abdelmounaimazz/client:latest -t abdelmounaimazz/client:$SHA -f ./client/Dockerfile ./client
docker build -t abdelmounaimazz/expiration:latest -t abdelmounaimazz/expiration:$SHA -f ./expiration/Dockerfile ./expiration
docker build -t abdelmounaimazz/orders:latest -t abdelmounaimazz/orders:$SHA -f ./orders/Dockerfile ./orders
docker build -t abdelmounaimazz/payments:latest -t abdelmounaimazz/payments:$SHA -f ./payments/Dockerfile ./payments
docker build -t abdelmounaimazz/products:latest -t abdelmounaimazz/products:$SHA -f ./products/Dockerfile ./products

docker push abdelmounaimazz/auth:latest
docker push abdelmounaimazz/client:latest
docker push abdelmounaimazz/orders:latest
docker push abdelmounaimazz/products:latest
docker push abdelmounaimazz/expiration:latest
docker push abdelmounaimazz/payments:latest

docker push abdelmounaimazz/auth:$SHA
docker push abdelmounaimazz/client:$SHA
docker push abdelmounaimazz/orders:$SHA
docker push abdelmounaimazz/peoducts:$SHA
docker push abdelmounaimazz/payments:$SHA
docker push abdelmounaimazz/expiration:$SHA

kubectl apply -f ./infra/k8s
kubectl set image deployments/auth-depl auth=abdelmounaimazz/auth:$SHA
kubectl set image deployments/client-depl client=abdelmounaimazz/client:$SHA
kubectl set image deployments/orders-depl orders=abdelmounaimazz/orders:$SHA
kubectl set image deployments/products-depl products=abdelmounaimazz/products:$SHA
kubectl set image deployments/expiration-depl expiration=abdelmounaimazz/expiration:$SHA
kubectl set image deployments/payments-depl payments=abdelmounaimazz/payments:$SHA
