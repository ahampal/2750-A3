// Put all onload AJAX calls here, and event listeners
$(document).ready(function() {
    // On page-load AJAX Example
    $.ajax({
        type: 'get',            //Request type
        dataType: 'json',       //Data type - we will use JSON for almost everything 
        url: '/uploads',   //The server endpoint we are connecting to
        data: {
            fileName: "",
            listOfFiles: 1,
            displayCard: 0
        },
        success: function (data) {
            /*  Do something with returned object
                Note that what we get is an object, not a string, 
                so we do not need to parse it on the server.
                JavaScript really does handle JSONs seamlessly
            */
           $('#tableBody').html("");
           $('#dropper').html("");
            for (i = 0; i < data.length; i++) {
                $('#tableBody').append("<tr><td><a id=\"tableLink" + i + "\"href=\"/uploads/" + data[i].fileName + "\">" + data[i].fileName + "</a></td><td>" + data[i].name + "</td><td>" + data[i].numProps + "</td></tr>");
                $('#dropper').append("<option value=" + i + "\">" + data[i].fileName + "</option>");
            }

            if(data.length == 0) {
                $('#tableBody').append("No Files. <br>");
            }
        },
        fail: function(error) {
            // Non-200 return, do something with error
            console.log(error); 
        }
    });

    $('#upBtn').click(function() {
        $('#uploadFile').click();
    });

    $("#uploadFile").change(function() {
        let theForm = document.getElementById("file-form");
        let theFile = new FormData(theForm);
        $.ajax({
            type: 'post',
            data: theFile,
            url: '/uploads',
            contentType : false,
            processData: false,
            success: function(data) {
                $.ajax({
                    type: 'get',            //Request type
                    dataType: 'json',       //Data type - we will use JSON for almost everything 
                    url: '/uploads',   //The server endpoint we are connecting to
                    data: {
                        fileName: "",
                        listOfFiles: 1,
                        displayCard: 0
                    },
                    success: function (data) {
                        /*  Do something with returned object
                            Note that what we get is an object, not a string, 
                            so we do not need to parse it on the server.
                            JavaScript really does handle JSONs seamlessly
                        */
                       $('#tableBody').html("");
                       $('#dropper').html("");
                        let k = 1;
                        for (i = 0; i < data.length; i++) {
                            if(data[i].name == "invalid") {
                                document.getElementById("statusCard").innerHTML += "Failed to upload " + data[i].fileName + ": " + data[i].errMessage + "<br>";
                                k = 0;
                            }
                            else {
                                $('#tableBody').append("<tr><td><a id=\"tableLink" + i + "\"href=\"/uploads/" + data[i].fileName + "\">" + data[i].fileName + "</a></td><td>" + data[i].name + "</td><td>" + data[i].numProps + "</td></tr>");
                                $('#dropper').append("<option value=" + i + "\">" + data[i].fileName + "</option>");
                            }
                        }
                        if(k != 0) {
                            document.getElementById("statusCard").innerHTML += "Uploaded " + $('#uploadFile').val().replace(/^.*[\\\/]/, '') + "<br>";
                        }
                        k = 1;
                    },
                    fail: function(error) {
                        // Non-200 return, do something with error
                        console.log(error); 
                    }
                });
            },
            fail: function() {
                document.getElementById("statusCard").innerHTML += "Failed to upload " + document.getElementById("uploadFile").value.replace(/^.*[\\\/]/, '') + ".<br>";
            }
        });
    });

    $('#clearBtn').click(function() {
        document.getElementById('statusCard').innerHTML = "";
    })

    $('#dropper').change(function() {
        let displayFile = $("#dropper :selected").text();

        $.ajax({
            url: '/uploads',
            type: 'get',
            data: {
                fileName: displayFile,
                listOfFiles: 0,
                displayCard: 1
            },
            success: function(data) {
                let array = JSON.parse(data);
                $('#cardViewerBody').html("");
                console.log(array.length);
                for(i = 0; i < array.length; i++) {
                    $('#cardViewerBody').append("<tr><td>" + (i+1) + "</td><td>" + array[i].name + "</td><td>" + (array[i].values) + "</td></tr>");
                }
            }
        });
    })
});