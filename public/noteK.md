### blue note
`orange note`
[orange_note]

###  ============= A. Routing in ReactJS : "react-router-dom" lib (v.4.3.1)
#1. Route parameters
#2. Query String
#3. Redirect User
#4. Implement Not found page
#5. Nested Routes
### I. Steps
(go to offical docs for more details)
### 1. BrowserRouter (as Router) component
- Wrap `history` object of `WebApi of browser` and pass it down to it's children component
-> so we need use <BrowserRouer> as root components
### 2. Route component
- Register the router: tell React render component with given Url
- <Route path='url' component={[ComponentX]}>
--> <ComponentX> will be received 3 props: 
  + `history`: manage location (push, replace, go, goBack, ect methods)
    @@@ Distinguish: `history.push` vs `history.replace` 
  + `location`: current location. For getting `query params` in `location.search`: string
    (can use `query-string` lib to convert query-string to object)
  + `match`: how `path` and current `url` match. For getting `path variable`
- ???: What if we can pass more props to <ComponentX> or just REQUIRED props <ComponentX> needs
--> use `render` props instead of `component` <Route path render={props => <Component {...props} [more props]>}>

- ??? How to receive (or config params for this url) params
  + Format url of `path` with :id/:month/:year and so on.
  + `OPTIONAL` param config: :id/:month?/:year?
### 3. Switch component
- Can use `exact` props
- Can use <Switch> component: 
  + Wrap all <Route> components with <Switch>
  + <Switch> will: render only the FIRST child (component) if match url is found
  + Orders of <Route> important. It should go from specific to generic
### 4. Link component
* Problem: use <a href='...'> will reload the web --> browser have to download html file and bundle.js file again
--> `SPA` (single page application). Only update content
* * Solution: use <Link to='url'>
- deep understanding: 
  <Link to='url' replace=false>
    <a onClick=fn() href='url'> Home </a>
  </Link>
  --> when click to <a> -> fn is execute. (prevent default behavior _ send request to get all data as normal)
- ??? How to pass parameter (path, query params)
  + Use `dynamic url` for value in `to` props
  + Use ...

  @@@ Distinguish: `history.push` (method vs component)

### 5. Redirect component
- <Redirect>: can redirect web to other url (is already defined by <Route>)
@@@ Distinguish `history.replace` (method vs component)

### 6. Nested Routing: 
- Just to clear: <Route> is wrapper component
--> Nested Routing === Nested Component


### B. ================ Form in React ============
### 1. onSubmit props
  -  `onSubmit` props takes function with params (e _ event)
  - Normally, we don't want HTML form auto submit (send) data to server
  ---> We prevent default behavior (e.preventDefault()) and use `fetch` or `axios` to send HTTP request to server
### 2. Ref
  - Use `ref` props when u want to control the `V_Dom` or `R_Dom` elements
  - Don't abuse `ref`
### 3. Controlled vs UnControlled React element
  - Component is initialized with `null` or `undefined` value, React considers them as `uncontrolled` element
  - A component should be only `controlled` or `uncontrolled` element during their lifecycle time
### 4. 'Commom' problem: "Extracting" reusable component
  - Extract and create <Input> component
### 5. Validate form
  - $$$ state (date) is use to manage UI --> the same with errors
  - We have `this.state.errors.eachField` for managing `valid` of each field
    + Validate on entire form
    + Validate for each field (`onChange` event)
  - Use `joi-browser` @13.4 lib for validating data in BROWSER
    (reimplement 2 kinds of validation above with Joi)
  
### C. =============== Send HTTP request ============
- Fetch API, Axios lib, Jquery AJAX, ect
### 1. Axios lib
  - `axios`@0.18.0 : wrap data in request.data object
