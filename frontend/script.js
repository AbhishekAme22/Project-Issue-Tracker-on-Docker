document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-form');
    //const tableBody = document.querySelector('#issue-table tbody');
    const tableBody = document.getElementsByClassName('project-boxes');
    const apiUrl = 'http://localhost:8080';
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const projectName = document.getElementById('projectName').value;
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const priority = parseInt(document.getElementById('priority').value);
  
      const newIssue = {
        projectName,
        title,
        description,
        priority,
      };
  
      try {
        const response = await fetch(`${apiUrl}/api/issue`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newIssue),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          displayIssue(responseData);
          form.reset();
        }
      } catch (error) {
        console.error('Error creating issue:', error);
      }
    });
  
    async function fetchIssues() {
      try {
        const response = await fetch(`${apiUrl}/api/issue`);
        const data = await response.json();
        data.forEach(displayIssue);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    }
  
    function displayIssue(issue) {
      const row = document.createElement('tr');
      const data_to_view= document.getElementById("toview");
      data_to_view.innerHTML += `
      <div id="${issue.id}" class="project-box-wrapper">
      <div class="project-box" style="background-color: #d5deff;">
        <div class="project-box-header">
          <span><b> ${issue.projectName}</b></span>
          <div class="more-wrapper">
            <button class="project-btn-more">
            ${issue.id}
            </button>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header">${issue.title}</p>
          <p class="box-content-subheader">${issue.description}</p>
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header">Priority</p>
          <div class="box-progress-bar">
            <span class="box-progress" style="width: ${issue.priority*10}%;background-color: #4067f9"></span>
            
          </div>
          <p class="box-progress-percentage">${issue.priority*10}</script>%</p>
        </div>
        <div class="project-box-footer">
          <div class="participants">
             
          <div class="days-left" style="color: #4067f9;">
          <span class="edit-btn" data-id="${issue.id}">Edit</span>
      </div>
          </div>
          <div class="days-left" style="color: #4067f9;">
          <span class="delete-btn" data-id="${issue.id}">Delete</span>
          </div>
        </div>
      </div>
    </div>
        
        
      `;
  
     // tableBody.appendChild(row);
  
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', async () => {
          const shouldDelete = confirm('Are you sure you want to delete this issue?');
          if (shouldDelete) {
            const issueId = button.getAttribute('data-id');
            try {
              const response = await fetch(`${apiUrl}/api/issue/${issueId}`, {
                method: 'DELETE',
              });
  
              if (response.ok) {
                var deleteElement = document.getElementById(`${issueId}`);
                deleteElement.remove();
              }
            } catch (error) {
              console.error('Error deleting issue:', error);
            }
          }
        });
      });



      const editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const issueId = button.getAttribute('data-id');
            var data;
            try {
                const response = await fetch(`${apiUrl}/api/issue/${issueId}`);
                 data = await response.json();
                //console.log(data.description);
                 
                
              } catch (error) {
                console.error('Error fetching issues:', error);
              }
            console.log(issueId);
          document.getElementById("edit_content").innerHTML=`
          <div class="projects-section-header">
          <p>Edit Issue</p>
        </div>
        <div class="messages">
            <div class="container">
                
                <form id="edit-form">
                  <div class="user__details">
                    <div class="input__box fifty">
                      <span class="details">Edit Project Name </span>
                      <input type="text" id="editprojectName" value="${data.projectName}" required>
                    </div>
                    <div class="input__box fifty">
                      <span class="details">Priority</span>
                      <input type="number" id="editpriority" value="${data.priority}" required>
                    </div>
                    <div class="input__box">
                      <span class="details">Title </span>
                      <input type="text-area"  id="edittitle" value="${data.title}" required>
                    </div>
                    <div class="input__box">
                      <span class="details">Description</span>
                      <textarea  type="text" id="editdescription"  value="${data.description}" required>${data.description}</textarea>
                    </div>
                   
              
                  </div>
                    
                    
                  <div class="button">
                    <input type="submit" value="Edit Issue">
                  </div>
                </form>
              </div>
        </div>
          `;
          
          $(".custom-model-main").addClass('model-open');

          $(".close-btn, .bg-overlay").click(function(){
            $(".custom-model-main").removeClass('model-open');
          });

          const form = document.getElementById('edit-form');
          form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const projectName = document.getElementById('editprojectName').value;
            const title = document.getElementById('edittitle').value;
            const description = document.getElementById('editdescription').value;
            const priority = parseInt(document.getElementById('editpriority').value);
        
            const newIssue2 = {
              projectName,
              title,
              description,
              priority,
            };
        
            try {
              const response = await fetch(`${apiUrl}/api/issue/${issueId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newIssue2),
              });
        
              if (response.ok) {
                const responseData = await response.json();
                console.log("ok")
                form.reset();
                $(".custom-model-main").removeClass('model-open');

              }
            } catch (error) {
              console.error('Error creating issue:', error);
            }
          });
          
        });
      });
    }
  
    fetchIssues();
  });
  
  
  

  document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    });
    
    var listView = document.querySelector('.list-view');
    var gridView = document.querySelector('.grid-view');
    var projectsList = document.querySelector('.project-boxes');
    
    listView.addEventListener('click', function () {
      gridView.classList.remove('active');
      listView.classList.add('active');
      projectsList.classList.remove('jsGridView');
      projectsList.classList.add('jsListView');
    });
    
    gridView.addEventListener('click', function () {
      gridView.classList.add('active');
      listView.classList.remove('active');
      projectsList.classList.remove('jsListView');
      projectsList.classList.add('jsGridView');
    });
    
    document.querySelector('.messages-btn').addEventListener('click', function () {
      document.querySelector('.messages-section').classList.add('show');
    });
    
    document.querySelector('.messages-close').addEventListener('click', function() {
      document.querySelector('.messages-section').classList.remove('show');
    });
  });