Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

    Chart.defaults.global.defaultFontColor = '#292b2c';

    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["June", "July", "August"],
        datasets: [{
          label: "SMS",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: [0, 0, 0],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 6
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });

    // Configure Pusher instance
    const pusher = new Pusher('6cd0f164f79e9f068deb', {
        cluster: 'eu',
        encrypted: true
    });

    // Subscribe to poll trigger
    var orderChannel = pusher.subscribe('order');

    // Listen to 'order placed' event
    var order = document.getElementById('order-count')
    orderChannel.bind('place', function(data) {
      console.log('This is the data in the order part: '+JSON.stringify(data));
      //myLineChart.data.datasets.forEach((dataset) => {
          //dataset.data.fill(parseInt(data.increment),-1);
      //});
      var currVal = myLineChart.data.datasets[0].data[2];
      currVal++;
      myLineChart.data.datasets[0].data[2] = currVal;
      myLineChart.update();
      //order.innerText = parseInt(order.innerText)+1
    });