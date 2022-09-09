import "../../styles/adblock/adblock.scss";
import React from "react";

const AdBlockModal = () => {
  return (
    <section class="ad_block_detecter">
      <div class="ad_block_detecter_message">
        <div class="first">
          <h1>Please disable ad block and reload the page, thanks</h1>
        </div>
      </div>
    </section>
  );
};

export default AdBlockModal;
