# SecureBank - Front End 

## Overview
SecureBank is an open source project in .NET core with some security flaws. Its purpose is to learn how to write a good code from the bad practices found during penetration testing.

**SecureBank**'s objective is to show how developers fail to protect their environment due to a lack of knowledge about the applied ecosystem. 

We will determine the docker deployment of micro service solutions and where developers misconfigured their systems. Not only security in the configuration, we still have OWASP Top 10* Web Application Security risks out in the wild. Therefore, we will also present those vulnerabilities in the SecureBank application.

## User Story 

As a security researcher or developer, I want to interact with a realistic-looking banking application, So that I can learn about common security vulnerabilities and how to mitigate them.


## Project Brief (Front End)

This project aims to redesign the frontend of SecureBank, an open-source educational tool showcasing security vulnerabilities. The redesign will leverage a modern web  development tech stack (TypeScript, React, Next.js, Tailwind CSS), to create a visually appealing and user-friendly interface that emulates a real banking website, enabling users to explore and learn from common security flaws in a seemingly safe environment. 

The new frontend will include a login/signup flow, a dashboard with account overview and recent transactions, a transaction history view, and potentially additional features like a product store and search functionality.

### Frontend Architecture and Authentication Handling 

#### Overview
The frontend architecture of this project is built using React with Next.js, TypeScript, and Tailwind CSS. It leverages the existing backend built in C# and .NET. It has deliberate security vulnerabilities in line with the aim of the SecureBank project. The authentication mechanism is centralised using a context provider (`AuthContext.tsx`) to manage user authentication state across components. This approach ensures that authentication state is consistent and accessible throughout the application.

#### Authentication Context (`context/AuthContext.tsx`)
The `AuthContext` is created using React's `createContext` and is provided to the application via the `AuthProvider` component. This context manages the following states:
- `isAuthenticated`: A boolean indicating whether the user is authenticated.
- `username`: The username of the authenticated user.
- `cash`: The available funds of the user, fetched from the existing backend API.
- `loading`: A boolean indicating whether the authentication state is being loaded.

The `AuthProvider` component also handles:
- **Authentication State Refresh**: It checks for an authentication cookie or local storage item to determine if the user is authenticated.
- **Logout**: It clears the authentication state and removes the authentication cookie and local storage items.
- **Fetching Cash Amount**: It fetches the user's available funds from the backend when the username changes.

#### Login Component (`login.tsx`)
The `LoginForm` component handles user login by sending a POST request to the backend's `/api/Auth/Login` endpoint with the user's credentials. Upon successful login, it stores the authentication token in local storage and updates the authentication state in the `AuthContext`.

#### Transactions Component (`transactions.tsx`)
The `Transactions` component fetches and displays the user's transactions. It uses the `useAuth` hook to access the authentication state and redirects the user to the login page if they are not authenticated. The component sends a GET request to the backend's `/api/Transaction/GetTransactions` endpoint to fetch the transactions.

#### Navbar Component (`navbar.tsx`)
The `NavBar` component displays navigation links based on the authentication state. It uses the `useAuth` hook to access the authentication state and displays the user's username and available funds if they are authenticated. The component also provides a logout button that calls the `logout` function from the `AuthContext`.

#### Authentication Handling and Potential Security Issues
1. **Client-Side Authentication State**: The authentication state is managed on the client side, which can be vulnerable to manipulation. However, the backend should still validate the authentication token for each protected API request.
2. **Local Storage for Tokens**: Storing authentication tokens in local storage can make them vulnerable to cross-site scripting (XSS) attacks. 
3. **Password Handling**: The login component directly sends the user's password in a POST request. Making it vulnerable. 

#### Backend Communication
The frontend communicates with the backend running on `localhost:1337` using fetch API requests. The backend endpoints are used for authentication, fetching user data, and managing transactions. The frontend includes credentials (cookies) in the requests to maintain session state.

### Conclusion
The frontend architecture leverages React's context API to manage authentication state centrally, ensuring consistency and accessibility across components. The authentication mechanism relies on client-side state management and local storage for tokens, which introduces potential security risks. The frontend communicates with the backend using RESTful API endpoints, ensuring that the backend validates authentication tokens for protected resources.

## Future Suggestions 



## Application

### Existing Architecture 
![[Pasted image 20240604165831.png]]


### Tech Stack - New Front End 

Typescript, React, Next.js 14, Tailwind CSS, Shadcn 


```
admin@ssrd.io:admin
developer@ssrd.io:test
yoda@ssrd.io:test
tester@ssrd.io:test
```


## Routes 

### Pre-authorisation 
- Landing Page
	- Top Nav 
		- Home, About, Login, Signup 
	- Project Description 
	- Hero Banner 
		- Github Repo link 
	- Footer 
- Login
	- Username 
	- Password 
	- Forgot your password 
	- Register as new user (link to signup page)
- Signup 
	- Email 
	- Password
	- Confirm Password
	- T&Cs 
	- Register button 
### Post-auth 

``` 

// working 
admin@ssrd.io:admin

// couldn't log in with the credentials below, maybe something to look into 

developer@ssrd.io:test
yoda@ssrd.io:test
tester@ssrd.io:test
```

* Transactions
	* Sender, Receiver, Transaction Date, Amount (EUR), Reason
	* Ability to upload transactions 
* Store
	* Name, Price, Description, Times bought
* Search 

## Next Steps (TODO List)

- [x] Fork main repo and create Frontend Branch
- [x] Initialise NextJs App
- [x] Build basic landing page 
- [x] Create pre-auth routes 
- [x] Build Login Page
- [x] Build Signup Page
- [x] Create post-auth routes 
- [x] Build Basic Dashboard View
- [x] Develop Transactions Overview
- [x] Integrate with SecureBank back end endpoints 
- [x] Being able to create new users connecting to existing backend endpoints
- [x] Transactions page shows transactions 
- [x] Auth management (login page stores)



## How auth is handled in the front end / existing backend 


## References

https://github.com/ssrdio/SecureBank
https://ssrd.gitbook.io/securebank

