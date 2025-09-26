export default async function handler(req, res) {
  const GAS = "https://script.google.com/macros/s/AKfycbx__tJ6r4cy4_qWWe64ARYa9CNI9qlmctZ8WvsKWIk7SmOPLhXHN_oUAEPM_Y2mpi6Hxw/exec";
  const url = `${GAS}?action=ping`;
  const t0 = Date.now();
  try {
    const ac = new AbortController();
    const to = setTimeout(() => ac.abort(), 4000);
    const r = await fetch(url, { signal: ac.signal, cache: "no-store" });
    const txt = await r.text().catch(()=>"(no text)");
    clearTimeout(to);
    return res.status(200).send(`status=${r.status} elapsed=${Date.now()-t0}ms\n${txt}`);
  } catch (e) {
    return res.status(500).send(`fetch failed elapsed=${Date.now()-t0}ms\n${String(e)}`);
  }
}
