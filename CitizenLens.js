var currentTab = 0;
document.addEventListener("DOMContentLoaded", function (event){
    showTab(currentTab);
});

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    document.getElementById("prevBtn").style.display = (n == 0) ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = (n == (x.length - 1)) ? "<i class='fa fa-paper-plane'></i>"  : "<i class='fa fa-angle-double-right'></i>";
    fixStepIndicator(n);
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;

    // Check for service type and redirect if necessary
    const serviceType = document.getElementById("serviceDirection").value;
    const payment = document.getElementById("paymentMethod").value;
    if ((currentTab == 4 && serviceType === "Receive") || (currentTab == 7) || (currentTab == 5 && payment == "100 KES")) {
        redirectToMap();
        return;
    }

    if (currentTab >= x.length) {
        document.getElementById("regForm").style.display = "none";
        document.getElementById("text-message").style.display = "block";
        return false;
    }

    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName('tab');
    y = x[currentTab].getElementsByTagName('input');
    for (i = 0; i < y.length; i++) {
        if (y[i].value == '') {
            y[i].className += ' invalid';
            valid = false;
        }
    }

    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
  
    x[n].className += " active";
}

function redirectToMap() {
    const selectedProject = document.getElementById("cdfProject").value;
    let mapUrl = "";
    switch (selectedProject) {
        case "ProjectBondeni":
            mapUrl = "https://www.google.com/maps/place/Outreach+Hope+Church+Kosovo/@-1.2625265,36.8509892,3a,75y,270h,90t/data=!3m7!1e1!3m5!1sj0idWoOFRii2kk5D5hUPjw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3Dj0idWoOFRii2kk5D5hUPjw%26cb_client%3Dmaps_sv.tactile.gps%26w%3D203%26h%3D100%26yaw%3D352.25574%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656!4m7!3m6!1s0x182f170b7e07594d:0xd731a6458ca8e20b!8m2!3d-1.2626239!4d36.8508777!10e5!16s%2Fg%2F11tg0s1v9n?coh=205409&entry=ttu";
            break;
        case "ProjectKiamaiko":
            mapUrl = "https://www.google.com/maps/place/Huruma+jonsaga+auto/@-1.2590005,36.8742319,3a,90y,91.53t/data=!3m7!1e1!3m5!1s2hCrqlSpdzWgrjpdUxOfTw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D2hCrqlSpdzWgrjpdUxOfTw%26cb_client%3Dsearch.gws-prod.gps%26w%3D360%26h%3D120%26yaw%3D106.95775%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192!4m10!1m2!2m1!1sJonsaga+!3m6!1s0x182f14240b7ee183:0x38805fe3af7560cd!8m2!3d-1.2591252!4d36.8746467!15sCgdKb25zYWdh4AEA!16s%2Fg%2F11rq8y9wjz?coh=205409&entry=ttu";            break;
        default:
            mapUrl = "https://www.google.com/maps/@-1.2610873,36.8589792,3a,75y,90t/data=!3m6!1e1!3m4!1shk2JHjJ81CgWoT5RYHScjQ!2e0!7i16384!8i8192?coh=205409&entry=ttu&g_ep=EgoyMDI0MDgyMC4xIKXMDSoASAFQAw%3D%3D"; // Handle the case where no project is selected
    }
    if (mapUrl) {
        window.location.href = mapUrl;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const nextBtn = document.getElementById("nextBtn");

    if (!nextBtn) {
        console.error("Element with ID 'nextBtn' not found.");
        return;
    }

    nextBtn.addEventListener("click", function() {
        const serviceType = document.getElementById("serviceDirection").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        if (currentTab == 6 && paymentMethod === "Project Data") {
            handleUploadSubmission();
        } else {
            nextPrev(1);
        }
    });
});
