import "./ManageCTAs.scss";

//libs
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInVariant, pageVariantTop } from "../../../pageVariants/variants";

//icons - images
import AddBookImage from "../../../assets/Images/putInShelf.jpg";
import EditBookImage from "../../../assets/Images/EditBook.jpg";
import DeleteBookImage from "../../../assets/Images/DeleteBookshelf.jpeg";

export default function ManageCTAs() {
  return (
    <motion.section
      className="manage-CTA"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 0.8 }}
    >
      <div className="manage-CTA__container">
        <h2 className="manage-CTA__heading">Manage</h2>
        <div className="manage-CTA__option-wrapper">
          <Link to="/manage">
            <motion.div
              className="manage-CTA__option manage-CTA__option--add"
              initial="initial"
              animate="in"
              exit="out"
              variants={fadeInVariant}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <img
                src={AddBookImage}
                className="manage-CTA__option-side-image"
                alt="Add a book pic"
              />
              <h3 className="manage-CTA__option-text">Add a book</h3>
            </motion.div>
          </Link>

          <Link to="/manage">
            <motion.div
              className="manage-CTA__option manage-CTA__option--edit"
              initial="initial"
              animate="in"
              exit="out"
              variants={fadeInVariant}
              transition={{ duration: 0.7, delay: 0.82 }}
            >
              <img
                src={EditBookImage}
                className="manage-CTA__option-side-image"
                alt="Add a book pic"
              />
              <h3 className="manage-CTA__option-text">Update a book</h3>
            </motion.div>
          </Link>

          <Link to="/manage">
            <motion.div
              className="manage-CTA__option manage-CTA__option--remove"
              initial="initial"
              animate="in"
              exit="out"
              variants={fadeInVariant}
              transition={{ duration: 0.7, delay: 0.85 }}
            >
              <img
                src={DeleteBookImage}
                className="manage-CTA__option-side-image"
                alt="Add a book pic"
              />
              <h3 className="manage-CTA__option-text">Delete a book</h3>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
