document.addEventListener("DOMContentLoaded", function() {
    const basic = document.getElementById("basic");
    const description = document.getElementById("descriptio");
    const performance=document.getElementById("performance");
    const history=document.getElementById("history");
    const features=document.getElementById("features");
    const price=document.getElementById("price");
    const media=document.getElementById("media");

    const information=document.getElementById("information");
    const enginespec=document.getElementById("engin");
    const cond=document.getElementById("cond");
    const feat=document.getElementById("feat");
    const pric=document.getElementById("pric");
    const med=document.getElementById("med");
    const desc=document.getElementById("desc");
    const btn=document.getElementById("btn");
  
    information.addEventListener("click", function() {
      basic.style.display = "block";
      description.style.display = "none";
      performance.style.display = "none";
      history.style.display = "none";
      price.style.display = "none";
      features.style.display = "none";
      media.style.display = "none";
      btn.style.display = "none";
     
    });
    desc.addEventListener("click", function() {
        basic.style.display = "none";
        description.style.display = "block";
        performance.style.display = "none";
        history.style.display = "none";
        price.style.display = "none";
        features.style.display = "none";
        media.style.display = "none";
        btn.style.display = "none";
       
      });
      enginespec.addEventListener("click", function() {
        basic.style.display = "none";
        description.style.display = "none";
        performance.style.display = "block";
        history.style.display = "none";
        price.style.display = "none";
        features.style.display = "none";
        media.style.display = "none";
        btn.style.display = "none";
       
      });
      cond.addEventListener("click", function() {
        basic.style.display = "none";
        description.style.display = "none";
        performance.style.display = "none";
        history.style.display = "block";
        price.style.display = "none";
        features.style.display = "none";
        media.style.display = "none";
        btn.style.display = "none";
       
      });
      feat.addEventListener("click", function() {
        basic.style.display = "none";
        description.style.display = "none";
        performance.style.display = "none";
        history.style.display = "none";
        price.style.display = "none";
        features.style.display = "block";
        media.style.display = "none";
        btn.style.display = "none";
       
      });
      pric.addEventListener("click", function() {
        basic.style.display = "none";
        description.style.display = "none";
        performance.style.display = "none";
        history.style.display = "none";
        price.style.display = "block";
        features.style.display = "none";
        media.style.display = "none";
        btn.style.display = "none";
       
      });
      med.addEventListener("click", function() {
        basic.style.display = "none";
        description.style.display = "none";
        performance.style.display = "none";
        history.style.display = "none";
        price.style.display = "none";
        features.style.display = "none";
        media.style.display = "block";
        btn.style.display = "block";
       
      });

});



document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const imageContainer = document.getElementById('imageContainer');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect() {
      const files = fileInput.files;
      updateBackgroundColor(files.length > 0);
      displayImages(files);
    }

    function updateBackgroundColor(hasImages) {
      const lablei = document.querySelector('.lablei');
      lablei.style.backgroundColor = hasImages ? '#fff' : '#f0f2f9';
    }

    function displayImages(files) {
      imageContainer.innerHTML = ''; // Clear previous images

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.width = '100px'; // Adjust image size as needed
          img.style.height = 'auto'; // Adjust image size as needed
          img.style.marginRight = '10px'; // Adjust spacing between images
          img.style.marginBottom = '10px'; // Adjust spacing between images
          imageContainer.appendChild(img);
        }

        reader.readAsDataURL(file);
      }
    }
  });


  


  
    function toggleDropdown(header) {
      const arrow = header.querySelector('.dropdown-arrow');
      const links = header.nextElementSibling; // Select the dropdown-links div associated with the clicked header
      const icon = header.querySelector('.bi');
  
      if (window.getComputedStyle(links).display === 'none') {
        links.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
        icon.style.fill = '#457cdb'; // Change the fill color of the SVG
        header.style.color = '#457cdb'; // Change the text color
      } else {
        links.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
        icon.style.fill = ''; // Reset the fill color of the SVG to default
        header.style.color = ''; // Reset the text color to default
      }
    }
  
 

 
  const optionMenu = document.querySelector('.select-menu');
  const selectbtn = optionMenu.querySelector('.selectbtn');
  const options = optionMenu.querySelectorAll('.option');
  const sBtntext = optionMenu.querySelector('.sBtntext');
  const makeInput = document.getElementById('makeInput'); // Move this outside the event listener

  selectbtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

  options.forEach(option => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector('.option-text').innerText;
      sBtntext.innerText = selectedOption;
      optionMenu.classList.remove("active");

      // Set the value in the hidden input field with ID "makeInput"
      makeInput.value = selectedOption;
    });
  });




  const optionMenu1 = document.querySelector('.select-menu1');
  const selectbtn1 = optionMenu1.querySelector('.selectbtn1');
  const options1 = optionMenu1.querySelectorAll('.option1');
  const sBtntext1 = optionMenu1.querySelector('.sBtntext1');
  const conditionInput = document.getElementById('conditionInput');

  selectbtn1.addEventListener("click", () => optionMenu1.classList.toggle("active"));

  options1.forEach(option => {
    option.addEventListener("click", () => {
      let selectedOption1 = option.querySelector('.option-text').innerText;
      sBtntext1.innerText = selectedOption1;
      optionMenu1.classList.remove("active");

      conditionInput.value = selectedOption1;
    });
  });



 
