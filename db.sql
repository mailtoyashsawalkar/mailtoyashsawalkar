create database myStore;

use myStore;

create table user (
id integer primary key auto_increment, 
firstName varchar(100), 
lastname varchar(100),
address varchar(100),
city varchar(100),
country varchar(100),
zip varchar(100),
phone varchar(100),
email varchar(100),
password varchar(100),
createdOn timestamp default current_timestamp,
active integer default 1
);


create table product(
id integer primary key auto_increment,
title varchar(50),
description varchar(10000),
category integer,
price decimal,
brand integer,
image varchar(100),
createdOn timestamp default current_timestamp
);

create table category(
id integer primary key auto_increment,
title varchar(50),
description varchar(10000),
createdOn timestamp default current_timestamp
);

create table brand(
id integer primary key auto_increment,
title varchar(50),
description varchar(10000),
category integer,
price decimal,

createdOn timestamp default current_timestamp
);

create table productReviews(
id integer primary key auto_increment,
review varchar(100),
userId integer,
productId integer,
rating decimal,
createdOn timestamp default current_timestamp
);

create table userOrder(
id integer primary key auto_increment,
userId integer,
totalAmount decimal,
tax decimal,
paymentType varchar(10),
paymentStatus varchar(10),
deliveryStatus varchar(10),
createdOn timestamp default current_timestamp
);

create table orderDeatils(
id integer primary key auto_increment,
orderid integer,
productId integer,
price decimal,
quantity integer,
totalAmount decimal,
createdOn timestamp default current_timestamp
);