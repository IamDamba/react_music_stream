import React from "react";

const AddCartModal = () => {
  return (
    <section className="add_cart">
      <div className="content">
        <button>close</button>
        <div className="choices">
          <p>What license do yo want ?</p>
          <ul>
            <li>
              <button>licence 1</button>
            </li>
            <li>
              <button>licence 2</button>
            </li>
            <li>
              <button>licence 3</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AddCartModal;
