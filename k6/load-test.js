import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 },  // montée à 20 utilisateurs
    { duration: "20s", target: 20 },  // maintien
    { duration: "10s", target: 0 },   // descente
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% des requêtes < 500ms
    http_req_failed: ["rate<0.01"],   // moins de 1% d'erreurs
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:80";

export default function () {
  const res = http.get(BASE_URL);
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(1);
}