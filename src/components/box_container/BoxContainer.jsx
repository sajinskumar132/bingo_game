import React, { useEffect, useState } from "react";
import "./boxContainerStyle.css";
import { FunctionalityHelpers } from "../../helpers/FunctionalityHelpers";

function BoxContainer({ sequences, update_selected_number,is_bot,bot_generated_value }) {
  var bingoText = "BINGO";
  return (
    <div className="main_box_container">
      
      <div className="grid_conatiner_header_text">
        {bingoText.split("").map((item,index) => (
          <p style={{color:sequences?.selectedWinSequences[index] ?'red':'black'}}>{item}</p>
        ))}
      </div>
      <div className="grid_main_container">
        <>
        {is_bot && (
        <div className="grid_bot_visibility_container">
          <p>BOT</p>
          <p>Generated Value : {bot_generated_value}</p>
        </div>
      )}
       {sequences?.randomNumbers?.map((item, index) => {
          let getLastRowStartIndex =(sequences?.randomNumbers?.length / 5 - 1) * 5;
          let winNumberList= FunctionalityHelpers.MergeArrays(sequences?.selectedWinSequences)
          return (
            <div
              className={
                index + 1 == 25
                  ? ""
                  : getLastRowStartIndex < index + 1
                  ? "sub_grid_containers_with_right_border"
                  : (index + 1) % 5 == 0
                  ? "sub_grid_containers_with_botton_border"
                  : "sub_grid_containers_with_right_botton_border"
              }
              style={{
                backgroundColor: winNumberList?.includes(item)?'red':sequences?.selectedNumbers?.includes(item)
                  ? "green"
                  : "white",
                color:  winNumberList?.includes(item) || sequences?.selectedNumbers?.includes(item)
                  ? "white"
                  : "black",
                cursor: winNumberList?.includes(item) || sequences?.selectedNumbers?.includes(item)
                  ? "none"
                  : "pointer",
              }}
              onClick={() => {
                update_selected_number(!is_bot, item);
              }}
            >
              <p>{item}</p>
            </div>
          );
        })}
        </>
       
      </div>
    </div>
  );
}

export default BoxContainer;
