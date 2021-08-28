function myFunction(element) {
    /* Get the field */
    var copyText = document.getElementById(element);
    console.log('help');
    navigator.clipboard.writeText(copyText.innerHTML);
  
    /* Alert the copied text */
    alert("Copied!");
}