document.getElementById("edit-button").addEventListener("click", function() {
    var inputs = document.querySelectorAll("#basic input[type='text']");
    var svg = document.querySelector(".dropdown-arrow");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].style.border === "none") {
            inputs[i].style.border = "1px solid #acbebe";
            
            inputs[i].readOnly = false;
        } else {
            inputs[i].style.border = "none";
            inputs[i].readOnly = true;
        }
    }
    var selectBtn = document.querySelector(".selectbtn");
    if (selectBtn.style.border === "none") {
        selectBtn.style.border = "1px solid #acbebe";
    } else {
        selectBtn.style.border = "none";
    }
     // Toggle SVG display
     if (svg.style.display === "none") {
        svg.style.display = "inline-block";
    } else {
        svg.style.display = "none";
    }
});




  document.getElementById("edit-butto").addEventListener("click", function() {
      var inputs = document.querySelectorAll("#performance input[type='text']");
      var svg = document.querySelector(".dropdown-arrow");
      for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].style.border === "none") {
              inputs[i].style.border = "1px solid #acbebe";
              
              inputs[i].readOnly = false;
          } else {
              inputs[i].style.border = "none";
              inputs[i].readOnly = true;
          }
      }
      var selectBtn = document.querySelector(".selectbtn");
      if (selectBtn.style.border === "none") {
          selectBtn.style.border = "1px solid #acbebe";
      } else {
          selectBtn.style.border = "none";
      }
       // Toggle SVG display
       if (svg.style.display === "none") {
          svg.style.display = "inline-block";
      } else {
          svg.style.display = "none";
      }
  });
  
  
  

  document.getElementById("edit-butt").addEventListener("click", function() {
      var inputs = document.querySelectorAll("#history input[type='text']");
      var svg = document.querySelector(".dropdown-arrow");
      for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].style.border === "none") {
              inputs[i].style.border = "1px solid #acbebe";
              
              inputs[i].readOnly = false;
          } else {
              inputs[i].style.border = "none";
              inputs[i].readOnly = true;
          }
      }
      var selectBtn = document.querySelector(".selectbtn1");
      if (selectBtn.style.border === "none") {
          selectBtn.style.border = "1px solid #acbebe";
      } else {
          selectBtn.style.border = "none";
      }
       // Toggle SVG display
       if (svg.style.display === "none") {
          svg.style.display = "inline-block";
      } else {
          svg.style.display = "none";
      }
  });
  
  
  
 
  document.getElementById("edit-but").addEventListener("click", function() {
      var inputs = document.querySelectorAll("#price input[type='text']");
      var svg = document.querySelector(".dropdown-arrow");
      for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].style.border === "none") {
              inputs[i].style.border = "1px solid #acbebe";
              
              inputs[i].readOnly = false;
          } else {
              inputs[i].style.border = "none";
              inputs[i].readOnly = true;
          }
      }
      var selectBtn = document.querySelector(".selectbtn1");
      if (selectBtn.style.border === "none") {
          selectBtn.style.border = "1px solid #acbebe";
      } else {
          selectBtn.style.border = "none";
      }
       // Toggle SVG display
       if (svg.style.display === "none") {
          svg.style.display = "inline-block";
      } else {
          svg.style.display = "none";
      }
  });
  
  
  
 
    document.getElementById("edit-bu").addEventListener("click", function() {
        var textareas = document.querySelectorAll("#descriptio textarea");
        var svg = document.querySelector(".dropdown-arrow");
        for (var i = 0; i < textareas.length; i++) {
            if (textareas[i].style.border === "none") {
                textareas[i].style.border = "1px solid #acbebe";
                textareas[i].readOnly = false;
            } else {
                textareas[i].style.border = "none";
                textareas[i].readOnly = true;
            }
        }
    });
    document.getElementById("edit-b").addEventListener("click", function() {
        var textarea = document.querySelectorAll("#features textarea");
        var svg = document.querySelector(".dropdown-arrow");
        for (var i = 0; i < textarea.length; i++) {
            if (textarea[i].style.border === "none") {
                textarea[i].style.border = "1px solid #acbebe";
                textarea[i].readOnly = false;
            } else {
                textarea[i].style.border = "none";
                textarea[i].readOnly = true;
            }
        }
    });


