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