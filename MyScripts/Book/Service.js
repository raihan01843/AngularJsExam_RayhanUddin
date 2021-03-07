

//Service to get data from book mvc controller
myapp.service('bookService', function ($http) {


    //read book
    this.getAllBooks = function () {
        return $http.get('/Book/GetBook');
    }

    //add new book
    this.save = function (Book) {
        var request = $http({
            method: 'post',
            url: '/Book/Insert',
            data: Book
        });
        return request;
    }

    //update Book records
    this.update = function (Book) {
        var updaterequest = $http({
            method: 'post',
            url: '/Book/Update',
            data: Book
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateBookNo) {
        return $http.post('/Book/Delete/' + UpdateBookNo);
    }
});
