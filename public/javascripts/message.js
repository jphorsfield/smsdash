$(document).ready(function(){
    var dataTable = $("#dataTable").DataTable()
    var customerChannel = pusher.subscribe('message');
    customerChannel.bind('add', function(data) {
    var body = data.data;
    var date = new Date();
    dataTable.row.add([
        body.sid,
        body.direction,
        body.from,
        body.to,
        //`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`,
        body.date,
        body.status
      ]).draw( false );
    });
  });

  $(document).bind('DOMSubtreeModified', function (){
    $('#dataTable tr').each(function () {
      var td_value = $('td', this).eq(5).text();
      console.log('This is the table data value: '+td_value);
      switch (td_value) {
        case 'undelivered':
          $(this).addClass('undeliver');
          break;
      }
    });
  })