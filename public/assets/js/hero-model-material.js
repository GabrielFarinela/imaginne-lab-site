(function () {
  var MARBLE = [0.92, 0.87, 0.79, 1];
  var mv = document.getElementById('hero-bust');
  if (!mv) return;

  function applyMarble() {
    if (!mv.model) return;
    mv.model.materials.forEach(function (material) {
      material.pbrMetallicRoughness.setBaseColorFactor(MARBLE);
      material.pbrMetallicRoughness.setMetallicFactor(0);
      material.pbrMetallicRoughness.setRoughnessFactor(0.55);
    });
  }

  if (mv.loaded) {
    applyMarble();
  } else {
    mv.addEventListener('load', applyMarble);
  }
})();
