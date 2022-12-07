import logo from './logo.svg';
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import FormData from 'form-data';
import Resizer from "react-image-file-resizer";


import './App.css';
import AppBar from './Components/AppBar'
import GridLayout from './Components/GridLayout'



function App() {
  const [apiData, setApiData] = useState(null) 
  const [result, setResult] = useState(null)
  const [image, setImage] = useState(null)

  const getData = async () =>{
    var formdata = new FormData();
formdata.append("data", image.data);

  var requestOptions = {
    method: 'POST',
    body: image.data,
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  fetch("https://detect.roboflow.com/brand_detection-iygmy/2?api_key=R0lG8fEacsGCuS8WAOHB&confidence=70&overlap=30&format=image&labels=on&stroke=2", requestOptions)
    .then(response => response.blob())
    .then((myBlob) =>{
      const objectURL = URL.createObjectURL(myBlob);
      setApiData(objectURL)
    })
    .catch(error => console.log('error', error));

    fetch("https://detect.roboflow.com/brand_detection-iygmy/2?api_key=R0lG8fEacsGCuS8WAOHB&confidence=70&overlap=30&format=json&labels=on&stroke=2", requestOptions)
    .then(response => response.text())
    .then((result) =>{
      setResult(JSON.parse(result))
    })
    .catch(error => console.log('error', error));

  }



  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 2500, 2500, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    }, 'base64' );
  });

  function _imageEncode (arrayBuffer) {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
    let mimetype="image/jpeg"
    return "data:"+mimetype+";base64,"+b64encoded
}

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const base64 =  await resizeFile(file);
  
    setImage({ data: base64 });
  };

  const handleSubmit = (e) =>{
    getData()
  }

  function submitFileButton () {
    return ( 
    <div class="container">
      <div class="button-wrap">
        <label class="button" for="upload">Upload File</label>
        <input
        id="upload"
          type="file"
          label="Image"
          name="myFile"
          accept="*"
          onChange={(e) => handleFileUpload(e)}
        />
  </div>
  </div>)
  }

  function submitButton () {
    return (<button onClick={handleSubmit}>Submit</button>)
  }


  return (
    <div className="App">
      <AppBar/>
      <GridLayout submitButton={submitButton} uploadFileButton={submitFileButton} apiData={apiData} result={result}/>    
    </div>
  );
}

export default App;
