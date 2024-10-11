import { nonce, send, sendBtc } from "../actions";
import { session } from "../config";
import { toJSON } from "../utils";
import fs from "fs/promises";
import path from "path";
import axios from "axios";

export const runtime = "nodejs";

export const revalidate = 1;

const CLAIMS_FILE = path.join(process.cwd(), "claims.json");

const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY;
if (!process.env.HCAPTCHA_SECRET_KEY)
  throw new Error("HCAPTCHA_SECRET_KEY is required");
interface ClaimRecord {
  lastClaim: number;
  count: number;
}

interface ClaimsData {
  accounts: { [address: string]: number };
  ips: { [ip: string]: ClaimRecord };
}

async function getClaimsData() {
  try {
    const data = await fs.readFile(CLAIMS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
     return { accounts: {}, ips: {} };
  }
}

async function saveClaimsData(data: ClaimsData) {
  await fs.writeFile(CLAIMS_FILE, JSON.stringify(data, null, 2));
}

function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return "unknown";
}



async function verifyHCaptcha(token: string) {
  const verifyUrl = "https://hcaptcha.com/siteverify";
  const data = new URLSearchParams();
  data.append("secret", HCAPTCHA_SECRET_KEY!);
  data.append("response", token);

  try {
    const response = await axios.post(verifyUrl, data);
    return response.data.success;
  } catch (error) {
    console.error("hCaptcha verification error:", error);
    return false;
  }
}

export async function POST(request: Request) {
    // try {
    //     const { to, chain } = await request.json();
    //     if ( !to ) throw "to is required";
    //     // const actions = [ send(to), nonce() ];
    //     const response = await session(chain).transact({action:sendBtc(to)})
    //     return toJSON(response);
    // } catch (e) {
    //     const message = e?.message?.replace("assertion failure with message: ", "") || e;
    //     return new Response(message, {status: 400});
    // }
    try {
      const { to, chain, hcaptchaToken } = await request.json();
      if (!to) throw "to is required";

       if (!hcaptchaToken) {
         throw "Missing required parameters" ;
       }

       const isHuman = await verifyHCaptcha(hcaptchaToken);

       if (!isHuman) {
       throw "hCaptcha verification failed" ;
       }

      const claims = await getClaimsData();
      const clientIP = getClientIP(request);
      console.log(clientIP)
      const now = Date.now();
      const oneDayAgo = now - 24 * 60 * 60 * 1000;
    
      if (claims.accounts[to] && claims.accounts[to] > oneDayAgo) {
        throw "This account can only claim once per day";
      }

      const ipRecord = claims.ips[clientIP] || { lastClaim: 0, count: 0 };
      if (ipRecord.lastClaim <= oneDayAgo) {
        ipRecord.count = 0; // 重置计数
      }
      if (ipRecord.count >= 3) {
        throw "This IP has reached the daily claim limit";
      }

      const response = await session(chain).transact({ action: sendBtc(to) });

      claims.accounts[to] = now;
      claims.ips[clientIP] = {
        lastClaim: now,
        count: ipRecord.count + 1,
      };
      await saveClaimsData(claims);

      return toJSON(response);
    } catch (e) {
      const message =
        e?.message?.replace("assertion failure with message: ", "") || e;
      return new Response(message, { status: 400 });
    }
}
