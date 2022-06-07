# Mortgage Calculator

## Requirements
Maximum Node version: [`16.0.0`](https://nodejs.org/en/download/). This is required because some packages in the boilerplate may not be compatible with Node v17 and later.   
   
If some error occur after `npm install` and then running `npm start`, you may need to delete the node_modules folder, run `npm audit fix` and then run `npm install` again.

## Template used:
- Webpack Boilerplate by Tania Rascia   
https://github.com/taniarascia/webpack-boilerplate   

This boilerplate is a starting point for a webpack project. It includes:
- Webpack
- Babel
- Sass
- PostCSS (although not used in this project)   

## Known bugs
- When in Desktop mode, the `hr` tag below "Your Results" may get disaligned with the left panel `hr` when screen width < 1267px.
- Although its a `form`, the `submit` is not happening by default when pressing `enter`. I made it happen by adding an `eventListener` to the `form` tag.

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
Insert the full value of the House in the field `Home Price` and the value of the down payment -- if there is some --  in the field `Down Payment`.   
Select the amount of years you want to pay the mortgage in the field `Loan Term` and insert the interest rate in the field `Interest Rate`.   
    
To submit the calculation, you can press `Enter` or click on the button `Calculate` and check your Total Monthly Payment in the `Your Results` panel.

# Production build

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

