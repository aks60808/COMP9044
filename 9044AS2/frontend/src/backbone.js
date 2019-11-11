/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */

export function backbone() {
    /**
     *   Generate the backbone of the website
     *
     *
     */

    /////////////////    Building Blocks    //////////////////
    const div_root = document.getElementById('root');
    const header = document.createElement('header');
    header.classList.add('banner');
    header.setAttribute('id','nav');
    div_root.appendChild(header);
    const h1_logo = document.createElement('h1');
    h1_logo.style.cursor ='pointer';
    h1_logo.classList.add('flex-center');
    h1_logo.textContent = 'Seddit';
    h1_logo.setAttribute('id','logo');
    header.appendChild(h1_logo);
    const ul_nav = document.createElement('ul');
    ul_nav.classList.add('nav');
    header.appendChild(ul_nav);
    const li_search = document.createElement('li');
    li_search.classList.add('nav-item');
    ul_nav.appendChild(li_search);
    const input_search = document.createElement('input');
    input_search.setAttribute('id','search');
    input_search.setAttribute('data-id-search','');
    input_search.setAttribute('placeholder','Search Seddit');
    input_search.setAttribute('type','search');
    li_search.appendChild(input_search);
    input_search.style.display = 'none';
    const li_searchbtn = document.createElement('li');
    li_searchbtn.classList.add('nav-item');
    ul_nav.appendChild(li_searchbtn);
    const btn_search = document.createElement('button');
    btn_search.style.display = 'none';
    btn_search.setAttribute('id','search-btn');
    btn_search.classList.add('button','button-primary');
    btn_search.textContent = 'SEARCH';
    li_searchbtn.appendChild(btn_search);
    const li_mypage = document.createElement('li');
    li_mypage.classList.add('nav-item');
    ul_nav.appendChild(li_mypage);
    const btn_mypage = document.createElement('button');
    btn_mypage.setAttribute('id','mypage-btn');
    btn_mypage.style.display = 'none';
    btn_mypage.classList.add('button','button-primary');
    btn_mypage.textContent = 'MY PAGE';
    li_mypage.appendChild(btn_mypage);
    const li_profile = document.createElement('li');
    li_profile.classList.add('nav-item');
    ul_nav.appendChild(li_profile);
    const btn_profile = document.createElement('button');
    btn_profile.setAttribute('id','profile-btn');
    btn_profile.style.display = 'none';
    btn_profile.classList.add('button','button-primary');
    btn_profile.textContent = 'Profile_Info';
    li_profile.appendChild(btn_profile);
    const li_Updateprofile = document.createElement('li');
    li_Updateprofile.classList.add('nav-item');
    ul_nav.appendChild(li_Updateprofile);
    const btn_Updateprofile = document.createElement('button');
    btn_Updateprofile.setAttribute('id','update-profile-btn');
    btn_Updateprofile.style.display = 'none';
    btn_Updateprofile.classList.add('button','button-primary');
    btn_Updateprofile.textContent = 'Profile_Update';
    li_Updateprofile.appendChild(btn_Updateprofile);
    const li_login = document.createElement('li');
    li_login.classList.add('nav-item');
    ul_nav.appendChild(li_login);
    const btn_login = document.createElement('button');
    btn_login.setAttribute('data-id-login','');
    btn_login.classList.add('button','button-primary');
    btn_login.textContent = 'Log In';
    li_login.appendChild(btn_login);
    const li_signup = document.createElement('li');
    li_signup.classList.add('nav-item');
    ul_nav.appendChild(li_signup);
    const btn_signup = document.createElement('button');
    btn_signup.setAttribute('data-id-signup','');
    btn_signup.classList.add('button','button-secondary');
    btn_signup.textContent = 'Sign Up';
    li_signup.appendChild(btn_signup);
    const li_logout = document.createElement('li');
    li_logout.classList.add('nav-item');
    ul_nav.appendChild(li_logout);
    const btn_logout = document.createElement('button');
    btn_logout.style.display = 'none';
    btn_logout.setAttribute('id','logout-btn');
    btn_logout.classList.add('button','button-secondary');
    btn_logout.textContent = 'Log Out';
    li_logout.appendChild(btn_logout);
    const div_searchresult = document.createElement('div');
    div_searchresult.setAttribute('id','search-result');
    div_searchresult.style.display = 'none';
    div_root.appendChild(div_searchresult);
    const div_post = document.createElement('div');
    div_post.style.textAlign = 'center';
    div_post.setAttribute('id','div-post');
    div_root.appendChild(div_post);
    const div_postContent = document.createElement('div');
    div_postContent.setAttribute('id','div-post-content');
    div_post.appendChild(div_postContent);
    const h3_post = document.createElement('h3');
    h3_post.textContent = "Post what u like :)";
    div_postContent.appendChild(h3_post);
    const div_userpage = document.createElement('div');
    div_root.appendChild(div_userpage);
    div_userpage.style.display = 'none';
    div_userpage.setAttribute('id','div-userpage');
    const main = document.createElement('main');
    main.setAttribute('role','main');
    div_root.appendChild(main);
    const div_feedHeader = document.createElement('div');
    const h3_feedTitle = document.createElement('h3');
    const postBtn = document.createElement('button');
    const postSubmitBtn = document.createElement('button');
    const postCancelBtn = document.createElement('button');
    div_feedHeader.classList.add('feed-header');
    h3_feedTitle.classList.add('feed-title','alt-text');
    h3_feedTitle.textContent = 'Recent Post';
    postSubmitBtn.classList.add('button','button-primary');
    postSubmitBtn.textContent = 'SUBMIT';
    postSubmitBtn.style.display = 'none';
    postCancelBtn.style.display = 'none';
    postBtn.style.display = 'none';
    postCancelBtn.textContent = 'CANCEL';
    postCancelBtn.classList.add('button','button-secondary');
    postBtn.classList.add('button','button-secondary');
    postBtn.textContent = 'Post';
    postBtn.setAttribute('id','postBtn');
    postSubmitBtn.setAttribute('id','postSubmitBtn');
    postCancelBtn.setAttribute('id','postCancelBtn');
    div_feedHeader.appendChild(h3_feedTitle);
    div_feedHeader.appendChild(postSubmitBtn);
    div_feedHeader.appendChild(postCancelBtn);
    div_feedHeader.appendChild(postBtn);
    main.appendChild(div_feedHeader);
    const ul_feed = document.createElement('ul');
    ul_feed.setAttribute('id','feed');
    ul_feed.setAttribute('data-id-feed','');
    main.appendChild(ul_feed);
    const footer = document.createElement('footer');
    div_root.appendChild(footer);
    const p_footer = document.createElement('p');
    p_footer.textContent = "Powered by Z5219960@UNSW";
    footer.appendChild(p_footer);
    ///////// End of Building Blocks //////////

    /////////////////    Evenlisteners    //////////////////

    h1_logo.addEventListener('click',function(){
       div_userpage.style.display = 'none';
       main.style.display = 'inline';
    });


}