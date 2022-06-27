let inboxmail = document.querySelector('.mail-box');
let EveryMail = document.querySelector('.open-inbox');
let personalemail = document.querySelector('.personalemail');


const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'YOUR-KEY',
        'X-RapidAPI-Host': 'temp-mail44.p.rapidapi.com'
    },
    body: '{"key1":"value","key2":"value"}'
};

const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'be793b3ae9msheeaea90976deff3p1915f6jsn3992368280f9',
        'X-RapidAPI-Host': 'temp-mail44.p.rapidapi.com'
    }
};
let storedemail = localStorage.getItem('email')
// console.log(storedemail);

// localStorage.setItem('email',"rzb77v2n68epcp@kjkszpjcompany.com")
if(storedemail != null){

    personalemail .innerHTML = storedemail;
}




async function readinbox(Newemail) {
    storedemail = Newemail;

    let res = await fetch(`https://temp-mail44.p.rapidapi.com/api/v3/email/${Newemail}/messages`, options1);
    let data = await res.json()
    // console.log(data);


    for (let i = data.length - 1; i >= 0; i--) {

        BuildInbox(data[i])
    }



}
let flag = false;



const Email = ''

function copyEmail(){
    navigator.clipboard.writeText(personalemail.innerHTML)
}



async function temp() {

    let res = await fetch(`https://temp-mail44.p.rapidapi.com/api/v3/email/new`, options);

    let data = await res.json()
    // console.log(data.email);
    // Newemail = data.email
    personalemail.innerHTML = data.email

    localStorage.setItem('email', data.email)
    setTimeout(() => {
        
        readinbox(data.email)
    }, 2000);

}
// temp()






function TrimColon(text) {
    return text.toString().replace(/^(.*?):*$/, '$1');
}







function BuildInbox(data) {

    // console.log(data);
    let ele = document.createElement('div')

    let from = data.from
    let fromdata = from.split(" ")
    // console.log(fromdata[fromdata.length -1].replace("<", ""));



    ele.innerHTML = `<div class="item">
<div >

<div class="from"><i class="fa-solid fa-comment-dots" style="margin-right: 0.5rem ; color: green;"></i> From : ${from.split(" ")[0]}</div> 
    <span class =  "SenderEmail" style="text-decoration: underline;"> ${fromdata[fromdata.length - 1].replace("<", "")}</span>
</div>


<div class="moreinfo" style="margin-top: 1rem;">

    <div class="iteminbox">
        
        
        Subject : <span class="subject">${data.subject}</span> <br>
        <hr>
        


       <div class="bodttext">  <span style="color: red;"> Body </span> : ${data.body_text} </div>
    </div>
</div>
</div>`
    document.querySelector('.inbox').appendChild(ele)










}












function refresh() {
    document.querySelector('.inbox').innerHTML = ""
   readinbox(storedemail)
}
function change() {

    temp()
}
function del() {

    personalemail.innerHTML = "Data Cleared";
    document.querySelector('.inbox').innerHTML = `<div class="center">No Inbox</div>`
    localStorage.removeItem("email")
    window.location.reload()
}
