# Sahafrica

**Sahafrica** is a muti-service fullstack app that uses an event driven architecture (nats streaming server) to communicate between each service.

## App architecture

![Architecture](https://i.ibb.co/Rcky4Xd/sahafrica-architecture.png)

## code sharing

all services share some logic between them,such as seeing if user loged in,custom error handling.[azz-sahafrica](https://www.npmjs.com/package/azz-sahafrica "common library") serves as a common library to share code with these services instead of just copy pasting.

---


## Author

Abdelmounaim Azziza [@abdelmounaimazz](https://twitter.com/AbdelmounaimAzz "abdelmounaimazz").

**Special acknowledgement**: This project is heavily inspired by @stephengrider microservices course.