### 2. Optimistic vs Pessimistic Updates
  - `Pessimistic`: send request to server and wait for response -> update UI
  - `Optimistic`: update UI -> send request -> if error -> roll back UI
    + be careful with `this.setState` (more details: https://reactjs.org/docs/faq-state.html#what-does-setstate-do)
### 3. Expected vs Unexpected error
  - `Expected`: 404 _ not found, 400 _ bad request --> CLIENT ERRORS
    --> Display a specific error message
  - `Unexpected`: networt down, server down, db down, bug
    --> Log them, display a generic and friendly error message
  - try-catch block code of sending request to server: 
    + In `exception` object will have
      + ex.request != null: if request was send ok
      + ex.response != null: if server send response ok
### 4. Axios interceptors
  - `axios.interceptors.response.use(successfull: func, error: func)`
  --> whenever, server response to client, INTERCEPTORS BLOCK (success or error) will be called first 
      then, pass control to next normal flow
      /!\: if response error, `error: func` must return `rejected promise` 
          --> in order to pass control to `catch block`
### 5. Extracting Http module service
  - It's important to create our http module base on `axios` or anything else
    + export normal method like (get, put, post, delete, ect)
    + handle all pre-request or pos-reponse
### 6. Extracting Config module
  - src/config.json
### 7. Display toast notification
  - use `react-toastify`@4.1.0
  - use { ToastConteiner } for containing toast.error|info|warning:
    + need to put <ToastContainer /> in `V_DOM` (virtual dom)
  - use { toast } function to show message on <ToastContainer />
### 8. Logging
  - use third-party service: `sentry.io` with `raven-js` lib
    + easy to config
    + log error very details

### ============= D. Authentication vs Authorization ================
### 1. Storing JWT when log in or register successfully
  - Store `jwt` in `localStorage`
### 2. Read JWT in header of the response
  - In order to client (browser) can read the header of the response
    --> Backend (nodejs): when set header should set `.header("access-control-expose-headers", "header-key-bla-bla")`
  - Ready `payload` of token: use `jwt-decode`@2.2.0  
### 3. Show current user on NavBar  
  - Because when navigate between each route using <Link> or `history.push`. React's component haven't unmount (destroyed)
  --> `componentDidMount` will not run
  --> If we want code in that lifecycle hook runs again, use this below for mounting component that again
  /!\ Note: Full reloaded `window.location="url"` instead of `history.push(url)`
### 4. Implement Logout component
  - don't render anything (just return null)
  - in `componentDidMount` just remove token (or anything else) from localStorage. Then, reload to homepage
### 5. Calling Protected API Endpoints
  - in `httpService` should build in, append token to all http request
  - use `axios.default.headers.common['x-auth-token'] = value`

### 6. Fixing Bi-directional Dependencies
  - A import B, B import A ===> Bad!!!!
### 7. Showing or Hiding Elements based on the User
### 8. Protecting Routes
  - Create <ProtectedRoute>: wrapper component
### 9. Redirecting after Login
  - Use <Redirect to={object} /> 
### 10. Hiding the Delete Column

### ================== E. Deployment =====================
### 1. Environment variables
  - Create file `/.env` or `/.env.development`, ect
  - Content in that file: `REACT_APP_KEY_1=VALUE_1` (without prefix: REACT_APP --> this won't be added to `process.env` )
  - Use `process.env.KEY_1` to access value
  - Environment variables can be set in `.env` file or directly in `terminal`
  - When run `npm run start`: the build process is also executed (but not optimized). All env vars are replaced by there value at build time
### 2. Building for production (optimized build)
  - Run `npm run build`: ===> server `build/` folder, then `NODE_ENV=production`
  - when run `npm run start`: ==> `NODE_ENV=developement` (the same with `npm run test`)
### 3. Prepare for deploy front end
  - Create `.env.development` and `.env.production` with content:
    + REACT_APP_API_URL=[base_url_of_server]
  - In HttpService: use: `axios.defaults.baseURL=process.env.REACT_APP_API_URL`

  - Add: package > "engines" > "node"="x.y.z"
  - Add: package > "engines" > "npm"="x.y.z"

  - create heroku with cmd: `heroku create longpk-reac-vidly --buildpack https://github.com/mars/create-react-app-buildpack.git`




