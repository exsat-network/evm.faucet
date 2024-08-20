import { nonce, send, sendBtc } from "../actions";
import { session } from "../config";
import { toJSON } from "../utils";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export const revalidate = 1;

const CLAIMS_FILE = path.join(process.cwd(), "claims.json");

async function getClaimsData() {
  try {
    const data = await fs.readFile(CLAIMS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

async function saveClaimsData(data) {
  await fs.writeFile(CLAIMS_FILE, JSON.stringify(data, null, 2));
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
      const { to, chain } = await request.json();
      if (!to) throw "to is required";

      const claims = await getClaimsData();
      const lastClaim = claims[to];
      const now = Date.now();

      if (lastClaim && now - lastClaim < 24 * 60 * 60 * 1000) {
        throw "You can only claim once per day";
      }

   
      const response = await session(chain).transact({ action: sendBtc(to) });

 
      claims[to] = now;
      await saveClaimsData(claims);

      return toJSON(response);
    } catch (e) {
      const message =
        e?.message?.replace("assertion failure with message: ", "") || e;
      return new Response(message, { status: 400 });
    }
}
