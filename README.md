Amalgamatr.js
==========

Takes in a list of colors, and selects one that fits within the specified percentage.

Usage:
```
  var colors = ['#ff0000', '#00ff00', '#0000ff'];
  var newColor = $.ColorFromGradient(colors, 0.25);
```

Works with some standard color names, hex colors, rgb() and rgba().  Outputs a color using rgba().
