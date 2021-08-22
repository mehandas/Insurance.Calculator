### Insurance.Calculator

```
NetCore App 3.1
Angular 12
Typescript 4.3
```

- Applicant-detail component for Screen 1 requirement
- Calculator component for Screen 2 requirement
- Ngrx store is used to store Screen 1 data and refrence data for drop-downs in Screen 2
- WebApi to fetch reference data for drop-downs from Mock repository
- Single host `https://localhost:44345` to run both *Angular* and *API*

**Note:** *node_module* files are not pushed, but the build files required to run the application is available in this repository

1) To run the solution/application in local
	- Clone `master` branch to your local
	- Open solution in Visual Studio 2019
	- Run application using `IIS Express` in Visual Studio
	- Angular build files are included in the repo so *ng build* is not required in local to view application
	- Open folder `App/Client` in VS Code to view Angular client side changes
	- Client folder is excluded from the project - to prevent Angular/Typescript build error during solution build in Visual Studio

2) To build the angular project in local
	- Clone `master` branch to your local
	- Open `App/Client` folder in VS Code
	- Install required packages listed in `package.json` file
	- Run command `ng build` in terminal
	- Run solution using `IIS Express` in Visual Studio or refersh url in browser (if app is already running)

3) Run Unit tests
	- Use `VS Test Explorer` to run C# Unit tests
	- Use command `ng test` in VS Code terminal to run angular test specs
	- Use command `ng test --code-coverage` to generate code coverage report
	- Launch `App\Client\coverage\Client\index.html` to view coverage report

[](https://github.com/mehandas/Insurance.Calculator/blob/master/Screen%201.png)
