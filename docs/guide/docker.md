---
outline: deep
next:
  text: 'Linux'
  link: '/guide/linux'
---
# Docker学习笔记记录
## 安装准备

> 环境准备

- Linux基础
- Ubuntu

> 环境查看

`uname -r` 查看内核版本，不能低于相关的要求

```Shell
$ uname -r
5.15.0-83-generic
```

## Docker安装

#### 检查并卸载老版本

```PowerShell
sudo apt-get remove docker docker-engine docker.io containerd runc
```

会显示:

docker-engine docker.io containerd runc

Reading package lists... Done

Building dependency tree... Done

Reading state information... Done

E: Unable to locate package docker-engine


#### 更新软件包

```PowerShell
apt-get install ca-certificates curl gnupg lsb-release
```


#### 添加docker官方GPG秘钥

```PowerShell
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```


#### 安装第三方工具

```PowerShell
sudo: add-apt-repository: command not found
apt-get install software-properties-common
```

#### 添加软件源

```PowerShell
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```

注意这个不能在fish中使用`$`

#### 安装docker

```PowerShell
apt-get install docker-ce docker-ce-cli containerd.io
```

#### 配置用户组

```PowerShell
sudo usermod -aG docker $USER
```

#### 安装工具

```PowerShell
apt-get -y install apt-transport-https ca-certificates curl software-properties-common
```

#### 重启docker

```PowerShell
service docker restart
```

#### 验证docker是否安装成功

```PowerShell
sudo docker run hello-world
```

**第一次会显示：**

```PowerShell
root@iZf8z3j2ckkap5ux6r0351Z ~# sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete
Digest: sha256:a26bff933ddc26d5cdf7faa98b4ae1e3ec20c4985e6f87ac0973052224d24302
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

#### docker版本查看

```PowerShell
sudo docker version
```

#### docker阿里云加速

```PowerShell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://fwjm47tk.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

https://fwjm47tk.mirror.aliyuncs.com 这个链接要去阿里云控制台去找！每个人都是不同的！

## **Docker底层原理**

### **Docker怎么工作？**

Docker是一个client-server结构的系统，Docker的守护进程运行在主机上，通过socket从客户端访问。

DockerServer接受到Docker-Client的指令，就会执行这个指令。

![alt text](docker_image/image-4.png)
### **Docker为什么比VM快？**

1.Docker有更少的抽象层

2.Docker用的是宿主机的内核

## **Docker常用命令**

### **帮助命令**

```Bash
docker version      #版本信息
docker info                                        #系统信息
docker 命令  --help #万能命令
```

### **镜像命令**

#### Docker images查看镜像

```
docker images
```

root@iZf8z3j2ckkap5ux6r0351Z ~# docker images

REPOSITORY    TAG       IMAGE ID       CREATED         SIZE

hello-world   latest    d2c94e258dcb   11 months ago   13.3kB

解释:

REPOSITORY 镜像的仓库源

TAG                 镜像的标签

IAMGE ID         镜像的id

CREATED                镜像的创建时间

SIZE                        镜像的大小

可选项

`-a`  列出所有镜像

`-q`只显示镜像的id

#### **docker search 搜索镜像**

**`docker search`**

```PowerShell
docker search Mysql
NAME                            DESCRIPTION                                     STARS     OFFICIAL
mysql                           MySQL is a widely used, open-source relation…   15008     [OK]
mariadb                         MariaDB Server is a high performing open sou…   5722      [OK]
```

可选项

`--filter=stars=3000`搜索大于3000的

#### **docker pull下载镜像**

**`docker pull 镜像名 [:tag]`**

#### **docker rmi删除镜像**

**`docker rmi [镜像名/id]`**

**全部删除**

**`docker rmi -f $(docker images -aq)`**

### **容器命令**

有了镜像之后才可以创建容器。

#### **新建容器并启动**

```
docker run [可选参数] image
```

参数说明:

`--name='Name'`  容器名字，用来区分容器

`-d`                                后台方式运行

`-it`                        使用交互式运行，可以进入容器查看内容

`-p`                                指定容器的端口 -p 8080:8080

-p ip 主机端口 : 容器端口

-p 主机端口 : 容器端口

