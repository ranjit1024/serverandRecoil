
import "./App.css";
import { RecoilRoot, useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { notifications, sumSelector } from "./state/atom/atom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


function App() {
  return <RecoilRoot>
    <Topbar>
    </Topbar>
    <Todo></Todo>
    <Error></Error>
  </RecoilRoot>
}

function Topbar(){

  const [userNotification, setUserNotificaion] = useRecoilState(notifications);
  const sum = useRecoilValue(sumSelector);

  
  console.log(userNotification)
   
  return <>
      <div className="topbar">
        <button>Home</button>
        <button>My Network ({userNotification.network > 100 ? "99+" :userNotification.network})</button>
        <button>Jobs ({userNotification.jobs})</button>
        <button>Message ({userNotification.message})</button>
        <button>Notifications ({userNotification.notification})</button>
        <button> <div className="sum">{sum}</div>Me</button>
      </div>
    </>
  
}

function Todo(){
  const idRef = useRef(null)
  const [show, setShow] = useState(true);

  return <div className="todo">
    <input type="number" ref={idRef} placeholder="Enter a Id" />

    <button onClick={ (e) => {
      const id = idRef.current.value;
      const res = axios.get(`http://192.168.2.6:3000/todo?id=${id}`).
      then(data => {
        const response = data.data;
        response.forEach(data => {
          document.querySelector(".error").innerHTML = `<p>${JSON.stringify(data)}</p>`
        })
      })
      .catch(error => {document.querySelector(".error").innerHTML = `<p class="errormsg">Id is invalid</p>`});

    }}> Submit</button>
  </div>
}
function Error(){
  return <div className="error">

  </div>
}
export default App;
