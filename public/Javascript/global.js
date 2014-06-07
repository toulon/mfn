/**
 * Created by toulon on 4/15/14.
 */

// Phonelist data array for filling in info box
var phoneListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the phone table on initial page load
  populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';
  console.log('In populateTable')
  // jQuery AJAX call for JSON
  $.getJSON( '/ip_hones', function( data ) {
  // Stick our phone data array into a ip_hones variable in the global object
    phoneListData = data;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowphone" rel="' + this.label + '">' + this.label + '</td>';
      tableContent += '<td>' + this.action + '</td>';
      tableContent += '<td>' + this.action_date + '</td>';
      tableContent += '<td><a href="#" class="linkdeletephone" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#phoneList table tbody').html(tableContent);
  });
};

// Show Phone Info
function showPhoneInfo(event) {
  console.log('In showPhoneInfo')
  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve label from link rel attribute
  var thisPhoneLabel = $(this).attr('rel');
  console.log('thisPhoneLabel ' + thisPhoneLabel)
  // Get Index of object based on id value
  var arrayPosition = phoneListData.map(function (arrayItem) {
    return arrayItem.label;
  }).indexOf(thisPhoneLabel);
//  alert("Phonelist = " + arrayPosition)
  // Get our Phone Object
  var thisPhoneObject = phoneListData[arrayPosition];
  console.log('thisPhoneObject ' + thisPhoneObject )
  //Populate Info Box
  $('#phoneInfoLabel').text(thisPhoneObject.label);
  $('#phoneInfoAction_date').text(thisPhoneObject.action_date)
  $('#phoneInfoAction').text(thisPhoneObject.action)
  $('#phoneInfoLocation').text(thisPhoneObject.location);

};

// Phonename link click
$('#phoneList table tbody').on('click', 'td a.linkshowphone', showPhoneInfo);

// Add Phone button click
$('#btnAddPhone').on('click', addPhone);

// Delete Phone link click
$('#phoneList table tbody').on('click', 'td a.linkdeletephone', deletePhone);

// Update Phone link click
$('#phoneList table tbody').on('click', 'td a.linkupdatephone', updatePhone);

// Add Phone
function addPhone(event) {
  console.log('In addPhone')
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addPhone input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all phone info into one object
    var newPhone = {
      'label': $('#addPhone fieldset input#inputPhoneLabel').val(),
      'action': $('#addPhone fieldset input#inputPhoneAction').val(),
      'action_date': $('#addPhone fieldset input#inputPhoneAction_date').val(),
      'location': $('#addPhone fieldset select#inputPhoneLocation').val()
    }
    console.log(JSON.stringify(newPhone));
//    alert(JSON.stringify(newPhone))
    // Use AJAX to post the object to our addphone service
    $.ajax({
      type: 'POST',
      data: newPhone,
      url: '/addphone',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addPhone fieldset input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};

// Update Phone
function updatePhone(event) {
  console.log('In updatePhone')
  event.preventDefault();

  // Retrieve label from link rel attribute
  var thisPhoneLabel = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = phoneListData.map(function (arrayItem) {
    return arrayItem.label;
  }).indexOf(thisPhoneLabel);
//  alert("Phonelist = " + arrayPosition)
  // Get our Phone Object
  var thisPhoneObject = phoneListData[arrayPosition];

  //Populate addPhone Box
  $('#editrInfoLabel').text(thisPhoneObject.action);
  $('#editInfoLocation').text(thisPhoneObject.location);

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all phone info into one object
    var editPhone = {
      'label': $('#addPhone fieldset input#inputPhoneLabel').val(),
      'action_date': $('#addPhone fieldset input#inputPhoneDate').val(),
      'action': $('#addPhone fieldset input#inputPhoneAction').val(),
      'location': $('#addPhone fieldset input#inputPhoneLocation').val()
    }
    console.log(JSON.stringify(editPhone));
//    alert(JSON.stringify(editPhone))
    // Use AJAX to post the object to our addphone service
    $.ajax({
      type: 'PUT',
      data: editPhone,
      url: '/updatephone',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addPhone fieldset input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};

// Delete Phone
function deletePhone(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this phone?');

  // Check and make sure the phone confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/deletephone/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};



