

var mydropdown = document.getElementById("dropdown");
var myYeardropdown = document.getElementById("years-dropdown");
var datLightSavingStatus = document.getElementById("DLS");
var specialDaywish = document.getElementById("hey-visitor");
var myGraphdropdown = document.getElementById("Graph-dropdown");

var TotalHolidaysYear = document.getElementById("TotalHolidays");
var Fyear= document.getElementById("footerYear");
const canVass = document.getElementById('canVas');
const LondonBadge= document.getElementById("london-badge");

canVass.hidden = true;



window.addEventListener("offline", () =>{
   
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      timerProgressBar:'my-offline-bar',
    },
    padding: '0.4em',
    timerProgressBar: true,
    timerProgressBarColor:'red',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: 'Internet connection dropped off!'
  })
});






window.addEventListener("online",  () =>{

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    timerProgressBar:'my-online-bar',
  },
  padding: '0.4em',
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Internet connection secured!'
})

});



async function checkHolidayFor(){
  
  var value = mydropdown.options[mydropdown.selectedIndex].value;
  var yearValue = myYeardropdown.options[myYeardropdown.selectedIndex].value;
  var mytableStatus =document.getElementById("tableStatus");
  var text = mydropdown.options[mydropdown.selectedIndex].text;
  var Graphvalue =myGraphdropdown.options[myGraphdropdown.selectedIndex].value;




  if( value == "select" || yearValue =="year"){


    Swal.fire({
      title: 'Please make sure you selected region and year.',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  else{

    await fetch('https://www.gov.uk/bank-holidays.json').then( res=>{ res.json().then( data =>{
    

    var region = data[value];


  
     if(region.events.length > 0){
         var i = "";

 
      var filteredData = region.events.filter( function(e){
          var dt= new Date(e.date);
       
      
       
          var presentDate = new Date();
           var presentYear = presentDate.getFullYear();
           var presentMonth =presentDate.getMonth();
           var monthHoliday = dt.getMonth();
           var yearHoliday = dt.getFullYear();
           
         
        
        
  
              if(dt.getFullYear() == yearValue)
             {
              var londonDate = dt.toLocaleString("en-GB",{timeZone:"Europe/London", dateStyle:"full"});
               
              if(yearHoliday < presentYear)
              {
                i +=`<tr>`;             
                i +=`<td style="color:black  ">${londonDate}</td>`;      
                i +=`<td  style="color:blac"> ${e.title}<i style="margin-left:8px; color:	#41ae20" class="fa-regular  fa-circle-check fa-beat checkicon"></td>`;
                i +=`<td  style="color:black">${e.notes}</td></tr>`;
              

              }

              else if(yearHoliday == presentYear)
              {

                if(monthHoliday == presentMonth )
                {

                 
                  i +=`<tr>`;             
                  i +=`<td style="color:#3d4259 ; background-color:#e9fcc6">${londonDate}</td>`;      
                  i +=`<td  style="color:#3d4259 ; background-color:#e9fcc6"> ${e.title}<i style="margin-left:8px; color:orange" class="fa-solid fa-beat fa-thumbtack"></i></td>`;
                  i +=`<td  style="color:#3d4259  ;background-color:#e9fcc6">${e.notes}</td></tr>`;
                  
              
              
                  return  true;
  
                }
  
                else if(monthHoliday < presentMonth ){
                  i +=`<tr>`;             
                  i +=`<td style="color:black ">${londonDate}</td>`;      
                  i +=`<td  style="color:black "> ${e.title}<i style="margin-left:8px; color:#41ae20;" class="fa-regular fa-circle-check fa-beat checkicon"></td>`;
                  i +=`<td  style="color:black ">${e.notes}</td></tr>`;
                    
                }
  
                else if(monthHoliday > presentMonth){
                  i +=`<tr>`;             
                  i +=`<td style="color:black">${londonDate}</td>`;      
                  i +=`<td  style="color:black"> ${e.title}<i style="margin-left:8px; color:purple" class="fa-solid fa-hourglass fa-beat checkicon"></i></td>`;
                  i +=`<td  style="color:black">${e.notes}</td></tr>`;
                                
                  return  true;
  
                }


              }

              else if(yearHoliday > presentYear ){

                i +=`<tr>`;             
                i +=`<td style="color:black">${londonDate}</td>`;      
                i +=`<td  style="color:black"> ${e.title}<i style="margin-left:8px; color:purple" class="fa-solid fa-hourglass fa-beat checkicon"></i></td>`;
                i +=`<td  style="color:black">${e.notes}</td></tr>`;
                
                return  true;
              }
            
              else{

                i +="<tr>";             
                i +="<td>"+londonDate + "</td>";        
                i +="<td>"+e.title+ "</td>";
                i += "<td>"+e.notes+ "</td></tr>";
              
                return  true;
              }
                
             }  

             else if(yearValue == presentYear+3 ||yearValue == presentYear+4 || yearValue == presentYear+5 ){
              
              mytableStatus.innerHTML=`<span style="color: 	#FF7F50">It's too early to search.</span>`;
            
           

             }

             else if(monthHoliday == presentMonth){

              `"<td style="color:green">"+${londonDate}+ "</td>"`;      
              `"<td tyle="color:green">"+${e.title}+ "</td>"`;
              `"<td tyle="color:green">"+${e.notes}+ "</td></tr>"`;

             }
             else{
              mytableStatus.innerHTML = text;

             }
             
            })

    
            var fdata = region.events.filter(function(fd){
              var di= new Date(fd.date);
       
               var yHoliday = di.getFullYear();


               if(yHoliday == yearValue){
         

               var arr = [JSON.parse(JSON.stringify(fd))]
                return arr
               }

            
    
            })
      

                           
           
            TotalHolidaysYear.innerHTML =`<span id="TotalHolidays">This year-${fdata.length}</span> `;

         document.getElementById("tablebody").innerHTML =i;
     
        
          var Jan= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 0 )
           {
          
            var J = [m]
            return J;
         

           }
               
         });
         var Feb= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 1 )
           {
          
            var f = [m]
            return f;
         

           }
               
         });

         var Mar= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 2 )
           {
          
            var M = [m]
            return M;
         

           }
               
         });
         var Apr= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 3 )
           {
          
            var Ap = [m]
            return Ap;
         

           }
               
         });
         var May= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 4)
           {
          
            var M = [m]
            return M;
         

           }
               
         });

         var Jun= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 5 )
           {
          
            var JU = [m]
            return JU;
         

           }
               
         });

         var Jul= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 6 )
           {
          
            var JUL = [m]
            return JUL;
         

           }
               
         });

         var Aug= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 7 )
           {
          
            var Au = [m]
            return Au;
         

           }
               
         });
         var Sep= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 8 )
           {
          
            var Sep = [m]
            return Sep;
         

           }
               
         });
         var Oct= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 9 )
           {
          
            var Oc = [m]
            return Oc;
         

           }
               
         });
         var Nov= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 10 )
           {
          
            var N = [m]
            return N;
         

           }
               
         });

         var Dec= fdata.filter( m =>{
          var apiDate = new Date(m.date)
          var hMonth = apiDate.getMonth();
          if(hMonth == 11 )
           {
          
            var D = [m]
            return D;
         

           }
               
         });


      

        
        
         if(fdata != null){

         canVass.hidden = false;
         }
       
      
         const ctx = document.getElementById('myChart').getContext("2d");

      
         
         if (Chart.getChart("myChart")){
          Chart.getChart("myChart").destroy();
        }
      
          c= new Chart(ctx, {
           type: Graphvalue,
           data: {
             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
             datasets: [{
               label: 'Number of Bank holidays per month',
               data: [Jan.length, Feb.length, Mar.length, Apr.length, May.length, Jun.length,Jul.length,Aug.length,Sep.length,Oct.length,Nov.length,Dec.length],
               borderWidth: 1,
              borderRadius:5,
             }],
        
           },
           options: {
            responsive: true,
             scales: {
              x: {
                ticks:{
                      color:'purple'
                },
                
               },
               y: {
                ticks:{
                      color:'#716661'
                },
                 beginAtZero: true
               }
               
             }
           }
         });
       
   

        
       }
     

    })
 
 })

  }
}

 function giveIntro(){

  Swal.bindClickHandler()


  Swal.mixin({
    toast: true,  
    showConfirmButton: false,
    timer: 4000,
    imageUrl: 'images/namaste.svg',
    imageWidth: 65,
    imageHeight: 65,
    imageAlt: 'Devloper',
    iconColor: 'purple',
    position:'center',
    customClass: {
      popup: 'my-intro-toast-color',
      timerProgressBar:'my-intro-bar',
      icon:'introAlert',
      position:'intro-position',
     
    },
    
    padding: '0.3em',
    timerProgressBar: true,
    position:top,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }).bindClickHandler('data-swal-toast-template')
}


  
  function wishVistor(){
  
 
    var Msg = document.getElementById("wish");
  
    var day = new Date();
    var hr = day.getUTCHours();
    console.log(hr)
   
    var ukHours ;

    if(isDayLightSaving = true){

     ukHours = hr +1;
    
    }

    else{

      ukHours = hr;
      
    }
   

    if (ukHours >= 0 && ukHours < 12) {
      Msg.value=`<i class="fa-regular fa-sun fa-beat" style="--fa-animation-duration: 0.8s;"></i> &nbsp Good Morning!`;
       Msg.style.backgroundColor= "#F5FFFA";
    }
     else if (ukHours == 12) {
      Msg.value=`<i class="fa-regular fa-sun fa-beat" style="--fa-animation-duration: 0.8s;"></i> &nbsp Good Noon!`;
       Msg.style.backgroundColor= "#FFF176";
    }
     else if (ukHours > 12 && ukHours < 17) {
        Msg.value=`<i class="fa-solid fa-sun fa-beat" style="--fa-animation-duration: 0.8s;"></i> &nbsp Good Afternoon!`;
        Msg.style.backgroundColor= "#ffffb5";
        
    }
    else if(ukHours >= 17 && ukHours < 20){
   
      Msg.value=`<i class="fa-regular fa-moon fa-beat" style="--fa-animation-duration: 0.8s;"></i> &nbsp Good Evening!`;
      Msg.style.color="";
      Msg.style.backgroundColor= "#E0F7FA";
     }
    else{
      Msg.value=`<i class="fa-solid fa-moon fa-beat" style="--fa-animation-duration: 0.8s;"></i> &nbsp  It's too late. Have a nice sleep.`;
      Msg.style.backgroundColor="#020632";
      Msg.style.color= "White";
    }
  
     document.getElementById("wish").innerHTML = Msg.value;

     
    
     todayDate() ;
     showUKTime();
     scrollFunction();
}

