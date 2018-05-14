$("#create-thing").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newThing = {
        thing: $("#create-thing [name=create]").val().trim()};
    // Send the POST request.
    $.ajax("/new", {
        type: "POST",
        data: newThing
    }).then(
        function () {
            console.log("created new thing!");
            // Reload the page to get the updated list
            location.reload();
        });
});

$("#edit-thing").on("submit", function (event) {
    event.preventDefault();
    var id = $("[name=id]").val().trim();
    var updatedThing = {
        thing: $("#edit-thing [name=edit-thing-field]").val().trim()};
    $.ajax("/things/" + id, {
        type: "PUT",
        data: updatedThing
    }).then(
        function () {
            console.log("created new thing!");
            // Reload the page to get the updated list
            location.reload();
        });
});

$(".delete-button").on("click", function (event) {
    var id = $(this).data("thingid");

    $.ajax("/things/" + id, {
        type: "DELETE"
    }).then( function() {
            console.log("Deleted ID: " + id);
            location.reload();
    });
});