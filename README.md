Football Doodle application
=============================

Football doodle application that uses a different way of handling web resources in Spring Boot 
by separating the server module from the client module.

The client module makes use of the following great Javascript tools:
  * [React](https://facebook.github.io/react/)
  * [React Widgets](https://jquense.github.io/react-widgets/docs/#/)
  * [Babel](https://babeljs.io/)
  * [Webpack](https://webpack.github.io/) 
  * ES2015 syntax
  
And will use these ones at some point in the future:
  * [redux](https://github.com/reactjs/redux)
  * [redux-form](https://erikras.github.io/redux-form/)
  
The server module is based on [Spring Boot](http://projects.spring.io/spring-boot/).

## Deploy to Heroku using Maven

Build and install the modules in the local Maven repository (necessary for the next step):

```bash
mvn clean install
```

Perform a Maven build: 
	
```bash
mvn -pl server clean heroku:deploy
```