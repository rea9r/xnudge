import { describe, expect, it } from "vitest";
import { buildAtomicOverrides } from "./detect";

const PREFIX = `html[data-xnudge-active="1"]`;

describe("buildAtomicOverrides", () => {
  it("emits an override for an atomic class with a black background", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-kemksi", backgroundColor: "rgb(0, 0, 0)" }],
      PREFIX,
    );
    expect(out).toEqual([
      `${PREFIX} .r-kemksi { background-color: #15202B !important; }`,
    ]);
  });

  it("emits an override for atomic :hover classes", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-abc123:hover", backgroundColor: "rgb(15, 20, 25)" }],
      PREFIX,
    );
    expect(out).toEqual([
      `${PREFIX} .r-abc123:hover { background-color: #15202B !important; }`,
    ]);
  });

  it("ignores non-atomic selectors", () => {
    const out = buildAtomicOverrides(
      [
        { selector: "body", backgroundColor: "rgb(0, 0, 0)" },
        { selector: ".r-abc.r-xyz", backgroundColor: "rgb(0, 0, 0)" },
        { selector: ".r-abc > div", backgroundColor: "rgb(0, 0, 0)" },
        { selector: "#root", backgroundColor: "rgb(0, 0, 0)" },
      ],
      PREFIX,
    );
    expect(out).toEqual([]);
  });

  it("ignores atomic classes whose background is not dark", () => {
    const out = buildAtomicOverrides(
      [
        { selector: ".r-light", backgroundColor: "rgb(255, 255, 255)" },
        { selector: ".r-mid", backgroundColor: "rgb(120, 120, 120)" },
      ],
      PREFIX,
    );
    expect(out).toEqual([]);
  });

  it("ignores rules without a backgroundColor", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-noop", backgroundColor: "" }],
      PREFIX,
    );
    expect(out).toEqual([]);
  });

  it("deduplicates repeated selectors", () => {
    const out = buildAtomicOverrides(
      [
        { selector: ".r-dup", backgroundColor: "rgb(0, 0, 0)" },
        { selector: ".r-dup", backgroundColor: "rgb(0, 0, 0)" },
      ],
      PREFIX,
    );
    expect(out).toHaveLength(1);
  });

  it("classifies translucent atomic backgrounds", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-overlay", backgroundColor: "rgba(0, 0, 0, 0.7)" }],
      PREFIX,
    );
    expect(out).toEqual([
      `${PREFIX} .r-overlay { background-color: rgba(21, 32, 43, 0.7) !important; }`,
    ]);
  });

  it("maps various dark levels to navy/gray0/gray100", () => {
    const out = buildAtomicOverrides(
      [
        { selector: ".r-1", backgroundColor: "rgb(0, 0, 0)" },
        { selector: ".r-2", backgroundColor: "rgb(32, 35, 39)" },
        { selector: ".r-3", backgroundColor: "rgb(39, 44, 48)" },
      ],
      PREFIX,
    );
    expect(out).toEqual([
      `${PREFIX} .r-1 { background-color: #15202B !important; }`,
      `${PREFIX} .r-2 { background-color: #1F2833 !important; }`,
      `${PREFIX} .r-3 { background-color: #38444D !important; }`,
    ]);
  });
});
