/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */

import {feed} from './feed.js'
import {userFeed} from './userFeed.js';
import {showpage} from "./Userpage.js";
import {search} from "./search.js";

export function logIn(apiUrl) {

    /**
     * schema:
     *
     *   Login Button -> Iframe (with input box) -> click submit -> click cancel to close iframe
     *                                                      |
     *      Get UserFeed & Enable Search <-(200)-  send request to Backend  -(else)->  Get PublicFeed
     *
     *
     *   reload the page  ->        check the localstorage (looking for auth token)
     *                                                     |
     *         Get UserFeed & Enable Search     <-(Found)-   -(Not Found)->     Get PublicFeed
     *
     */

    function verification() {

        /**
         *   generate the iframe for login page
         */

        ////////////////    Building Blocks //////////////

        let ifrm = document.createElement("iframe");
        let width = window.innerWidth;
        ifrm.setAttribute("src", "about:blank");
        ifrm.style.border = '2px solid #F7B733';
        ifrm.style.backgroundColor = '#DFDCE3';
        ifrm.setAttribute("display", "flex");
        ifrm.style.textAlign = "center";
        ifrm.style.width = "640px";
        ifrm.style.height = "300px";
        ifrm.style.top = '150px';
        ifrm.style.left = `${width/2 - 320}px`;
        ifrm.setAttribute("id", 'login_frame');
        ifrm.style.position = 'absolute';
        ifrm.setAttribute("hspace", "10");
        ifrm.setAttribute("vspace", "10")
        document.body.appendChild(ifrm);
        let frame = document.getElementById('login_frame');
        const content = "<html>" +
            "<head>" +
            "<title'>" +
            "</title>" +
            "</head>" +
            "<body style='font-family: Open Sans, Helvetica Neue, sans-serif;background-color: white'>" +
            "<h1 style='text-align:center;color:#4ABDAC;font-size: 40;margin-top: 7%;'>Seddit Login</h1>" +
            "<form >\n" +
            "<div style='text-align:center;margin-top: 3%;line-height: 2rem;'>" +
            "  <span style='padding:16px;color:#F7B733;'>USERNAME</span><input id = 'username' type='text' name='Account' size='35'><br><br>\n" +
            "  <span style='padding:16px;color:#F7B733;'>PASSWORD</span><input  id = 'password' type='password' name='Password' size='35'><br><br>\n" +
            "  <button type='button' style='display: inline-block;border: 0.1rem solid #FC4A1A;font-weight:500;color:#FC4A1A;' id='sub-btn'> Submit </button>" +
            "</form>" +
            "  <button type='button' style='display: inline-block;border: 0.1rem solid #FC4A1A;font-weight:500;color:#FC4A1A;' id='close-btn'> Close </button>" +
            "</div>" +
            "</body>" +
            "</html>";
        frame.contentDocument.write(content);
        let iframe = document.getElementById("login_frame");
        ///////// End of Building Blocks //////////

        ////////////////    EventListeners  //////////////

        const subbtn = iframe.contentWindow.document.getElementById('sub-btn');
        const closebtn = iframe.contentWindow.document.getElementById('close-btn');

        subbtn.addEventListener('click', function () {

            /**
             *   click submit -> send request to backend.
             *   If login successfully -> fetch the user feed by calling UserFeed();
             */

            const username = iframe.contentWindow.document.getElementById('username');
            const password = iframe.contentWindow.document.getElementById('password');
            const infoToBackend ={
                        "method" : "POST",
                        "headers" : {
                            "Content-Type": "application/json"
                        },
                        "body" : JSON.stringify({
                            "username" : `${username.value}`,
                            "password" : `${password.value}`
                        })
            };
            const loginBackendsrvr = apiUrl + '/auth/login';

            fetch(loginBackendsrvr,infoToBackend)
                .then(response => {
                    if (response.status === 200){
                        // If login successfully , need to hide or show the button
                        // e.g. signup/login -> display -> none ; logout,profile -> display -> not none
                        localStorage.setItem('username',username.value);
                        const main = document.getElementsByTagName('main')[0];
                        const loginbtn = document.querySelector('[data-id-login]');
                        const signupbtn = document.querySelector('[data-id-signup]');
                        const profilebtn = document.getElementById('profile-btn');
                        const logoutbtn = document.getElementById('logout-btn');
                        const Postbtn = document.getElementById('postBtn');
                        const UpProbtn = document.getElementById('update-profile-btn');
                        const mypagebtn = document.getElementById('mypage-btn');
                        const searchbtn  = document.getElementById('search-btn');
                        const input_search  = document.getElementById('search');
                        searchbtn.style.display = 'inline';
                        input_search.style.display = 'inline';
                        mypagebtn.style.display = 'inline';
                        UpProbtn.style.display = 'inline';
                        Postbtn.style.display = 'inline';
                        loginbtn.style.display = 'none';
                        signupbtn.style.display = 'none';
                        profilebtn.style.display = 'inline';
                        logoutbtn.style.display = 'inline';
                        const ul_feed = document.getElementById('feed');
                        while (ul_feed.firstChild) {
                            ul_feed.removeChild(ul_feed.firstChild);
                        }
                        const jsn = response.json();

                        jsn.then(obj => {
                            const value = obj.token;
                            window.localStorage.setItem("authtoken", `${value}`);          // save the auth token into local storage
                            const authtoken = localStorage.getItem("authtoken");
                            userFeed(apiUrl,authtoken,0,10);                 // get UserFeed ( Lv.1 )
                            search(apiUrl,authtoken);                                     // Enable Lv.3 - search function
                            let postid = 11;                                          // default is 0 - 10, so start with post id =11
                            window.onscroll = function(ev) {

                                /**
                                 *   Lv.3 - Infinite Scroll
                                 *   Use scrollHeight instead of offSetHeight(buz the index page are generated dynamically
                                 *   When scrolling down to the bottom, call userFeed (get 1 post once)
                                 */

                                if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && main.style.display !== 'none') {
                                    userFeed(apiUrl, authtoken,postid,1);
                                    postid += 1;
                                }
                            };
                        });
                    }else{
                        alert('LOGIN FAILED');
                    }
                });
            iframe.parentNode.removeChild(iframe);
        });

        closebtn.addEventListener('click',function(){
            /**
             *  click -> close the iframe
             */
            iframe.parentNode.removeChild(iframe);
        })

    }
    if (localStorage.getItem('authtoken') !== null){

        /**
         *  take care the auto-login by detecting the AuthToken from LocalStorage
         *  then do exactly the same thing as above (toggle button)
         */

        const main = document.getElementsByTagName('main')[0];
        const ul_feed = document.getElementById('feed');
        while (ul_feed.firstChild) {
            ul_feed.removeChild(ul_feed.firstChild);
        }
        const oldtoken = localStorage.getItem('authtoken');
        const loginbtn = document.querySelector('[data-id-login]');
        const signupbtn = document.querySelector('[data-id-signup]');
        const profilebtn = document.getElementById('profile-btn');
        const logoutbtn = document.getElementById('logout-btn');
        const Postbtn = document.getElementById('postBtn');
        const UpProbtn = document.getElementById('update-profile-btn');
        const mypagebtn = document.getElementById('mypage-btn');
        const searchbtn  = document.getElementById('search-btn');
        const input_search  = document.getElementById('search');
        searchbtn.style.display = 'inline';
        input_search.style.display = 'inline';
        mypagebtn.style.display = 'inline';
        UpProbtn.style.display = 'inline';
        Postbtn.style.display = 'inline';
        loginbtn.style.display = 'none';
        signupbtn.style.display = 'none';
        profilebtn.style.display = 'inline';
        logoutbtn.style.display = 'inline';
        userFeed(apiUrl,oldtoken,0,10);
        search(apiUrl,oldtoken);
        let auToken = localStorage.getItem('authtoken');
        let postid = 11;
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && main.style.display !== 'none') {
                userFeed(apiUrl, auToken,postid,1);
                postid += 1;
            }
        };
    }else{
        // if no token in LocalStorage -> just use feed() to fetch public feed (Lv. 1)
        feed(apiUrl);
    }
    const btn_mypage = document.getElementById('mypage-btn');

    btn_mypage.addEventListener('click',function () {

        /**
         *  click mypage_btn -> toggle button -> you can see your own userpage
         */

        const auToken = localStorage.getItem("authtoken");
        const main  =document.getElementsByTagName('main')[0];
        const div_userpage = document.getElementById('div-userpage');
        div_userpage.style.display = 'inline';
        main.style.display = 'none';
        const username = localStorage.getItem('username');
        showpage(username,apiUrl,auToken);                  // enable showpage function (Lv.3)
    });

    const logInBtn = document.querySelector('[data-id-login]');


    logInBtn.addEventListener('click', function(){

        /**
         *  click login_btn -> generate the iframe page and enable the function written above.
         */

        const logframe = document.getElementById('login_frame');
        if ( logframe !== null) {
            logframe.parentNode.removeChild(logframe);
        }
        verification();

    });







}
