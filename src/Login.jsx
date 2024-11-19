// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signUp } from "aws-amplify/auth"; // Import Auth from AWS Amplify
// import { signIn } from "aws-amplify/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   async function handleSignUp({ username, password, email, phone_number }) {
//     try {
//       const { isSignUpComplete, userId, nextStep } = await signUp({
//         username,
//         password,
//         options: {
//           userAttributes: {
//             email,
//             phone_number, // E.164 number convention
//           },
//           // optional
//           autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
//         },
//       });

//       console.log("User signed up:", userId);
//       setError(""); // Clear any previous errors
//       navigate("/discover");
//     } catch (error) {
//       console.log("error signing up:", error);
//     }
//   }

//   async function signIn({ username, password }) {
//     try {
//       const { isSignedIn, nextStep } = await signIn({ username, password });
//     } catch (error) {
//       console.log("error signing in", error);
//     }
//   }

//   return (
//     <div className="login">
//       <form onSubmit={handleSignUp}>
//         <input
//           type="email"
//           placeholder="Type Email Here"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Type Password Here"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//         {error && <span>{error}</span>}
//       </form>
//     </div>
//   );
// };

// export default Login;

// Basic signup/login with AWS Auth.
// Got this basic format from TinyTechincalTutorials on YouTube
import React from "react";

// Imports the Amplify library from 'aws-amplify' package. This is used to configure your app to interact with AWS services.
import { Amplify } from "aws-amplify";

// Imports the Authenticator and withAuthenticator components from '@aws-amplify/ui-react'.
// Authenticator is a React component that provides a ready-to-use sign-in and sign-up UI.
// withAuthenticator is a higher-order component that wraps your app component to enforce authentication.
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

// Imports the default styles for the Amplify UI components. This line ensures that the authenticator looks nice out of the box.
import "@aws-amplify/ui-react/styles.css";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <Authenticator>
        {({ signOut }) => (
          <main>
            <header className="App-header">
              <button
                onClick={signOut}
                style={{
                  margin: "20px",
                  fontSize: "0.8rem",
                  padding: "5px 10px",
                  marginTop: "20px",
                }}
              >
                Sign Out
              </button>
            </header>
          </main>
        )}
      </Authenticator>
    </div>
  );
};

export default withAuthenticator(Login);
