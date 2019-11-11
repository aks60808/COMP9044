/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */
export function signUp(apiUrl) {
    /**
     * schema:
     *      click signup button -> generate iframe with input box -> click cancel to close iframe
     *                                          |
     *                                  click submit button
     *                                          |
     *                   checking the input value (just alert but still submit)
     *                                          |
     *                                    send to backend
     *                                          |
     *                 positive alert  <-(200)-   -(else)->  alert "failed"
     */

    function signUpinfo() {

        /**
         *   Generate the iframe for login page
         */

        //////////////////    Building Iframe  /////////////////

        let ifrm = document.createElement("iframe");
        let width = window.innerWidth;
        ifrm.setAttribute("src", "about:blank");
        ifrm.style.border = '2px solid #F7B733';
        ifrm.style.backgroundColor = '#fff';
        ifrm.setAttribute("display", "flex");
        ifrm.style.textAlign = "center";
        ifrm.style.width = "640px";
        ifrm.style.height = "500px";
        ifrm.style.top = '150px';
        ifrm.style.left = `${width/2 - 320}px`;
        ifrm.setAttribute("id", 'signup_frame');
        ifrm.style.position = 'absolute';
        ifrm.setAttribute("hspace", "10");
        ifrm.setAttribute("vspace", "10")
        document.body.appendChild(ifrm);
        let frame = document.getElementById('signup_frame');
        const content = "<html>" +
            "<head>" +
            "<title>" +
            "</title>" +
            "</head>" +
            "<body style='font-family: Open Sans, Helvetica Neue, sans-serif;background-color: #fff'>" +
            "<h1 style='text-align:center;color:#4ABDAC;font-size: 40;margin-top: 7%;'>Seddit Signup</h1>" +
            "<form >" +
            "<div style='text-align:center;margin-top: 3%;line-height: 2rem;'>" +
            "  <span style='padding:59px;color:#F7B733;'>NAME</span><input id='name' type='text' name='name' size='35' ><br><br>\n" +
            "  <span style='padding:38px;color:#F7B733;'>USERNAME</span><input id='username' type='text' name='username' size='35' ><br><br>\n" +
            "  <span style='padding:38px;color:#F7B733;'>PASSWORD</span><input  id='pws' type='password' name='password' size='35'><br><br>\n" +
            "  <span style='padding:59px;color:#F7B733;'>EMAIL</span><input  id='email' type='text' name='email' size='35'><br><br>\n" +
            "  <button type='button' style='display: inline-block;border: 0.1rem solid #FC4A1A;font-weight:500;color:#FC4A1A;' id='sub-btn'> Submit </button>" +
            "</form>" +
            "  <button type='button' style='display: inline-block;border: 0.1rem solid #FC4A1A;font-weight:500;color:#FC4A1A;' id='close-btn'> Close </button>" +
            "</div>" +
            "</body>" +
            "</html>";
        frame.contentDocument.write(content);
        let iframe = document.getElementById("signup_frame");
        const subbtn = iframe.contentWindow.document.getElementById('sub-btn');
        const closebtn = iframe.contentWindow.document.getElementById('close-btn');

        //////////////////    Evenlistener  /////////////////

        subbtn.addEventListener('click',function(){
            /**
             *   click the submit button -> checking the input value -> send request to Backend.
             */
            const name = iframe.contentWindow.document.getElementById('name');
            const username = iframe.contentWindow.document.getElementById('username');
            const pws = iframe.contentWindow.document.getElementById('pws');
            const email = iframe.contentWindow.document.getElementById('email');
            let namecheck = name.value.match(/[^a-zA-Z0-9\s]+/g);
            let usernamecheck = username.value.match(/[^a-zA-Z_0-9\s]+/g);
            let pwscheck = pws.value.match(/[^a-zA-Z0-9]+/g);
            let emailcheck = email.value.match(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/g);
            if ( pws.value === '' || name.value === '' || username.value === ''|| email.value === '' ) {
                alert('name ,username,password and email cant be empty!!\nTry again!');
            }
            else if (namecheck != null && usernamecheck != null && pwscheck != null){
                alert('Invalid name,username,password!!\nTry again!');
            }
            else if (namecheck == null && usernamecheck != null && pwscheck != null){
                alert('Invalid username,password!!\nTry again!');
            }
            else if (namecheck != null && usernamecheck == null && pwscheck != null){
                alert('Invalid name,password!!\nTry again!');
            }
            else if (namecheck != null && usernamecheck != null && pwscheck == null){
                alert('Invalid name,username!!\nTry again!');
            }
            else if (namecheck != null ){
                alert('Invalid name!!\nTry again!');
            }
            else if (usernamecheck != null ){
                alert('Invalid username!!\nTry again!');
            }
            else if (pwscheck != null ) {
                alert('Invalid password!!\nTry again!');
            }else if (emailcheck === null) {
                alert('invalid email');
            }
            const infoToBackend ={
                "method" : "POST",
                "headers" : {
                    "Content-Type": "application/json"
                },
                "body" : JSON.stringify({
                    "username" : `${username.value}`,
                    "password" : `${pws.value}`,
                    "email" : `${email.value}`,
                    "name" : `${name.value}`
                })
            };
            const backendsrvr = apiUrl + '/auth/signup/';
            fetch(backendsrvr,infoToBackend)
                .then(response => {
                    if (response.status === 200){
                        alert('Singup Successfully and Please Login');
                    }else if (response.status === 400){
                        alert('Invalid Singup info');
                    }else if (response.status === 409){
                        alert('The username is existed!!');
                    }
                    iframe.parentNode.removeChild(iframe);
                });
        });

    closebtn.addEventListener('click',function (){
        /**
         *   click the close button -> close the iframe
         */
        iframe.parentNode.removeChild(iframe);
    });
    }

    const signUpBtn = document.querySelector('[data-id-signup]');
    signUpBtn.addEventListener('click',function(){
        /**
         *   click the signup button -> generate the iframe
         */
        const signupframe = document.getElementById('signup_frame');
        if ( signupframe !== null) {
            signupframe.parentNode.removeChild(signupframe);
        };
        signUpinfo();
    });

}