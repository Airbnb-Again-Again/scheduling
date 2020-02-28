import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  hosts: { localhost: "0.0.0.0" },
  vus: 100,
  rps: 200,
  duration: "3m0s"
};

export default function() {
  let randomNum = Math.floor(Math.random() * 1000000);
  let res = http.post(
    `http://localhost:3000/api/listings/listing_id/${randomNum}`
  );
  check(res, {
    "is status 200": r => r.status === 200,
    "transaction time ok": r => r.timings.duration < 3000
  });
  sleep(1);
}
