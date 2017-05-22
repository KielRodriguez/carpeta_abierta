# Carpeta Abierta de la PGR

Carpeta abierta es un visualizador en tiempo real de los reportes que son hechos en la PGR"

## Instalación
    git clone https://github.com/mxabierto/carpeta_abierta
    cd carpeta_abierta
    npm install -g http-server
    bower install
    npm install
    http-serve

Ir a: localhost:8080

## Instalación con Docker

    docker run --name carpeta_abierta -p 3000:80 -d mendozagioo/carpeta_abierta:v1