-p 容器端口

容器端口

`-P`                                随机端口

比如启动并进入容器

```
docker run -it centos /bin/bash
```

#### **列出运行的容器**

```
docker ps [可选参数]
```

`-a`         所有容器（包括当前和历史运行的）

`-n=?`        显示最近创建的容器

`-q`                只显示编号id

#### **退出容器**

**`exit`**        **容器停止并退出**

**`crtl +p +q`** **退出但不停止**

#### **删除容器**

1. 删除使用这个镜像的容器

```
docker container rm 4f11698297ca
```

1. 强制删除容器

```
docker container rm -f 4f11698297ca
```

1. 强制删除镜像

```
docker image rm -f 5d0da3dc9764
```

1. 删除所有停止容器

```
docker container prune
```

1. 停止并删除所有容器

```
docker container stop $(docker container ls -qa)
docker container rm $(docker container ls -qa) 
```

**删除容器并不会影响到镜像**

#### **启动和停止容器**

**`docker start id`**

**`docker restart id`**

**`docker stop id`**

**`docker kill id`**

## **容器其他命令**

### **后台启动命令**

```
docker run -d 镜像名
```

但是`docker ps`后发现该镜像停止了

这是一个常见的问题。docker使用后台启动，就必须要有一个前台进程。docker发现没有前台进程就会自动停止。

### **查看日志**

```
docker logs -f -t --tail n 容器
```

### **查看容器中进程信息**

```
docker top id
```

### **查看镜像的元信息**

```
docker inspect id
```

### **进入当前正在运行的容器**

`docker exec -it id /bin/bash` (开启新终端)

`docker attach id /bin/bash`        (进入当前正在运行的终端)

### **从容器内拷贝文件到主机**

```
docker cp 容器id:容器内路径 目的主机路径
```
![alt text](docker_image/image-5.png)

## **练习部署**

#### **部署Nginx**

- 搜索镜像(docker hub)
- 下载镜像

```Shell
root@iZf8z3j2ckkap5ux6r0351Z ~# docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
a2abf6c4d29d: Pull complete 
a9edb18cadd1: Pull complete 
589b7251471a: Pull complete 
186b1aaa4aa6: Pull complete 
b4df32aa5a72: Pull complete 
a0bcbecc962e: Pull complete 
Digest: sha256:0d17b565c37bcbd895e9d92315a05c1c3c9a29f762b011a10c54a66cd53c9b31
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
```

- 查看下载

```Shell
root@iZf8z3j2ckkap5ux6r0351Z ~# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    d2c94e258dcb   11 months ago   13.3kB
nginx         latest    605c77e624dd   2 years ago     141MB
```

- 运行

```Shell
root@iZf8z3j2ckkap5ux6r0351Z ~# docker run -d --name nginx01 -p 3344:80 nginx
bbc025236c03b265248702f04a9316ef93edea9c608f4bd374be5dc4fcf7dc68
```

- 本机测试

```Shell
root@iZf8z3j2ckkap5ux6r0351Z ~# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS         PORTS                                   NAMES
bbc025236c03   nginx     "/docker-entrypoint.…"   12 seconds ago   Up 8 seconds   0.0.0.0:3344->80/tcp, :::3344->80/tcp   nginx01
root@iZf8z3j2ckkap5ux6r0351Z ~# curl localhost:3344
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>
<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>
<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

- Aliyun配置一下安全组

![alt text](docker_image/image.png)
- 停止

```Shell
root@iZf8z3j2ckkap5ux6r0351Z ~# docker stop bbc025236c03
bbc025236c03
```

- 提交镜像

![alt text](docker_image/image-1.png)
`docker commit` 提交容器成为一个新的副本

```
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[TAG]
```

## **容器数据卷**

### **介绍**

如果数据都在容器之中，那么删除容器后，数据就会丢失！ 需求：数据可以持久化

比如MYSQL数据需要存储在本地！

容器之间可以有一个数据共享的技术！Docker容器中产生的数据，同步到本地

将容器内的目录，挂载到Linux!

![alt text](docker_image/image-2.png)

### **使用数据卷**

方式1：直接用命令挂载

```
docker run -it -v 主机目录:容器目录 image /bin/bash
```

#### **练习**

- MYSQL的数据持久化
- 下载后查看

```Plain
root@iZf8z3j2ckkap5ux6r0351Z ~ [1]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    d2c94e258dcb   11 months ago   13.3kB
nginx         latest    605c77e624dd   2 years ago     141MB
mysql         5.7       c20987f18b13   2 years ago     448MB
```

- 启动与挂载

```Bash
root@iZf8z3j2ckkap5ux6r0351Z ~# docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d/ -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01
```

记得配置密码:

官方测试:

```Bash
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

