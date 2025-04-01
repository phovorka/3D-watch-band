document.getElementById('textureUpload').addEventListener('change', async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
      const modelViewer = document.querySelector('#watchModel');
      await modelViewer.updateComplete;
      
       // Wait for the model to be fully loaded
       const model = modelViewer.model;
      if (model) {
        // Check the materials of the model
        const material = model.materials[1];
        if (material) {
       //   const texture = await modelViewer.createTexture(e.target.result);
       //   material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
       //   material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]); // Ensure neutral base color to apply the texture correctly

        } else {
          console.warn("Material not found. Check the model structure.");
        }
  
      }
    };
    reader.readAsDataURL(file);
  });


  
  const textureInput = document.getElementById('texture-input');
  const modelViewer = document.querySelector('#watchModel');
  
  textureInput.addEventListener('change', (event) => {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onload = (e) => {
  const texture = new Image();
  texture.onload = () => {
    // Vytvoríme novú textúru z obrázka
    const textureInfo = {
      texture: texture,
      sampler: { magFilter: 'linear', minFilter: 'linear_mipmap_linear' },
    };
    // Aplikujeme textúru na materiál (predpokladáme, že má názov "Material")
    modelViewer.model.materials[1].pbrMetallicRoughness.baseColorTexture.texture = textureInfo.texture;
    modelViewer.model.materials[1].pbrMetallicRoughness.baseColorTexture.sampler = textureInfo.sampler;
  };
  texture.src = e.target.result;
};
reader.readAsDataURL(file);
}
});