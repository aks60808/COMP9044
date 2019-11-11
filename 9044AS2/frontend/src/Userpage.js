/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */

export function showpage(username,apiUrl,token){

    /**
     *  schema:
     *
     *  create Html elements -> fetch TargetUserInfo
     *     |                             |
     *     |                      fetch My User info -> check it's me or unfollow or following User
     *     |                              |
     *     |               PUT TargetUserInfo to Html element
     *     |                              |
     *     |                          fetch post  ->  if TargetUser === me , enable delete and edit function
     *     |                              |
     *     |               fetch following -> add the hyperlink to their page( just call the function again)
     *     |                              |
     *     |--------------<---------------|
     *
     */

    ///////// Building Blocks //////////

    const div_userpage = document.getElementById('div-userpage');
    while (div_userpage.firstChild) {                                   // clean each time
        div_userpage.removeChild(div_userpage.firstChild);
    }
    const div_header = document.createElement('div');
    div_userpage.appendChild(div_header);
    div_header.style.backgroundColor = '#4ABDAC';
    div_header.style.padding ='30px';
    const h1_header = document.createElement('h1');
    h1_header.textContent = username + " 's Page ";
    h1_header.style.color = '#fff';
    h1_header.style.fontSize = '60px';
    div_header.appendChild(h1_header);
    h1_header.style.textAlign = 'center';
    const div_follow_btn = document.createElement('div');
    const span_follow_btn = document.createElement('div');
    const span_unfollow_btn = document.createElement('div');
    div_follow_btn.style.textAlign = 'center';
    span_follow_btn.classList.add('button');
    span_follow_btn.classList.add('button-primary');
    span_follow_btn.textContent = "FOLLOW";
    span_follow_btn.style.cursor = 'pointer';
    span_unfollow_btn.classList.add('button');
    span_unfollow_btn.classList.add('button-secondary');
    span_unfollow_btn.textContent ="UNFOLLOW";
    span_unfollow_btn.style.cursor = 'pointer';
    div_follow_btn.appendChild(span_follow_btn);
    div_follow_btn.appendChild(span_unfollow_btn);
    div_header.appendChild(div_follow_btn);
    span_follow_btn.style.display = 'none';
    span_unfollow_btn.style.display = 'none';
    const div_page_content = document.createElement('div');
    div_page_content.style.backgroundColor = 'white';
    div_userpage.append(div_page_content);
    const div_userinfo = document.createElement('div');
    div_page_content.appendChild(div_userinfo);
    const li_name = document.createElement('div');
    div_userinfo.appendChild(li_name);
    li_name.style.fontSize = '20px';
    li_name.style.padding = '20px';
    li_name.style.display = 'block';
    li_name.style.textAlign = 'center';
    li_name.style.backgroundColor = '#FC4A1A';
    li_name.style.color = '#fff';
    li_name.style.fontWeight = '900';
    div_userinfo.style.lineHeight ='1.5';
    const li_email = document.createElement('div');
    li_email.style.fontSize = '20px';
    li_email.style.padding = '20px';
    li_email.style.display = 'block';
    li_email.style.textAlign = 'center';
    li_email.style.backgroundColor = '#F7B733';
    li_email.style.color = '#fff';
    li_email.style.fontWeight = '900';
    div_userinfo.appendChild(li_email);
    const li_nOffollowers = document.createElement('div');
    li_nOffollowers.style.fontSize = '20px';
    li_nOffollowers.style.padding = '20px';
    li_nOffollowers.style.display = 'block';
    li_nOffollowers.style.textAlign = 'center';
    li_nOffollowers.style.backgroundColor = '#DFDCE3';
    li_nOffollowers.style.color = '#fff';
    li_nOffollowers.style.fontWeight = '900';
    div_userinfo.appendChild(li_nOffollowers);
    const h2_postheader = document.createElement('h2');
    h2_postheader.textContent = 'ALL POSTS';
    h2_postheader.style.textAlign = 'center';
    h2_postheader.style.color ='#FF6969';
    h2_postheader.style.fontSize = '30px';
    div_page_content.appendChild(h2_postheader);
    const ul_userpost = document.createElement('ul');
    ul_userpost.style.marginLeft = '20px';
    div_page_content.appendChild(ul_userpost);
    const div_followheader = document.createElement('div');
    div_page_content.appendChild(div_followheader);
    div_followheader.style.backgroundColor = '#4392C0';
    div_followheader.style.fontSize = '20px';
    div_followheader.style.padding = '20px';
    div_followheader.style.display = 'block';
    div_followheader.style.textAlign = 'center';
    div_followheader.style.color = '#fff';
    div_followheader.style.fontWeight = '900';
    const ul_following = document.createElement('ul');
    ul_following.style.marginLeft = '20px';
    div_page_content.appendChild(ul_following);
    ul_following.style.lineHeight ='2';

    ///////// End of Building Blocks //////////

    const auToken_GET ={
        "method" : 'GET',
        "headers": {
            "Content-Type" : "application/json",
            "Authorization": `Token ${token}`
        }
    };
    const usersrvr = apiUrl + '/user/?username=' + username;
    const loginuser = localStorage.getItem('username');

    fetch(usersrvr,auToken_GET).then(res=>res.json())     // get TargetUser info
        .then(getuserJson =>{
            fetch(apiUrl + '/user/',auToken_GET).then(result =>result.json()) // get my info
                .then(jsonLogU =>{                                 //check this user is me or unfollow/follow user
                    let found = false;
                    for (let i = 0;i<jsonLogU.following.length;i++){
                        if(getuserJson.id === jsonLogU.following[i]){
                            found = true;
                        }
                    }
                    if(found){
                        span_unfollow_btn.style.display = 'inline';                         //this following user
                        span_follow_btn.style.display = 'none';

                    }else if (getuserJson.username === loginuser ){                        //this is me
                        span_unfollow_btn.style.display = 'none';
                        span_follow_btn.style.display = 'none';
                    }
                    else{
                        span_follow_btn.style.display = 'inline';                         // this is unfollowing user
                        span_unfollow_btn.style.display = 'none';
                    }
                });
            li_name.textContent = 'Name : ' + getuserJson.name;
            li_email.textContent = 'Email : ' + getuserJson.email;
            li_nOffollowers.textContent = getuserJson.followed_num + ' Followers';
            let PostPromise = [];
            for (let i = 0; i < getuserJson.posts.length ; i++){
                const url = apiUrl + '/post/?id=' + getuserJson.posts[i];
                PostPromise.push(fetch(url,auToken_GET).then(res => res.json()));                   // get post info
            }
            PostPromise.push(fetch(apiUrl + '/user/',auToken_GET).then(result =>result.json()));
            Promise.all(PostPromise).then(arr=>{                                                   // put post detail to html
                for (let i = 0; i<arr.length - 1 ;i++){
                    const li_post = document.createElement('li');
                    const h4_post = document.createElement('h4');
                    h4_post.textContent = arr[i].title;
                    li_post.appendChild(h4_post);
                    const p_1 = document.createElement('p');
                    p_1.textContent = arr[i].text;
                    const p_2 = document.createElement('p');
                    p_2.textContent = ' posted on /s/' + arr[i].meta.subseddit;
                    li_post.appendChild(p_1);
                    ul_userpost.appendChild(li_post);
                    if (arr[i].image !== null){
                        const div_img = document.createElement('div');
                        li_post.appendChild(div_img);
                        const image = document.createElement('img');
                        const imagesrc = 'data:images/jpg;base64, ' + arr[i].image;
                        image.setAttribute('src',imagesrc);
                        image.setAttribute('height','200');
                        image.setAttribute('width','200');
                        div_img.appendChild(image);
                    }
                    li_post.appendChild(p_2);

                    ///////// Building Blocks for Edit and Delete //////////

                    const span_edit_post = document.createElement('div');
                    span_edit_post.style.display = 'none';
                    span_edit_post.classList.add('button','button-primary');
                    span_edit_post.textContent = 'EDIT POST';
                    span_edit_post.style.cursor = 'pointer';
                    span_edit_post.style.margin = '5px';
                    const span_del_post = document.createElement('div');
                    span_del_post.classList.add('button','button-secondary');
                    span_del_post.style.display = 'none';
                    span_del_post.textContent = 'DELETE POST';
                    span_del_post.style.cursor = 'pointer';
                    span_del_post.style.margin = '5px';
                    const p_btn_section  = document.createElement('p');
                    p_btn_section.append(span_edit_post);
                    p_btn_section.append(span_del_post);
                    li_post.append(p_btn_section);
                    const div_update_post = document.createElement('div');
                    li_post.append(div_update_post);
                    div_update_post.style.display = 'none';
                    const form_post = document.createElement('form');
                    div_update_post.appendChild(form_post);
                    const text_title = document.createTextNode('Title : ');
                    form_post.appendChild(text_title);
                    form_post.appendChild(document.createElement('br'));
                    const input_title = document.createElement('input');
                    input_title.setAttribute('type','text');
                    input_title.setAttribute('id','post-title');
                    input_title.value = arr[i].title;
                    form_post.appendChild(input_title);
                    form_post.appendChild(document.createElement('br'));
                    const text_text = document.createTextNode('Text : ');
                    form_post.appendChild(text_text);
                    form_post.appendChild(document.createElement('br'));
                    const textarea_text = document.createElement('textarea');
                    form_post.appendChild(textarea_text);
                    textarea_text.setAttribute('id','post-text');
                    textarea_text.setAttribute('rows','10');
                    textarea_text.setAttribute('cols','50');
                    textarea_text.value = arr[i].text;
                    form_post.appendChild(document.createElement('br'));
                    const text_img = document.createTextNode('Upload image :');
                    form_post.appendChild(text_img);
                    form_post.appendChild(document.createElement('br'));
                    const input_img = document.createElement('input');
                    form_post.appendChild(input_img);
                    input_img.setAttribute('type','file');
                    input_img.setAttribute('name','image');
                    input_img.setAttribute('accept','image/*');
                    input_img.setAttribute('id','post-image');
                    form_post.appendChild(document.createElement('br'));
                    const div_update_btn = document.createElement('div');
                    div_update_btn.style.display = 'inline-block';
                    div_update_btn.style.cursor = 'pointer';
                    div_update_btn.style.backgroundColor= '#F7B733';
                    div_update_btn.style.padding = '5px';
                    div_update_btn.style.margin = '5px';
                    div_update_post.append(div_update_btn);
                    div_update_post.style.lineHeight = '2';
                    div_update_btn.textContent = 'Update Post';

                    ///////// End of Building Blocks  for Edit and Delete//////////

                    const loginUserPromis = arr[arr.length - 1];
                    let found = false;
                    for (let i = 0;i<loginUserPromis.following.length;i++){
                        if(getuserJson.id === loginUserPromis.following[i]){
                            found = true;
                        }
                    }
                    if(found){
                        span_del_post.style.display = 'none';
                        span_edit_post.style.display = 'none';

                    }else if (getuserJson.username === loginuser ){    // if this is me , enable Edit and Delete
                        span_del_post.style.display = 'inline-block';
                        span_edit_post.style.display = 'inline-block';
                    }
                    else{
                        span_del_post.style.display = 'none';
                        span_edit_post.style.display = 'none';
                    }

                    ///////// EventListeners //////////

                    span_del_post.addEventListener('click',function () {
                        /**
                         * click -> send to backend -> delete the post
                         */
                        const auToken_DEL ={
                            "method" : 'DELETE',
                            "headers": {
                                "Content-Type" : "application/json",
                                "Authorization": `Token ${token}`
                            }
                        };
                        const postsrvr = apiUrl + '/post/?id=' + arr[i].id;
                        fetch(postsrvr,auToken_DEL).then(res=>{
                            if(res.status === 200){
                                alert('Deleted');
                                showpage(username,apiUrl,token);
                            }else{
                                alert('Delete Failed');
                            }
                        })
                    });

                    span_edit_post.addEventListener('click',function () {
                        /**
                         * click -> open the modal with input box -> send to backend -(200)-> it would call the function without relaod the page
                         */
                        if  (div_update_post.style.display === 'none'){
                            span_edit_post.textContent = 'CANCEL EDIT'
                            div_update_post.style.display = 'inline';
                        }else{
                            span_edit_post.textContent = 'EDIT POST'
                            div_update_post.style.display = 'none';
                        }
                        div_update_btn.addEventListener('click',function () {
                            const postsrvr = apiUrl + '/post/?id=' + arr[i].id;
                            const auToken_PUT ={
                                "method" : "PUT",
                                "headers" : {
                                    "Content-Type": "application/json",
                                    "Authorization": `Token ${token}`
                                },
                                "body" : JSON.stringify({
                                    "title" : `${input_title.value}`,
                                    "text" : `${textarea_text.value}`,
                                    "image" : null
                                })
                            };
                            fetch(postsrvr,auToken_PUT).then(res=>{
                                if(res.status === 200){
                                    showpage(username,apiUrl,token);
                                }else{
                                    alert('Post Update Failed');
                                }
                            })
                        })
                    });
                }
            });


            const FollowingPromise = [];                                    // now doing the following section
            for (let i = 0; i<getuserJson.following.length;i++){
                const usersrvr = apiUrl + '/user/?id=' + getuserJson.following[i];
                FollowingPromise.push(fetch(usersrvr,auToken_GET).then(res=>res.json()));
            }

            Promise.all(FollowingPromise).then(arr=>{
                div_followheader.textContent = 'FOLLOWING ' + arr.length + ' Users';
                for (let i = 0; i<arr.length;i++){
                    const li_person = document.createElement('li');
                    const span_person = document.createElement('span');
                    li_person.appendChild(span_person);
                    li_person.style.margin = '0 0 3px 0';
                    span_person.textContent = arr[i].username;
                    ul_following.appendChild(li_person);
                    span_person.setAttribute('style','border: none;' +
                        'color: #FF9E9E;' +
                        'font-size: 16px;' +
                        'cursor: pointer;' +
                        'display: inline-block;');
                    if (arr[i].id !== 0){                                  // enable to click then go their page
                        span_person.addEventListener('click',function () {
                            showpage(arr[i].username,apiUrl,token);
                        });
                    }

                }

            });
        });

    span_follow_btn.addEventListener('click',function(){

        /**
         * click -> send to backend -> follow
         */

        const followUrl = apiUrl + '/user/follow?username=' + username;
        const auToken_PUT ={
            "method" : 'PUT',
            "headers": {
                "Content-Type" : "application/json",
                "Authorization": `Token ${token}`
            }
        };
        fetch(followUrl,auToken_PUT).then(res=>{
            if (res.status === 200){
                alert('Followed');
                showpage(username,apiUrl,token);
            }else{
                alert('Followed Failed');
            }
        })
    });
    span_unfollow_btn.addEventListener('click',function(){

        /**
         * click -> send to backend -> unfollow
         */

        const unfollowUrl = apiUrl + '/user/unfollow?username=' + username;
        const auToken_PUT ={
            "method" : 'PUT',
            "headers": {
                "Content-Type" : "application/json",
                "Authorization": `Token ${token}`
            }
        };
        fetch(unfollowUrl,auToken_PUT).then(res=>{
            if (res.status === 200){
                alert('Unfollowed');
                showpage(username,apiUrl,token);
            }else{
                alert('Unfollowed Failed');
            }
        })
    });
}