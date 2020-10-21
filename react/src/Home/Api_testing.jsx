import React from "react";
import Api from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
// import $ from 'jquery';
// import { Link } from 'react-router-dom';
// import './upload.js';
class ApiTesting extends React.Component {
  constructor() {
    super();
    this.state = {
      listVod: null,
      playlist: null,
      file:null
      // fileInputElement:"fileInputElement",
      // uploadFile:"uploadFile",
    };
  }
  componentWillMount() {
    // Api.get('https://api.dacast.com/v2/vod?apikey=145046_02e325425419f474dd4a')
    Api.get("https://api.dacast.com/v2/vod", {
      params: {
        apikey: "145046_02e325425419f474dd4a"
      }
    })
      .then(response => {
        this.setState({ listVod: response.data });
        console.log("console", response.data.data);
      })
      .catch(error => {
        console.log("response", error);
      });
    Api.get("https://api.dacast.com/v2/playlist", {
      params: {
        apikey: "145046_02e325425419f474dd4a"
      }
    })
      .then(response => {
        this.setState({ playlist: response.data });
        console.log("console", response.data.data);
      })
      .catch(error => {
        console.log("response", error);
      });

      // const script = document.createElement("script");
      // script.src = "./upload.js";
      // script.async = true;
      // document.body.appendChild(script);  
 }



  
getToken=(ev)=>{
  var apikey = "145046_02e325425419f474dd4a";
  var tokenUrl = "https://api.dacast.com/v2/vod?apikey=" + apikey;
  var fileSource = 'YOUR/FILE/LOCATION';
  var callbackUrl = 'YOUR_CALLBACK_URL';
    console.log('getting token');
    var formData = new FormData();
    formData.append('source', fileSource);
    formData.append('callback_url', callbackUrl);
    formData.append('upload_type', 'ajax');
    var request = new XMLHttpRequest();
    request.open('POST', tokenUrl);
    this.setState({file:ev.target.files[0]})
    var th=this;
    request.onreadystatechange = function(ev){
      if(request.readyState === 4 ){
        console.log(request.responseText);
        th.uploadFile(request.responseText);
      } 
    }
    request.send(formData);
  }
  uploadFile=(responseText)=>{
    var uploadUrl = "https://upload.dacast.com";
    console.log('uploading file');
    var jobj = JSON.parse(responseText);
  
    var formData = new FormData();
    for(var prop in jobj){
      formData.append(prop, jobj[prop]);
    }
    formData.append('file', this.state.file);
  
    var request = new XMLHttpRequest();
    request.open('POST', uploadUrl);
    request.upload.onprogress = function(ev){
      console.log(ev.loaded / ev.total*100);
    }
    request.onreadystatechange = function(ev){
      if(request.readyState === 4){
        console.log(request.responseText);
      }
    }
    request.send(formData);
  }






  render() {
    var list_vod = this.state.listVod;
    var play_list = this.state.playlist;

    //    console.log(list_vod,"a");
    return (
      <React.Fragment>
        <div>
        <h1 className="text-center">this is total video </h1>
                <div className="row col_margin">
                   {   
                        list_vod!="undefined" && list_vod!=null ?(
                                console.log("inner",this.state.listVod),
                                list_vod.data.map((key)=>
                                <div className="col-md-4">
                                    <iframe src={key.share_code.facebook} frameborder="0" 
                                    width="100%" height="350px" scrolling="no"
                                    allowfullscreen webkitallowfullscreen mozallowfullscreen  oallowfullscreen msallowfullscreen
                                    ></iframe>
                                    </div>
                                    )
                                    ):(
                                        <div>
                                        </div>
                                    )
                   }
                </div>
        <h1 className="text-center">this is Playlist </h1>
                <div className="row col_margin">
                   {   
                        play_list!="undefined" && play_list!=null ?(
                                console.log("inner",this.state.play_list),
                                play_list.data.map((key)=>
                                <div className="col-md-4">
                                    <div>
                                    <iframe src={key.share_code.facebook} frameborder="0" 
                                    width="100%" height="350px" scrolling="no"
                                    allowfullscreen webkitallowfullscreen mozallowfullscreen  oallowfullscreen msallowfullscreen
                                    ></iframe>
                                    </div>
                                    {
                                        key.content.list.map((keys)=>
                                          <Link to={keys.id}>{keys.title}</Link>
                                        )
                                    }
                                   </div>
                                    )
                                    ):(<div></div>)
                   }
                </div>

                                        <br/>   <br/>   <br/>
        </div>
        <input
          type="file"
        //  id="fileInputElement"
          onChange={this.getToken}
        ></input>
      </React.Fragment>
    );
  }
}
export default ApiTesting;