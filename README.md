# Asset Library Demo
Demo app with react-starter-kit.

## What it has
- Show a bunch of assets (images or audio files)
  - homepage
  - category page
  - asset detail page to view asset
- Allows sign in/signup
- Authenticated users can upload asset

## Instructions
```
npm install
npm start
```

## Structure
- `/actions`: Contain global/shared actions creators. Action creators can dispatch multiple actions as long as the previous action is always completed. For async actions like api calls, it may be useful to return the promise as well. Sometimes, chaining actions can be effective for certain features.
- `/stores`: Contain global/shared stores. Stores should have all it's states declared at the constructor so that it is easy to reference what the store contains. When adding new actions, do consider which stores may need to handle the action.
- `/components`: Contains react components. Components here are dumb (no stores, no actions) and just pure props. Basic components like Buttons can provide an easy and consistent way to style a button. Some components are app-dependent while some components are non-app dependent, such as a modal. When writing app-dependent component, it is useful to consider if a lower-level component that is non-app-dependent can be built. That way, the lower-level component can be reused for other purposes in the app (such as a Card component).
- `/views`: These are react-components that are smart (needs stores and does actions). Components define what they need in `@resolve` ([react-resolver](https://github.com/ericclemmons/react-resolver)). Before the component is rendered, the return promise of `@resolve` must be resolved first. The `@resolve` is also a good place to do caching. `@resolve` is used on server side rendering as well, all resolves must be completed before we render the html string. Pages component will most likely be in this folder. Some components here may not be pages, such as a NavBar. Components here access alt via context.
- `/backend`: Backend api routes and models. This folder depends on your backend implication. This repo uses a typical node + sequelize on sqlite backend.
- `/content`: Skeleton file for response on ejs template. The rendered server html string and the store serialized data is passed in into this template to produce the final output.
- `/core`: Universal alt and apiClient.
- `/decorators`: Contains all the decorators. Currently, there is only withAlt that adds the alt instance to the context on the app level.
- `/public`: Static public folder.
- `/sass`: Styles. This repo uses Sass. Note that it might be a better practice to put sass files according to it's component folder.
