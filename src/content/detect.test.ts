import { describe, expect, it } from "vitest";
import type { ThemeColors } from "../lib/theme/types";
import { buildAtomicOverrides } from "./detect";

const PREFIX = `html[data-xnudge-active="1"]`;

const dimColors: ThemeColors = {
  background: "#15202B",
  modal: "#1F2833",
  border: "#38444D",
  text: "#E7EDF5",
  textMuted: "#8B98A5",
  link: "#1D9BF0",
  buttonBg: "#EFF3F4",
  buttonText: "#0F1419",
};

const sepiaColors: ThemeColors = {
  background: "#F5EBDC",
  modal: "#FBF4E8",
  border: "#D4C4A8",
  text: "#2B2520",
  textMuted: "#8B7E68",
  link: "#8B5E3C",
  buttonBg: "#2B2520",
  buttonText: "#F5EBDC",
};

describe("buildAtomicOverrides", () => {
  it("emits an override for an atomic class with a black background", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-kemksi", backgroundColor: "rgb(0, 0, 0)" }],
      PREFIX,
      dimColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-kemksi { background-color: #15202B !important; }`,
    ]);
  });

  it("emits an override for atomic :hover classes", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-abc123:hover", backgroundColor: "rgb(15, 20, 25)" }],
      PREFIX,
      dimColors,
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
      dimColors,
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
      dimColors,
    );
    expect(out).toEqual([]);
  });

  it("ignores rules without a backgroundColor", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-noop", backgroundColor: "" }],
      PREFIX,
      dimColors,
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
      dimColors,
    );
    expect(out).toHaveLength(1);
  });

  it("classifies translucent atomic backgrounds", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-overlay", backgroundColor: "rgba(0, 0, 0, 0.7)" }],
      PREFIX,
      dimColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-overlay { background-color: rgba(21, 32, 43, 0.7) !important; }`,
    ]);
  });

  it("maps various dark levels to background/modal/border", () => {
    const out = buildAtomicOverrides(
      [
        { selector: ".r-1", backgroundColor: "rgb(0, 0, 0)" },
        { selector: ".r-2", backgroundColor: "rgb(32, 35, 39)" },
        { selector: ".r-3", backgroundColor: "rgb(39, 44, 48)" },
      ],
      PREFIX,
      dimColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-1 { background-color: #15202B !important; }`,
      `${PREFIX} .r-2 { background-color: #1F2833 !important; }`,
      `${PREFIX} .r-3 { background-color: #38444D !important; }`,
    ]);
  });

  it("repaints atomic backgrounds with the active preset's colors", () => {
    const out = buildAtomicOverrides(
      [
        { selector: ".r-1", backgroundColor: "rgb(0, 0, 0)" },
        { selector: ".r-2", backgroundColor: "rgb(32, 35, 39)" },
        { selector: ".r-3", backgroundColor: "rgb(39, 44, 48)" },
        { selector: ".r-4", backgroundColor: "rgba(0, 0, 0, 0.7)" },
      ],
      PREFIX,
      sepiaColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-1 { background-color: #F5EBDC !important; }`,
      `${PREFIX} .r-2 { background-color: #FBF4E8 !important; }`,
      `${PREFIX} .r-3 { background-color: #D4C4A8 !important; }`,
      `${PREFIX} .r-4 { background-color: rgba(245, 235, 220, 0.7) !important; }`,
    ]);
  });

  it("repaints atomic text colors with the active preset's text colors", () => {
    const out = buildAtomicOverrides(
      [
        {
          selector: ".r-text1",
          backgroundColor: "",
          color: "rgb(231, 233, 234)",
        },
        {
          selector: ".r-text2",
          backgroundColor: "",
          color: "rgb(113, 118, 123)",
        },
      ],
      PREFIX,
      sepiaColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-text1 { color: #2B2520 !important; }`,
      `${PREFIX} .r-text2 { color: #8B7E68 !important; }`,
    ]);
  });

  it("ignores atomic classes whose text color is unrecognized", () => {
    const out = buildAtomicOverrides(
      [
        {
          selector: ".r-other",
          backgroundColor: "",
          color: "rgb(120, 200, 50)",
        },
      ],
      PREFIX,
      dimColors,
    );
    expect(out).toEqual([]);
  });

  it("emits combined background and color in one rule", () => {
    const out = buildAtomicOverrides(
      [
        {
          selector: ".r-combined",
          backgroundColor: "rgb(0, 0, 0)",
          color: "rgb(231, 233, 234)",
        },
      ],
      PREFIX,
      sepiaColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-combined { background-color: #F5EBDC !important; color: #2B2520 !important; }`,
    ]);
  });

  it("repaints X button surface with the active preset's button colors", () => {
    const out = buildAtomicOverrides(
      [
        {
          selector: ".r-btn",
          backgroundColor: "rgb(239, 243, 244)",
          color: "rgb(15, 20, 25)",
        },
      ],
      PREFIX,
      sepiaColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-btn { background-color: #2B2520 !important; color: #F5EBDC !important; }`,
    ]);
  });

  it("darkens button and brand-blue hover backgrounds", () => {
    const out = buildAtomicOverrides(
      [
        { selector: ".r-h1:hover", backgroundColor: "rgb(215, 219, 220)" },
        { selector: ".r-h2:hover", backgroundColor: "rgb(26, 140, 216)" },
      ],
      PREFIX,
      dimColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-h1:hover { background-color: #D7DBDC !important; }`,
      `${PREFIX} .r-h2:hover { background-color: #1A8CD8 !important; }`,
    ]);
  });

  it("repaints X's dark atomic border color with the preset border", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-bdr", backgroundColor: "", borderColor: "rgb(47, 51, 54)" }],
      PREFIX,
      sepiaColors,
    );
    expect(out).toEqual([
      `${PREFIX} .r-bdr { border-color: #D4C4A8 !important; }`,
    ]);
  });

  it("ignores atomic border colors that aren't X dividers", () => {
    const out = buildAtomicOverrides(
      [{ selector: ".r-bdr", backgroundColor: "", borderColor: "rgb(0, 0, 0)" }],
      PREFIX,
      sepiaColors,
    );
    expect(out).toEqual([]);
  });
});
