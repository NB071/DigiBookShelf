import "./SideShareReading.scss";
import "react-circular-progressbar/dist/styles.css";

// libs
import { motion } from "framer-motion";
import {
  fadeInVariant,
  pageVariant,
  slideVariant,
} from "../../../pageVariants/variants";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";

// icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
export default function SideShareReading({ recentBooks, token, triggerRerender }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const handleSelectedBook = (book) => {
    setSelectedBook(book);
  };

  const openModal = () => {
    setOpenEditModal(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setOpenEditModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleDelete = async(book) => {
    try {
      await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/books/`, {
        headers: { Authorization: `bearer ${token}` },
        data: {
          book_id: book,
        },
      }) 
      triggerRerender()

    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <section className="side-share-reading">
      <h2 className="side-share-reading__heading">Share reading</h2>
      <button
        className="side-share-reading__CTA"
        type="button"
        onClick={openModal}
      >
        <GroupsRoundedIcon /> Explore
      </button>

    </section>
  );
}
