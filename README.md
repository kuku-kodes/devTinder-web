# DevTinder-web Frontend

- Create a Vite + React application
- Remove unnecesery code and create a hello World app




- Create a Login page
- Install axios
- CORS - install cors in backend => add middleware to app with configurations => origin , credentials : true
- Whenever you're making API call so pass axios => { withCredentials : true }

# Redux Toolkit
- Install react-redux @reduxjs/toolkit - http://redux-toolkit.js.org/tutorials/quick-start
- => configureStore => Provider => createStore => add reducer to store

#[ESLint] Feedback for 'exhaustive-deps' lint rule:
- React Hook useEffect has a missing dependency: 'fetchUser'. Either include it or remove the dependency array.
- This is the problem which arised , so in order to clear this problem in which when i logged in to my account after refreshing the page the user information should have been preserved on the Reduxstore(should be automatically fetched as the token is already present), but the page was broken or could not render the 'fetchUser' due to the missing dependency.
- So install this dependency "npm install eslint-plugin-react-hooks@next" to clear the problem.
# What is this
This is a new ESLint rule that verifies the list of dependencies for Hooks like useEffect and similar, protecting against the stale closure pitfalls. For most cases it has an autofix.