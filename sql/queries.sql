create database if not exists `bienesraices`;

create table users (
id serial primary key,
name varchar(60) not null,
email varchar(60) not null unique,
password varchar(60) not null,
token varchar(60),
confirm boolean
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp
);

alter table users add column create_at timestamp default current_timestamp;
alter table users add column update_at timestamp default current_timestamp on update current_timestamp;

create table users (
id serial primary key,
name varchar(60) not null,
email varchar(60) not null unique,
password varchar(60) not null,
token varchar(60),
confirm boolean,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp
);

create table propiedades(
id varchar(30) primary key,
title varchar(100) not null,
description text not null,
rooms int not null,
parking int not null,
wc int not null,
street varchar(60) not null,
lat varchar,
lng varchar,
image varchar(60),
published boolean default false
);

create table categories (
id serial primary key,
name varchar(60)
)

create table price (
id serial primary key,
price numeric(10, 2)
);