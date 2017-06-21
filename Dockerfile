
FROM nginx
MAINTAINER Giovanni Mendoza "mendozagioo@gmail.com"

COPY default.conf /etc/nginx/conf.d

RUN mkdir -p /usr/share/nginx/html/carpeta_abierta/

COPY ./ /usr/share/nginx/html/carpeta_abierta/

WORKDIR /usr/share/nginx/html/carpeta_abierta

# Install Node.js
RUN apt-get update && \
	apt-get install -y git-core curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

RUN apt-get clean;

RUN rm -rf bower_components
RUN rm -f js/map.bundle.min.js js/main.bundle.min.js

RUN npm install -g bower
RUN npm install -g webpack

RUN bower --allow-root install
RUN webpack

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]