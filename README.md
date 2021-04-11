# Sahafrica

**Sahafrica** is a muti-service fullstack app that uses an event driven architecture (nats streaming server) to communicate between each service.

## App architecture

![Architecture](https://i.ibb.co/myZdgRV/68747470733a2f2f692e6962622e636f2f52636b793458642f7361686166726963612d6172636869746563747572652e706e.png)

## code sharing

all services share some logic between them,such as seeing if user loged in,custom error handling.[azz-sahafrica](https://www.npmjs.com/package/azz-sahafrica "common library") serves as a common library to share code with these services instead of just copy pasting.

---


## Author

Abdelmounaim Azziza [@abdelmounaimazz](https://twitter.com/AbdelmounaimAzz "abdelmounaimazz").

**Special acknowledgement**: This project is heavily inspired by @stephengrider microservices course.