function todayDate() 
{
  
  var presentDate = new Date();

  var y= presentDate.getUTCFullYear();
  var londonDate = presentDate.toLocaleString("en-GB",{timeZone:"Europe/London", dateStyle:"full"}); 
  document.getElementById("Date").innerHTML = `${londonDate}`;
  Fyear.innerHTML= y;


}



function showUKTime() {

    


  var presentDate = new Date();
  var month= presentDate.getMonth();
  var d = presentDate.getDate();
  var year = presentDate.getFullYear();
 
  let h = presentDate.getUTCHours();
  var ukHours ;
 
  if(isDayLightSaving= true){
    ukHours = h+1;
  }
  else{
    ukHours = h;
  }  
  let m = presentDate.getUTCMinutes();
  let s = presentDate.getUTCSeconds();
  var am_pm = ukHours  >= 12 ? "PM" : "AM";
  m = checkTime(m);
  s = checkTime(s);
  setTimeout(showUKTime, 1000);   

  var isDayLightSaving = true;

  if( (year =="2022" && ((month == 9 && d >= 30) || month ==10 ||month==11) )){

    isDayLightSaving = true;

  }

  if( (year =="2023" && ((month == 9 && d >=29)  || month ==10 ||month==11 || month == 0 || month==1 ||(month==2 && d <=25)) )){

    isDayLightSaving = false;
  }

  if( (year =="2024" && ((month == 9 && d >=27)  || month ==10 ||month==11 || month == 0 || month==1 ||(month==2 && d <=30)) )){

    isDayLightSaving = false;
  }
  
  if( (year =="2025" && ((month == 9 && d >=26)  || month ==10 ||month==11 || month == 0 || month==1 ||(month==2 && d <=29)) )){

    isDayLightSaving = false;
  }


  if(isDayLightSaving == true){

   ukHours = h+1;
   datLightSavingStatus.innerHTML ="Day Light Saving started"
  }
  else{
    ukHours = h;
    datLightSavingStatus.innerHTML =`<span style="color:orange">Day Light Saving Ended<span>`
    LondonBadge.style.backgroundColor= "#fbfdca"

  }

 
  if(ukHours > 12)
  {
    document.getElementById("time").innerHTML  = ukHours -12 + ":" + m  +" "+ am_pm;


  }


  else if( ukHours == 0){

    document.getElementById("time").innerHTML  = 12 + ":" + m  +" "+ am_pm;

  }
  else{
    document.getElementById("time").innerHTML  = ukHours + ":" + m  +" "+ am_pm;


  }
 



function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}


