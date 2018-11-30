import history from "./history";

export default function nav(loc: string): void {
  history.push(loc);
}
