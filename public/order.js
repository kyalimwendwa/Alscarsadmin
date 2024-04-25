
    document.addEventListener("DOMContentLoaded", function() {
      const allOrders = document.getElementById("allorders");
      const newOrders = document.getElementById("neworders");
      const allOrdersDiv = document.querySelector(".allorders");
      const newOrderForm = document.querySelector(".neworder");
      const button=document.getElementById("button");
      const filters=document.getElementById("filters");
      const fil=document.getElementById("fil");
      const allbtns=document.getElementById("allbtns");


      //
      const completedorders=document.getElementById("completedorders");
      const pendingorders=document.getElementById("pendingorders");
      const completedrders=document.getElementById("completedrders");
      const pendingrders=document.getElementById("pendingrders");
      
    
      allOrders.addEventListener("click", function() {
        allOrdersDiv.style.display = "block";
        newOrderForm.style.display = "none";
        filters.style.display="none";
        allbtns.style.display="flex";
        completedrders.style.display="none";
        pendingrders.style.display="none";
      });

      
      fil.addEventListener("click", function() {
        allOrdersDiv.style.display = "block";
        newOrderForm.style.display = "none";
        filters.style.display="block";
      });
    
      newOrders.addEventListener("click", function() {
        allOrdersDiv.style.display = "none";
        newOrderForm.style.display = "block";
        filters.style.display="none";
        allbtns.style.display="none";
        completedrders.style.display="none";
        pendingrders.style.display="none";
      });
      completedorders.addEventListener("click", function() {
        allOrdersDiv.style.display = "none";
        newOrderForm.style.display = "none";
        filters.style.display="none";
        allbtns.style.display="flex";
        completedrders.style.display="block";
        pendingrders.style.display="none";
      });
      pendingorders.addEventListener("click", function() {
        allOrdersDiv.style.display = "none";
        newOrderForm.style.display = "none";
        filters.style.display="none";
        allbtns.style.display="flex";
        completedrders.style.display="none";
        pendingrders.style.display="block";
      });
    
    button.addEventListener("click", function() {
        allOrdersDiv.style.display = "none";
        newOrderForm.style.display = "block";
        filters.style.display="none";
        allbtns.style.display="none";
        completedrders.style.display="none";
        pendingrders.style.display="none";
      });
    });
   
    document.addEventListener('DOMContentLoaded', function () {
      // Define the number of rows to display per page
      var rowsPerPage = 5;
  
      // Get all rows in the table body
      var rows = document.querySelectorAll("#customerTableBody tr");
  
      // Calculate the total number of pages
      var totalPages = Math.ceil(rows.length / rowsPerPage);
  
      // Initialize the current page
      var currentPage = 1;
  
      // Function to show rows based on the current page
      function showRows() {
        var startIndex = (currentPage - 1) * rowsPerPage;
        var endIndex = startIndex + rowsPerPage;
  
        // Hide all rows
        rows.forEach(function (row, index) {
          if (index >= startIndex && index < endIndex) {
            row.style.display = "table-row";
          } else {
            row.style.display = "none";
          }
        });
      }
  
      // Initial display
      showRows();
  
      // Create pagination buttons dynamically
      var paginationDiv = document.querySelector('.pagination');
      for (var i = 1; i <= totalPages; i++) {
        var button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', function () {
          // Remove 'active' class from all buttons
          paginationDiv.querySelectorAll('button').forEach(function (btn) {
            btn.classList.remove('active');
          });
  
          // Set 'active' class to the clicked button
          this.classList.add('active');
  
          currentPage = parseInt(this.textContent);
          showRows();
        });
        paginationDiv.appendChild(button);
      }
  
      // Get the next and previous buttons by their IDs
      var nextButton = document.getElementById("nextButton");
      var prevButton = document.getElementById("prevButton");
  
      // Attach event listener to the next button
      nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
          currentPage++;
          showRows();
        }
      });
  
      // Attach event listener to the previous button
      prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
          currentPage--;
          showRows();
        }
      });
    });
 
  document.addEventListener('DOMContentLoaded', function () {
    // Define the number of rows to display per page
    var rowsPerPage = 5;

    // Get all rows in the table body
    var rows = document.querySelectorAll("#customerTableBo tr");

    // Calculate the total number of pages
    var totalPages = Math.ceil(rows.length / rowsPerPage);

    // Initialize the current page
    var currentPage = 1;

    // Function to show rows based on the current page
    function showRows() {
      var startIndex = (currentPage - 1) * rowsPerPage;
      var endIndex = startIndex + rowsPerPage;

      // Hide all rows
      rows.forEach(function (row, index) {
        if (index >= startIndex && index < endIndex) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
      });
    }

    // Initial display
    showRows();

    // Create pagination buttons dynamically
    var paginationDiv = document.querySelector('.paginatio');
    for (var i = 1; i <= totalPages; i++) {
      var button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', function () {
        // Remove 'active' class from all buttons
        paginationDiv.querySelectorAll('button').forEach(function (btn) {
          btn.classList.remove('active');
        });

        // Set 'active' class to the clicked button
        this.classList.add('active');

        currentPage = parseInt(this.textContent);
        showRows();
      });
      paginationDiv.appendChild(button);
    }

    // Get the next and previous buttons by their IDs
    var nextButton = document.getElementById("nextButton");
    var prevButton = document.getElementById("prevButton");

    // Attach event listener to the next button
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        showRows();
      }
    });

    // Attach event listener to the previous button
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        showRows();
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Define the number of rows to display per page
    var rowsPerPage = 5;

    // Get all rows in the table body
    var rows = document.querySelectorAll("#customerTableBod tr");

    // Calculate the total number of pages
    var totalPages = Math.ceil(rows.length / rowsPerPage);

    // Initialize the current page
    var currentPage = 1;

    // Function to show rows based on the current page
    function showRows() {
      var startIndex = (currentPage - 1) * rowsPerPage;
      var endIndex = startIndex + rowsPerPage;

      // Hide all rows
      rows.forEach(function (row, index) {
        if (index >= startIndex && index < endIndex) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
      });
    }

    // Initial display
    showRows();

    // Create pagination buttons dynamically
    var paginationDiv = document.querySelector('.paginati');
    for (var i = 1; i <= totalPages; i++) {
      var button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', function () {
        // Remove 'active' class from all buttons
        paginationDiv.querySelectorAll('button').forEach(function (btn) {
          btn.classList.remove('active');
        });

        // Set 'active' class to the clicked button
        this.classList.add('active');

        currentPage = parseInt(this.textContent);
        showRows();
      });
      paginationDiv.appendChild(button);
    }

    // Get the next and previous buttons by their IDs
    var nextButton = document.getElementById("nextButton");
    var prevButton = document.getElementById("prevButton");

    // Attach event listener to the next button
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        showRows();
      }
    });

    // Attach event listener to the previous button
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        showRows();
      }
    });
  });

  function redirectToOrderDetails(cartId) {
    // Construct the URL for the carddetails page with the cartId parameter
    var url = '/orderdetails?cartId=' + encodeURIComponent(cartId);

    // Redirect to the carddetails page
    window.location.href = url;
  }

  window.onload = function() {
      // Get today's date
      var today = new Date();
      
      // Format the date as YYYY-MM-DD (assuming this format)
      var formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
      
      // Set the value of the input field to the formatted date
      document.getElementById('dateInput').value = formattedDate;
  };



