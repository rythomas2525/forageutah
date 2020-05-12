



if (window.location.pathname === '/sell') {
    var secondaryPictureButton = document.getElementById("secondaryPictureButton");

    var secondaryUploader = document.getElementById("secondaryUploader")
    secondaryPictureButton.addEventListener('change', function (e) {
        //Get files
        for (var i = 0; i < e.target.files.length; i++) {
            var imageFile = e.target.files[i];

            uploadImageAsPromise(imageFile);
        }
    });

    //Handle waiting to upload each file using promise
    function uploadImageAsPromise(imageFile) {

        var storageRef = firebase.storage().ref("secondaryimages/" + imageFile.name);
        console.log(imageFile);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                secondaryUploader.value = percentage;
            },
            function error(err) {
                throw err;
            },
            function complete() {
                var secondaryURL = task.snapshot.ref.getDownloadURL().then(function (downloadURL) { console.log(downloadURL) })
                return secondaryURL;

            }
        );

    }
}