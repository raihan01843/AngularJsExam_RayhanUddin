

//book controller
myapp.controller('book-controller', function ($scope, bookService) {

    //Loads all Book records when page loads
    loadBooks();

    function loadBooks() {
        var BookRecords = bookService.getAllBooks();
        BookRecords.then(function (d) {
            $scope.Books = d.data;
        },
            function () {
                alert("Error occured while fetching book list...");
            });
    }

    //save book data 
    $scope.save = function () {
        var Book = {
            BookNo: $scope.BookNo,
            Name: $scope.Name,           
            Price: $scope.Price,
            Quantity: $scope.Quantity
            
        };
        var saverecords = bookService.save(Book);
        saverecords.then(function (d) {
            if (d.data.success === true) {
                loadBooks();
                alert("Book added successfully");
                $scope.resetSave();
            }
            else { alert("Book not added."); }
        },
            function () {
                alert("Error occurred while adding book.");
            });
    }

    //reset controls after save operation
    $scope.resetSave = function () {
        $scope.BookNo = '';
        $scope.Name = '';
        $scope.Price = '';
        $scope.Quantity = '';
    }

    //get single record by ID
    $scope.getForUpdate = function (Book) {
        $scope.UpdateBookNo = Book.ID;
        $scope.UpdateName = Book.Name;
        $scope.UpdatePrice = Book.Price;
        $scope.UpdateQuantity = Book.Quantity;
    }

    //get data for delete confirmation
    $scope.getForDelete = function (Book) {
        $scope.UpdateBookNo = Book.ID;
        $scope.UpdateName = Book.Name;
        $scope.UpdatePrice = Book.Price;
        $scope.UpdateQuantity = Book.Quantity;
    }

    //update Book data
    $scope.update = function () {
        var Book = {
            ID: $scope.UpdateBookNo,
            Name: $scope.UpdateName,
            Price: $scope.UpdatePrice,
            Quantity: $scope.UpdateQuantity
        };
        var updaterecords = bookService.update(Book);
        updaterecords.then(function (d) {
            if (d.data.success === true) {
                loadBooks();
                alert("Book updated successfully");
                $scope.resetUpdate();
            }
            else {
                alert("Book not updated.");
            }
        },
            function () {
                alert("Error occured while updating bok record");
            });
    }

    //reset controls after update
    $scope.resetUpdate = function () {
        $scope.UpdateBookNo = '';
        $scope.UpdateName = '';
        $scope.UpdatePrice = '';
        $scope.UpdateQuantity = '';
    }

    //delete Book record
    $scope.delete = function (UpdateBookNo) {
        var deleterecord = bookService.delete($scope.UpdateBookNo);
        deleterecord.then(function (d) {
            if (d.data.success === true) {
                loadBooks();
                alert("Book deleted succussfully");
            }
            else {
                alert("Book not deleted.");
            }
        });
    }
});
