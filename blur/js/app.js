//var, let, const

// var name = 'John Doe';
// console.log(name);
// name = 'Jane Doe'
// console.log(name);

// var greeting;
// console.log(greeting);

// let name;
// name = 'John Doe';
// console.log(name);
// name = 'Jane Doe'
// console.log(name);



// let varString = "String Variable";
// let varNum = 6669;
// let varBool = true;
// let varNull = null;
// let varUndefined;



// const name = "John Doe";
// const age = 32;
// const hasKids = true;
// const sym = Symbol()
// console.log(typeof name);
// console.log(typeof age);
// console.log(typeof hasKids);
// console.log(typeof varNull);
// console.log(typeof varUndefined);
// console.log(typeof sym);


// let varArray = [varString, varNum, varBool, varNull, varUndefined]

// let varObjectLitera ={
//     varString:varString, 
//     varNum:varNum, 
//     varNum:varBool, 
//     varNull:varNull, 
//     varUndefined:varUndefined}

// console.log(typeof varArray);
// console.log(typeof varObjectLitera);


// let val; 

// val = 555;

// console.log(val);
// console.log(typeof val);
// console.log(val.length)
// val = String(val);
// console.log(val.length)


// let val; 

// val = Math.PI;
// val = Math.E;
// val = Math.round(2.4);
// val = Math.ceil(2.4);
// val = Math.floor(2.4);
// val = Math.abs(-2.4);
// val = Math.sqrt(64);
// val = Math.pow(8, 2);
// val = Math.min(2,4);
// val = Math.min(2,-2);
// val = Math.max(2,4);
// val = Math.random();
// val = Math.floor(Math.random() * 20 +1);

// console.log(val)

// const name = 'John';
// const age = 30;
// const job = "GIS Stuff";
// const city = "Prescott";
// let html;

// html = '<ul><li>Name: ' + name + '</li><li>Age: ' + age + '</li><li>Job:  ' + job + '</li><li>City:  ' + city + '</li></ul>';
// html = '<ul>' + 
//         '<li>Name: ' + name + '</li>'+
//         '<li>Age: ' + age + '</li>' +
//         '<li>Job:  ' + job + '</li>' +
//         '<li>City:  ' + city + '</li>' +
//         '</ul>';


// function GreetUser(name){
//     return `Hello ${name}!`
// }

// html = `
//     <ul>
//     <li>Name: ${name}</li>
//     <li>Age: ${age}</li>
//     <li>Job: ${job}</li>
//     <li>City: ${city}</li>
//     <li>${GreetUser(name)}</li>
//     </ul>`  
// document.body.innerHTML = html;

// numbers = [1,2,3,4,5]
// console.log(numbers);
// //add to end
// numbers.push(25);
// console.log(numbers);
// //add to front 
// numbers.unshift(120);
// console.log(numbers);
// //remove from end
// numbers.pop();
// console.log(numbers);
// //remove from front
// numbers.shift();
// //splice
// numbers.splice(1,3);
// console.log(numbers);
// //reverse
// numbers.reverse();
// console.log(numbers);



const image = new Image();
image.src = "https://images.unsplash.com/photo-1571988840298-3b5301d5109b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
const downloadLink = document.getElementById("download-link");
const canvas1 = document.createElement("canvas");
const canvas2 = document.createElement("canvas");
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");

image.onload = function () {
  canvas1.width = image.width;
  canvas1.height = image.height;
  ctx1.drawImage(image, 0, 0);
  document.getElementById("image1").src = canvas1.toDataURL();
  downloadLink.href = canvas1.toDataURL();
  
  canvas2.width = image.width;
  canvas2.height = image.height;
  ctx2.filter = "blur(5px)";
  document.getElementById("image2").src = canvas2.toDataURL();
}

function updateBlur() {
    const image = document.getElementById("blurred-image");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.filter = `blur(${document.getElementById("blur-slider").value}px)`;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    document.getElementById("blurred-image").src = canvas.toDataURL();
}

function downloadBlurredImage() {
    const image = document.getElementById("blurred-image");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.filter = `blur(${document.getElementById("blur-slider").value}px)`;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    if (document.getElementById("blur-slider").value > 0) {
      canvas.toBlob(function (blob) {
        saveAs(blob, "blurred-image.jpg");
      }, "image/jpeg");
    } else {
      alert("Blur value must be greater than zero");
    }
  }

