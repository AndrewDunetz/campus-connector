import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Typeahead } from "react-bootstrap-typeahead";

// import 'firebase/auth';
// import {useAuthState} from 'react-firebase-hooks/auth';

import './directory.styles.scss';
import '../../sass/main.scss';

// const auth = firebase.auth();
// const [user] = useAuthState(auth);

const Directory = ({ currentUser }) => (
  console.log(currentUser.id), 
  <div>
    {/* <Typeahead
      placeholder="Search for Friends"
      onChange={searchChange}
      options={interests.data || []}
      labelKey="name"
      clearButton={true}
      inputProps={{
        className: "company-search-input"
      }}
      ref={el => (typeahead = el)}
    /> */}
    {currentUser ? (
      <div className='btn btn--blue' onClick={() => auth.signOut()}>
        SIGN OUT
      </div>
    ) : (
      null
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

//export default Directory;
export default connect(mapStateToProps)(Directory);
// import React, { useState } from "react";

// import { withRouter } from "react-router";

// import { Navbar, Nav, Button, Alert, Badge } from "react-bootstrap";
// import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

// import { Typeahead } from "react-bootstrap-typeahead";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChartPie,
//   faSearch,
//   faCog,
//   faUsersCog,
//   faUser,
//   faHome,
//   faEnvelope,
//   faCloudUploadAlt
// } from "@fortawesome/free-solid-svg-icons";

// //Components
// import Loading from "../loading/loading.component";

// const { interests } = props;


// function Directory(props) {
//   const { interests } = props;
//   const [interestsSearchVal, setInterestsSearchVal] = useState();

//   const searchChange = val => {
//     if (val && val.length) {
//       setInterestsSearchVal(val[0]);
//       console.log("IN HERE 3");
//     } else {
//       setInterestsSearchVal("");
//     }
//   };
//   const submitSearch = () => {
//     if (interestsSearchVal) {
//       typeahead.getInstance().clear();
//       props.history.push(`/interests/${interestsSearchVal}`);
//       console.log("IN HERE");
//     }
//     else {
//       console.log("IN HERE 2");
//           }
//   };
//   const editProfile = () => {
//       props.history.push(`/edit`);
//   };

//   let typeahead;


//                 //className="mr-2"
//                 //allowNew
//   return (
//     <Navbar variant="light" expand="lg">
//       <IndexLinkContainer to="/" activeClassName="">
//         <Navbar.Brand href="#">
//           <FontAwesomeIcon icon={faUsersCog} className="mr-2" size="lg" />
//           Connectionator Too
//         </Navbar.Brand>
//       </IndexLinkContainer>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
// <Nav className="ml-4 mr-auto">
//           {interests.status === "ERROR" && (
//             <Alert
//               variant="danger"
//               style={{ padding: "5px 10px", margin: "0" }}
//             >
//               Failed to load interests list, please try again later.
//             </Alert>
//           )}
//           {interests.status === "FETCHING" && <Loading />}
//           {interests.status === "IDLE" && interests.data && interests.data.length > 0 && (
//             <React.Fragment>
//               <Typeahead
//                 placeholder="Search for Friends"
//                 onChange={searchChange}
//                 options={interests.data || []}
//                 labelKey="name"
//                 clearButton={true}
//                 inputProps={{
//                   className: "company-search-input"
//                 }}
//                 ref={el => (typeahead = el)}
//               />
//               <Button variant="primary" onClick={submitSearch}>
//                 <FontAwesomeIcon icon={faSearch} size="1x" />
//               </Button>
//             </React.Fragment>
//           )}
//         </Nav>

//         <Nav className="ml-4 mr-auto">


//         </Nav>
//         <Nav>
//           <Navbar.Text style={{ padding: "0" }}>
//             <Button variant="primary" onClick={editProfile}> 
//             <Badge
//               pill
//               onClick={editProfile}
//               style={{ fontWeight: "bold", padding: "8px 12px" }}
//             >
//               {props.user || ""}
//               <FontAwesomeIcon icon={faUser} size="1x" className="ml-2" />
//             </Badge>
//           </Button>
//           </Navbar.Text>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }
//               /* variant="primary" */

// export default withRouter(Directory);
