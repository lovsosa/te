// const withAuth = Component => {
//   const Auth = (props) => {
//     // Login data added to props via redux-store (or use react context for example)
//     const { isLoggedIn } = props;
//     if (!isLoggedIn) {
//       return (
//         <Login />
//       );
//     }
//     return (
//       <Component {...props} />
//     );
//   };
//   if (Component.getInitialProps) {
//     Auth.getInitialProps = Component.getInitialProps;
//   }
//   return Auth;
// };

// export default withAuth;