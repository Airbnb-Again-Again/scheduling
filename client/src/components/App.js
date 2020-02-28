import React, { useState, useEffect } from "react";
import Checkout from "./Checkout";
import Calendar from "./Calendar";
import axios from "axios";

export default function App() {
  const [accommodation, setAccommodation] = useState(null);
  const n = Math.floor(Math.random() * Math.floor(99));

  useEffect(() => {
    let randomListing = Math.floor(Math.random() * 1000);
    axios
      .get(`/api/listings/${randomListing}/bookings`)
      .then(res => {
        return res.json();
      })
      .then(accommodations => {
        setAccommodation(accommodations[n]);
      });
  }, []);

  return (
    <div className="App">
      {accommodation && <Checkout accommodation={accommodation} />}
    </div>
  );
}
