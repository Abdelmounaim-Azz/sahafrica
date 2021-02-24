# Sahafrica

**Sahafrica** is a muti-service fullstack app that uses an event driven architecture (nats streaming server) to communicate between each service.

### containers running successfully(docker+k8s)

![Containers](https://i.ibb.co/MBfmxny/image.png)

---

### event sharing(nats streaming server)

![Containers](https://i.ibb.co/tp7rLBs/image.png)
![Containers](https://i.ibb.co/x3F3ykF/image.png)

---

### testing services(jest,supertest)

![Containers](https://i.ibb.co/LSLf4KK/image.png)
![Containers](https://i.ibb.co/gwXxcBS/image.png)
![Containers](https://i.ibb.co/R75kTgp/image.png)

---

### client( nextJS)

![Containers](https://i.ibb.co/4NL3D13/image.png)
![Containers](https://i.ibb.co/dP8rxgn/image.png)
![Containers](https://i.ibb.co/j8nNRQY/image.png)
![Containers](https://i.ibb.co/pvYj4cQ/image.png)
![Containers](https://i.ibb.co/C634fvB/image.png)
![Containers](https://i.ibb.co/JzBfmkx/image.png)
![Containers](https://i.ibb.co/d4qXZHb/image.png)
![Containers](https://i.ibb.co/mTY7dfV/image.png)
![Containers](https://i.ibb.co/0X6tyCG/image.png)
![Containers](https://i.ibb.co/KF8F6RM/image.png)
![Containers](https://i.ibb.co/XW4GtQc/image.png)

---

## code sharing

all services share some logic between them,such as seeing if user loged in,custom error handling.[azz-sahafrica](https://www.npmjs.com/package/azz-sahafrica "common library") serves as a common library to share code with these services instead of just copy pasting.

---

## Author

Abdelmounaim Azziza [@abdelmounaimazz](https://twitter.com/AbdelmounaimAzz "abdelmounaimazz").

**Special acknowledgement**: This project is heavily inspired by @stephengrider microservices course.
