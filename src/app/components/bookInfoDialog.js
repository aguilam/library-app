'use client'

const dataInfoDialog = ({ data }) => {
  console.log('Input', data);
  return (
    <div>
      <dialog open >
        <div>
          <img src={data.coverUrl} alt={data.title} />
          <p>{data.pages}</p>
          <p>{data.rating_average}</p>
        </div>
        <div>
          <h2>{data.title}</h2>
          <p>{data.authors?.join(', ')}</p>
          <p>{data.publishYear}</p>
          <p>У этой книги нету описания</p>
        </div>
      <form method="dialog">
        <button>X</button>
      </form>
    </dialog>
    </div>
  );
}
export default dataInfoDialog;