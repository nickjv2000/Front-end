// document.getelementbyid verkorten naar id
var id = function(id) {return document.getElementById(id);};

// alles wat niet de start button is, 
// hiden aan het begin zodat het opgeroepen kan worden daarna

id("dropdown").style.visibility = "hidden";

id("text1").style.visibility = "hidden";
id("text2").style.visibility = "hidden";