/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */

export function profile(apiUrl){

    /**
     * schema for getUserProfile:
     *
     *      click userprofile button -> fetch the user info-> fetch upvotes of each post -> alert the information
     *
     * schema for UpdateProfile:
     *
     *      click updateprofile button -> iframe (with input box) ->  input value
     *                                                                     |
     *                   fetch the user info   <-(with some empty value)-     -(without null value)-> send to backend.
     *                          |                                                                              |
     *                          ----------------------------- new_value = old_value  ---------------------------
     *
     */

    function getUserProfile(){

        /**
         *  fetch the user info then fetch upvotes of each posts then alert the Profile info
         */

        const usersrvr = apiUrl + '/user/' ;
        const authtoken = localStorage.getItem('authtoken');
        const infoToBackend_GET ={
            "method" : 'GET',
            "headers": {
                "Content-Type" : "application/json",
                "Authorization": `Token ${authtoken}`
            }
        };
                     // get info of each post
        fetch(usersrvr,infoToBackend_GET).then(res => res.json())
            .then(json => {
                let sumOfUpvotes = 0;                                            // sum of total upvotes
                let promises = [];
                for (let i = 0; i < json.posts.length ; i++){
                    const postsrvr = apiUrl + '/post/?id=' + json.posts[i];
                    promises.push(fetch(postsrvr,infoToBackend_GET).then(res => res.json()));
                }
                Promise.all(promises).then(jsonall=>{
                        for (let i = 0; i < jsonall.length;i++){
                            sumOfUpvotes += jsonall[i].meta.upvotes.length;
                        }
                        let profile_info = 'USER PROFILE INFORMATION : \n' +
                            'NAME : ' + json.name + '\n' +
                            'USERNAME : ' + json.username + '\n' +
                            'EMAIL : ' + json.email + '\n' +
                            json.posts.length + ' Posts And ' + sumOfUpvotes + ' total Upvotes';
                        alert(profile_info);                                    // get the info by alert
                })
            });
    }

    function UpdateProfile(){

        /**
         *  generate the iframe with input box then send to backend (with empty input processing )
         */

        ///////// Building Blocks  ///////////

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
        ifrm.setAttribute("id", 'update_frame');
        ifrm.style.position = 'absolute';
        ifrm.setAttribute("hspace", "10");
        ifrm.setAttribute("vspace", "10")
        document.body.appendChild(ifrm);
        let frame = document.getElementById('update_frame');
        const content = "<html>" +
            "<head>" +
            "<title>" +
            "</title>" +
            "</head>" +
            "<body style='font-family: Open Sans, Helvetica Neue, sans-serif;background-color: #fff'>" +
            "<h1 style='text-align:center;color:#4ABDAC;font-size: 40;margin-top: 7%;'>PROFILE UPDATE</h1>" +
            "<form >" +
            "<div style='text-align:center;margin-top: 3%;line-height: 2rem;'>" +
            "<p> if u dont wanna change just leave it empty </p>" +
            "<p>  (* password cant be empty i.e input the old pwd if u dont wanna change)</p>" +
            "  <span style='padding:59px;color:#F7B733;'>UPDATE NAME</span><input id='Nname' type='text' name='name' size='35' ><br><br>\n" +
            "  <span style='padding:38px;color:#F7B733;'>UPDATE PASSWORD</span><input  id='Npws' type='password' name='password' size='35'><br><br>\n" +
            "  <span style='padding:59px;color:#F7B733;'>UPDATE EMAIL</span><input  id='Nemail' type='text' name='email' size='35'><br><br>\n" +
            "  <button type='button' style='display: inline-block;border: 0.1rem solid #FC4A1A;font-weight:500;color:#FC4A1A;' id='sub-btn'> Submit </button>" +
            "</form>" +
            "  <button type='button' style='display: inline-block;border: 0.1rem solid #FC4A1A;font-weight:500;color:#FC4A1A;' id='close-btn'> Close </button>" +
            "</div>" +
            "</body>" +
            "</html>";
        frame.contentDocument.write(content);
        let iframe = document.getElementById("update_frame");
        const subbtn = iframe.contentWindow.document.getElementById('sub-btn');
        const closebtn = iframe.contentWindow.document.getElementById('close-btn');
        ///////// End of Building Blocks //////////

        ///////// EvenListeners  ///////////

        subbtn.addEventListener('click',function() {

            /**
             *  click -> fetch the user info -> assign the new with old if empty -> send to backend
             */

            const usersrvr = apiUrl + '/user/';
            const authtoken = localStorage.getItem('authtoken');
            const infoToBackend_GET = {
                "method": 'GET',
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authtoken}`
                }
            };
            fetch(usersrvr, infoToBackend_GET).then(res => res.json())
                .then(json => {
                    const oldName = json.name;
                    const oldEmail = json.email;

                    const pws = iframe.contentWindow.document.getElementById('Npws');
                    let newName = iframe.contentWindow.document.getElementById('Nname');
                    let newEmail = iframe.contentWindow.document.getElementById('Nemail');
                    if (newName.value.length === 0 ) {
                        newName.value = oldName;
                    }
                    if (newEmail.value.length === 0 ) {
                        newEmail.value = oldEmail;
                    }

                    let info_PUT = {
                        "method": 'PUT',
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${authtoken}`
                        },
                        "body": JSON.stringify({
                            "email": `${newEmail.value}`,
                            "name": `${newName.value}`,
                            "password": `${pws.value}`
                        })
                    };
                    return info_PUT;
                }).then(info_PUT => {
                const usersrvr = apiUrl + '/user/';
                fetch(usersrvr, info_PUT).then(res => {
                    if (res.status === 200) {
                        alert('Update Submitted');
                    } else {
                        alert('Update Failed');
                    }
                    iframe.parentNode.removeChild(iframe);
                });


            });
        });

        closebtn.addEventListener('click',function (){
            /**
             *  click -> close iframe
             */
            iframe.parentNode.removeChild(iframe);
        })
    }

    const UPdateProfileBtn = document.getElementById('update-profile-btn');

    const profileBtn = document.getElementById('profile-btn');

    profileBtn.addEventListener('click',function(){
        /**
         *  click-> call the getUserProfile function
         */
        getUserProfile();
    });

    UPdateProfileBtn.addEventListener('click',function (){
        /**
         *  click-> call the UpdateProfile()
         */
        const signupframe = document.getElementById('update_frame');
        if ( signupframe !== null) {
            signupframe.parentNode.removeChild(signupframe);
        }
        UpdateProfile();

    })
}