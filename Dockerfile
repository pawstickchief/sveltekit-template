# 使用官方的 Node.js 20 LTS 版本作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /www/cod/sveltekit-template

# 将 package.json 和 package-lock.json 复制到工作目录中
COPY package*.json ./

# 配置 npm 使用代理端口
RUN npm config set proxy http://172.17.0.1:10082
RUN npm config set https-proxy http://172.17.0.1:10082

# 安装项目依赖
RUN npm install
# 暴露应用运行的端口
EXPOSE 8001

# 启动应用
CMD ["tail", "-f","/dev/null"]
