# laravel-docker
Dockerized Laravel environment with PHP, nginx and MariaDB

## Prerequisites
- Docker
  - Docker Compose
- PHP
  - Composer

## How to run
- Copy `config.example.env` to `config.env` and tweak to your liking
- Bring up the containers with `docker-compose up -d`
- Install Laravel with `composer create-project --prefer-dist laravel/laravel src/`
- Configure the Laravel environment file located at `src/.env`
- Reset the containers with `docker-compose restart`
- Open http://localhost:8080
- Have fun coding! :D

## Database administration with MySQL CLI client
If you don't have MySQL/MariaDB installed on the host, you can use the MySQL CLI client that comes with the database container:
```docker-compose exec mariadb mysql -u laravel -p```

## Fixing file permissions
If you ever have problems with file permissions, run `fix_perms.sh`. This script will make you the owner of `database` and `src` directories.

## Used Ports
- `8080`: nginx
- `9000`: php-fpm
- `3306`: MariaDB