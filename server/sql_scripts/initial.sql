create database elsa;

create table app_user
(
	id serial not null
		constraint app_user_pk
			primary key,
	user_name text not null,
	password text not null,
	profile_pic_uri text
);

create unique index app_user_user_name_uindex
	on app_user (user_name);

create table todo
(
	id serial not null
		constraint todo_pk
			primary key,
	content text not null,
	is_completed boolean default false not null,
	date_updated timestamp default CURRENT_TIMESTAMP not null,
	date_added timestamp default CURRENT_TIMESTAMP not null,
	app_user_id int
		constraint todo_app_user_id_fk
			references app_user
				on update cascade on delete cascade,
	is_deleted boolean default false not null
);

