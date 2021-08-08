export var defaultOpacity = .5;

export var highlightZoom = 14;

export var dsaRed = "#ec1f27";
export var dsaYellow = "#fad434";
export var color4 = dsaRed;
export var color3 = "#dc7270";
export var color2 = "#866b85";
export var color1 = "#1e1231";
export var black = "#000";
export var white = "#fff";
export var gray = "#808080";

export var defaultColors = [
    "case",
      [">=", ["to-number", ["get", 'num_asc_properties']], 100],
      color4,
      [">=", ["to-number", ["get", 'num_asc_properties']], 10],
      color3,
      [">=", ["to-number", ["get", 'num_asc_properties']], 3],
      color2,
      [">", ["to-number", ["get", 'num_asc_properties']], 0],
      color1,
      white
  ];