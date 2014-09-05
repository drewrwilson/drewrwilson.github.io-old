/*

requires jquery, will probably require handlebars at some point

pseudo code of this script:

* DONE - #1) load data from json
* #2) optional: templating language?
* #3) make responsive grid with appropriate clearfixes
* #4) display to frontend
* DONE - #5) set triggers of mouseover on images and replace with
      animated gifs and switch back on mouseout.

*/

//Load project data from json file:
function loadProjectData (projectDataSource) {
  console.log(projectDataSource);
  $.getJSON(projectDataSource, function(data) {
          console.log('Starting json call');
          // console.log('Data: ' + JSON.stringify(data));
      })
          .success(function(data) {
            console.log('Successfully loaded data from ' + projectDataSource);

            //set triggers for mouseover effects
            setHoverEffects(data);
          }) //end success
          .fail(function() {
              console.log('Failed to load data from ' + projectDataSource);
          }); //end fail

} //end loadProjectData

//mouse over and mouse out effects:
function setHoverEffects (content) {
  //loop through json object of projects and associate hover triggers for each project
  $.each(content.projects, function(index, project){
    //if there is a previewGif set, then set a hover effect using it
    if (project.previewGif && project.previewGif != "" && project.slug && project.slug != "") {
      $("#" + project.slug).hover(
          function() {
            $(this).attr("src", content.imgDirectory + project.previewGif);
          },
          function() {
            $(this).attr("src", content.imgDirectory + project.previewImg);
          }
      ); //end jquery hover triggers
    } //end if
    else {
      console.log('This project did not have a hover gif: ' + project.title);
    }
  }); //end each
}// end function


function main () {
  //this is the file where the projects data is stored:
  var projectDataSource = "projects.json";

  loadProjectData(projectDataSource);
}

$(document).ready( main() );
