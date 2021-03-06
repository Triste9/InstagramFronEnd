var yo = require('yo-yo');
var layout = require('../layout');
var pictures =require('../picture-card');
var translate = require('../translate');
var request = require('superagent');
module.exports =function(picture) {

	var el= yo`
<div class="container timeline">
            <div id="modalCamara" class="modal center-align ">
                <div class="modal-content">
                    <div class="modal-picture" id="camara-input"></div>
                    <div class="modal-picture" id="picture-preview"></div>
                </div>
                <div class="modal-footer">  
                    <button class="waves-effect waves-light black btn" id="shoot"> <i class="fa fa-camera"></i></button>  
                    <button class="waves-effect waves-light cyan btn hide" id="uploadButton"> <i class="fa fa-cloud-upload"></i></button>  
                    <button class="waves-effect waves-light red btn hide" id="cancelPictures"> <i class="fa fa-times"></i></button>  
                </div>
            </div>
		<div class="row">
      <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
        <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit=${onsubmit}>
          <a class="waves-effect waves-light btn modal-trigger" href="#modalCamara">
                <i class="fa fa-camera"></i>
            </a>

          
            <div id="fileName" class="fileUpload btn btn-flat black">
            <span><i class="fa fa-cloud-upload" aria-hidden="true"></i> ${translate.message('upload-picture')}</span>
            <input name="picture" id="file" type="file" class="upload" onchange=${onchange} />
          </div>
          <button id="btnUpload" type="submit" class="btn btn-flat black hide">${translate.message('upload')}</button>
          <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick=${cancel}><i class="fa fa-times" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>

<div class="row" id="picture-card">
    ${picture.map(function(pic){
      	return yo`<div class="col s12 m6 l4">${pictures(pic)}</div>`;
      })}
 </div>
</div>`;
function toggleButtons() {
    document.getElementById('fileName').classList.toggle('hide');
    document.getElementById('btnUpload').classList.toggle('hide');
    document.getElementById('btnCancel').classList.toggle('hide');
  }

  function cancel() {
    toggleButtons();
    document.getElementById('formUpload').reset();
  }

  function onchange() {
    toggleButtons();
  }

  function onsubmit(ev) {
    ev.preventDefault();

    var data = new FormData(this);
    request
      .post('/api/pictures')
      .send(data)
      .end(function (err, res) {
        console.log(res);
      })
  }

  return layout(el);
}
