export default {
    validateEmail: (email) => {  
      return fetch("http://127.0.0.1/api/validate/email", {
        method: "post",
        body: JSON.stringify({email:email}),
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.json())
      .then((data) => data);
  
   
  }

}
  