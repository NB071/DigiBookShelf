import "./SideShareReading.scss";
import "react-circular-progressbar/dist/styles.css";

// icons
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
export default function SideShareReading({ recentBooks, token, triggerRerender }) {

  // const handleDelete = async(book) => {
  //   try {
  //     // await axios
  //     // .delete(`${process.env.REACT_APP_API_URL}/api/user/books/`, {
  //     //   headers: { Authorization: `bearer ${token}` },
  //     //   data: {
  //     //     book_id: book,
  //     //   },
  //     // }) 
  //     triggerRerender()

  //   } catch (error) {
  //     console.log(error);
  //   } 
  // };

  return (
    <section className="side-share-reading">
      <h2 className="side-share-reading__heading">Share reading</h2>
      <button
        className="side-share-reading__CTA"
        type="button"
      >
        <GroupsRoundedIcon /> Explore
      </button>

    </section>
  );
}