if(month == 11 && d == 25){

  specialDaywish.innerHTML =`<span><i class="fa-solid fa-tree fa-beat" style="--fa-animation-duration: 1s ; color: green"></i>&nbsp; Merry Christmas</span>`


}
else if(month == 0 && d ==1){

  specialDaywish.innerHTML =`<span><i class="fa-solid fa-star fa-shake" style="--fa-animation-duration: 3s ; color: yellow"></i>&nbsp; Happy New Year</span>`

}
else{
  specialDaywish.innerHTML =`<span><i class="fa-solid fa-hand fa-shake" style="--fa-animation-duration: 3s ; color: lightgray"></i>&nbsp;Hey Visitor </span>`


}


};


const scrollTracker =document.querySelector(".scroll-tracker");

const scrollTrackingTimeline = new ScrollTimeline({

  source: document.scrollingElement,
  ScreenOrientation:"block",
  scrollOffsets:[CSS.percent(0),CSS.percent(100)]
});




scrollTracker.animate(
  {
 transform:["scaleX(0)", "scaleX(1)"]

},
{
duration:1,
timeline:scrollTrackingTimeline

}
);



function giveinfo(){


  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
      iconColor: 'purple',
    timer: 6000,
    customClass: {
      timerProgressBar:'my-online-bar',
    },
    padding: '0.4em',
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'info',
    title: 'You can view the number of bank holidays per month by choosing the different graphs style.'
  })

}



let scrollBtn = document.getElementById("myScrollBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction()

};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}


function ScrollingTop(){
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

