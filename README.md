# 2022 Dcard Web Frontend Intern Homework

## how to start this app

In the project directory, you can use

```bash
npm install
npm run build
npm run start:preview
```

or

```bash
yarn
yarn build
yarn start:preview
```

to start this app in production mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  

## design of this app

Using cra-template, typescript, react-router-dom and some bootstrap styling. Deployed on Heroku.

* The infinite scroll is from the hook `useScroll` in `src/useScroll.ts` .
* Store the queried repos in the state of `App.ts` in order to avoid calling to GitHub API again.
* User can specify the environment variable `REACT_APP_GITHUB_TOKEN` to increase the rate limit of accessing GitHub API.
