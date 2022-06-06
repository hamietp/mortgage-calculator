# Mortgage Calculator

## Template used:
- Webpack Boilerplate by Tania Rascia   
https://github.com/taniarascia/webpack-boilerplate   

This boilerplate is a starting point for a webpack project. It includes:
- Webpack
- Babel
- Sass
- PostCSS (although not used in this project)   

# Known bugs
- ?

## Installation

Clone this repo and npm install.

```bash
npm install
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

# How to use the calculator
Insert the full value of the house in the field `House Value` and the value of the down payment -- if there is some --  in the field `Down Payment`.   
Enter the amount of years you want to pay the mortgage in the field `Loan Term` and the interest rate in the field `Interest Rate`.   
    
To submit the calculation, you can press `Enter` or click on the button `Calculate`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

```bash
npm i -g http-server
```

You can view the deploy by creating a server in `dist`.

```bash
cd dist && http-server
```

