/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */

export function search(apiUrl,token){

    /**
     * schema:
     *     create the search elements -> click search button (without empty input) -> click fold button to hide the search result .
     *                                                  |
     *                               Fetch User info (get the following user first)
     *                                                  |
     *                             Fetch the posts with ID of following user(from each Following user)
     *                                                  |
     *                                 Fetch the post info with id of post       ->   if nothing matched -> show  " found nothing syntax "
     *                                                  |
     *                           if matched ,show the post ( put into the HTML elements)
     *
     */

    ///////////// Building Blocks ////////////////

    const searchbtn  = document.getElementById('search-btn');
    const input_search  = document.getElementById('search');
    const div_search = document.getElementById('search-result');
    const ul_search  = document.createElement('ul');
    const h2_search = document.createElement('h2');
    const div_close = document.createElement('div');
    div_close.textContent ='Fold The Search Result';
    div_close.style.cursor = 'pointer';
    div_search.appendChild(div_close);
    div_close.classList.add('button','button-secondary');
    div_close.style.textAlign = 'center';
    div_search.appendChild(h2_search);
    div_search.appendChild(ul_search);
    div_close.addEventListener('click',function(){
        div_search.style.display = 'none';
    });
    ///////// End of Building Blocks //////////

    ///////////// EventListener  ////////////////

    searchbtn.addEventListener('click',function(){

        /**
         *  procedure has been shown above
         */

        while (ul_search.firstChild) {                          // clean the previous result for each search
            ul_search.removeChild(ul_search.firstChild);
        }
        const p_nomatch = document.createElement('p');
        p_nomatch.textContent = ' - No Posts Had Been Found - ';
        p_nomatch.style.textAlign = 'center';
        p_nomatch.style.display = 'inline-block';
        ul_search.appendChild(p_nomatch);
        if (input_search.value.length !== 0){                  // enable only while input isnt empty
            h2_search.textContent = 'Search for title contained ';
            h2_search.textContent += "' " + input_search.value + " ' :" ;
            div_search.style.display = 'block';
            const LogUserSrvr = apiUrl + '/user/';
            const auToken_GET ={
                "method" : 'GET',
                "headers": {
                    "Content-Type" : "application/json",
                    "Authorization": `Token ${token}`
                }
            };
            fetch(LogUserSrvr,auToken_GET).then(res=>res.json())        // get the user ingo
                .then(LogUser_json =>{
                    let following_Promise = [];
                    for (let i = 0; i < LogUser_json.following.length;i++){
                        const FollowingUserSrvr = apiUrl + '/user/?id=' + LogUser_json.following[i];
                        following_Promise.push(fetch(FollowingUserSrvr,auToken_GET).then(res=>res.json()));  // get all following user
                    }
                    Promise.all(following_Promise).then(arr=>{
                        for (let i = 0;i<arr.length;i++){
                            let posts_promise =[];
                            for(let j = 0;j<arr[i].posts.length;j++){
                                const getPostsrvr = apiUrl + '/post/?id=' + arr[i].posts[j];
                                posts_promise.push(fetch(getPostsrvr,auToken_GET).then(res=>res.json()));   //get all following user's posts
                            }
                            Promise.all(posts_promise).then(postjson =>{
                                for(let i = 0; i < postjson.length;i++){
                                    let re = new RegExp(input_search.value, 'gi');               // match the input keyword
                                    const result = postjson[i].title.match(re);
                                    if (result != null){
                                        p_nomatch.style.display = 'none';                               //  this should be shown if nothing found
                                        const li_search = document.createElement('li');
                                        const h4_post_title = document.createElement('h4');
                                        h4_post_title.textContent = postjson[i].title;
                                        li_search.append(h4_post_title);
                                        const p_post = document.createElement('p');
                                        p_post.textContent = postjson[i].text;
                                        li_search.append(p_post);
                                        ul_search.append(li_search);
                                    }
                                }
                            })
                        }
                        }
                    )
                })
        }
    })
}