# GotitIntern

This is the result of my work during Tet holiday.
It covers most of the required parts from Mr.Le

## Updated server
 
 Warning: Don't use redis! It has some bugs, of course I added some fixed code 
 inside connector-redis (in node_modules) due to the issues from github, but it's not stable for only
 using :
  
  *npm install*
  
  If you want to use redis, contact me for the fast fixed code, or you could try
  a little bit on official github of loopback-connector-redis.

## Unfinished part
 Sliding effect between GlobalFeed and DetailPost
 - I' ve tried "pure" javascript, but not succeeded.
 - I also did a middleware of react-router-transitions, but it's not working right now,
 the example could be found here: http://doctolib.github.io/react-router-transitions/#/?_k=oayfnt
 
## Found Issues

- Pressing Enter on URL causes reloading all pages, and we have to login again,
I'm trying to fix this by checking LocalStorage at the beginning.
- The interface might be broken on Safari, I'm also trying to figure out.

## System requirement

- Nodejs version > 5.
- Mysql (recommend using MAMP)
- Currently, I'm using MacOSX 10.11.6, so if something's wrong on windows or ubuntu,
please tell me, thank you.

## Setup the system

- Server:
    + Go to *./Server/server* then create folders:
     
        *./storage/container1*
    
    + Go to *./Server* then:
        ```
        npm install
        ```     
    + Setup your mysql database from: 
    
        *./Server/server/datasources.json*
    
    + From mysql, create a database called "Picuni"
    + Go to *./Server* then:
        ```
        node .
        ```    
    + You can check the Loopback server and all APIs from:
         ```
          localhost:3000/explorer 
         ```    
         
- React:
    + Go to *./React* then:
        ```
        npm install
        ```     
    + You might want to setup your own Facebook Login: 
    
        *./React/app/redux/containers/Login.js*
         
          replace *appId="253580248403665"* by your appId
    
    + You might want to setup your own Loopback server ip: 
        
        *./React/app/api/config.js*
         
    + You might want to setup your own React server: 
        
            *./React/configs/webpack_dev.js*
             
            remember to change the URI from Facebook Developer
    
    + Go to *./React* then:
        ```
        npm run dev
        ```    
    + You can check the React server from:
         ```
          localhost:3111 
         ```    
         
    