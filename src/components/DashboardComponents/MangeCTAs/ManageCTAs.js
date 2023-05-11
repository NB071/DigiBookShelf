
import {Link} from "react-router-dom";

import "./ManageCTAs.scss"

//icons - images
import AddBookImage from "../../../assets/Images/putInShelf.jpg";
import EditBookImage from "../../../assets/Images/EditBook.jpg";
import DeleteBookImage from "../../../assets/Images/DeleteBookshelf.jpeg";

export default function ManageCTAs() {
    return (
        <section className="manage-CTA">
        <div className="manage-CTA__container">
          <h2 className="manage-CTA__heading">Manage</h2>
          <div className="manage-CTA__option-wrapper">
            
            <Link to="/manage">
              <div className="manage-CTA__option manage-CTA__option--add">
                <img
                  src={AddBookImage}
                  className="manage-CTA__option-side-image"
                  alt="Add a book pic"
                />
                <h3 className="manage-CTA__option-text">Add a book</h3>
              </div>
            </Link>

            <Link to="/manage">
              <div className="manage-CTA__option manage-CTA__option--edit">
                <img
                  src={EditBookImage}
                  className="manage-CTA__option-side-image"
                  alt="Add a book pic"
                />
                <h3 className="manage-CTA__option-text">Update a book</h3>
              </div>
            </Link>
            
            <Link to="/manage">
              <div className="manage-CTA__option manage-CTA__option--remove">
                <img
                  src={DeleteBookImage}
                  className="manage-CTA__option-side-image"
                  alt="Add a book pic"
                />
                <h3 className="manage-CTA__option-text">Delete a book</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    )
}