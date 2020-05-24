# FulcrumCharacterBuilder
This is a web tier character builder for Fulcrum (Combat Oriented Role Playing System)
More information regarding Fulcrum and its development please visit herf: http://nortain.net or find us on facebook at href: https://www.facebook.com/FulcrumRPS/ You can even go as far as to scour twitter using the hashtag #FulcrumGaming.

## Docker and the Dockerfile
This project is being developed with deployment in mind so is meant to be ran inside of a docker container.

to build with docker you can visit here:
Once you have docker setup on your system you should be able to build using: <br>
`docker build -t fulcrum-character-builder:dev .` <br>
to run using: <br>
`docker run -d --name fulcrum-character-builder -p 4200:4200 fulcrum-character-builder:dev` <br>
and to stop using: <br>
`docker stop fulcrum-character-builder`

### Other docker info
Ideall this stuff should work but it doesn\'t yet :(
To run a project generated from the Angular CLI in nginx do the following:

Run `ng build --delete-output-path false`    (or use -dop)<br>
cd into the "dist" folder<br>
Run the following command:

`docker run -d -p 4200:4200 -v $(pwd):/usr/src/app nginx:alpine`

Note: The Angular CLI currently deletes the "dist" folder and recreates it when running ng build so if you run it again the volume defined above won't work correctly.

### Docker commands
 	
     docker pull [imageName]
     docker images
     docker rmi [imageID]
     docker build -t [imageName] .
     docker push [imageName]
      
     docker run -p externalPort:internalPort [imageName]
     docker ps -a
     docker stop [containerID]
     docker rm [containerID] 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Documentation

You can generate documentation by using npm with the command:
npm run compodoc
