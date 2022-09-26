var coursename=document.getElementById("coursename");
var coursecat=document.getElementById("coursecat");
var courseprice=document.getElementById("courseprice");
var coursedesc=document.getElementById("coursedesc");
var nameAlert=document.getElementById("nameAlert");
var currentIndex;
var addbtn=document.getElementById("click");
var data=document.getElementById("data");
if(localStorage.getItem("coursesList") == null)
{   var courses = [];   }
else {
    var courses = JSON.parse(localStorage.getItem("coursesList"));
    displayData();
}
addbtn.onclick = function(){
    if(addbtn.innerHTML=="Add Course"){
        addCourse();
    }
    else {
        updateCourse();
        addbtn.innerHTML="Add Course";
    }
    displayData();
    clear();
}
function addCourse(){
    var course = {
        name : coursename.value ,
        cat : coursecat.value ,
        price : courseprice.value ,
        desc : coursedesc.value 
    };
    courses.push(course);
    localStorage.setItem("coursesList",JSON.stringify(courses));
}
function displayData(){
    var result = '';
    for(var i = 0 ; i<courses.length; i++){
        result+= `<tr>
                 <td>${i}</td>
                 <td>${courses[i].name}</td>
                 <td>${courses[i].cat}</td>
                 <td>${courses[i].price}</td>
                 <td>${courses[i].desc}</td>
                 <td>
                    <button onclick="getCourseData(${i})" class="btn btn-outline-info">update</button>
                    <button onclick="deleteCourse(${i})" class="btn btn-outline-danger">delete</button>
                 </td>
                </tr> `;
    }
    data.innerHTML=result;
}
function clear(){
    coursename.value=" ";
    coursecat.value=" ";
    courseprice.value=" ";
    coursedesc.value=" ";
}
function deleteCourse(index){
    courses.splice(index,1);
    localStorage.setItem("coursesList",JSON.stringify(courses));   
    displayData();
}
deletebtn.onclick= function(){
    localStorage.removeItem("coursesList");
    displayData();
    courses = [];
    data.innerHTML="";
}
function search(e){
    var result = '';
    for(var i = 0 ; i<courses.length; i++){
        if(courses[i].name.toLowerCase().includes(e.toLowerCase())){
            result += `<tr>
             <td>${i}</td>
             <td>${courses[i].name}</td>
             <td>${courses[i].cat}</td>
             <td>${courses[i].price}</td>
             <td>${courses[i].desc}</td>
             <td>
                <button class="btn btn-outline-info">update</button>
                <button onclick="deleteCourse(${i})" class="btn btn-outline-danger">delete</button>
             </td>
            </tr> `
        }
    }
    data.innerHTML=result;    
}
function getCourseData(index){
    var course = courses[index];
    coursename.value = course.name
    coursecat.value = course.cat
    courseprice.value = course.price
    coursedesc.value = course.desc
    addbtn.innerHTML="Update Course";
    currentIndex=index;
}
function updateCourse(){
    var course = {
        name : coursename.value ,
        cat : coursecat.value ,
        price : courseprice.value ,
        desc : coursedesc.value 
    };
    courses[currentIndex].name = course.name;
    courses[currentIndex].cat = course.cat;
    courses[currentIndex].desc = course.desc;
    courses[currentIndex].price = course.price;
    localStorage.setItem("coursesList",JSON.stringify(courses));   

}
coursename.onkeyup=function(){
    var namePattern= /^[A-Z][a-z]{2,8}$/;
    if(namePattern.test(coursename.value)==1)
    {
        addbtn.removeAttribute("disabled");
        coursename.classList.add('is-valid');
        coursename.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    }else {
        addbtn.setAttribute("disabled","disabled");
        coursename.classList.replace('is-valid','is-invalid');
        nameAlert.classList.add('d-block');
        nameAlert.classList.remove('d-none');

    }
}