/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 * 
 * Updated 11/08/2019
 */

// import your own scripts here.
import {logIn} from './login.js';
import {signUp} from './signup.js';
import {post} from './post.js';
import {backbone} from "./backbone.js";
import {profile} from "./profile.js";
import {logout} from './logout.js';

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(API_URL) {
  // your app initialisation goes here
    backbone();                                //generate the backbone of website
    signUp(API_URL);                                  // handle sig-nup function
    logIn(API_URL);                                   // handle the login function and function after login (Feed function)
    post(API_URL);                                    // Post function
    profile(API_URL);                                 // Show and Update profile function
    logout();                                         // logout
}

export default initApp;
