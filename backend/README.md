# Messaging App Backend

Service link on Render: https://messaging-app-04uu.onrender.com

Welcome to Messaging App backend! The backend of the messaging app is formulated using Node + Express. \
Redis is used to track online users, an user is online if he has been active in the past minute. \
JSONWebToken is used to authenticate users. \
Supabase is used to store user profile pictures. \
NeonDB + PostgreSQL + Prisma ORM is used to store users and messages tables.

There are 3 routes, index ("/") which is the homepage, /chat and /users. \
The index router is used to add online users, the chat router is for getting and posting chats, whereas the users router is for creating accounts, logging in and customizing profiles.