DBeaver也是能正常连接到!

![alt text](docker_image/image-3.png)

服务器本地访问挂载:

```Bash
root@iZf8z3j2ckkap5ux6r0351Z /h/m/data# ls
auto.cnf         client-key.pem  ib_logfile1         private_key.pem  sys
ca-key.pem       ib_buffer_pool  ibtmp1              public_key.pem
ca.pem           ibdata1         mysql               server-cert.pem
client-cert.pem  ib_logfile0     performance_schema  server-key.pem
```

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=NzViZWY0NjMwYWViYWYyNWYxZWM3MmIxNjRhZDdhNzZfQ3pvN20wRm1aNjZnT1QyZmN2cTE1bkFucldJQkZKakVfVG9rZW46Q01IbGJFUmNUb2tSTzV4WndpMmMzTXlZblVlXzE3MTkyNDM3NzA6MTcxOTI0NzM3MF9WNA)

## **Dockerfile** 

### **DockerFile介绍**

Dockerfile就是用来构建docker镜像的构建文件！

通过这个脚本可以生成镜像。

![img](https://bqlvnd032q7.feishu.cn/space/api/box/stream/download/asynccode/?code=NjY4Yzg1MTRkY2E3M2FlNjNkYTMyMzAzZDBiZWNiYWJfRThpbXhuUmlMdHd3aVhJT1M5NGs4Y3R3c2NIVHF1RENfVG9rZW46U2s5OWJNRmZub1lhUTd4VmlTb2NYdUpWbnpmXzE3MTkyNDM3NzA6MTcxOTI0NzM3MF9WNA)

构建步骤

- 编写一个dockerfile文件
- docker build构建成为一个镜像
- docker run运行镜像
- docker push 发布镜像（Dockerhub 阿里云）

### **DockerFile构建过程**

**基础知识：**

1. 每个保留关键字都是必须大写字母
2. 执行从上到下的顺序

### 表示注释

1. 每个指令都会创建提交一个新的镜像层

Dockerfile是面向开发的，以后要发布项目，做镜像，就需要编写dockerfile文件。

逐渐成为了一个企业的标准！

- DockerFile：构建文件，定义了一切的步骤，源代码
- Dockerlmages：通过 DockerFile 构建生成的镜像，最终发布和运行的产品
- Docker容器：容器就是镜像运行起来提供服务器

### **DockerFile的指令**

常用的as follows

FROM                         #基础镜像,一切从此处进行构建

MANTAINER        #镜像是谁写的，姓名加邮箱

RUN                         #镜像构建的时候需要运行的命令

ADD                         #步骤，添加相关的内容，类似于创业基金

WORKDIR                #镜像的工作目录

VOLUMN                 #挂载的目录

EXPOSE                 #暴露端口配置

CMD                         #指定容器启动的时候要运行的命令（只有最后一个会生效），可被替代

ENTRYPOINT #指定容器启动的时候要运行的命令,可以追加命令

ONBUILD                #当构建一个被继承DockerFile的时候会执行，相当于触发指令

COPY                         #类似ADD，将文件拷贝到镜像

ENV                         #构建的时候设置环境变量

### **实战测试**

DockerHub中99%镜像都是从scratch中过来的，然后配置需要的软件和配置来进行构建

创建一个自己的ubuntu

官方的ubuntu很多命令没有

- 编写DockerFile

```Plain
FROM ubuntu
MAINTAINER JaeHua
jaelele@163.com
ENV MYPATH /usr/local
WORKDIR $MYPATH
RUN apt update
RUN apt install -y vim
EXPOSE 3001
CMD echo $MYPATH
CMD echo "----------end------------"
CMD /bin/bash
```

- 通过文件构建镜像

```Plain
$ docker build -f mydockerfile_ubuntu -t myubuntu:0.1 .
[+] Building 21.3s (8/8) FINISHED                                                                               docker:default
 => [internal] load build definition from mydockerfile_ubuntu                                                             0.0s
 => => transferring dockerfile: 255B                                                                                      0.0s
 => [internal] load metadata for docker.io/library/ubuntu:latest                                                          0.0s
 => [internal] load .dockerignore                                                                                         0.0s
 => => transferring context: 2B                                                                                           0.0s
 => [1/4] FROM docker.io/library/ubuntu:latest                                                                            0.0s
 => CACHED [2/4] WORKDIR /usr/local                                                                                       0.0s
 => [3/4] RUN apt update                                                                                                  7.9s
 => [4/4] RUN apt install -y vim                                                                                         12.5s
 => exporting to image                                                                                                    0.7s
 => => exporting layers                                                                                                   0.6s
 => => writing image sha256:6bd6b6dd54447374468f8980588cd1e58431bfc86b381c191d238835a0616805                              0.0s
 => => naming to docker.io/library/myubuntu:0.1
```

- 测试运行

```Plain
$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
myubuntu      0.1       6bd6b6dd5444   3 minutes ago   192MB
hello-world   latest    d2c94e258dcb   11 months ago   13.3kB
nginx         latest    605c77e624dd   2 years ago     141MB
mysql         5.7       c20987f18b13   2 years ago     448MB
ubuntu        latest    ba6acccedd29   2 years ago     72.8MB
```

- 查看:

进入后工作目录是usr/local . vim也是有了。

docker history image可以查看dockerfile配置

```Plain
root@iZf8z3j2ckkap5ux6r0351Z ~$ docker history 6bd6b6dd5444
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
6bd6b6dd5444   9 minutes ago    CMD ["/bin/sh" "-c" "/bin/bash"]                0B        buildkit.dockerfile.v0
<missing>      9 minutes ago    CMD ["/bin/sh" "-c" "echo \"----------end---…   0B        buildkit.dockerfile.v0
<missing>      9 minutes ago    CMD ["/bin/sh" "-c" "echo $MYPATH"]             0B        buildkit.dockerfile.v0
<missing>      9 minutes ago    EXPOSE map[3001/tcp:{}]                         0B        buildkit.dockerfile.v0
<missing>      9 minutes ago    RUN /bin/sh -c apt install -y vim # buildkit    68.2MB    buildkit.dockerfile.v0
<missing>      9 minutes ago    RUN /bin/sh -c apt update # buildkit            50.7MB    buildkit.dockerfile.v0
<missing>      14 minutes ago   WORKDIR /usr/local                              0B        buildkit.dockerfile.v0
<missing>      14 minutes ago   ENV MYPATH=/usr/local                           0B        buildkit.dockerfile.v0
<missing>      14 minutes ago   MAINTAINER JaeHua
jaelele@163.com
              0B        buildkit.dockerfile.v0
<missing>      2 years ago      /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      2 years ago      /bin/sh -c #(nop) ADD file:5d68d27cc15a80653…   72.8MB
```

### **发布镜像**

发布镜像.由于做了卷挂载，我们直接在本地编写项目就可以发布了！1

- DockerHub

docker login

```Plain
Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username
```

然后docker push image:tag

- 阿里云

在容器镜像服务里面创建命名空间，再创建容器镜像仓库。

1. 登录阿里云Docker Registry

$ docker login --username=秋刀鱼爱SEGFALUT registry.cn-heyuan.aliyuncs.com

用于登录的用户名为阿里云账号全名，密码为开通服务时设置的密码。

您可以在访问凭证页面修改凭证密码。

1. 从Registry中拉取镜像

$ docker pull registry.cn-heyuan.aliyuncs.com/jianglele/repo:[镜像版本号]

1. 将镜像推送到Registry
```go
docker login --username=秋刀鱼爱SEGFALUT registry.cn-heyuan.aliyuncs.co
docker tag [ImageId] registry.cn-heyuan.aliyuncs.com/jianglele/repo:[镜像版本号]
docker push registry.cn-heyuan.aliyuncs.com/jianglele/repo:[镜像版本号]
```
## **部署自己的Go项目**

tips:项目要mysql.具体配置要修改，我另外开了一个mysql的容器

**Dockerfile**

```PowerShell
FROM golang:1.21.8-alpine
维护人信息
MAINTAINER jianglele
工作目录，即执行go命令的目录
WORKDIR $GOPATH/src/gin
将本地内容添加到镜像指定目录
ADD . $GOPATH/src/gin
设置开启go mod
RUN go env -w GO111MODULE=auto
设置go代理
RUN go env -w GOPROXY=https://goproxy.cn,direct
构建go应用
RUN go build -mod=mod main.go
指定镜像内部服务监听的端口
EXPOSE 3030
镜像默认入口命令，即go编译后的可执行文件
ENTRYPOINT ["./main"]
```

- 拉取仓库

git clone https://github.com/JaeHua/ToolWeb.git

- 制作镜像

```Bash
docker build -t goapp:0.1 .
[+] Building 153.3s (12/12) FINISHED                                                                            docker:default
 => [internal] load build definition from Dockerfile                                                                      0.0s
 => => transferring dockerfile: 547B                                                                                      0.0s
 => [internal] load metadata for docker.io/library/golang:1.21.8-alpine                                                  50.9s
 => [auth] library/golang:pull token for registry-1.docker.io                                                             0.0s
 => [internal] load .dockerignore                                                                                         0.0s
 => => transferring context: 2B                                                                                           0.0s
 => [1/6] FROM docker.io/library/golang:1.21.8-alpine@sha256:d7c6083c5400694f7a17b07c4fad8db9115c0e8e3cf62f781cb29cc890  38.7s
 => => resolve docker.io/library/golang:1.21.8-alpine@sha256:d7c6083c5400694f7a17b07c4fad8db9115c0e8e3cf62f781cb29cc890a  0.1s
 => => sha256:92e7ad0799b68774f9b302befa073efb6f61bad2370b28487d034a61c19efb2c 1.36kB / 1.36kB                            0.0s
 => => sha256:a3a21a3c0a162e3982700ac45ef51a05cdedf853517b914fc902be143825ba27 2.13kB / 2.13kB                            0.0s
 => => sha256:4abcf20661432fb2d719aaf90656f55c287f8ca915dc1c92ec14ff61e67fbaf8 3.41MB / 3.41MB                           18.6s
 => => sha256:e2ea43e27ed41e1206b44111529bbd2180c95be99b3c66a735ddaa8188ece043 284.21kB / 284.21kB                       18.1s
 => => sha256:ceac82a19cbbd52a67cab68c17c85361cb2b35f0a386e4529d5242f46a6ea79b 67.01MB / 67.01MB                         33.0s
 => => sha256:d7c6083c5400694f7a17b07c4fad8db9115c0e8e3cf62f781cb29cc890a64e8e 1.65kB / 1.65kB                            0.0s
 => => sha256:189c5cd48b20dfc37d098420ee58c4c2baa5aa86eb42ccfca76d3b7734869264 174B / 174B                               34.4s
 => => extracting sha256:4abcf20661432fb2d719aaf90656f55c287f8ca915dc1c92ec14ff61e67fbaf8                                 0.1s
 => => sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1 32B / 32B                                 34.6s
 => => extracting sha256:e2ea43e27ed41e1206b44111529bbd2180c95be99b3c66a735ddaa8188ece043                                 0.0s
 => => extracting sha256:ceac82a19cbbd52a67cab68c17c85361cb2b35f0a386e4529d5242f46a6ea79b                                 4.8s
 => => extracting sha256:189c5cd48b20dfc37d098420ee58c4c2baa5aa86eb42ccfca76d3b7734869264                                 0.0s
 => => extracting sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1                                 0.0s
 => [internal] load build context                                                                                         0.1s
 => => transferring context: 3.57kB                                                                                       0.0s
 => [2/6] WORKDIR /go/src/gin                                                                                             0.7s
 => [3/6] ADD . /go/src/gin                                                                                               0.3s
 => [4/6] RUN go env -w GO111MODULE=auto                                                                                  3.4s
 => [5/6] RUN go env -w GOPROXY=https://goproxy.cn,direct                                                                 5.2s
 => [6/6] RUN go build -mod=mod main.go                                                                                  46.3s
 => exporting to image                                                                                                    6.6s
 => => exporting layers                                                                                                   6.5s
 => => writing image sha256:f5a855e0056ce3dd2c83232b872a248d541b5adbd36161437d20caf874a4bc55                              0.0s
 => => naming to docker.io/library/goapp:0.1
```

- 查看制作好的镜像

```Plain
root@iZf8z3j2ckkap5ux6r0351Z /h/w/g/ToolWeb (master)# docker images
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE                                                                   
goapp         0.1       f5a855e0056c   22 seconds ago   564MB
myubuntu      0.1       6bd6b6dd5444   2 hours ago      192MB
hello-world   latest    d2c94e258dcb   11 months ago    13.3kB
nginx         latest    605c77e624dd   2 years ago      141MB
mysql         5.7       c20987f18b13   2 years ago      448MB
ubuntu        latest    ba6acccedd29   2 years ago      72.8MB
```

- 运行镜像

```
docker run -d -p 3030:3030 goapp:0.1
```

最好是后台运行,避免关闭窗口就停止了。

- 本地验证

```
curl ``localhost:3030
```

浏览器验证

![alt text](docker_image/image-6.png)
**一定要配置好安全组**

## 图形化管理工具

- 下载镜像

```JavaScript
docker pull portainer/portainer
```

![alt text](docker_image/image-7.png)
- 运行Portainer容器

```JavaScript
docker run -p 9000:9000 -p 8000:8000 --name portainer \--restart=always \-v /var/run/docker.sock:/var/run/docker.sock \-v /mydata/portainer/data:/data \-d portainer/portainer
```

![alt text](docker_image/image-8.png)
- 浏览器访问ip+9000(阿里云要放行)

![alt text](docker_image/image-9.png)
![alt text](docker_image/image-10.png)
- 然后本地进行连接

![alt text](docker_image/image-11.png)
- 可以愉快地管理自己的镜像了

![alt text](docker_image/image-12.png)
## Docker-compose

### 介绍

Docker Compose是一个用来定义和运行复杂应用的Docker工具。一个使用Docker容器的应用，通常由多个容器组成。使用Docker Compose不再需要使用shell脚本来启动容器。 

Compose 通过一个配置文件来管理多个Docker容器，在配置文件中，所有的容器通过services来定义，然后使用docker-compose脚本来启动，停止和重启应用，和应用中的服务以及所有依赖服务的容器，**非常适合组合使用多个容器进行开发的场景。**

### 安装

- 从github安装最新版

```Bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

但是下载太慢了

- pip安装

```Bash
sudo pip install docker-compose
```

- Ubuntu建议直接apt install

```Bash
sudo apt install docker-compose
#然后链接
ln -s /usr/bin/docker-compose /usr/local/bin
```

- 代理加速

```Bash
curl -SL https://mirror.ghproxy.com/https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

Tips:

然后给予权限

```Bash
sudo chmod +x /usr/local/bin/docker-compose
```

然后查看版本是否安装成功

```Bash
docker-compose --version
```

但是报错bash: /usr/local/bin/docker-compose: Text file busy。

可以用命令`fuser` 来查看是哪个进程在使用

```Bash
root@:/usr/local/bin# fuser /usr/local/bin/docker-compose
/usr/local/bin/docker-compose: 1837677
root@:/usr/local/bin# sudo kill -9 1837677
```

移除docker-compose

```Bash
 sudo rm /usr/local/bin/docker-compose
```

## docker提供外部访问

打开2375端口

- 编辑docker服务文件

```Bash
vim /lib/systemd/system/docker.service
```

- 在ExecStart行后面追加以下内容

```Bash
-H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
```

- 重新载入服务信息

```Bash
systemctl daemon-reload
```

- 重启docker服务

```Bash
systemctl restart docker.service
```

- 查看端口是否开启

```Bash
netstat -nlpt
```
## Harbor
构建自己的私有仓库镜像源。
> Harbor是一个功能强大的容器镜像注册中心，它提供了集中式的镜像管理、安全性控制、镜像复制和高可用性等功能，帮助用户更好地管理和存储Docker镜像
### 下载online-installer
https://github.com/goharbor/harbor/releases
![alt text](docker_image/image-13.png)
### 修改配置
* 复制一份配置文件
```
cp harbor.yml.tmpl harbor.yml
```
* 编辑复制的配置文件
```
vim harbor.yml
```
* 需要修改的地方
```
当前服务器的ip
hostname: 服务器地址
admin用户登录密码
harbor_admin_password: 123456
database:
数据库密码
  password: 123456
http:
服务端口
  port: 8858
```
* 将https相关的都注释掉
![alt text](docker_image/image-14.png)
* 安装
```
./install.sh
```
出现successfully就说明安装成功了 等待几分钟，就可以访问harbor了：
![alt text](docker_image/image-15.png)


## 进阶

###  Docker安装配置

- **RootFs环境依赖:** Docker容器依赖于一个根文件系统 (RootFS)。这部分强调了RootFS正常运行所需的依赖项，包括库文件、系统调用和其他基本组件。  RootFS的完整性对容器的运行至关重要。
- **Linux Namespace隔离:** Docker利用Linux命名空间来隔离容器彼此之间以及与宿主机。命名空间为系统资源（如进程ID、网络接口和挂载点）提供隔离视图，增强安全性并防止冲突。  不同的命名空间类型包括PID、NET、IPC、UTS、MNT等。
- **Cgroup资源配额限制 :**  控制组 (cgroups) 允许对Docker容器进行资源限制和统计。这使得管理员能够限制CPU使用率、内存消耗和I/O操作，防止资源耗尽并确保容器之间公平共享资源。  可以通过`docker run --cpus 2 --memory 4g`等参数来设置容器的资源限制。

### **Docker容器操作**

- **Docker命令行操作 :**  这部分说明了使用Docker CLI命令行界面来管理容器、镜像、网络和卷的主要方式。  常用的命令包括`docker run`、`docker ps`、`docker stop`、`docker rm`、`docker build`、`docker images`等等。
- **自定义容器启动命令或入口程序:** Docker允许用户为容器指定自定义命令或入口点，定义容器内应用程序的启动和运行方式。  这通常在Dockerfile中通过`CMD`或`ENTRYPOINT`指令来设置。

```Dockerfile
FROM ubuntu:latest
CMD ["/bin/bash"] 默认命令
ENTRYPOINT ["/usr/sbin/sshd"] 启动sshd服务
```

- **容器health check :** Docker支持健康检查来监控运行中容器的健康状况。这些检查可以在容器配置中定义，用于确定容器是否正常运行。  这可以通过在Dockerfile中使用`HEALTHCHECK`指令来实现。

```Dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080 || exit 1
```

- **容器****重启****策略 :** Docker提供各种重启策略来规定容器在宿主机重启或容器故障时（例如，总是重启、失败时重启、从不重启）的行为。  这可以通过`docker run --restart=always`等参数来设置。
- **容器资源配额 :**  与cgroups类似，这允许为单个容器设置资源限制，防止资源匮乏并确保稳定性。
- **容器命名空间隔离 :**  再次强调命名空间隔离对于安全性和资源管理的重要性.

### **数据管理和网络**

- **Volume数据存储持久化与数据共享 :** Docker卷为容器数据提供持久存储，即使容器本身被删除或重启，数据仍然存在。卷还可以促进容器之间的数据共享。  可以使用`docker volume create`创建卷，`docker run -v <卷名>:/data`将卷挂载到容器。
- **bridge. host. overlay网络驱动 :** Docker提供不同的网络驱动程序来将容器连接到彼此以及外部世界。`bridge`创建内部网络，`host`共享宿主的网络，`overlay`在Swarm模式下启用网络。

### **镜像管理和安全:**

- **镜像分层机制:** Docker镜像构建在层之上，允许高效地存储和共享公共组件。更改仅影响相关的层，从而提高性能并减少存储空间。
- **容器****写时复制****机制 :**  此机制通过仅在进行更改时复制数据来优化资源使用，从而提高效率并减少存储开销。
- **容器联合挂载机制 :**  这指的是Docker如何管理镜像和容器的分层文件系统，从而实现高效的共享和更新。
- **镜像内容寻址机制 :** Docker使用内容寻址来确保镜像的完整性和可重复性。镜像通过其内容哈希来标识，确保相同的镜像被视为相同。
- **镜像构建:**  从Dockerfile创建Docker镜像的过程，Dockerfile指定构建镜像的步骤。
- **镜像共享:**  通过Docker Hub等注册表共享Docker镜像的能力，简化了部署和协作。
- **私有注册中心构建 :**  创建私有Docker注册表以在组织的基础架构内存储和管理镜像。

### Swarm

Docker Swarm 是 Docker 官方提供的原生容器编排工具，它允许你将多个 Docker 主机组合成一个集群，以实现容器应用的部署、扩展和管理。  相比于其他编排工具（如 Kubernetes），Swarm 的优势在于其简单易用，因为它直接集成在 Docker Engine 中，无需安装额外的组件。  然而，这也意味着它的功能相对较少，在复杂场景下的管理能力不如 Kubernetes。

**集群管理:**

- **节点类型****:** Swarm 集群由三种类型的节点组成：
  - **管理器节点 (Manager Node):**  负责集群的管理和调度，至少需要一个管理器节点。管理器节点形成一个 Raft 一致性集群，确保高可用性。如果一个管理器节点失效，其他节点会自动选举新的领导者。
  - **工作节点 (Worker Node):**  运行容器的节点。
  - **管理器和工作节点 (Manager and Worker Node):**  一个节点可以同时作为管理器和工作节点，这在小型集群中很常见，但大型集群中通常建议将角色分开。
- **节点加入:**  通过 `docker swarm init` 命令初始化一个 Swarm 集群，该命令会在当前主机上创建一个管理器节点。其他主机可以通过 `docker swarm join` 命令加入集群，并指定管理器节点的地址和令牌。
- **节点状态:**  可以使用 `docker node ls` 命令查看集群中所有节点的状态，包括角色、可用性等信息。
- **集群扩展:**  通过添加新的工作节点来扩展集群容量，以满足不断增长的应用需求。

**服务部署:**

- **服务定义:**  使用 Docker Compose 文件或 `docker service create` 命令定义服务。服务定义包含镜像名称、端口映射、资源限制、副本数量等信息。
- **服务调度:**  管理器节点负责将服务调度到工作节点上，并根据需要进行扩展或缩容。
- **服务扩展:**  通过修改服务定义中的副本数量来扩展服务，Swarm 会自动在工作节点上创建新的容器实例。
- **滚动更新:**  Swarm 支持滚动更新，可以在不中断服务的情况下更新容器镜像或配置。
- **服务发现:**  Swarm 内置服务发现机制，容器可以通过服务名称相互通信，无需手动配置IP地址或端口号。

**网络:**

- **Overlay 网络:**  Swarm 使用 Overlay 网络来连接不同节点上的容器，即使它们在不同的物理网络中。Overlay 网络提供了一种虚拟网络，使容器能够像在同一主机上一样进行通信。
- **Ingress****:**  Swarm 提供 Ingress 功能，可以将外部流量路由到集群中的服务。

**初始化****Swarm****集群 (在管理器节点上执行):**

```Plain
docker swarm init --advertise-addr <管理器节点IP地址>
```

**(输出会包含一个加入令牌，用于其他节点加入集群)**

**在工作节点上加入****Swarm****集群:**

```Plain
docker swarm join --token <加入令牌> <管理器节点IP地址>:2377
```

**使用Docker Compose部署服务:**

假设你有一个名为 `docker-compose.yml` 的文件，定义了一个名为 `web` 的服务：

```YAML
version: "3.7"
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    deploy:
      replicas: 3 三个副本
      restart_policy:
        condition: on-failure
docker stack deploy -c docker-compose.yml web
```

**查看服务状态:**

```Plain
docker service ls
```

**扩展服务副本:**

```Bash
docker service update --replicas 5 web
```

总而言之，Docker Swarm 对于简单的容器编排任务来说是一个不错的选择，其易用性是其主要优势。 但对于大型、复杂的应用和需要更高级功能的场景，Kubernetes 可能更适合。