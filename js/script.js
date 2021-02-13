let userList = [];
let currentPage = 1;
let itemInPage = 5;
var order = false;
document.getElementById("titles").innerHTML = 
`
<div id="title-id" onclick="showUsers(pageNo = ${currentPage},elementId='title-id',entity='id')">User ID</div>
<div id="title-name" onclick="showUsers(pageNo = ${currentPage},elementId='title-name',entity='name')">Name</div>
<div id="title-username" onclick="showUsers(pageNo = ${currentPage},elementId='title-username',entity='username')">User Name</div>
<div id="title-email" onclick="showUsers(pageNo = ${currentPage},elementId='title-email',entity='email')">Email</div>
<div id="title-address" onclick="showUsers(pageNo = ${currentPage},elementId='title-address',entity='address')">Address</div>
<div >Action</div>
`


showUsers();
// fetch data 

function showUsers(pageNo = 1,elementId="title-id",entity="id") {

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.send();
  let row = "";
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      usersList = JSON.parse(this.responseText);
      var pagination_content = `
                                <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-primary rounded-0" onclick="prevPage()">prev</a>
                                `;
      let paginationN = Math.ceil(usersList.length / itemInPage);
      for (let index = 1; index <= paginationN; index++) {
        pagination_content +=   `
                                <a href="#" class="btn btn-primary rounded-0" onclick="goPage(${index})">${index}</a>
                                `;
      }
      pagination_content +=     `
                                <a href="#" class="btn btn-primary rounded-0" onclick="nextPage()">next</a>
                                `;
      document.getElementById("pagination").innerHTML = pagination_content;
      const userInPage = usersList.slice(
        (pageNo - 1) * itemInPage,
        pageNo * itemInPage
      );
      sortby(userInPage,elementId, entity)

      document.getElementById("loading-container").classList.add("d-none");

      userInPage.forEach((element) => {
        row +=                 `<div class="row d-flex record" id="userNO-${element.id}">
                               <div>${element.id}</div>
                               <div>${element.name}</div>
                               <div>${element.username}</div>
                               <div>${element.email}</div>
                               <div>${element.address.city + " " + element.address.street}</div>
                               <div class="text-white  action">
                               <div class="action-list"     id="action-list" >   
                               <a class="btn btn-primary rounded-0"   href="#"   onclick="deleteUser(${
                                 element.id
                               })" >Delete &#9932;</a>
                               <a class="btn btn-primary rounded-0"   href="#"   onclick="showposts(${
                                 element.id
                               })">Posts</a>
                               <a class="btn btn-primary rounded-0"   href="#"   onclick="showcomments(${
                                 element.id
                               })">Comments</a>
                               <a class="btn btn-primary rounded-0"   href="#"   onclick="showphotos(${
                                 element.id
                               })">Photos</a>
                               </div>
                               </div>
            
                               </div>
                               `;

        document.getElementById("list-of-users").innerHTML = row;
      });
    }
  };
}

// sort data on click 
function sortby(list_of_users,elementid, entity) {

  let row = "";



      let title_element = document.getElementById(`${elementid}`);

      list_of_users.sort(function (a, b) {
          if (a[entity] < b[entity]) return -1;
          if (a[entity] > b[entity]) return 1;
          return 0;
        });
      
      document.getElementById("loading-container").classList.add("d-none");

      list_of_users.forEach((element) => {
       row+=                  `
                              <div class="row d-flex record" id="userNO-${element.id}">
                              <div>${element.id}</div>
                              <div>${element.name}</div>
                              <div>${element.username}</div>
                              <div>${element.email}</div>
                              <div>${element.address.city + " " + element.address.street}</div>
                              <div class="text-white  action">

                                  <div class="action-list"     id="action-list" >   
                                  <a class="btn btn-primary rounded-0"   href="#"   onclick="deleteUser(${
                                    element.id
                                  })" >Delete &#9932;</a>
                                  <a class="btn btn-primary rounded-0"   href="#"   onclick="showposts(${
                                    element.id
                                  })">Posts</a>
                                  <a class="btn btn-primary rounded-0"   href="#"   onclick="showcomments(${
                                    element.id
                                  })">Comments</a>
                                  <a class="btn btn-primary rounded-0"   href="#"   onclick="showphotos(${
                                    element.id
                                  })">Photos</a>
                                  </div>
                              </div>
                                
                              </div>
                              `;

        document.getElementById("list-of-users").innerHTML = row;
      });
    

}

// actions

