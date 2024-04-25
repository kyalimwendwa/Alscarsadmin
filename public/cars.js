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

function redirectToOrderDetails(cartId) {
// Construct the URL for the carddetails page with the cartId parameter
var url = '/orderdetails?cartId=' + encodeURIComponent(cartId);

// Redirect to the carddetails page
window.location.href = url;
}




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


