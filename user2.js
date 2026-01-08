var form = document.getElementById("myform"),
 imginput = document.getElementById('imgdisp'),
 file = document.getElementById("imginput"),
 Name = document.getElementById("name"),
 age = document.getElementById("age"),
 city = document.getElementById("city"),
 phone = document.getElementById("phone"),
 email = document.getElementById("email"),
 submitbtn = document.querySelector(".submit"),
 userinfo = document.getElementById("data"),
 modal=document.getElementById("userapn"),
 modalTitle=document.querySelector("#userapn .modal-title"),
 newUserBtn=document.querySelector('.newUser');

getdata=localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')) : []
showInfo()

let isEdit=false, editId

function getfile(obj)
{
	if (obj.files[0].size < 1000000)
	{
		var reader = new FileReader();
		imginput.src=reader.readAsDataURL(obj.files[0]);
		reader.onload = function (e) {
	    imginput.src=e.target.result;
		}
	}
	else
	{
		    alert("File too Large")
	}
}
newUserBtn.addEventListener('click',()=>
{
	modalTitle.innerHTML='Fill The Form';
	form.reset();
	submitbtn.innerText="Save"
	isEdit=false
})
form.addEventListener("submit",(e)=>
{
	e.preventDefault();
	const information={
		picture: imginput.src,
		ename: Name.value,
		eage: age.value,
		ecity:city.value,
		ephone:phone.value,
		emailid:email.value
	}
	if(!isEdit)
	{
		getdata.push(information);	
	}
	else
	{
		isEdit=false;
		getdata[editId]=information;
	}
	localStorage.setItem('userdata',JSON.stringify(getdata));
	modalTitle.innerHTML='Fill The Form';
	form.reset();
	modal.style.display="none";
	document.querySelector(".modal-backdrop").remove();
	showInfo()
})
function readinfo(pic,nm,ag,cy,ph,em)
{
	document.querySelector("#showimg").src=pic;
	document.querySelector("#showname").value=nm;
	document.querySelector("#showage").value=ag;
	document.querySelector("#showcity").value=cy;
	document.querySelector("#showphone").value=ph;
	document.querySelector("#showemail").value=em;
}
function deleteinfo(index)
{
	if(confirm("Are You Sure to Delete?"))
	{
		getdata.splice(index,1);
		localStorage.setItem("userdata",JSON.stringify(getdata));
		showInfo()
	}
}
function editinfo(index,pic,nm,ag,cy,ph,em)
{
	isEdit=true
	editId=index
	imginput.src=pic
	Name.value=nm
	age.value=ag
	city.value=cy
	phone.value=ph
	email.value=em
	submitbtn.innerText="Update"
	modalTitle.innerText="Update The Form"
}
function showInfo()
{
	userinfo.innerHTML='';
	getdata.forEach((element,index) => {
		let createElement=`<tr>
		<td>${index+1}</td>
		<td><img src="${element.picture}" alt="" height="40" width="40"></td>
		<td>${element.ename}</td>
		<td>${element.eage}</td>
		<td>${element.ecity}</td>
		<td>${element.ephone}</td>
		<td>${element.emailid}</td>
		<td>
			<button onclick="readinfo('${element.picture}','${element.ename}','${element.eage}','${element.ecity}','${element.ephone}','${element.emailid}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#readapn"><i class="bi bi-eye"></i></button>
			<button onclick="editinfo(${index},'${element.picture}','${element.ename}','${element.eage}','${element.ecity}','${element.ephone}','${element.emailid}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userapn"><i class="bi bi-pencil-square"></i></button>
			<button onclick="deleteinfo(${index})" class="btn btn-danger"><i class="bi bi-trash"></i></button>
		</td>
	</tr>`
	userinfo.innerHTML += createElement;
	});
	
}