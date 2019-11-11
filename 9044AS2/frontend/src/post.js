/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */
export function post(apiUrl){

    /**
     * dynamically generate elements for Post and Post function
     *
     * schema:
     *
     *    Click Post button -> open Modal -> generate input box -> click submit button -> send to backend
     *                             |
     *                    click PostCancel button -> close Modal
     *
     */
        /////////////   Building Blocks //////////////////

    const div_post  = document.getElementById('div-post');
    const form_post = document.createElement('form');
    div_post.appendChild(form_post);
    div_post.style.display = 'none';
    const text_title = document.createTextNode('Title : ');
    form_post.appendChild(text_title);
    form_post.appendChild(document.createElement('br'));
    const input_title = document.createElement('input');
    input_title.setAttribute('type','text');
    input_title.setAttribute('value','');
    input_title.setAttribute('id','post-title');
    form_post.appendChild(input_title);
    const text_subseddit = document.createTextNode('subseddit : ');
    form_post.appendChild(document.createElement('br'));
    form_post.appendChild(text_subseddit);
    const input_subseddit = document.createElement('input');
    form_post.appendChild(document.createElement('br'));
    form_post.appendChild(input_subseddit);
    input_subseddit.setAttribute('type','text');
    input_subseddit.setAttribute('value','');
    input_subseddit.setAttribute('id','post-subseddit');
    form_post.appendChild(document.createElement('br'));
    const text_text = document.createTextNode('Text : ');
    form_post.appendChild(text_text);
    form_post.appendChild(document.createElement('br'));
    const textarea_text = document.createElement('textarea');
    form_post.appendChild(textarea_text);
    textarea_text.setAttribute('id','post-text');
    textarea_text.setAttribute('value','');
    textarea_text.setAttribute('rows','10');
    textarea_text.setAttribute('cols','50');
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
    const Postbtn = document.getElementById('postBtn');
    const PostSubmitbtn = document.getElementById('postSubmitBtn');
    const PostCancalbtn = document.getElementById('postCancelBtn');
    ///////// End of Building Blocks //////////

    /////////////   EventListeners  //////////////////

    Postbtn.addEventListener('click',function(){

        /**
         * click -> toggle button (show the post modal )
         */

        Postbtn.style.display = 'none';
        PostSubmitbtn.style.display = 'inline';
        PostCancalbtn.style.display = 'inline';
        div_post.style.display = 'inline';
    });

    PostCancalbtn.addEventListener('click',function () {

        /**
         * click -> toggle button (hide the post modal )
         */

        Postbtn.style.display = 'inline';
        PostSubmitbtn.style.display = 'none';
        PostCancalbtn.style.display = 'none';
        div_post.style.display = 'none';
    });

    PostSubmitbtn.addEventListener('click',function () {

        /**
         * click -> get the input value -> send to backend
         */

        const authToken = localStorage.getItem('authtoken');
        const title = document.getElementById('post-title');
        const text = document.getElementById('post-text');
        const subseddit = document.getElementById('post-subseddit');
        const image = document.getElementById('post-image');
        const postsrvr = apiUrl + '/post/';
        const infoToBackend ={
            "method" : "POST",
            "headers" : {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`
            },
            "body" : JSON.stringify({
                "title" : `${title.value}`,
                "text" : `${text.value}`,
                "subseddit" : `${subseddit.value}`,
                "image" : null
            })
        };
        fetch(postsrvr,infoToBackend).then(res => {
            if (res.status === 200){
                alert('post submitted');
                Postbtn.style.display = 'inline';                     //toggle the buttons
                PostSubmitbtn.style.display = 'none';
                PostCancalbtn.style.display = 'none';
                div_post.style.display = 'none';
            }else{
                alert('post failed');
            }
        })
        })
}
