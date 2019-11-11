/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */
export function feed(apiUrl){

    /**
     *  generate the public post
     *  for Public feed ,   upvote and comment -related function are disabled ( without login key)
     *
     * schema:
     *   Fetch from Backend -> create elements with these values -> put them in the page.
     *
     */

    fetch(`${apiUrl}/post/public`)                          //   Fetch Public feeds
        .then(respone => respone.json())
        .then(json => {

            ///////////////////  Building Blocks ////////////////////

            const ul_feed = document.getElementById('feed');
            const get_sorted_list = ({meta}) => Number(meta.published);
            const sorted_number = json.posts.map(get_sorted_list);                  // sort the list in reverse chronological order (just in case)
            sorted_number.sort(function(a, b){return b-a});
            for(const item of sorted_number){
                const get_post = ({meta}) => Number(meta.published) === item;
                const post = json.posts.filter(get_post)[0];
                const li = document.createElement('li');
                li.setAttribute('data-id-post','');
                li.classList.add('post');
                const div_vote = document.createElement('div');
                div_vote.classList.add('vote');
                div_vote.style.textAlign = 'center';
                div_vote.setAttribute('data-id-upvotes','');
                div_vote.textContent = post.meta.upvotes.length;
                li.appendChild(div_vote);
                const div_content = document.createElement('div');
                div_content.classList.add('content');
                const h4_dataIdTitle = document.createElement('h4');
                h4_dataIdTitle.classList.add('post-title','alt-text');
                h4_dataIdTitle.setAttribute('data-id-title','');
                h4_dataIdTitle.textContent = post.title;
                div_content.appendChild(h4_dataIdTitle);
                const p_postAuthor = document.createElement('p');
                p_postAuthor.classList.add('post-author');
                p_postAuthor.setAttribute('data-id-author','');
                p_postAuthor.textContent = 'Posted by ' + post.meta.author;
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
                p_nOfComment.textContent = post.comments.length + ' comments'
                div_content.appendChild(p_nOfComment);
                li.appendChild(div_content);
                ul_feed.appendChild(li);
            }
        });
}
