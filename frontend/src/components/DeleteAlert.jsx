function DeleteAlert({ content, deleteHandler }) {
  return (
    <div>
      <p className="text-sm">{content} </p>
      <div className="mt-6 flex justify-end">
        <button
          className="add-btn add-btn-fill bg-red-600"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteAlert;
