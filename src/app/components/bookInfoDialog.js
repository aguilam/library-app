'use client'

const BookInfoDialog = ({ data }) => {
  console.log('Input', data);
  return (
    <div>
      <dialog open>
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
    </dialog>
    </div>
  );
}
export default BookInfoDialog;