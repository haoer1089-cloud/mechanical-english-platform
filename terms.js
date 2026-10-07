/* Mechanical English · Unit 1 Lesson 1 core terminology tree.
   A teaching classification tree: Metal -> Ferrous / Non-ferrous -> materials.
   Connections are derived from parentId; there is no cross-link relation network. */
globalThis.termGraph = {
  "1/1": {
    nodes: [
      { id: "metal", term: "Metal", variants: ["metal", "metals"], cn: "金属", definition: "A material valued for its strength and toughness, widely used in industry.", parentId: null, sourceBlock: "u1-p2", subtitle: "" },
      { id: "ferrous-metals", term: "Ferrous metals", variants: ["ferrous metal", "ferrous metals"], cn: "黑色金属", definition: "A metal consisting of iron combined with some other elements.", parentId: "metal", sourceBlock: "u1-p5", subtitle: "Contains iron" },
      { id: "nonferrous-metals", term: "Nonferrous metals", variants: ["nonferrous metal", "nonferrous metals"], cn: "有色金属", definition: "All the other metals that do not contain iron.", parentId: "metal", sourceBlock: "u1-p5", subtitle: "No iron" },
      { id: "iron", term: "Iron", variants: ["iron"], cn: "铁", definition: "The most important engineering metal (Fe).", parentId: "ferrous-metals", sourceBlock: "u1-p5", subtitle: "Fe" },
      { id: "steel", term: "Steel", variants: ["steel"], cn: "钢", definition: "An iron-based alloy widely used for strength.", parentId: "ferrous-metals", sourceBlock: "u1-p2", subtitle: "Iron-based alloy" },
      { id: "copper", term: "Copper", variants: ["copper"], cn: "铜", definition: "A nonferrous metal (Cu).", parentId: "nonferrous-metals", sourceBlock: "u1-p5", subtitle: "Cu" },
      { id: "aluminum", term: "Aluminum", variants: ["aluminum"], cn: "铝", definition: "A nonferrous metal (Al).", parentId: "nonferrous-metals", sourceBlock: "u1-p5", subtitle: "Al" },
      { id: "lead", term: "Lead", variants: ["lead"], cn: "铅", definition: "A nonferrous metal (Pb).", parentId: "nonferrous-metals", sourceBlock: "u1-p5", subtitle: "Pb" },
      { id: "zinc", term: "Zinc", variants: ["zinc"], cn: "锌", definition: "A nonferrous metal (Zn).", parentId: "nonferrous-metals", sourceBlock: "u1-p5", subtitle: "Zn" },
      { id: "tin", term: "Tin", variants: ["tin"], cn: "锡", definition: "A nonferrous metal (Sn).", parentId: "nonferrous-metals", sourceBlock: "u1-p5", subtitle: "Sn" }
    ]
  }
};