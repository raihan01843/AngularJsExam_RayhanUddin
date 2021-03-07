using AngularJsExam_Rayhan.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJsExam_Rayhan.Controllers
{
    public class BookController : Controller
    {
        // GET Book/GetBook
        [HttpGet]
        public JsonResult GetBook()
        {
            using (BookContext db = new BookContext())
            {
                List<Book> bookList = db.Books.ToList();
                return Json(bookList, JsonRequestBehavior.AllowGet);
            }

        }

        //POST Book/AddBook 
        [HttpPost]
        public JsonResult Insert(Book book)
        {
            if (book != null)
            {
                using (BookContext db = new BookContext())
                {
                    db.Books.Add(book);
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                return Json(new { success = false });
            }
        }


        //POST Book/Update     
        [HttpPost]
        public JsonResult Update(Book updatedBook)
        {
            using (BookContext db = new BookContext())
            {
                Book existingBook = db.Books.Find(updatedBook.ID);
                if (existingBook == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    existingBook.Name = updatedBook.Name;
                    existingBook.Price = updatedBook.Price;
                    existingBook.Quantity = updatedBook.Quantity;
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }

        //POST Book/Delete/1
        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (BookContext db = new BookContext())
            {
                Book book = db.Books.Find(id);
                if (book == null)
                {
                    return Json(new { success = false });
                }
                db.Books.Remove(book);
                db.SaveChanges();
                return Json(new { success = true });
            }

        }
    }
}