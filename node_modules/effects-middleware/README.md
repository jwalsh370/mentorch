# effects-middleware
simple redux middleware to let other middleware (plugins) dispatch actions with side-effects

The idea and code are originally from the [Hyper JS terminal emulator](https://hyper.is) by [Zeit](https://zeit.co/). This is just an effort to make it available as a standalone module. When creating a redux-based plugin system (as in Hyper), plugins can hook into events via a middleware export, which checks for certain action types and acts on them. In the words of the Hyper code comments: "It allows authors to interrupt, defer or add to existing side effects at will as the result of an action being triggered." And from the Hyper docs:

>This means that you can override, compose or completely eliminate effects! In other words, this is how you can change the default functionality or behavior of the app.

## How to Use
First install as normal

```
npm install --save effects-middleware
```

You'll want to make sure to load any plugin middleware before the effects middleware so that they can act on the actions first.

```javascript
// ./store/index.js
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import effects from 'effects-middleware';

import { myMiddleware } from '../utils/middleware';
import rootReducer from './reducers'

const enhancer = compose(applyMiddleware(thunk, myMiddleware, effects));

export default createStore(rootReducer, enhancer);
```

Next let's create an action creator that when dispatched should have a side effect.

```javascript
export function activateSideEffect() {
  return ({ dispatch, getState }) => {
    dispatch({
      type: 'ACTIVATE_SIDE_EFFECT',
      effect() {
        const { foo } = getState();
        console.log('Side effect was executed. Here is the foo state: ', foo);
        dispatch({
          type: 'SOME_OTHER_ACTION',
          payload: '42'
        })
      }
    });
  }
}

```

Now if you dispatch the action `activateSideEffect`...

```javascript
dispatch(activateSideEffect())
// Side effect was executed. Here is the foo state: ...
```
... you should see the results of your side effect.