function deleteUser(id) {
  document.getElementById(`userNO-${id}`).remove();
}
function showposts(id) {
  let xhr_posts = new XMLHttpRequest();
  xhr_posts.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  xhr_posts.send();
  document.getElementById("loading-container").classList.remove("d-none");
  xhr_posts.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loading-container").classList.add("d-none");
      let postsList = JSON.parse(this.responseText);

      let post_header = `
                         <!-- Modal -->
                         <div class="modal fade" id="userposts-${id}" role="dialog">
                           <div class="modal-dialog">

                             <!-- Modal content-->
                             <div class="modal-content">
                               <div class="modal-header">
                                 <h1>User posts number ${id}</h1>

                                 <button type="button" class="close" data-dismiss="modal">&times;</button>

                               </div>
                               <div class="modal-body">

                         `;

      let post_footer =  `
                            </div>       
                            </div>
                            </div>
                            </div>
                          `;
      let post_contents = "";
      postsList.forEach((element) => {
        post_contents +=
                             `
                            <h2>${element.id}-${element.title}</h2>
                            <p>${element.body}</p>
                            `;
      });
      document.getElementById("modals").innerHTML =
        post_header + post_contents + post_footer;

      $(`#userposts-${id}`).modal();
    }
  };
}
function showcomments(id) {
  let xhr_posts = new XMLHttpRequest();
  xhr_posts.open(
    "GET",
    `https://jsonplaceholder.typicode.com/comments?userId=${id}`
  );
  xhr_posts.send();
  document.getElementById("loading-container").classList.remove("d-none");
  xhr_posts.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loading-container").classList.add("d-none");
      let commentsList = JSON.parse(this.responseText);

      let comment_header =
                             `
                            <!-- Modal -->
                            <div class="modal fade" id="usercomments-${id}" role="dialog">
                              <div class="modal-dialog">

                                <!-- Modal content-->
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1>User comments number ${id}</h1>

                                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                                  </div>
                                  <div class="modal-body">

                            `;

      let comment_footer =
                            `
                             </div>
                             </div>
                             </div>
                             </div>
                           `;
      let comment_contents = "";
      commentsList.forEach((element) => {
        comment_contents += 
                           `
                               <p>postId : ${element.postId}</p>
                               <p>UserEmail : ${element.email}</p>
                               <p>Comment:</p>
                               <p>${element.body}</p>
                               <hr/>
                           `;
      });
      document.getElementById("modals").innerHTML =
        comment_header + comment_contents + comment_footer;

      $(`#usercomments-${id}`).modal();
    }
  };
}
function showphotos(id) {
  let xhr_photos = new XMLHttpRequest();
  xhr_photos.open(
    "GET",
    `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
  );
  xhr_photos.send();
  document.getElementById("loading-container").classList.remove("d-none");
  xhr_photos.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loading-container").classList.add("d-none");
      let photosList = JSON.parse(this.responseText);

      let photos_header = 
                            `
                            <!-- Modal -->
                            <div class="modal fade" id="userphotos-${id}" role="dialog">
                              <div class="modal-dialog">
                              
                                <!-- Modal content-->
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1>User photos number ${id}</h1>
                                    
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    
                                  </div>
                                  <div class="modal-body">
                          
                            `;

      let photos_footer = 
                            `
                              </div>

                              </div>

                              </div>
                              </div>
                            `;
      let photos_contents = "";
      photosList.forEach((element) => {
        photos_contents += 
                            `
                                <p>Id : ${element.id}</p>
                                <p>title : ${element.title}</p>
                                <p>image:</p>
                                <img src="${element.url}"/>
                                <hr/>
                            `;
      });
      document.getElementById("modals").innerHTML =
        photos_header + photos_contents + photos_footer;

      $(`#userphotos-${id}`).modal();
    }
  };
}

// controll pagination
function nextPage() {
  currentPage++;
  showUsers(currentPage);
  document.getElementById("titles").innerHTML = 
                                `
                                <div id="title-id" onclick="showUsers(pageNo = ${currentPage},elementId='title-id',entity='id')">User ID</div>
                                <div id="title-name" onclick="showUsers(pageNo = ${currentPage},elementId='title-name',entity='name')">Name</div>
                                <div id="title-username" onclick="showUsers(pageNo = ${currentPage},elementId='title-username',entity='username')">User Name</div>
                                <div id="title-email" onclick="showUsers(pageNo = ${currentPage},elementId='title-email',entity='email')">Email</div>
                                <div id="title-address" onclick="showUsers(pageNo = ${currentPage},elementId='title-address',entity='address')">Address</div>
                                <div >Action</div>
                                `
};
function prevPage() {
  currentPage--;
  showUsers(currentPage);
  document.getElementById("titles").innerHTML = 
                                `
                                <div id="title-id" onclick="showUsers(pageNo = ${currentPage},elementId='title-id',entity='id')">User ID</div>
                                <div id="title-name" onclick="showUsers(pageNo = ${currentPage},elementId='title-name',entity='name')">Name</div>
                                <div id="title-username" onclick="showUsers(pageNo = ${currentPage},elementId='title-username',entity='username')">User Name</div>
                                <div id="title-email" onclick="showUsers(pageNo = ${currentPage},elementId='title-email',entity='email')">Email</div>
                                <div id="title-address" onclick="showUsers(pageNo = ${currentPage},elementId='title-address',entity='address')">Address</div>
                                <div >Action</div>
                                `
};
function goPage(pageNo) {
  showUsers(pageNo);
  document.getElementById("titles").innerHTML = 
                                `
                                <div id="title-id" onclick="showUsers(pageNo = ${pageNo},elementId='title-id',entity='id')">User ID</div>
                                <div id="title-name" onclick="showUsers(pageNo = ${pageNo},elementId='title-name',entity='name')">Name</div>
                                <div id="title-username" onclick="showUsers(pageNo = ${pageNo},elementId='title-username',entity='username')">User Name</div>
                                <div id="title-email" onclick="showUsers(pageNo = ${pageNo},elementId='title-email',entity='email')">Email</div>
                                <div id="title-address" onclick="showUsers(pageNo = ${pageNo},elementId='title-address',entity='address')">Address</div>
                                <div >Action</div>
                                `
};


// events for 

document.getElementById("show-menu").addEventListener("click",function () {
  
  document.getElementById("menu").style.width = "100%"
  if(document.getElementById("menu-links").style.display === ""){
    console.log("ente")
    document.getElementById("menu-links").style.display = "flex";
  }else{
    document.getElementById("menu-links").style.display = "";
  }

})


document.getElementById("hamburger-menu").addEventListener("click",function(){
  document.getElementById("menu").style.width = "0";
  if(document.getElementById("menu-links").style.display === "flex"){
    console.log("ente")
    document.getElementById("menu-links").style.display = "";
  }
})