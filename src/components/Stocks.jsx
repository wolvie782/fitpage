import { Button, Dialog, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import { APIURL } from "./constants/apiConstants";
import axios from "axios";
import {
  getFromSessionStorage,
  renderCriteriaText,
  setToSessionStorage,
} from "./utility/utility";
import "./Stocks.css";
const Stocks = (props) => {
  const [message, setMessage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [indexData, setIndexData] = useState(0);
  let stocksData = [];

  const handleOnclick = (event, key) => {
    setIsOpen(true);
    setIndexData(key);
    console.log(event.target);
    console.log("key index: ", key);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  stocksData = getFromSessionStorage("stocks");
  useEffect(() => {
    // on page load we will call get api to get all the data required
    if (stocksData?.length === 0 || stocksData?.length == undefined)
      axios.get(APIURL.GETALL).then(
        (response) => {
          //once we get the response we are placing it inside sessionstorage so that we dont have to call it again and again
          setToSessionStorage("stocks", response.data);
          setMessage(response.data);
        },
        [message]
      );
  });
  console.log(stocksData, "message");

  return (
    <div className="phoneSection">
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          style={{
            minWidth: 400,
            background: "white",
          }}
        >
          <div className="phoneSection popup">
            <div class="header-section">
              <div class="header">
                {" "}
                <li
                  key={stocksData?.[indexData]}
                  style={{
                    display: "block",
                  }}
                >
                  {stocksData?.[indexData]?.name || " "}
                </li>
              </div>
              <div class="subtext green">
                {" "}
                <li
                  className="subtext"
                  key={stocksData?.[indexData]}
                  style={{
                    color: `${stocksData?.[indexData]?.color}`,
                  }}
                >
                  {stocksData?.[indexData]?.tag || " "}
                </li>
              </div>
            </div>
            <div class="body-section">
              {stocksData?.[indexData]?.criteria.length != 0 &&
              stocksData?.[indexData]?.criteria?.[0].type === "plain_text"
                ? stocksData?.[indexData]?.criteria.map((data, key) => {
                    return (
                      <div>
                        <li
                          key={key}
                          style={{
                            display: "block",
                          }}
                        >
                          {data?.text || " "}
                        </li>
                        <div class="subtext margin-btm-10">
                          {stocksData?.[indexData]?.criteria?.length - 1 === key
                            ? ""
                            : "and"}
                        </div>
                      </div>
                    );
                  })
                : stocksData?.[indexData]?.criteria?.[0]?.variable?.length != 0
                ? stocksData?.[indexData]?.criteria.map(
                    (criteriaItem, index) => (
                      <div key={index} className="margin-btm-10">
                        {renderCriteriaText(criteriaItem)}
                      </div>
                    )
                  )
                : stocksData?.[indexData]?.criteria.text || " "}
            </div>
          </div>
          <DialogActions>
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </Dialog>
      )}
      <ul className="headers text">
        {stocksData?.map((stocksData, index) => {
          return (
            <div
              className="headersLi"
              onClick={(event) => handleOnclick(event, index)}
            >
              <li
                key={stocksData?.id}
                style={{
                  display: "block",
                }}
              >
                {stocksData?.name || " "}
              </li>
              <li
                className="subtext"
                key={stocksData?.id}
                style={{
                  color: `${stocksData?.color}`,
                }}
              >
                {stocksData?.tag || " "}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Stocks;
