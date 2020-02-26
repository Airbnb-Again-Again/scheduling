import { check, sleep } from "k6";
import http from "k6/http";

export default function() {
  let res = http.post("https://localhost:3000/");
  check(res, {
    "is status 200": r => r.status === 200
  });
  sleep(1);
}
