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
  





