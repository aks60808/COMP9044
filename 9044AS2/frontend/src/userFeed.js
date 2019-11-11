/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */

import {showpage} from "./Userpage.js";
import {feed} from "./feed.js";

export function userFeed(apiUrl,token,start,end){

    /**
     * schema
     *
     *  FETCH userFeed -> Feed posts -( posts.length === 0)-> get public feed
     *                          |
     *                 (posts.length !== 0)      ____________________________________________________________
     *                          |                |                                |                         |
     *           create Html elements(comment,upvotes,post content)       click see who upvotes          upvote btn
     *                                  |                                         |                         |
     *                 leave commmt  -     -  click see who comments      click user name          check up or un vote
     *                      |                  |                                  |                         |
     *                 sent to backend        click user name             redirect to userpage        send to backend
     *                      |                  |
     *       recall function to refresh       redirect to userpage
     */

    const srvr = apiUrl + '/user/feed?p=' + start + '&n=' + end;
    const auToken_GET ={
        "method" : 'GET',
        "headers": {
            "Content-Type" : "application/json",
            "Authorization": `Token ${token}`
        }
    };
    fetch(srvr,auToken_GET)
        .then(respone => respone.json())
        .then(json => {
            const ul_feed = document.getElementById('feed');               // sort the post id
            const get_sorted_list = ({meta}) => Number(meta.published);
            const sorted_number = json.posts.map(get_sorted_list);
            sorted_number.sort(function(a, b){return b-a});
            if(json.posts.length === 0 && ul_feed.children.length === 0){               // if no posts in feed -> get public
                feed(apiUrl);
            }
            for(const item of sorted_number){

                            /////// Building Blocks ////////////

                const get_post = ({meta}) => Number(meta.published) === item;
                const post = json.posts.filter(get_post)[0];
                const li = document.createElement('li');
                li.setAttribute('data-id-post','');
                li.classList.add('post');
                const upvote_btn = document.createElement('button');
                upvote_btn.setAttribute('type','button');
                upvote_btn.textContent = '↑';
                upvote_btn.classList.add('isUpVoted_N');
                const div_votebtn = document.createElement('div');
                div_votebtn.setAttribute('style','height:30px; width:27px;');
                div_votebtn.style.marginTop = '30';
                div_votebtn.appendChild(upvote_btn);
                li.appendChild(div_votebtn);
                const div_vote = document.createElement('div');
                div_vote.style.textAlign = 'center';
                div_vote.classList.add('vote');
                div_vote.setAttribute('data-id-upvotes','');
                div_vote.textContent = post.meta.upvotes.length;
                li.appendChild(div_vote);
                const div_modalVote = document.createElement('div');
                div_modalVote.style.display = "none";
                div_modalVote.classList.add('modal');
                const div_modalContentVote = document.createElement('div');
                div_modalContentVote.classList.add('modal-content');
                div_modalVote.appendChild(div_modalContentVote);
                div_modalContentVote.textContent = 'Who votes: ';
                div_modalContentVote.style.lineHeight ='1.5';
                const div_content = document.createElement('div');
                div_content.classList.add('content');
                const h4_dataIdTitle = document.createElement('h4');
                h4_dataIdTitle.classList.add('post-title','alt-text');
                h4_dataIdTitle.setAttribute('data-id-title','');
                h4_dataIdTitle.textContent = post.title;
                div_content.appendChild(h4_dataIdTitle);
                const span_author = document.createElement('span');
                span_author.textContent = post.meta.author;
                span_author.setAttribute('style','border: none;' +
                    'color: #FF9E9E;' +
                    'font-size: 16px;' +
                    'cursor: pointer;' +
                    'display: inline-block;');
                const p_postAuthor = document.createElement('p');
                p_postAuthor.classList.add('post-author');
                p_postAuthor.setAttribute('data-id-author','');
                p_postAuthor.textContent = 'Posted by ' ;
                p_postAuthor.appendChild(span_author);
                div_content.appendChild(p_postAuthor);
                const p_postDate = document.createElement('p');
                p_postDate.classList.add('post-author');
                p_postDate.textContent = '#Post: ' + post.meta.published;
                div_content.appendChild(p_postDate);
                const p_subseddit = document.createElement('p');
                p_subseddit.classList.add('post-author');
                p_subseddit.textContent = 'posted to /' + post.meta.subseddit;
                div_content.appendChild(p_subseddit);
                const p_textDescription = document.createElement('p');
                p_textDescription.classList.add('post-text');
                p_textDescription.textContent = post.text;
                div_content.appendChild(p_textDescription);
                if (post.image !== null){
                    const div_img = document.createElement('div');
                    div_content.appendChild(div_img);
                    const image = document.createElement('img');
                    const imagesrc = 'data:images/jpg;base64, ' + post.image;
                    image.setAttribute('src',imagesrc);
                    image.setAttribute('height','200');
                    image.setAttribute('width','200');
                    div_img.appendChild(image);
                }
                const p_nOfComment = document.createElement('p');
                p_nOfComment.classList.add('post-author');
                p_nOfComment.style.cursor = 'pointer';
                p_nOfComment.textContent = "👀 " + post.comments.length + ' comments'
                div_content.appendChild(p_nOfComment);
                const div_seewhovote =document.createElement('div');
                div_seewhovote.classList.add('post-author');
                div_seewhovote.textContent ='👀' + ' who upvotes';
                div_seewhovote.style.cursor= 'pointer';
                div_content.appendChild(div_seewhovote);
                const div_modalComment = document.createElement('div');
                div_modalComment.style.display = "none";
                div_modalComment.classList.add('modal');
                const div_modalContentComment = document.createElement('div');
                div_modalContentComment.classList.add('modal-content');
                div_modalComment.appendChild(div_modalContentComment);
                div_modalContentComment.textContent = 'Who comments : ';
                const ul_comment = document.createElement('ul');
                div_modalContentComment.appendChild(ul_comment);

                /////// End of Building Blocks ////////////

                for(let i = 0 ; i < post.meta.upvotes.length; i++){
                    let userId = post.meta.upvotes[i];
                    if (userId !== 0){
                        let srvr_getuser = apiUrl + `/user/?id=${userId}`;
                        const getselfID_promise = fetch(`${apiUrl}/user/`,auToken_GET)
                            .then(res => res.json());
                        const userID_pormise = fetch(srvr_getuser,auToken_GET).then(response => response.json());
                        Promise.all([getselfID_promise,userID_pormise])                                             ///get the myinfo and the other users info
                            .then(json =>{
                                const div_voter = document.createElement('div');
                                div_voter.style.display ='inline-block';
                                div_voter.style.padding = '6px'
                                if (json[0].username === json[1].username){                                                // if I've upvoted already -> turn red color;
                                    div_vote.style.color ='red';
                                    upvote_btn.classList.replace('isUpVoted_N','isUpVoted_ALRDY');
                                }
                                div_voter.textContent += `${json[1].username}`;
                                div_voter.setAttribute('style','border: none;' +
                                    'color: #FF9E9E;' +
                                    'font-size: 16px;' +
                                    'cursor: pointer;' +
                                    'display: inline-block;');

                                div_voter.addEventListener('click',function (){                          // enable the username tag   to the userpage

                                    /**
                                     * click -> toggle button -> redirect to the user page from who votes
                                     *
                                     */

                                    const div_main = document.getElementsByTagName('main')[0];
                                    const div_userpage = document.getElementById('div-userpage');
                                    div_main.style.display = 'none';
                                    div_userpage.style.display = 'inline';
                                    const upvoteUser = json[1].username;
                                    showpage(upvoteUser,apiUrl,token);
                                });
                                div_modalContentVote.appendChild(div_voter);
                                div_voter.setAttribute('style','border: none;' +
                                    'color: #FF9E9E;' +
                                    'font-size: 16px;' +
                                    'cursor: pointer;' +
                                    'display: inline-block;');
                                const span_space = document.createElement('span');
                                span_space.textContent = ' , ';
                                div_modalContentVote.appendChild(span_space);
                            })
                    }
                }
                for(let i = 0 ; i < post.comments.length; i++){                                 //user comments
                    const li_comment = document.createElement('li');
                    li_comment.style.padding = '6px';
                    const user = document.createElement('span');
                    const comment = document.createElement('span');
                    user.setAttribute('style','border: none;' +
                        'color: #FF9E9E;' +
                        'font-size: 16px;' +
                        'cursor: pointer;' +
                        'display: inline-block;');
                    li_comment.textContent =  ' ' ;
                    user.style.cursor = 'pointer';
                    user.textContent = post.comments[i].author;
                    li_comment.appendChild(user);
                    comment.textContent = ' : ' + post.comments[i].comment;
                    li_comment.appendChild(comment);
                    ul_comment.appendChild(li_comment);

                    user.addEventListener('click',function (){                // enable the username tag   to the userpage

                        /**
                         * click -> toggle button -> redirect to the user page from who comments
                         */
                        const comment_username = post.comments[i].author;
                        const div_main = document.getElementsByTagName('main')[0];
                        const div_userpage = document.getElementById('div-userpage');
                        div_main.style.display = 'none';
                        div_userpage.style.display = 'inline';
                        showpage(comment_username,apiUrl,token);
                    });
                }

                li.appendChild(div_content);
                div_content.appendChild(div_modalVote);
                div_content.appendChild(div_modalComment);
                ul_feed.appendChild(li);
                const input_comment  = document.createElement('textarea');
                div_content.appendChild(input_comment);
                input_comment.setAttribute('cols','100');
                input_comment.setAttribute('class','input-text-comment');
                const btn_comment = document.createElement('button');
                btn_comment.style.backgroundColor = '#4ABDAC';
                btn_comment.textContent = 'COMMENT';
                btn_comment.style.padding = '5px';
                btn_comment.style.display = 'inline-block';
                btn_comment.style.marginBottom = '5px';
                btn_comment.setAttribute('class','comment-btn');
                div_content.appendChild(document.createElement('br'));
                div_content.appendChild(btn_comment);

                div_seewhovote.addEventListener('click',function(){

                    /**
                     * click -> toggle the whovote modal
                     */

                    if(div_modalVote.style.display === 'block'){
                        div_modalVote.style.display = 'None';
                    }else{
                        div_modalVote.style.display = 'block';
                    }
                });

                p_nOfComment.addEventListener('click',function(){

                    /**
                     * click -> toggle the who comments modal
                     */

                    if(div_modalComment.style.display === 'block'){
                        div_modalComment.style.display = 'None';
                    }else{
                        div_modalComment.style.display = 'block';
                    }
                });
                const post_votesrvr = apiUrl + '/post/vote/?id=' + post.id;
                upvote_btn.addEventListener('click',function () {

                    /**
                     * click -> check vote or not -(not yet)-> send to backend -> upvote!
                     *                  |
                     *              (just voted or voted already) -> send to backend -> delete the upvote
                     */

                    if (upvote_btn.classList.contains('isUpVoted_N')){
                        const auToken_PUT ={
                            "method" : 'PUT',
                            "headers": {
                                "Content-Type" : "application/json",
                                "Authorization": `Token ${token}`
                            }
                        };
                        fetch(post_votesrvr,auToken_PUT).then(response =>{
                            if(response.status === 200){
                                div_vote.style.color = 'red';
                                div_vote.textContent = `${Number(div_vote.textContent) + 1}`;
                                upvote_btn.classList.replace('isUpVoted_N','isUpVoted_Y');
                            }else{
                                alert('Upvote failed');
                            }
                        })
                    }else if (upvote_btn.classList.contains('isUpVoted_Y')||upvote_btn.classList.contains('isUpVoted_ALRDY') ){
                        const auToken_DEL ={
                            "method" : 'DELETE',
                            "headers": {
                                "Content-Type" : "application/json",
                                "Authorization": `Token ${token}`
                            }
                        };
                        fetch(post_votesrvr,auToken_DEL).then(response =>{
                            if(response.status === 200){
                                div_vote.style.color = 'black';
                                upvote_btn.classList.replace('isUpVoted_Y','isUpVoted_N');
                                if(upvote_btn.classList.contains('isUpVoted_Y')){
                                    div_vote.textContent = `${Number(div_vote.textContent)}`;
                                }else{
                                    div_vote.textContent = `${Number(div_vote.textContent) - 1}`;
                                    upvote_btn.classList.replace('isUpVoted_ALRDY','isUpVoted_N');
                                }

                            }else{
                                alert('Retract failed');
                            }
                        })
                    }
                });
                span_author.addEventListener('click',function(){

                    /**
                     * click -> redirect to the author's userpage
                     */

                    const div_main = document.getElementsByTagName('main')[0];
                    const div_userpage = document.getElementById('div-userpage');
                    div_main.style.display = 'none';
                    div_userpage.style.display = 'inline';
                    const authorname = post.meta.author;
                        showpage(authorname,apiUrl,token);
                });

                btn_comment.addEventListener('click',function(){

                    /**
                     * click -> take input.value to backend  -(200)-> the refresh the comments section
                     *                       |
                     *                     (else) -> alert ('fail')
                     */

                    const postcommentsrvr = apiUrl + '/post/comment?id=' + post.id;
                    const commentInfo ={
                        "method" : 'PUT',
                        "headers": {
                            "Content-Type" : "application/json",
                            "Authorization": `Token ${token}`
                        },
                        "body" : JSON.stringify({
                            "comment" : `${input_comment.value}`
                        })};
                    fetch(postcommentsrvr,commentInfo).then(res =>{
                        if(res.status === 200){
                            alert('Comment submitted');
                            while (ul_comment.firstChild) {
                                ul_comment.removeChild(ul_comment.firstChild);
                            }
                            div_modalComment.style.display = 'block';
                            const postsrvr = apiUrl + '/post/?id=' + post.id;
                            fetch(postsrvr,auToken_GET).then(res =>res.json())
                                .then(post =>{
                                        for(let i = 0 ; i < post.comments.length; i++){
                                            const li_comment = document.createElement('li');
                                            li_comment.style.padding = '6px';
                                            const user = document.createElement('span');
                                            const comment = document.createElement('span');
                                            user.setAttribute('style','border: none;' +
                                                'color: #FF851B;' +
                                                'font-size: 16px;' +
                                                'cursor: pointer;' +
                                                'display: inline-block;');
                                            li_comment.textContent =  ' ' ;
                                            user.textContent = post.comments[i].author;
                                            li_comment.appendChild(user);
                                            comment.textContent = ' : ' + post.comments[i].comment;
                                            li_comment.appendChild(comment);
                                            ul_comment.appendChild(li_comment);
                                        }
                                })
                        }else{
                            alert('Comment failed');
                        }
                    })
                })
            }

        });
}