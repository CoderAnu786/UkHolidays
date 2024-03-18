if('serviceWorker' in navigator){

    navigator.serviceWorker.register('/serviceWorker.js')
    .then((reg)=>{

        console.log("serviceWorker registered!", reg)
    }).catch((error)=>{
        console.log("serviceWorker is not registered." , error)
    });
}