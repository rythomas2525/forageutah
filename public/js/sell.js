$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyByHflVSt-95YP4yWECkiK6vLGTguS7KFU",
        authDomain: "future-force-270416.firebaseapp.com",
        databaseURL: "https://future-force-270416.firebaseio.com",
        projectId: "future-force-270416",
        storageBucket: "future-force-270416.appspot.com",
        messagingSenderId: "397427626203",
        appId: "1:397427626203:web:e353a58a74c91413f6bcfe",
        measurementId: "G-H126PY4SSJ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    if (window.location.pathname === '/sell') {

        var mainPictureButton = document.getElementById("mainPictureButton");
        var uploader = document.getElementById("uploader");
        mainPictureButton.addEventListener("change", function (e) {

            console.log(e.target.files[0].name)
            // get file
            var file = e.target.files[0];


            // create a storage ref
            var storageRef = firebase.storage().ref("images/" + file.name);

            //  upload file
            var task = storageRef.put(file);

            // update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                },

                function error(err) {
                    throw err;
                },

                function complete() {
                    task.snapshot.ref.getDownloadURL()
                        .then(function (downloadURL) {

                            console.log(downloadURL)

                            URL = downloadURL
                        })
                    return URL;

                })

        })
    }





    var URL = ""





    $("#newLaptop").on("submit", function (event) {

        event.preventDefault();
        if (URL === "") {

            URL = "/assets/images/laptop-placeholder.png";
            console.log("No Image Uploaded")
        }

        console.log(URL)
        var newLaptop = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            phone: $("#number").val().trim(),
            city: $("#city").val().trim(),
            brand: $("#brand").val().trim(),
            model: $("#model").val().trim(),
            operating_system: $("#os").val().trim(),
            laptop_condition: $("#condition").val(),
            processor: $("#processor").val().trim(),
            graphics: $("#graphics").val().trim(),
            ram: $("#ram").val().trim(),
            screen_dimension: $("#screen").val().trim(),
            hd_storage: $("#storage").val().trim(),
            release_year: $("#year").val().trim(),
            summary: $("#summary").val().trim(),
            price: $("#price").val().trim(),
            main_photo: URL
        }

        // Send the POST request.
        $.ajax("/api/laptops", {
            type: "POST",
            data: newLaptop
        }).then(
            function () {
                console.log("New Laptop has been added to the inventory");

                URL = "";
                // Reload the page to get the updated list
                location.assign("/");
            }
        );

        console.log(newLaptop);

    });

    $(".soldButton").click(function () {


        var soldId = $(this).data("id");

        console.log("Laptop ID is " + soldId);

        $.ajax("/api/laptops/" + soldId, {
            type: "DELETE"
        }).then(
            function () {
                console.log("Laptop has been sold!");
                location.reload();
            }
        );
    });

});