$(document).ready(function () {
  $('#searchInput').on('input', function () {
    var searchText = $(this).val().toLowerCase();
    $('#customerTableBody tr').hide();

    $('#customerTableBody tr').each(function (index) {
      var customerName = $(this).find('td:eq(2)').text().toLowerCase();
      var orderDate = $(this).find('td:eq(1)').text().toLowerCase();

      if (customerName.includes(searchText) || orderDate.includes(searchText)) {
        $(this).show();
      }
    });
  });
});

$(document).ready(function () {
  $('#searchInput').on('input', function () {
    var searchText = $(this).val().toLowerCase();
    $('#customerTableBod tr').hide();

    $('#customerTableBod tr').each(function (index) {
      var customerName = $(this).find('td:eq(2)').text().toLowerCase();
      var orderDate = $(this).find('td:eq(1)').text().toLowerCase();

      if (customerName.includes(searchText) || orderDate.includes(searchText)) {
        $(this).show();
      }
    });
  });
});

$(document).ready(function () {
  $('#searchInput').on('input', function () {
    var searchText = $(this).val().toLowerCase();
    $('#customerTableBo tr').hide();

    $('#customerTableBo tr').each(function (index) {
      var customerName = $(this).find('td:eq(2)').text().toLowerCase();
      var orderDate = $(this).find('td:eq(1)').text().toLowerCase();

      if (customerName.includes(searchText) || orderDate.includes(searchText)) {
        $(this).show();
      }
    });
  });
});



