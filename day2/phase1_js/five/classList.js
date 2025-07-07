<html lang="en">
<head>
</head>

<body>
    <div id="myBox" class="box red"></div>

<script>

const box = document.getElementById("myBox");

// View class list
console.log(box.classList); 
// Output: DOMTokenList ['box', 'red']

// Add a class
box.classList.add("rounded");

// Remove a class
box.classList.remove("red");

// Toggle a class (adds if not present, removes if present)
box.classList.toggle("hidden");

// Check if it contains a class
console.log(box.classList.contains("box")); // true


/*
Method	Description
add("class")	        Adds the specified class
remove("class")     	Removes the specified class
toggle("class")	        Toggles the class (add if not present, remove if present)
contains("class")	    Checks if the class exists
replace("old", "new")	Replaces one class with another


*/
</script>
</body>
</html>


/*
<button id="themeBtn">Toggle Theme</button>
<body id="pageBody" class="light"></body>

const btn = document.getElementById("themeBtn");
const body = document.getElementById("pageBody");

btn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});


<button id ="themeBtn"> Toggle Theme </button>
<body id ="pageBody" class="light"> </body>

<script>
const btn = document.getElementById("themeBtn");
const body = document.getElementById("pageBody");

btn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
});
</script>
*/