(function () {
  var GOLD = [1, 0.796, 0.161, 1];
  var mv = document.getElementById('hero-bust');
  if (!mv) return;

  function applyGold() {
    if (!mv.model) return;
    mv.model.materials.forEach(function (material) {
      material.pbrMetallicRoughness.setBaseColorFactor(GOLD);
      material.pbrMetallicRoughness.setMetallicFactor(1);
      material.pbrMetallicRoughness.setRoughnessFactor(0.35);
    });
  }

  if (mv.loaded) {
    applyGold();
  } else {
    mv.addEventListener('load', applyGold);
  }
})();
