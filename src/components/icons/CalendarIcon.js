import * as React from "react";
const SvgCalendarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <mask
      id="calendar-icon_svg__a"
      width={22}
      height={22}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h22v22H0z" />
    </mask>
    <g mask="url(#calendar-icon_svg__a)">
      <path
        fill="#777B83"
        d="M20.46 2.64h-1.98V.44a.44.44 0 1 0-.88 0v2.2H4.4V.44a.44.44 0 0 0-.88 0v2.2H1.54C.69 2.64 0 3.33 0 4.18v16.28C0 21.31.69 22 1.54 22h18.92c.85 0 1.54-.69 1.54-1.54V4.18c0-.85-.69-1.54-1.54-1.54m-18.92.88h1.98v1.32a.44.44 0 0 0 .88 0V3.52h13.2v1.32a.44.44 0 1 0 .88 0V3.52h1.98a.66.66 0 0 1 .66.66v2.86H.88V4.18a.66.66 0 0 1 .66-.66Zm18.92 17.6H1.54a.66.66 0 0 1-.66-.66V7.92h20.24v12.54a.66.66 0 0 1-.66.66"
      />
    </g>
    <path
      fill="#777B83"
      d="M3.078 10.12h1.76v1.76h-1.76v-1.76M6.602 10.12h1.76v1.76h-1.76v-1.76M10.121 10.12h1.76v1.76h-1.76v-1.76M13.64 10.12h1.76v1.76h-1.76v-1.76M17.16 10.12h1.76v1.76h-1.76v-1.76M3.078 13.64h1.76v1.76h-1.76v-1.76M6.602 13.64h1.76v1.76h-1.76v-1.76M10.121 13.64h1.76v1.76h-1.76v-1.76M13.64 13.64h1.76v1.76h-1.76v-1.76M17.16 13.64h1.76v1.76h-1.76v-1.76M3.078 17.16h1.76v1.76h-1.76v-1.76M6.602 17.16h1.76v1.76h-1.76v-1.76M10.121 17.16h1.76v1.76h-1.76v-1.76M13.64 17.16h1.76v1.76h-1.76v-1.76M17.16 17.16h1.76v1.76h-1.76v-1.76"
    />
  </svg>
);
export default SvgCalendarIcon;
