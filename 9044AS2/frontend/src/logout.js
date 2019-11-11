/**
 * Written by z5219960@unsw.edu.au   Heng-Chuan Lin
 *
 * Updated 11/08/2019
 */

export function logout(){
    /**
     * logout function
     * my understanding is clearing the localStorage then refresh
     */
    const logoutbtn = document.getElementById('logout-btn');
    logoutbtn.addEventListener('click',function () {
        /**
         * click -> clear localstorage (i.e. the auth token would be removed -> refresh the page
         *  would get the public feed and visitor interface
         */
        localStorage.clear();
        document.location.reload();
    })
}