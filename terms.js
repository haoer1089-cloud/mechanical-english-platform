/* Mechanical English · core terminology trees for all units.
   Teaching classification trees; edges are derived from parentId.
   kind: 'term' = source term, 'group' = teaching group (no text marking). */
globalThis.termGraph = {
  "1/1": {
    "title": "Metals",
    "cn": "金属",
    "rootId": "metal",
    "nodes": [
      {
        "id": "metal",
        "term": "Metal",
        "variants": [
          "metal",
          "metals"
        ],
        "cn": "金属",
        "definition": "A material valued for its strength and toughness, widely used in industry.",
        "parentId": null,
        "sourceBlock": "u1-p2",
        "subtitle": ""
      },
      {
        "id": "ferrous-metals",
        "term": "Ferrous metals",
        "variants": [
          "ferrous metal",
          "ferrous metals"
        ],
        "cn": "黑色金属",
        "definition": "A metal consisting of iron combined with some other elements.",
        "parentId": "metal",
        "sourceBlock": "u1-p5",
        "subtitle": "Contains iron"
      },
      {
        "id": "nonferrous-metals",
        "term": "Nonferrous metals",
        "variants": [
          "nonferrous metal",
          "nonferrous metals"
        ],
        "cn": "有色金属",
        "definition": "All the other metals that do not contain iron.",
        "parentId": "metal",
        "sourceBlock": "u1-p5",
        "subtitle": "No iron"
      },
      {
        "id": "iron",
        "term": "Iron",
        "variants": [
          "iron"
        ],
        "cn": "铁",
        "definition": "The most important engineering metal (Fe).",
        "parentId": "ferrous-metals",
        "sourceBlock": "u1-p5",
        "subtitle": "Fe"
      },
      {
        "id": "steel",
        "term": "Steel",
        "variants": [
          "steel"
        ],
        "cn": "钢",
        "definition": "An iron-based alloy widely used for strength.",
        "parentId": "ferrous-metals",
        "sourceBlock": "u1-p2",
        "subtitle": "Iron-based alloy"
      },
      {
        "id": "copper",
        "term": "Copper",
        "variants": [
          "copper"
        ],
        "cn": "铜",
        "definition": "A nonferrous metal (Cu).",
        "parentId": "nonferrous-metals",
        "sourceBlock": "u1-p5",
        "subtitle": "Cu"
      },
      {
        "id": "aluminum",
        "term": "Aluminum",
        "variants": [
          "aluminum"
        ],
        "cn": "铝",
        "definition": "A nonferrous metal (Al).",
        "parentId": "nonferrous-metals",
        "sourceBlock": "u1-p5",
        "subtitle": "Al"
      },
      {
        "id": "lead",
        "term": "Lead",
        "variants": [
          "lead"
        ],
        "cn": "铅",
        "definition": "A nonferrous metal (Pb).",
        "parentId": "nonferrous-metals",
        "sourceBlock": "u1-p5",
        "subtitle": "Pb"
      },
      {
        "id": "zinc",
        "term": "Zinc",
        "variants": [
          "zinc"
        ],
        "cn": "锌",
        "definition": "A nonferrous metal (Zn).",
        "parentId": "nonferrous-metals",
        "sourceBlock": "u1-p5",
        "subtitle": "Zn"
      },
      {
        "id": "tin",
        "term": "Tin",
        "variants": [
          "tin"
        ],
        "cn": "锡",
        "definition": "A nonferrous metal (Sn).",
        "parentId": "nonferrous-metals",
        "sourceBlock": "u1-p5",
        "subtitle": "Sn"
      }
    ]
  },
  "2/1": {
    "title": "Powder Metallurgy (I)",
    "cn": "粉末冶金（一）",
    "rootId": "u2-l1-core-pm",
    "nodes": [
      {
        "id": "u2-l1-core-pm",
        "term": "powder metallurgy",
        "cn": "粉末冶金",
        "kind": "term",
        "variants": [
          "powder metallurgy",
          "P/M"
        ],
        "parentId": null,
        "definition": "Parts are made by compacting and sintering powders.",
        "definitionCn": "通过压制、烧结粉末制成零件。",
        "sourceBlock": "u2-p3",
        "anchor": "Powder Metallurgy",
        "highlight": true,
        "evidenceRefs": [
          "u2-p3"
        ]
      },
      {
        "id": "u2-l1-core-inputs",
        "term": "Process inputs",
        "cn": "工艺投入",
        "kind": "group",
        "variants": [],
        "parentId": "u2-l1-core-pm",
        "definition": "Teaching group: Process inputs.",
        "definitionCn": "教学分组：工艺投入。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u2-l1-core-operations",
        "term": "Main operations",
        "cn": "主要工序",
        "kind": "group",
        "variants": [],
        "parentId": "u2-l1-core-pm",
        "definition": "Teaching group: Main operations.",
        "definitionCn": "教学分组：主要工序。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u2-l1-core-outputs",
        "term": "Forming results",
        "cn": "成形结果",
        "kind": "group",
        "variants": [],
        "parentId": "u2-l1-core-pm",
        "definition": "Teaching group: Forming results.",
        "definitionCn": "教学分组：成形结果。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u2-l1-core-powder",
        "term": "powder",
        "cn": "粉末",
        "kind": "term",
        "variants": [
          "powder",
          "powders"
        ],
        "parentId": "u2-l1-core-inputs",
        "definition": "The starting material selected and blended for P/M.",
        "definitionCn": "粉末冶金所选用和混合的起始材料。",
        "sourceBlock": "u2-p3",
        "anchor": "powders",
        "highlight": true,
        "evidenceRefs": [
          "u2-p3",
          "u2-p4"
        ]
      },
      {
        "id": "u2-l1-core-die",
        "term": "die",
        "cn": "压模",
        "kind": "term",
        "variants": [
          "die",
          "dies"
        ],
        "parentId": "u2-l1-core-inputs",
        "definition": "A die gives the compacted powder its desired shape.",
        "definitionCn": "压制时使粉末获得所需形状的模具。",
        "sourceBlock": "u2-p4",
        "anchor": "dies",
        "highlight": true,
        "evidenceRefs": [
          "u2-p4"
        ]
      },
      {
        "id": "u2-l1-core-mixing",
        "term": "mixing",
        "cn": "混合",
        "kind": "term",
        "variants": [
          "mixing"
        ],
        "parentId": "u2-l1-core-operations",
        "definition": "Selected powders are weighed and mixed before compaction.",
        "definitionCn": "压制之前对选定粉末进行称量、混合。",
        "sourceBlock": "u2-p4",
        "anchor": "mixing",
        "highlight": true,
        "evidenceRefs": [
          "u2-p4"
        ]
      },
      {
        "id": "u2-l1-core-compacting",
        "term": "compacting",
        "cn": "压制",
        "kind": "term",
        "variants": [
          "compacting",
          "compacted"
        ],
        "parentId": "u2-l1-core-operations",
        "definition": "Powders are pressed into the desired shape in dies.",
        "definitionCn": "在压模内把粉末压成所需形状。",
        "sourceBlock": "u2-p3",
        "anchor": "compacting",
        "highlight": true,
        "evidenceRefs": [
          "u2-p3"
        ]
      },
      {
        "id": "u2-l1-core-sintering",
        "term": "sintering",
        "cn": "烧结",
        "kind": "term",
        "variants": [
          "sintering",
          "sintered"
        ],
        "parentId": "u2-l1-core-operations",
        "definition": "The green compacts are heated to form sintered products.",
        "definitionCn": "对生坯加热，使其形成烧结制品。",
        "sourceBlock": "u2-p3",
        "anchor": "sintering",
        "highlight": true,
        "evidenceRefs": [
          "u2-p3",
          "u2-p4"
        ]
      },
      {
        "id": "u2-l1-core-finishing",
        "term": "finishing operations",
        "cn": "精整工序",
        "kind": "term",
        "variants": [
          "finishing operations"
        ],
        "parentId": "u2-l1-core-operations",
        "definition": "Operations after sintering improve the properties of the products.",
        "definitionCn": "在烧结后进行，以改善制品性能的工序。",
        "sourceBlock": "u2-p4",
        "anchor": "finishing operations",
        "highlight": true,
        "evidenceRefs": [
          "u2-p4"
        ]
      },
      {
        "id": "u2-l1-core-green-compact",
        "term": "green compact",
        "cn": "生坯",
        "kind": "term",
        "variants": [
          "green compact",
          "green compacts"
        ],
        "parentId": "u2-l1-core-outputs",
        "definition": "A pressed powder body before sintering.",
        "definitionCn": "粉末压制后、烧结前的坯体。",
        "sourceBlock": "u2-p4",
        "anchor": "green compacts",
        "highlight": true,
        "evidenceRefs": [
          "u2-p4"
        ]
      },
      {
        "id": "u2-l1-core-net-shape",
        "term": "net shape",
        "cn": "净形",
        "kind": "term",
        "variants": [
          "net shape"
        ],
        "parentId": "u2-l1-core-outputs",
        "definition": "A finished shape that eliminates subsequent machining.",
        "definitionCn": "成形后无需后续机械加工的形状。",
        "sourceBlock": "u2-p3",
        "anchor": "net shape",
        "highlight": true,
        "evidenceRefs": [
          "u2-p3"
        ]
      },
      {
        "id": "u2-l1-core-near-net-shape",
        "term": "near net shape",
        "cn": "近净形",
        "kind": "term",
        "variants": [
          "near net shape"
        ],
        "parentId": "u2-l1-core-outputs",
        "definition": "A shape that reduces subsequent machining.",
        "definitionCn": "成形后只需较少后续机械加工的形状。",
        "sourceBlock": "u2-p3",
        "anchor": "near net shape",
        "highlight": true,
        "evidenceRefs": [
          "u2-p3"
        ]
      }
    ],
    "processOrder": [
      "u2-l1-core-mixing",
      "u2-l1-core-compacting",
      "u2-l1-core-sintering",
      "u2-l1-core-finishing"
    ]
  },
  "2/2": {
    "title": "Powder Metallurgy (II)",
    "cn": "粉末冶金（二）",
    "rootId": "u2-l2-core-pm",
    "nodes": [
      {
        "id": "u2-l2-core-pm",
        "term": "powder metallurgy",
        "cn": "粉末冶金",
        "kind": "term",
        "variants": [
          "powder metallurgy"
        ],
        "parentId": null,
        "definition": "Metal powders are shaped and heated to produce a coherent mass.",
        "definitionCn": "把金属粉末成形并加热，得到结合成整体的材料。",
        "sourceBlock": "u2-p17",
        "anchor": "powder metallurgy",
        "highlight": true,
        "evidenceRefs": [
          "u2-p17"
        ]
      },
      {
        "id": "u2-l2-core-materials",
        "term": "Materials",
        "cn": "材料",
        "kind": "group",
        "variants": [],
        "parentId": "u2-l2-core-pm",
        "definition": "Teaching group: Materials.",
        "definitionCn": "教学分组：材料。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u2-l2-core-operations",
        "term": "Shaping and heating",
        "cn": "成形与加热",
        "kind": "group",
        "variants": [],
        "parentId": "u2-l2-core-pm",
        "definition": "Teaching group: Shaping and heating.",
        "definitionCn": "教学分组：成形与加热。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u2-l2-core-products",
        "term": "Products and uses",
        "cn": "制品与用途",
        "kind": "group",
        "variants": [],
        "parentId": "u2-l2-core-pm",
        "definition": "Teaching group: Products and uses.",
        "definitionCn": "教学分组：制品与用途。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u2-l2-core-refractory",
        "term": "refractory metals",
        "cn": "难熔金属",
        "kind": "term",
        "variants": [
          "refractory metal",
          "refractory metals"
        ],
        "parentId": "u2-l2-core-materials",
        "definition": "Metals discussed as difficult to melt completely with the available furnaces.",
        "definitionCn": "课文中因当时炉温条件而难以完全熔化的金属。",
        "sourceBlock": "u2-p19",
        "anchor": "refractory metals",
        "highlight": true,
        "evidenceRefs": [
          "u2-p19"
        ]
      },
      {
        "id": "u2-l2-core-tungsten",
        "term": "tungsten",
        "cn": "钨",
        "kind": "term",
        "variants": [
          "tungsten"
        ],
        "parentId": "u2-l2-core-materials",
        "definition": "An example of a metal produced by pressing and sintering.",
        "definitionCn": "课文列举的可用压制、烧结方法制取的金属。",
        "sourceBlock": "u2-p19",
        "anchor": "tungsten",
        "highlight": true,
        "evidenceRefs": [
          "u2-p19"
        ]
      },
      {
        "id": "u2-l2-core-pressing",
        "term": "pressing",
        "cn": "压制",
        "kind": "term",
        "variants": [
          "pressing",
          "pressed"
        ],
        "parentId": "u2-l2-core-operations",
        "definition": "Pressure shapes powders into a coherent body.",
        "definitionCn": "用压力把粉末压成结合的坯体。",
        "sourceBlock": "u2-p17",
        "anchor": "pressing",
        "highlight": true,
        "evidenceRefs": [
          "u2-p17"
        ]
      },
      {
        "id": "u2-l2-core-molding",
        "term": "molding",
        "cn": "模制成形",
        "kind": "term",
        "variants": [
          "molding"
        ],
        "parentId": "u2-l2-core-operations",
        "definition": "Powders are shaped by molding in the quoted P/M definition.",
        "definitionCn": "引述的粉末冶金定义中提到的模制成形方式。",
        "sourceBlock": "u2-p17",
        "anchor": "molding",
        "highlight": true,
        "evidenceRefs": [
          "u2-p17"
        ]
      },
      {
        "id": "u2-l2-core-sintering",
        "term": "sintering",
        "cn": "烧结",
        "kind": "term",
        "variants": [
          "sinter",
          "sintering"
        ],
        "parentId": "u2-l2-core-operations",
        "definition": "Pressed refractory metals are heated below their melting point.",
        "definitionCn": "对压制后的难熔金属在熔点以下加热。",
        "sourceBlock": "u2-p19",
        "anchor": "sinter",
        "highlight": true,
        "evidenceRefs": [
          "u2-p19"
        ]
      },
      {
        "id": "u2-l2-core-porous",
        "term": "porous shapes",
        "cn": "多孔制品",
        "kind": "term",
        "variants": [
          "porous shapes"
        ],
        "parentId": "u2-l2-core-products",
        "definition": "Products with pores can be obtained using lighter pressing or lower sintering temperatures.",
        "definitionCn": "课文指出，较低压制压力或较低烧结温度可用于获得多孔制品。",
        "sourceBlock": "u2-p19",
        "anchor": "porous shapes",
        "highlight": true,
        "evidenceRefs": [
          "u2-p19"
        ]
      },
      {
        "id": "u2-l2-core-catalysts",
        "term": "chemical catalysts",
        "cn": "化学催化剂",
        "kind": "term",
        "variants": [
          "chemical catalysts"
        ],
        "parentId": "u2-l2-core-products",
        "definition": "A use of porous materials listed in the text.",
        "definitionCn": "课文列举的多孔材料用途之一。",
        "sourceBlock": "u2-p19",
        "anchor": "chemical catalysts",
        "highlight": true,
        "evidenceRefs": [
          "u2-p19"
        ]
      },
      {
        "id": "u2-l2-core-filters",
        "term": "filtering elements",
        "cn": "过滤元件",
        "kind": "term",
        "variants": [
          "filtering elements"
        ],
        "parentId": "u2-l2-core-products",
        "definition": "Porous materials can serve as filtering elements.",
        "definitionCn": "多孔材料可用于制作过滤元件。",
        "sourceBlock": "u2-p19",
        "anchor": "filtering elements",
        "highlight": true,
        "evidenceRefs": [
          "u2-p19"
        ]
      },
      {
        "id": "u2-l2-core-bearings",
        "term": "bearings",
        "cn": "轴承",
        "kind": "term",
        "variants": [
          "bearing",
          "bearings"
        ],
        "parentId": "u2-l2-core-products",
        "definition": "Bearings are another listed application of porous materials.",
        "definitionCn": "课文列举的多孔材料用途之一。",
        "sourceBlock": "u2-p19",
        "anchor": "bearings",
        "highlight": true,
        "evidenceRefs": [
          "u2-p19"
        ]
      }
    ]
  },
  "3/1": {
    "title": "Casting",
    "cn": "铸造",
    "rootId": "u3-l1-core-casting",
    "nodes": [
      {
        "id": "u3-l1-core-casting",
        "term": "casting",
        "cn": "铸造",
        "kind": "term",
        "variants": [
          "casting"
        ],
        "parentId": null,
        "definition": "Molten metal takes the shape of the mold into which it is poured.",
        "definitionCn": "把熔融金属浇入铸型，使其取得铸型形状的成形方法。",
        "sourceBlock": "u3-p2",
        "anchor": "Casting",
        "highlight": true,
        "evidenceRefs": [
          "u3-p2",
          "u3-p5"
        ]
      },
      {
        "id": "u3-l1-core-operations",
        "term": "Foundry operations",
        "cn": "铸造工序",
        "kind": "group",
        "variants": [],
        "parentId": "u3-l1-core-casting",
        "definition": "Teaching group: Foundry operations.",
        "definitionCn": "教学分组：铸造工序。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u3-l1-core-equipment",
        "term": "Molds and equipment",
        "cn": "铸型与设备",
        "kind": "group",
        "variants": [],
        "parentId": "u3-l1-core-casting",
        "definition": "Teaching group: Molds and equipment.",
        "definitionCn": "教学分组：铸型与设备。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u3-l1-core-products",
        "term": "Materials and products",
        "cn": "材料与制品",
        "kind": "group",
        "variants": [],
        "parentId": "u3-l1-core-casting",
        "definition": "Teaching group: Materials and products.",
        "definitionCn": "教学分组：材料与制品。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u3-l1-core-mold-making",
        "term": "making molds",
        "cn": "造型",
        "kind": "term",
        "variants": [
          "making molds"
        ],
        "parentId": "u3-l1-core-operations",
        "definition": "Molds are prepared before metal is poured.",
        "definitionCn": "在浇注金属之前制作铸型。",
        "sourceBlock": "u3-p3",
        "anchor": "making molds",
        "highlight": true,
        "evidenceRefs": [
          "u3-p3"
        ]
      },
      {
        "id": "u3-l1-core-melting",
        "term": "melting",
        "cn": "熔化",
        "kind": "term",
        "variants": [
          "melting"
        ],
        "parentId": "u3-l1-core-operations",
        "definition": "Metal is melted before pouring.",
        "definitionCn": "在浇注前使金属熔化。",
        "sourceBlock": "u3-p3",
        "anchor": "melting",
        "highlight": true,
        "evidenceRefs": [
          "u3-p3"
        ]
      },
      {
        "id": "u3-l1-core-pouring",
        "term": "pouring",
        "cn": "浇注",
        "kind": "term",
        "variants": [
          "pouring"
        ],
        "parentId": "u3-l1-core-operations",
        "definition": "Molten metal is introduced into molds.",
        "definitionCn": "把熔融金属注入铸型。",
        "sourceBlock": "u3-p3",
        "anchor": "pouring",
        "highlight": true,
        "evidenceRefs": [
          "u3-p3"
        ]
      },
      {
        "id": "u3-l1-core-cleaning",
        "term": "cleaning the castings",
        "cn": "铸件清理",
        "kind": "term",
        "variants": [
          "cleaning the castings"
        ],
        "parentId": "u3-l1-core-operations",
        "definition": "The cast products are cleaned in the foundry process.",
        "definitionCn": "在铸造生产过程中对铸件进行清理。",
        "sourceBlock": "u3-p3",
        "anchor": "cleaning the castings",
        "highlight": true,
        "evidenceRefs": [
          "u3-p3"
        ]
      },
      {
        "id": "u3-l1-core-sand-mold",
        "term": "sand mold",
        "cn": "砂型",
        "kind": "term",
        "variants": [
          "sand mold",
          "sand molds"
        ],
        "parentId": "u3-l1-core-equipment",
        "definition": "One of the two mold kinds listed in the text.",
        "definitionCn": "课文列举的两种铸型之一。",
        "sourceBlock": "u3-p8",
        "anchor": "sand molds",
        "highlight": true,
        "evidenceRefs": [
          "u3-p8"
        ]
      },
      {
        "id": "u3-l1-core-metal-mold",
        "term": "metal mold",
        "cn": "金属型",
        "kind": "term",
        "variants": [
          "metal mold",
          "metal molds"
        ],
        "parentId": "u3-l1-core-equipment",
        "definition": "A metal mold has hollow parts that separate after solidification.",
        "definitionCn": "由空腔部分组成，金属凝固后可分开取件的铸型。",
        "sourceBlock": "u3-p8",
        "anchor": "metal molds",
        "highlight": true,
        "evidenceRefs": [
          "u3-p8"
        ]
      },
      {
        "id": "u3-l1-core-cupola",
        "term": "cupola",
        "cn": "冲天炉",
        "kind": "term",
        "variants": [
          "cupola"
        ],
        "parentId": "u3-l1-core-equipment",
        "definition": "A melting furnace used to remelt pig iron in this reading.",
        "definitionCn": "本文中用于重熔生铁的熔炼炉。",
        "sourceBlock": "u3-p6",
        "anchor": "cupola",
        "highlight": true,
        "evidenceRefs": [
          "u3-p6"
        ]
      },
      {
        "id": "u3-l1-core-ladle",
        "term": "ladle",
        "cn": "浇包",
        "kind": "term",
        "variants": [
          "ladle",
          "ladles"
        ],
        "parentId": "u3-l1-core-equipment",
        "definition": "A vessel used to carry molten iron from the cupola to the molds.",
        "definitionCn": "把铁液从冲天炉转运至铸型的容器。",
        "sourceBlock": "u3-p7",
        "anchor": "ladles",
        "highlight": true,
        "evidenceRefs": [
          "u3-p7"
        ]
      },
      {
        "id": "u3-l1-core-cast-iron",
        "term": "cast iron",
        "cn": "铸铁",
        "kind": "term",
        "variants": [
          "cast iron"
        ],
        "parentId": "u3-l1-core-products",
        "definition": "A cast metal described as made by remelting pig iron.",
        "definitionCn": "课文中以重熔生铁的方法制取的铸造金属。",
        "sourceBlock": "u3-p6",
        "anchor": "cast iron",
        "highlight": true,
        "evidenceRefs": [
          "u3-p6"
        ]
      },
      {
        "id": "u3-l1-core-ingot",
        "term": "ingot",
        "cn": "铸锭",
        "kind": "term",
        "variants": [
          "ingot",
          "ingots"
        ],
        "parentId": "u3-l1-core-products",
        "definition": "A large metal block formed in an ingot mold.",
        "definitionCn": "在锭模中浇注形成的大块金属。",
        "sourceBlock": "u3-p8",
        "anchor": "ingot",
        "highlight": true,
        "evidenceRefs": [
          "u3-p8"
        ]
      }
    ],
    "processOrder": [
      "u3-l1-core-mold-making",
      "u3-l1-core-melting",
      "u3-l1-core-pouring",
      "u3-l1-core-cleaning"
    ]
  },
  "3/2": {
    "title": "Die Casting Manufacturing",
    "cn": "压铸制造",
    "rootId": "u3-l2-core-die-casting",
    "nodes": [
      {
        "id": "u3-l2-core-die-casting",
        "term": "die casting",
        "cn": "压铸",
        "kind": "term",
        "variants": [
          "die casting",
          "die-casting"
        ],
        "parentId": null,
        "definition": "The reading introduces die-casting manufacturing and post-treatment.",
        "definitionCn": "本文介绍的金属模内成形制造及其后处理。",
        "sourceBlock": "u3-p12",
        "anchor": "Die casting",
        "highlight": true,
        "evidenceRefs": [
          "u3-p12"
        ]
      },
      {
        "id": "u3-l2-core-processes",
        "term": "Process names in the text",
        "cn": "课文工艺名称",
        "kind": "group",
        "variants": [],
        "parentId": "u3-l2-core-die-casting",
        "definition": "Teaching group: Process names in the text.",
        "definitionCn": "教学分组：课文工艺名称。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u3-l2-core-finishing",
        "term": "Post-treatment",
        "cn": "后处理",
        "kind": "group",
        "variants": [],
        "parentId": "u3-l2-core-die-casting",
        "definition": "Teaching group: Post-treatment.",
        "definitionCn": "教学分组：后处理。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u3-l2-core-cold-chamber",
        "term": "cold chamber process",
        "cn": "冷室压铸工艺",
        "kind": "term",
        "variants": [
          "cold chamber process"
        ],
        "parentId": "u3-l2-core-processes",
        "definition": "Molten metal is ladled into the chamber for each shot.",
        "definitionCn": "每次压射前将熔融金属舀入压室的工艺。",
        "sourceBlock": "u3-p14",
        "anchor": "cold chamber process",
        "highlight": true,
        "evidenceRefs": [
          "u3-p14"
        ]
      },
      {
        "id": "u3-l2-core-hot-chamber",
        "term": "hot chamber process",
        "cn": "热室压铸工艺",
        "kind": "term",
        "variants": [
          "hot chamber process"
        ],
        "parentId": "u3-l2-core-processes",
        "definition": "The pressure chamber remains immersed in molten metal.",
        "definitionCn": "压室持续浸在熔融金属中的工艺。",
        "sourceBlock": "u3-p15",
        "anchor": "hot chamber process",
        "highlight": true,
        "evidenceRefs": [
          "u3-p15"
        ]
      },
      {
        "id": "u3-l2-core-pressure-die-casting",
        "term": "pressure die casting",
        "cn": "压力铸造",
        "kind": "term",
        "variants": [
          "Pressure die casting"
        ],
        "parentId": "u3-l2-core-processes",
        "definition": "A casting method discussed for high volume and close tolerances.",
        "definitionCn": "课文中用于大批量、较高尺寸精度要求的铸造方法。",
        "sourceBlock": "u3-p16",
        "anchor": "Pressure die casting",
        "highlight": true,
        "evidenceRefs": [
          "u3-p16"
        ]
      },
      {
        "id": "u3-l2-core-gravity-die-casting",
        "term": "gravity die casting",
        "cn": "重力铸造",
        "kind": "term",
        "variants": [
          "gravity die casting"
        ],
        "parentId": "u3-l2-core-processes",
        "definition": "A casting method compared with pressure die casting in the text.",
        "definitionCn": "课文中与压力铸造进行比较的铸造方法。",
        "sourceBlock": "u3-p16",
        "anchor": "gravity die casting",
        "highlight": true,
        "evidenceRefs": [
          "u3-p16"
        ]
      },
      {
        "id": "u3-l2-core-blasting",
        "term": "blasting",
        "cn": "喷砂或喷丸",
        "kind": "term",
        "variants": [
          "blasting"
        ],
        "parentId": "u3-l2-core-finishing",
        "definition": "One of the listed post-treatment operations.",
        "definitionCn": "课文列举的后处理工序之一。",
        "sourceBlock": "u3-p12",
        "anchor": "blasting",
        "highlight": true,
        "evidenceRefs": [
          "u3-p12"
        ]
      },
      {
        "id": "u3-l2-core-polishing",
        "term": "polishing",
        "cn": "抛光",
        "kind": "term",
        "variants": [
          "polishing"
        ],
        "parentId": "u3-l2-core-finishing",
        "definition": "One of the listed surface-finishing operations.",
        "definitionCn": "课文列举的表面后处理工序之一。",
        "sourceBlock": "u3-p12",
        "anchor": "polishing",
        "highlight": true,
        "evidenceRefs": [
          "u3-p12"
        ]
      },
      {
        "id": "u3-l2-core-machining",
        "term": "machining",
        "cn": "机械加工",
        "kind": "term",
        "variants": [
          "machining"
        ],
        "parentId": "u3-l2-core-finishing",
        "definition": "A post-treatment operation listed after die casting.",
        "definitionCn": "压铸后可采用的后处理工序之一。",
        "sourceBlock": "u3-p12",
        "anchor": "machining",
        "highlight": true,
        "evidenceRefs": [
          "u3-p12"
        ]
      },
      {
        "id": "u3-l2-core-plating",
        "term": "plating",
        "cn": "电镀",
        "kind": "term",
        "variants": [
          "plating"
        ],
        "parentId": "u3-l2-core-finishing",
        "definition": "A surface treatment named in the reading.",
        "definitionCn": "课文列举的一种表面处理。",
        "sourceBlock": "u3-p12",
        "anchor": "plating",
        "highlight": true,
        "evidenceRefs": [
          "u3-p12"
        ]
      },
      {
        "id": "u3-l2-core-anodizing",
        "term": "anodizing",
        "cn": "阳极氧化",
        "kind": "term",
        "variants": [
          "anodizing"
        ],
        "parentId": "u3-l2-core-finishing",
        "definition": "A surface treatment named in the reading.",
        "definitionCn": "课文列举的一种表面处理。",
        "sourceBlock": "u3-p12",
        "anchor": "anodizing",
        "highlight": true,
        "evidenceRefs": [
          "u3-p12"
        ]
      }
    ]
  },
  "4/1": {
    "title": "Forging",
    "cn": "锻造",
    "rootId": "u4-l1-core-forging",
    "nodes": [
      {
        "id": "u4-l1-core-forging",
        "term": "forging",
        "cn": "锻造",
        "kind": "term",
        "variants": [
          "Forging"
        ],
        "parentId": null,
        "definition": "Localized compressive forces plastically work metal.",
        "definitionCn": "利用局部压缩力使金属产生塑性变形的加工方法。",
        "sourceBlock": "u4-p1",
        "anchor": "Forging",
        "highlight": true,
        "evidenceRefs": [
          "u4-p1"
        ]
      },
      {
        "id": "u4-l1-core-methods",
        "term": "Methods mentioned",
        "cn": "课文中的锻造方式",
        "kind": "group",
        "variants": [],
        "parentId": "u4-l1-core-forging",
        "definition": "Teaching group: Methods mentioned.",
        "definitionCn": "教学分组：课文中的锻造方式。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u4-l1-core-deformation",
        "term": "Deformation actions",
        "cn": "变形动作",
        "kind": "group",
        "variants": [],
        "parentId": "u4-l1-core-forging",
        "definition": "Teaching group: Deformation actions.",
        "definitionCn": "教学分组：变形动作。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u4-l1-core-presses",
        "term": "Press equipment",
        "cn": "压力设备",
        "kind": "group",
        "variants": [],
        "parentId": "u4-l1-core-forging",
        "definition": "Teaching group: Press equipment.",
        "definitionCn": "教学分组：压力设备。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u4-l1-core-hot-forging",
        "term": "hot forging",
        "cn": "热锻",
        "kind": "term",
        "variants": [
          "hot forging"
        ],
        "parentId": "u4-l1-core-methods",
        "definition": "Forging performed above the recrystallization temperature.",
        "definitionCn": "在再结晶温度以上进行的锻造。",
        "sourceBlock": "u4-p1",
        "anchor": "hot forging",
        "highlight": true,
        "evidenceRefs": [
          "u4-p1"
        ]
      },
      {
        "id": "u4-l1-core-press-forging",
        "term": "press forging",
        "cn": "压力机锻造",
        "kind": "term",
        "variants": [
          "Press forging"
        ],
        "parentId": "u4-l1-core-methods",
        "definition": "A slow squeezing action deforms the metal.",
        "definitionCn": "通过缓慢挤压使金属变形的锻造方式。",
        "sourceBlock": "u4-p4",
        "anchor": "Press forging",
        "highlight": true,
        "evidenceRefs": [
          "u4-p4"
        ]
      },
      {
        "id": "u4-l1-core-drop-forging",
        "term": "drop forging",
        "cn": "落锤锻造",
        "kind": "term",
        "variants": [
          "drop forging"
        ],
        "parentId": "u4-l1-core-methods",
        "definition": "Metal is forced to the shape of the finished piece between die faces.",
        "definitionCn": "使金属在具有成品形状的模面间成形的锻造方式。",
        "sourceBlock": "u4-p6",
        "anchor": "drop forging",
        "highlight": true,
        "evidenceRefs": [
          "u4-p6",
          "u4-p7"
        ]
      },
      {
        "id": "u4-l1-core-drawing-out",
        "term": "drawing out",
        "cn": "拔长",
        "kind": "term",
        "variants": [
          "drawn out"
        ],
        "parentId": "u4-l1-core-deformation",
        "definition": "Length increases while cross-sectional area decreases.",
        "definitionCn": "使长度增加、横截面减小的变形动作。",
        "sourceBlock": "u4-p3",
        "anchor": "drawn out",
        "highlight": true,
        "evidenceRefs": [
          "u4-p3"
        ]
      },
      {
        "id": "u4-l1-core-upsetting",
        "term": "upsetting",
        "cn": "镦粗",
        "kind": "term",
        "variants": [
          "upset"
        ],
        "parentId": "u4-l1-core-deformation",
        "definition": "Cross-sectional area increases while length decreases.",
        "definitionCn": "使横截面增加、长度减小的变形动作。",
        "sourceBlock": "u4-p3",
        "anchor": "upset",
        "highlight": true,
        "evidenceRefs": [
          "u4-p3"
        ]
      },
      {
        "id": "u4-l1-core-hydraulic-press",
        "term": "hydraulic press",
        "cn": "液压机",
        "kind": "term",
        "variants": [
          "hydraulic press",
          "hydraulic presses"
        ],
        "parentId": "u4-l1-core-presses",
        "definition": "A press used instead of steam hammers for large ingots in the text.",
        "definitionCn": "课文提到可替代蒸汽锤锻造大型铸锭的压力设备。",
        "sourceBlock": "u4-p7",
        "anchor": "hydraulic presses",
        "highlight": true,
        "evidenceRefs": [
          "u4-p7"
        ]
      },
      {
        "id": "u4-l1-core-mechanical-press",
        "term": "mechanical press",
        "cn": "机械压力机",
        "kind": "term",
        "variants": [
          "mechanical press",
          "mechanical presses"
        ],
        "parentId": "u4-l1-core-presses",
        "definition": "A mechanically operated press used for forging.",
        "definitionCn": "用于锻造、以机械方式驱动的压力设备。",
        "sourceBlock": "u4-p2",
        "anchor": "mechanical presses",
        "highlight": true,
        "evidenceRefs": [
          "u4-p2",
          "u4-p4"
        ]
      }
    ]
  },
  "5/1": {
    "title": "Heat Treatment",
    "cn": "热处理",
    "rootId": "u5-l1-core-heat-treatment",
    "nodes": [
      {
        "id": "u5-l1-core-heat-treatment",
        "term": "heat treatment",
        "cn": "热处理",
        "kind": "term",
        "variants": [
          "Heat treatment"
        ],
        "parentId": null,
        "definition": "Thermal cycling is used to obtain desired structures and mechanical properties.",
        "definitionCn": "通过加热、冷却循环获得所需组织和力学性能的处理。",
        "sourceBlock": "u5-p1",
        "anchor": "Heat treatment",
        "highlight": true,
        "evidenceRefs": [
          "u5-p1"
        ]
      },
      {
        "id": "u5-l1-core-methods",
        "term": "Common treatments",
        "cn": "常用热处理方法",
        "kind": "group",
        "variants": [],
        "parentId": "u5-l1-core-heat-treatment",
        "definition": "Teaching group: Common treatments.",
        "definitionCn": "教学分组：常用热处理方法。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u5-l1-core-operations",
        "term": "Thermal operations",
        "cn": "热处理过程动作",
        "kind": "group",
        "variants": [],
        "parentId": "u5-l1-core-heat-treatment",
        "definition": "Teaching group: Thermal operations.",
        "definitionCn": "教学分组：热处理过程动作。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u5-l1-core-spheroidizing",
        "term": "spheroidizing",
        "cn": "球化处理",
        "kind": "term",
        "variants": [
          "spheroidizing"
        ],
        "parentId": "u5-l1-core-methods",
        "definition": "A treatment intended to produce a globular condition of carbide.",
        "definitionCn": "以使碳化物呈球状为目的的热处理。",
        "sourceBlock": "u5-p4",
        "anchor": "spheroidizing",
        "highlight": true,
        "evidenceRefs": [
          "u5-p4",
          "u5-p5"
        ]
      },
      {
        "id": "u5-l1-core-normalizing",
        "term": "normalizing",
        "cn": "正火",
        "kind": "term",
        "variants": [
          "normalizing"
        ],
        "parentId": "u5-l1-core-methods",
        "definition": "An iron-based alloy is heated above the critical range and then cooled in air.",
        "definitionCn": "将铁基合金加热至临界温度范围以上，随后在空气中冷却。",
        "sourceBlock": "u5-p4",
        "anchor": "normalizing",
        "highlight": true,
        "evidenceRefs": [
          "u5-p4",
          "u5-p6"
        ]
      },
      {
        "id": "u5-l1-core-annealing",
        "term": "annealing",
        "cn": "退火",
        "kind": "term",
        "variants": [
          "annealing"
        ],
        "parentId": "u5-l1-core-methods",
        "definition": "A broad class of treatments used to alter structure and physical properties.",
        "definitionCn": "用于改变组织和物理性能的一类热处理。",
        "sourceBlock": "u5-p4",
        "anchor": "annealing",
        "highlight": true,
        "evidenceRefs": [
          "u5-p4",
          "u5-p7"
        ]
      },
      {
        "id": "u5-l1-core-hardening",
        "term": "hardening",
        "cn": "淬火硬化",
        "kind": "term",
        "variants": [
          "hardening"
        ],
        "parentId": "u5-l1-core-methods",
        "definition": "Certain iron-based alloys are heated and then quenched.",
        "definitionCn": "对某些铁基合金进行加热、淬冷的硬化处理。",
        "sourceBlock": "u5-p4",
        "anchor": "hardening",
        "highlight": true,
        "evidenceRefs": [
          "u5-p4",
          "u5-p8"
        ]
      },
      {
        "id": "u5-l1-core-tempering",
        "term": "tempering",
        "cn": "回火",
        "kind": "term",
        "variants": [
          "tempering"
        ],
        "parentId": "u5-l1-core-methods",
        "definition": "Reheating after hardening reduces strains, hardness and brittleness.",
        "definitionCn": "淬火硬化后重新加热，以减小应变、硬度和脆性。",
        "sourceBlock": "u5-p4",
        "anchor": "tempering",
        "highlight": true,
        "evidenceRefs": [
          "u5-p4",
          "u5-p9"
        ]
      },
      {
        "id": "u5-l1-core-heating",
        "term": "heating",
        "cn": "加热",
        "kind": "term",
        "variants": [
          "heating"
        ],
        "parentId": "u5-l1-core-operations",
        "definition": "The material is brought to a selected temperature.",
        "definitionCn": "把材料加热到选定温度。",
        "sourceBlock": "u5-p4",
        "anchor": "heating",
        "highlight": true,
        "evidenceRefs": [
          "u5-p4"
        ]
      },
      {
        "id": "u5-l1-core-soaking",
        "term": "soaking",
        "cn": "保温",
        "kind": "term",
        "variants": [
          "soaking",
          "holding"
        ],
        "parentId": "u5-l1-core-operations",
        "definition": "The material is held at the selected temperature.",
        "definitionCn": "使材料在选定温度下保持一定时间。",
        "sourceBlock": "u5-p4",
        "anchor": "soaking",
        "highlight": true,
        "evidenceRefs": [
          "u5-p4"
        ]
      },
      {
        "id": "u5-l1-core-cooling",
        "term": "cooling",
        "cn": "冷却",
        "kind": "term",
        "variants": [
          "cooling"
        ],
        "parentId": "u5-l1-core-operations",
        "definition": "The material is cooled at a prescribed rate.",
        "definitionCn": "使材料以规定速率降温。",
        "sourceBlock": "u5-p1",
        "anchor": "cooling",
        "highlight": true,
        "evidenceRefs": [
          "u5-p1",
          "u5-p4"
        ]
      },
      {
        "id": "u5-l1-core-quenching",
        "term": "quenching",
        "cn": "淬冷",
        "kind": "term",
        "variants": [
          "quenching"
        ],
        "parentId": "u5-l1-core-operations",
        "definition": "The cooling operation named in the definition of hardening.",
        "definitionCn": "淬火硬化定义中提到的淬冷操作。",
        "sourceBlock": "u5-p8",
        "anchor": "quenching",
        "highlight": true,
        "evidenceRefs": [
          "u5-p8"
        ]
      }
    ],
    "processOrder": [
      "u5-l1-core-heating",
      "u5-l1-core-soaking",
      "u5-l1-core-cooling"
    ],
    "detailRelations": [
      {
        "type": "precedes",
        "cn": "回火在淬火硬化之后进行",
        "sourceRef": "u5-p9",
        "from": "u5-l1-core-hardening",
        "to": "u5-l1-core-tempering"
      }
    ]
  },
  "6/1": {
    "title": "Welding",
    "cn": "焊接",
    "rootId": "u6-l1-core-welding",
    "nodes": [
      {
        "id": "u6-l1-core-welding",
        "term": "welding",
        "cn": "焊接",
        "kind": "term",
        "variants": [
          "Welding"
        ],
        "parentId": null,
        "definition": "The text discusses methods of joining metals and plastics without fastening devices.",
        "definitionCn": "课文讨论不用紧固装置连接金属和塑料的方法。",
        "sourceBlock": "u6-p1",
        "anchor": "Welding",
        "highlight": true,
        "evidenceRefs": [
          "u6-p1"
        ]
      },
      {
        "id": "u6-l1-core-processes",
        "term": "Process names",
        "cn": "工艺名称",
        "kind": "group",
        "variants": [],
        "parentId": "u6-l1-core-welding",
        "definition": "Teaching group: Process names.",
        "definitionCn": "教学分组：工艺名称。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u6-l1-core-joints",
        "term": "Joint and weld forms",
        "cn": "焊接部位与焊缝形式",
        "kind": "group",
        "variants": [],
        "parentId": "u6-l1-core-welding",
        "definition": "Teaching group: Joint and weld forms.",
        "definitionCn": "教学分组：焊接部位与焊缝形式。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u6-l1-core-materials",
        "term": "Auxiliary materials",
        "cn": "辅助材料",
        "kind": "group",
        "variants": [],
        "parentId": "u6-l1-core-welding",
        "definition": "Teaching group: Auxiliary materials.",
        "definitionCn": "教学分组：辅助材料。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u6-l1-core-fusion",
        "term": "fusion welding",
        "cn": "熔焊",
        "kind": "term",
        "variants": [
          "fusion welding"
        ],
        "parentId": "u6-l1-core-processes",
        "definition": "Heat melts metal at the weld.",
        "definitionCn": "利用热量使焊接部位金属熔化的焊接方式。",
        "sourceBlock": "u6-p6",
        "anchor": "fusion welding",
        "highlight": true,
        "evidenceRefs": [
          "u6-p6"
        ]
      },
      {
        "id": "u6-l1-core-pressure",
        "term": "pressure welding",
        "cn": "压焊",
        "kind": "term",
        "variants": [
          "pressure welding"
        ],
        "parentId": "u6-l1-core-processes",
        "definition": "Metal surfaces are joined by pressing or hammering.",
        "definitionCn": "通过加压或锤击使金属表面连接的焊接方式。",
        "sourceBlock": "u6-p1",
        "anchor": "pressure welding",
        "highlight": true,
        "evidenceRefs": [
          "u6-p1",
          "u6-p5"
        ]
      },
      {
        "id": "u6-l1-core-cold-pressure",
        "term": "cold pressure welding",
        "cn": "冷压焊",
        "kind": "term",
        "variants": [
          "Cold pressure welding"
        ],
        "parentId": "u6-l1-core-processes",
        "definition": "A pressure-welding method discussed as not requiring heat.",
        "definitionCn": "课文提到的一种无需加热的压焊方法。",
        "sourceBlock": "u6-p1",
        "anchor": "Cold pressure welding",
        "highlight": true,
        "evidenceRefs": [
          "u6-p1"
        ]
      },
      {
        "id": "u6-l1-core-metal-arc",
        "term": "metal-arc welding",
        "cn": "金属电弧焊",
        "kind": "term",
        "variants": [
          "metal-arc welding"
        ],
        "parentId": "u6-l1-core-processes",
        "definition": "An electric arc supplies heat to melt metal at the weld.",
        "definitionCn": "由电弧提供熔化焊接部位金属所需热量的工艺。",
        "sourceBlock": "u6-p6",
        "anchor": "metal-arc welding",
        "highlight": true,
        "evidenceRefs": [
          "u6-p6"
        ]
      },
      {
        "id": "u6-l1-core-spot",
        "term": "spot welding",
        "cn": "点焊",
        "kind": "term",
        "variants": [
          "spot welding"
        ],
        "parentId": "u6-l1-core-joints",
        "definition": "A welding name based on the form of joint produced.",
        "definitionCn": "按所形成焊接部位命名的工艺，课文指出可采用不同过程。",
        "sourceBlock": "u6-p2",
        "anchor": "Spot welding",
        "highlight": true,
        "evidenceRefs": [
          "u6-p2",
          "u6-p6"
        ]
      },
      {
        "id": "u6-l1-core-butt",
        "term": "butt weld",
        "cn": "对接焊缝",
        "kind": "term",
        "variants": [
          "butt weld"
        ],
        "parentId": "u6-l1-core-joints",
        "definition": "A weld form mentioned alongside the V-shaped weld.",
        "definitionCn": "课文中与V形焊缝比较的一种焊缝形式。",
        "sourceBlock": "u6-p5",
        "anchor": "butt weld",
        "highlight": true,
        "evidenceRefs": [
          "u6-p5"
        ]
      },
      {
        "id": "u6-l1-core-v-weld",
        "term": "V-shaped weld",
        "cn": "V形焊缝",
        "kind": "term",
        "variants": [
          "V-shaped weld"
        ],
        "parentId": "u6-l1-core-joints",
        "definition": "A weld form suggested for fairly thick bars in the text.",
        "definitionCn": "课文建议用于较厚金属棒材的一种焊缝形式。",
        "sourceBlock": "u6-p5",
        "anchor": "V-shaped weld",
        "highlight": true,
        "evidenceRefs": [
          "u6-p5"
        ]
      },
      {
        "id": "u6-l1-core-flux",
        "term": "flux",
        "cn": "焊剂",
        "kind": "term",
        "variants": [
          "flux"
        ],
        "parentId": "u6-l1-core-materials",
        "definition": "A material used for cleaning or shielding in the described welding processes.",
        "definitionCn": "在课文所述焊接过程中起清理或保护作用的材料。",
        "sourceBlock": "u6-p5",
        "anchor": "flux",
        "highlight": true,
        "evidenceRefs": [
          "u6-p5"
        ]
      },
      {
        "id": "u6-l1-core-filler-rod",
        "term": "filler rod",
        "cn": "填充焊条",
        "kind": "term",
        "variants": [
          "filler rod"
        ],
        "parentId": "u6-l1-core-materials",
        "definition": "The other electrode is described as an insulated filler rod.",
        "definitionCn": "课文中用作另一电极的带绝缘层填充焊条。",
        "sourceBlock": "u6-p6",
        "anchor": "filler rod",
        "highlight": true,
        "evidenceRefs": [
          "u6-p6"
        ]
      }
    ],
    "detailRelations": [
      {
        "type": "has_subtype",
        "cn": "冷压焊属于压焊",
        "sourceRef": "u6-p1",
        "from": "u6-l1-core-pressure",
        "to": "u6-l1-core-cold-pressure"
      },
      {
        "type": "has_subtype",
        "cn": "金属电弧焊利用电弧热熔化金属",
        "sourceRef": "u6-p6",
        "from": "u6-l1-core-fusion",
        "to": "u6-l1-core-metal-arc"
      }
    ]
  },
  "7/1": {
    "title": "Antifriction Bearings",
    "cn": "滚动轴承",
    "rootId": "u7-l1-core-bearing",
    "nodes": [
      {
        "id": "u7-l1-core-bearing",
        "term": "antifriction bearing",
        "cn": "滚动轴承",
        "kind": "term",
        "variants": [
          "antifriction bearing",
          "antifriction bearings",
          "antifriction-bearing",
          "rolling bearing",
          "rolling bearings"
        ],
        "parentId": null,
        "definition": "The main load is transmitted through elements in rolling contact.",
        "definitionCn": "主要通过滚动接触元件传递载荷的轴承。",
        "sourceBlock": "u7-p1",
        "anchor": "antifriction bearing",
        "highlight": true,
        "evidenceRefs": [
          "u7-p1"
        ]
      },
      {
        "id": "u7-l1-core-parts",
        "term": "Essential parts",
        "cn": "基本组成",
        "kind": "group",
        "variants": [],
        "parentId": "u7-l1-core-bearing",
        "definition": "Teaching group: Essential parts.",
        "definitionCn": "教学分组：基本组成。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u7-l1-core-types",
        "term": "Selected bearing types",
        "cn": "主要类型示例",
        "kind": "group",
        "variants": [],
        "parentId": "u7-l1-core-bearing",
        "definition": "Teaching group: Selected bearing types.",
        "definitionCn": "教学分组：主要类型示例。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u7-l1-core-performance",
        "term": "Loads and life",
        "cn": "载荷与寿命",
        "kind": "group",
        "variants": [],
        "parentId": "u7-l1-core-bearing",
        "definition": "Teaching group: Loads and life.",
        "definitionCn": "教学分组：载荷与寿命。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u7-l1-core-outer-ring",
        "term": "outer ring",
        "cn": "外圈",
        "kind": "term",
        "variants": [
          "outer ring"
        ],
        "parentId": "u7-l1-core-parts",
        "definition": "One of the four essential parts of a bearing.",
        "definitionCn": "课文列举的轴承四个基本组成部分之一。",
        "sourceBlock": "u7-p5",
        "anchor": "outer ring",
        "highlight": true,
        "evidenceRefs": [
          "u7-p5"
        ]
      },
      {
        "id": "u7-l1-core-inner-ring",
        "term": "inner ring",
        "cn": "内圈",
        "kind": "term",
        "variants": [
          "inner ring"
        ],
        "parentId": "u7-l1-core-parts",
        "definition": "One of the four essential parts of a bearing.",
        "definitionCn": "课文列举的轴承四个基本组成部分之一。",
        "sourceBlock": "u7-p5",
        "anchor": "inner ring",
        "highlight": true,
        "evidenceRefs": [
          "u7-p5"
        ]
      },
      {
        "id": "u7-l1-core-rolling-elements",
        "term": "rolling elements",
        "cn": "滚动体",
        "kind": "term",
        "variants": [
          "rolling elements",
          "rolling element"
        ],
        "parentId": "u7-l1-core-parts",
        "definition": "The balls or other rolling elements transmit the load.",
        "definitionCn": "通过滚动接触传递载荷的球或其他滚动元件。",
        "sourceBlock": "u7-p5",
        "anchor": "rolling elements",
        "highlight": true,
        "evidenceRefs": [
          "u7-p5"
        ]
      },
      {
        "id": "u7-l1-core-separator",
        "term": "separator",
        "cn": "保持架",
        "kind": "term",
        "variants": [
          "separator"
        ],
        "parentId": "u7-l1-core-parts",
        "definition": "The separator keeps the rolling elements apart to prevent rubbing contact.",
        "definitionCn": "使滚动体保持分隔，避免相互摩擦接触的零件。",
        "sourceBlock": "u7-p5",
        "anchor": "separator",
        "highlight": true,
        "evidenceRefs": [
          "u7-p5"
        ]
      },
      {
        "id": "u7-l1-core-deep-groove",
        "term": "single-row deep-groove bearing",
        "cn": "单列深沟球轴承",
        "kind": "term",
        "variants": [
          "single-row deep-groove bearing"
        ],
        "parentId": "u7-l1-core-types",
        "definition": "This bearing takes radial load and some thrust load.",
        "definitionCn": "可承受径向载荷和一定轴向载荷的轴承。",
        "sourceBlock": "u7-p7",
        "anchor": "single-row deep-groove bearing",
        "highlight": true,
        "evidenceRefs": [
          "u7-p7"
        ]
      },
      {
        "id": "u7-l1-core-angular-contact",
        "term": "angular-contact bearing",
        "cn": "角接触轴承",
        "kind": "term",
        "variants": [
          "angular-contact bearing"
        ],
        "parentId": "u7-l1-core-types",
        "definition": "The text describes this bearing as having greater thrust capacity.",
        "definitionCn": "课文指出其具有更大的轴向承载能力。",
        "sourceBlock": "u7-p9",
        "anchor": "angular-contact bearing",
        "highlight": true,
        "evidenceRefs": [
          "u7-p9"
        ]
      },
      {
        "id": "u7-l1-core-roller",
        "term": "roller bearing",
        "cn": "滚子轴承",
        "kind": "term",
        "variants": [
          "roller bearing",
          "roller bearings"
        ],
        "parentId": "u7-l1-core-types",
        "definition": "A bearing type discussed using rollers rather than balls.",
        "definitionCn": "课文讨论的以滚子作为滚动体的轴承类型。",
        "sourceBlock": "u7-p11",
        "anchor": "roller bearings",
        "highlight": true,
        "evidenceRefs": [
          "u7-p11"
        ]
      },
      {
        "id": "u7-l1-core-radial-load",
        "term": "radial load",
        "cn": "径向载荷",
        "kind": "term",
        "variants": [
          "radial load",
          "radial loads"
        ],
        "parentId": "u7-l1-core-performance",
        "definition": "A load category distinguished from thrust load in the reading.",
        "definitionCn": "课文中与轴向载荷相区分的一类轴承载荷。",
        "sourceBlock": "u7-p5",
        "anchor": "radial loads",
        "highlight": true,
        "evidenceRefs": [
          "u7-p5"
        ]
      },
      {
        "id": "u7-l1-core-thrust-load",
        "term": "thrust load",
        "cn": "轴向载荷",
        "kind": "term",
        "variants": [
          "thrust load",
          "thrust loads"
        ],
        "parentId": "u7-l1-core-performance",
        "definition": "The thrust-load category distinguished from radial load.",
        "definitionCn": "课文中与径向载荷相区分的轴向推力载荷。",
        "sourceBlock": "u7-p5",
        "anchor": "thrust loads",
        "highlight": true,
        "evidenceRefs": [
          "u7-p5"
        ]
      },
      {
        "id": "u7-l1-core-bearing-life",
        "term": "bearing life",
        "cn": "轴承寿命",
        "kind": "term",
        "variants": [
          "bearing life"
        ],
        "parentId": "u7-l1-core-performance",
        "definition": "Operating revolutions or hours before the first evidence of fatigue.",
        "definitionCn": "首次出现疲劳迹象前的工作转数，或规定恒速下的工作小时数。",
        "sourceBlock": "u7-p12",
        "anchor": "bearing life",
        "highlight": true,
        "evidenceRefs": [
          "u7-p12",
          "u7-p13"
        ]
      },
      {
        "id": "u7-l1-core-rating-life",
        "term": "rating life",
        "cn": "额定寿命",
        "kind": "term",
        "variants": [
          "rating life"
        ],
        "parentId": "u7-l1-core-performance",
        "definition": "The life that 90 percent of an apparently identical bearing group will complete or exceed.",
        "definitionCn": "一组表观相同轴承中90%在首次出现疲劳迹象前能够达到或超过的寿命。",
        "sourceBlock": "u7-p13",
        "anchor": "rating life",
        "highlight": true,
        "evidenceRefs": [
          "u7-p13"
        ]
      }
    ]
  },
  "8/1": {
    "title": "Screws, Fasteners and Joints",
    "cn": "螺纹件、紧固件与连接",
    "rootId": "u8-l1-core-fastener",
    "nodes": [
      {
        "id": "u8-l1-core-fastener",
        "term": "fastener",
        "cn": "紧固件",
        "kind": "term",
        "variants": [
          "fastener",
          "fasteners"
        ],
        "parentId": null,
        "definition": "A fastening item such as a nut or bolt.",
        "definitionCn": "用于紧固连接的零件，如螺母、螺栓。",
        "sourceBlock": "u8-p2",
        "anchor": "fasteners",
        "highlight": true,
        "evidenceRefs": [
          "u8-p2"
        ]
      },
      {
        "id": "u8-l1-core-items",
        "term": "Fastening items",
        "cn": "紧固零件",
        "kind": "group",
        "variants": [],
        "parentId": "u8-l1-core-fastener",
        "definition": "Teaching group: Fastening items.",
        "definitionCn": "教学分组：紧固零件。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u8-l1-core-assembly",
        "term": "Joint assembly",
        "cn": "连接装配",
        "kind": "group",
        "variants": [],
        "parentId": "u8-l1-core-fastener",
        "definition": "Teaching group: Joint assembly.",
        "definitionCn": "教学分组：连接装配。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u8-l1-core-loading",
        "term": "Loads and tightening",
        "cn": "载荷与拧紧",
        "kind": "group",
        "variants": [],
        "parentId": "u8-l1-core-fastener",
        "definition": "Teaching group: Loads and tightening.",
        "definitionCn": "教学分组：载荷与拧紧。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u8-l1-core-screw",
        "term": "screw",
        "cn": "螺钉",
        "kind": "term",
        "variants": [
          "screw",
          "screws"
        ],
        "parentId": "u8-l1-core-items",
        "definition": "A product designed primarily for assembly into a tapped hole.",
        "definitionCn": "主要设计用于装入螺纹孔的紧固件。",
        "sourceBlock": "u8-p1",
        "anchor": "screws",
        "highlight": true,
        "evidenceRefs": [
          "u8-p1",
          "u8-p5"
        ]
      },
      {
        "id": "u8-l1-core-bolt",
        "term": "bolt",
        "cn": "螺栓",
        "kind": "term",
        "variants": [
          "bolt",
          "bolts"
        ],
        "parentId": "u8-l1-core-items",
        "definition": "A product designed to be used with a nut.",
        "definitionCn": "设计为与螺母配合使用的紧固件。",
        "sourceBlock": "u8-p1",
        "anchor": "bolts",
        "highlight": true,
        "evidenceRefs": [
          "u8-p1",
          "u8-p5"
        ]
      },
      {
        "id": "u8-l1-core-nut",
        "term": "nut",
        "cn": "螺母",
        "kind": "term",
        "variants": [
          "nut",
          "nuts"
        ],
        "parentId": "u8-l1-core-items",
        "definition": "A fastening item used with a bolt or the receiving end of a stud.",
        "definitionCn": "与螺栓或螺柱另一端配合使用的紧固零件。",
        "sourceBlock": "u8-p1",
        "anchor": "nuts",
        "highlight": true,
        "evidenceRefs": [
          "u8-p1",
          "u8-p5"
        ]
      },
      {
        "id": "u8-l1-core-stud",
        "term": "stud",
        "cn": "螺柱",
        "kind": "term",
        "variants": [
          "stud",
          "studs"
        ],
        "parentId": "u8-l1-core-items",
        "definition": "One threaded end enters a tapped hole and the other receives a nut.",
        "definitionCn": "一端装入螺纹孔、另一端装螺母的螺纹杆状零件。",
        "sourceBlock": "u8-p5",
        "anchor": "stud",
        "highlight": true,
        "evidenceRefs": [
          "u8-p5"
        ]
      },
      {
        "id": "u8-l1-core-rivet",
        "term": "rivet",
        "cn": "铆钉",
        "kind": "term",
        "variants": [
          "rivet",
          "rivets"
        ],
        "parentId": "u8-l1-core-items",
        "definition": "One of the fastening items listed in the opening paragraph.",
        "definitionCn": "课文首段列举的紧固零件之一。",
        "sourceBlock": "u8-p1",
        "anchor": "rivets",
        "highlight": true,
        "evidenceRefs": [
          "u8-p1"
        ]
      },
      {
        "id": "u8-l1-core-bolted-joint",
        "term": "bolted joint",
        "cn": "螺栓连接",
        "kind": "term",
        "variants": [
          "bolted joint",
          "bolted joints",
          "bolted connection",
          "bolted connections"
        ],
        "parentId": "u8-l1-core-assembly",
        "definition": "A joint that can be disassembled without destroying the assembled parts.",
        "definitionCn": "可在不破坏被连接零件的情况下拆卸的连接。",
        "sourceBlock": "u8-p6",
        "anchor": "bolted joint",
        "highlight": true,
        "evidenceRefs": [
          "u8-p6"
        ]
      },
      {
        "id": "u8-l1-core-washer",
        "term": "hardened washer",
        "cn": "淬硬垫圈",
        "kind": "term",
        "variants": [
          "hardened washer"
        ],
        "parentId": "u8-l1-core-assembly",
        "definition": "A washer used in the bolted joint described in the reading.",
        "definitionCn": "课文所述螺栓连接中使用的淬硬垫圈。",
        "sourceBlock": "u8-p6",
        "anchor": "hardened washer",
        "highlight": true,
        "evidenceRefs": [
          "u8-p6"
        ]
      },
      {
        "id": "u8-l1-core-preload",
        "term": "preload",
        "cn": "预紧力",
        "kind": "term",
        "variants": [
          "preload",
          "preloading"
        ],
        "parentId": "u8-l1-core-loading",
        "definition": "Initial bolt tension is developed before external loads are applied.",
        "definitionCn": "在施加外载荷前通过拧紧形成的初始拉力。",
        "sourceBlock": "u8-p6",
        "anchor": "preload",
        "highlight": true,
        "evidenceRefs": [
          "u8-p6"
        ]
      },
      {
        "id": "u8-l1-core-torque",
        "term": "torque",
        "cn": "转矩",
        "kind": "term",
        "variants": [
          "torque"
        ],
        "parentId": "u8-l1-core-loading",
        "definition": "A turning action is applied to tighten a screw or nut.",
        "definitionCn": "拧紧螺钉或螺母时施加的转动作用。",
        "sourceBlock": "u8-p5",
        "anchor": "torque",
        "highlight": true,
        "evidenceRefs": [
          "u8-p5",
          "u8-p7"
        ]
      },
      {
        "id": "u8-l1-core-tensile-load",
        "term": "tensile load",
        "cn": "拉伸载荷",
        "kind": "term",
        "variants": [
          "tensile load"
        ],
        "parentId": "u8-l1-core-loading",
        "definition": "An external load resisted by the described bolted joint.",
        "definitionCn": "课文所述螺栓连接需要抵抗的一种外部拉伸载荷。",
        "sourceBlock": "u8-p6",
        "anchor": "tensile load",
        "highlight": true,
        "evidenceRefs": [
          "u8-p6"
        ]
      },
      {
        "id": "u8-l1-core-shear-load",
        "term": "shear load",
        "cn": "剪切载荷",
        "kind": "term",
        "variants": [
          "shear load"
        ],
        "parentId": "u8-l1-core-loading",
        "definition": "Friction between the preloaded parts helps resist this load.",
        "definitionCn": "通过预紧使零件间产生摩擦，以帮助抵抗的剪切载荷。",
        "sourceBlock": "u8-p6",
        "anchor": "shear load",
        "highlight": true,
        "evidenceRefs": [
          "u8-p6"
        ]
      }
    ]
  },
  "9/1": {
    "title": "Cams",
    "cn": "凸轮",
    "rootId": "u9-l1-core-cam",
    "nodes": [
      {
        "id": "u9-l1-core-cam",
        "term": "cam",
        "cn": "凸轮",
        "kind": "term",
        "variants": [
          "cam",
          "cams"
        ],
        "parentId": null,
        "definition": "A curved or grooved surface imparts motion to a follower.",
        "definitionCn": "通过曲面或沟槽向从动件传递运动的机械元件。",
        "sourceBlock": "u9-p1",
        "anchor": "cam",
        "highlight": true,
        "evidenceRefs": [
          "u9-p1"
        ]
      },
      {
        "id": "u9-l1-core-elements",
        "term": "Elements and cam shapes",
        "cn": "部件与凸轮形状",
        "kind": "group",
        "variants": [],
        "parentId": "u9-l1-core-cam",
        "definition": "Teaching group: Elements and cam shapes.",
        "definitionCn": "教学分组：部件与凸轮形状。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u9-l1-core-geometry",
        "term": "Geometric terms",
        "cn": "几何术语",
        "kind": "group",
        "variants": [],
        "parentId": "u9-l1-core-cam",
        "definition": "Teaching group: Geometric terms.",
        "definitionCn": "教学分组：几何术语。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u9-l1-core-motion",
        "term": "Follower motion",
        "cn": "从动件运动",
        "kind": "group",
        "variants": [],
        "parentId": "u9-l1-core-cam",
        "definition": "Teaching group: Follower motion.",
        "definitionCn": "教学分组：从动件运动。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u9-l1-core-follower",
        "term": "follower",
        "cn": "从动件",
        "kind": "term",
        "variants": [
          "follower",
          "followers"
        ],
        "parentId": "u9-l1-core-elements",
        "definition": "The element mating with the cam surface receives motion from the cam.",
        "definitionCn": "与凸轮表面配合并从凸轮获得运动的元件。",
        "sourceBlock": "u9-p1",
        "anchor": "follower",
        "highlight": true,
        "evidenceRefs": [
          "u9-p1"
        ]
      },
      {
        "id": "u9-l1-core-disk-cam",
        "term": "disk cam",
        "cn": "盘形凸轮",
        "kind": "term",
        "variants": [
          "disk cam"
        ],
        "parentId": "u9-l1-core-elements",
        "definition": "A cam shape used in the radial translating roller-follower example.",
        "definitionCn": "课文径向直动滚子从动件示例所用的凸轮形状。",
        "sourceBlock": "u9-p3",
        "anchor": "disk cam",
        "highlight": true,
        "evidenceRefs": [
          "u9-p3"
        ]
      },
      {
        "id": "u9-l1-core-cylindrical-cam",
        "term": "cylindrical cam",
        "cn": "圆柱凸轮",
        "kind": "term",
        "variants": [
          "cylindrical (three-dimensional or spatial) cams"
        ],
        "parentId": "u9-l1-core-elements",
        "definition": "The cylindrical cam is described as three-dimensional or spatial.",
        "definitionCn": "课文将其描述为三维或空间形式的凸轮。",
        "sourceBlock": "u9-p2",
        "anchor": "cylindrical (three-dimensional or spatial) cams",
        "highlight": true,
        "evidenceRefs": [
          "u9-p2"
        ]
      },
      {
        "id": "u9-l1-core-base-circle",
        "term": "base circle",
        "cn": "基圆",
        "kind": "term",
        "variants": [
          "base circle"
        ],
        "parentId": "u9-l1-core-geometry",
        "definition": "The smallest concentric circle tangent to the cam surface in the example.",
        "definitionCn": "示例中与凸轮轴同心、与凸轮表面相切的最小圆。",
        "sourceBlock": "u9-p3",
        "anchor": "base circle",
        "highlight": true,
        "evidenceRefs": [
          "u9-p3"
        ]
      },
      {
        "id": "u9-l1-core-pitch-curve",
        "term": "pitch curve",
        "cn": "节曲线（理论廓线）",
        "kind": "term",
        "variants": [
          "pitch curve"
        ],
        "parentId": "u9-l1-core-geometry",
        "definition": "The curve generated by the trace point at the roller center.",
        "definitionCn": "由滚子中心的标记点生成的轨迹曲线。",
        "sourceBlock": "u9-p3",
        "anchor": "pitch curve",
        "highlight": true,
        "evidenceRefs": [
          "u9-p3"
        ]
      },
      {
        "id": "u9-l1-core-pressure-angle",
        "term": "pressure angle",
        "cn": "压力角",
        "kind": "term",
        "variants": [
          "pressure angle"
        ],
        "parentId": "u9-l1-core-geometry",
        "definition": "The angle between the roller-center path direction and the pitch-curve normal.",
        "definitionCn": "滚子中心运动方向与通过该中心的节曲线法线之间的夹角。",
        "sourceBlock": "u9-p3",
        "anchor": "pressure angle",
        "highlight": true,
        "evidenceRefs": [
          "u9-p3"
        ]
      },
      {
        "id": "u9-l1-core-translation",
        "term": "translation",
        "cn": "平动（直动）",
        "kind": "term",
        "variants": [
          "translation",
          "translating",
          "translational"
        ],
        "parentId": "u9-l1-core-motion",
        "definition": "A form of follower motion contrasted with oscillation.",
        "definitionCn": "课文中与摆动相区分的从动件运动形式。",
        "sourceBlock": "u9-p1",
        "anchor": "translation",
        "highlight": true,
        "evidenceRefs": [
          "u9-p1"
        ]
      },
      {
        "id": "u9-l1-core-oscillation",
        "term": "oscillation",
        "cn": "摆动",
        "kind": "term",
        "variants": [
          "oscillation"
        ],
        "parentId": "u9-l1-core-motion",
        "definition": "An oscillating form of follower motion driven by a cam.",
        "definitionCn": "由凸轮驱动的从动件摆动形式。",
        "sourceBlock": "u9-p1",
        "anchor": "oscillation",
        "highlight": true,
        "evidenceRefs": [
          "u9-p1"
        ]
      },
      {
        "id": "u9-l1-core-rise",
        "term": "rise",
        "cn": "升程",
        "kind": "term",
        "variants": [
          "rise"
        ],
        "parentId": "u9-l1-core-motion",
        "definition": "The rise part of the rise-dwell-return motion sequence.",
        "definitionCn": "升程—停歇—回程运动规律中的升程阶段。",
        "sourceBlock": "u9-p4",
        "anchor": "rise",
        "highlight": true,
        "allowInsideHyphenatedPhrase": true,
        "evidenceRefs": [
          "u9-p4"
        ]
      },
      {
        "id": "u9-l1-core-dwell",
        "term": "dwell",
        "cn": "停歇",
        "kind": "term",
        "variants": [
          "dwell"
        ],
        "parentId": "u9-l1-core-motion",
        "definition": "A dwell period in the specified follower-motion sequence.",
        "definitionCn": "规定从动件运动规律中的停歇阶段。",
        "sourceBlock": "u9-p4",
        "anchor": "dwell",
        "highlight": true,
        "allowInsideHyphenatedPhrase": true,
        "evidenceRefs": [
          "u9-p4"
        ]
      },
      {
        "id": "u9-l1-core-return",
        "term": "return",
        "cn": "回程",
        "kind": "term",
        "variants": [
          "return"
        ],
        "parentId": "u9-l1-core-motion",
        "definition": "The return part of the rise-dwell-return sequence.",
        "definitionCn": "升程—停歇—回程运动规律中的返回阶段。",
        "sourceBlock": "u9-p4",
        "anchor": "return",
        "highlight": true,
        "allowInsideHyphenatedPhrase": true,
        "evidenceRefs": [
          "u9-p4"
        ]
      }
    ],
    "processOrder": [
      "u9-l1-core-rise",
      "u9-l1-core-dwell",
      "u9-l1-core-return"
    ]
  },
  "10/1": {
    "title": "Introduction of Machining",
    "cn": "机械加工概论",
    "rootId": "u10-l1-core-machining",
    "nodes": [
      {
        "id": "u10-l1-core-machining",
        "term": "machining",
        "cn": "机械加工",
        "kind": "term",
        "variants": [
          "Machining"
        ],
        "parentId": null,
        "definition": "A power-driven device removes material in chip form to produce shape.",
        "definitionCn": "通过动力装置以切屑形式去除材料、形成所需形状的加工。",
        "sourceBlock": "u10-p2",
        "anchor": "Machining",
        "highlight": true,
        "evidenceRefs": [
          "u10-p2"
        ]
      },
      {
        "id": "u10-l1-core-elements",
        "term": "Machining elements",
        "cn": "加工要素",
        "kind": "group",
        "variants": [],
        "parentId": "u10-l1-core-machining",
        "definition": "Teaching group: Machining elements.",
        "definitionCn": "教学分组：加工要素。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u10-l1-core-quality",
        "term": "Quality requirements",
        "cn": "质量要求",
        "kind": "group",
        "variants": [],
        "parentId": "u10-l1-core-machining",
        "definition": "Teaching group: Quality requirements.",
        "definitionCn": "教学分组：质量要求。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u10-l1-core-workpiece",
        "term": "workpiece",
        "cn": "工件",
        "kind": "term",
        "variants": [
          "workpiece",
          "work piece"
        ],
        "parentId": "u10-l1-core-elements",
        "definition": "The material body supported and shaped during machining.",
        "definitionCn": "在加工过程中被支承、加工成形的材料实体。",
        "sourceBlock": "u10-p2",
        "anchor": "work piece",
        "highlight": true,
        "evidenceRefs": [
          "u10-p2"
        ]
      },
      {
        "id": "u10-l1-core-cutting-tool",
        "term": "cutting tool",
        "cn": "刀具",
        "kind": "term",
        "variants": [
          "cutting tool"
        ],
        "parentId": "u10-l1-core-elements",
        "definition": "The tool used to remove material from the workpiece.",
        "definitionCn": "用于从工件上去除材料的工具。",
        "sourceBlock": "u10-p2",
        "anchor": "cutting tool",
        "highlight": true,
        "evidenceRefs": [
          "u10-p2"
        ]
      },
      {
        "id": "u10-l1-core-chip",
        "term": "chip",
        "cn": "切屑",
        "kind": "term",
        "variants": [
          "chip",
          "chips"
        ],
        "parentId": "u10-l1-core-elements",
        "definition": "Material is removed from the workpiece in this form.",
        "definitionCn": "从工件上被去除的材料形态。",
        "sourceBlock": "u10-p2",
        "anchor": "chip",
        "highlight": true,
        "evidenceRefs": [
          "u10-p2"
        ]
      },
      {
        "id": "u10-l1-core-accuracy",
        "term": "accuracy",
        "cn": "精度",
        "kind": "term",
        "variants": [
          "accuracy",
          "accuracies"
        ],
        "parentId": "u10-l1-core-quality",
        "definition": "Close accuracies are a stated reason for machining selected surfaces.",
        "definitionCn": "对特定表面采用机械加工的重要质量要求。",
        "sourceBlock": "u10-p4",
        "anchor": "accuracies",
        "highlight": true,
        "evidenceRefs": [
          "u10-p4"
        ]
      },
      {
        "id": "u10-l1-core-surface-finish",
        "term": "surface finish",
        "cn": "表面光洁度",
        "kind": "term",
        "variants": [
          "surface finish",
          "surface finishes"
        ],
        "parentId": "u10-l1-core-quality",
        "definition": "The reading identifies good surface finish as an advantage of machining.",
        "definitionCn": "课文列举的机械加工所能获得的一种表面质量。",
        "sourceBlock": "u10-p4",
        "anchor": "surface finishes",
        "highlight": true,
        "evidenceRefs": [
          "u10-p4"
        ]
      },
      {
        "id": "u10-l1-core-tolerance",
        "term": "tolerance",
        "cn": "公差",
        "kind": "term",
        "variants": [
          "tolerance",
          "tolerances"
        ],
        "parentId": "u10-l1-core-quality",
        "definition": "A quality requirement discussed when comparing production processes.",
        "definitionCn": "比较不同生产工艺时讨论的尺寸允许变化要求。",
        "sourceBlock": "u10-p4",
        "anchor": "tolerances",
        "highlight": true,
        "evidenceRefs": [
          "u10-p4"
        ]
      }
    ]
  },
  "10/2": {
    "title": "Lathes",
    "cn": "车床",
    "rootId": "u10-l2-core-lathe",
    "nodes": [
      {
        "id": "u10-l2-core-lathe",
        "term": "lathe",
        "cn": "车床",
        "kind": "term",
        "variants": [
          "lathe",
          "lathes",
          "engine lathe",
          "engine lathes"
        ],
        "parentId": null,
        "definition": "A lathe removes material by rotating the workpiece against a cutter.",
        "definitionCn": "通过工件相对刀具旋转来去除材料的机床。",
        "sourceBlock": "u10-p7",
        "anchor": "engine lathes",
        "highlight": true,
        "evidenceRefs": [
          "u10-p7",
          "u10-p10"
        ]
      },
      {
        "id": "u10-l2-core-support",
        "term": "Work support and rotation",
        "cn": "工件支承与旋转",
        "kind": "group",
        "variants": [],
        "parentId": "u10-l2-core-lathe",
        "definition": "Teaching group: Work support and rotation.",
        "definitionCn": "教学分组：工件支承与旋转。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u10-l2-core-tool-support",
        "term": "Tool support",
        "cn": "刀具支承",
        "kind": "group",
        "variants": [],
        "parentId": "u10-l2-core-lathe",
        "definition": "Teaching group: Tool support.",
        "definitionCn": "教学分组：刀具支承。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u10-l2-core-feed",
        "term": "Feed transmission",
        "cn": "进给传动",
        "kind": "group",
        "variants": [],
        "parentId": "u10-l2-core-lathe",
        "definition": "Teaching group: Feed transmission.",
        "definitionCn": "教学分组：进给传动。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u10-l2-core-spindle",
        "term": "spindle",
        "cn": "主轴",
        "kind": "term",
        "variants": [
          "spindle",
          "spindles"
        ],
        "parentId": "u10-l2-core-support",
        "definition": "A hollow shaft driven by the motor transmits rotation to the workpiece.",
        "definitionCn": "由电动机驱动、向工件传递旋转运动的空心轴。",
        "sourceBlock": "u10-p11",
        "anchor": "spindle",
        "highlight": true,
        "evidenceRefs": [
          "u10-p11"
        ]
      },
      {
        "id": "u10-l2-core-bed",
        "term": "lathe bed",
        "cn": "床身",
        "kind": "term",
        "variants": [
          "lathe bed"
        ],
        "parentId": "u10-l2-core-support",
        "definition": "The cast-iron bed provides accurately ground sliding ways.",
        "definitionCn": "为移动部件提供精加工导轨的铸铁基础部件。",
        "sourceBlock": "u10-p12",
        "anchor": "lathe bed",
        "highlight": true,
        "evidenceRefs": [
          "u10-p12"
        ]
      },
      {
        "id": "u10-l2-core-tailstock",
        "term": "tailstock",
        "cn": "尾座",
        "kind": "term",
        "variants": [
          "tailstock",
          "lathe tailstock"
        ],
        "parentId": "u10-l2-core-support",
        "definition": "A movable unit supports drills, reamers or centers in its spindle.",
        "definitionCn": "可沿导轨移动，主轴可装钻头、铰刀或顶尖的部件。",
        "sourceBlock": "u10-p15",
        "anchor": "lathe tailstock",
        "highlight": true,
        "evidenceRefs": [
          "u10-p15"
        ]
      },
      {
        "id": "u10-l2-core-carriage",
        "term": "carriage",
        "cn": "溜板（刀架滑座）",
        "kind": "term",
        "variants": [
          "carriage",
          "lathe carriage"
        ],
        "parentId": "u10-l2-core-tool-support",
        "definition": "The carriage supports the tool holder and moves along the ways.",
        "definitionCn": "支承刀架并沿导轨移动的部件。",
        "sourceBlock": "u10-p12",
        "anchor": "carriage",
        "highlight": true,
        "evidenceRefs": [
          "u10-p12"
        ]
      },
      {
        "id": "u10-l2-core-tool-holder",
        "term": "tool holder",
        "cn": "刀架",
        "kind": "term",
        "variants": [
          "tool holder"
        ],
        "parentId": "u10-l2-core-tool-support",
        "definition": "The cutting tool is mounted in this holder.",
        "definitionCn": "用来安装切削刀具的部件。",
        "sourceBlock": "u10-p12",
        "anchor": "tool holder",
        "highlight": true,
        "evidenceRefs": [
          "u10-p12"
        ]
      },
      {
        "id": "u10-l2-core-apron",
        "term": "apron",
        "cn": "溜板箱",
        "kind": "term",
        "variants": [
          "apron"
        ],
        "parentId": "u10-l2-core-tool-support",
        "definition": "The apron contains gears that move the tool and carriage.",
        "definitionCn": "内装齿轮、使刀具和溜板移动的部件。",
        "sourceBlock": "u10-p12",
        "anchor": "apron",
        "highlight": true,
        "evidenceRefs": [
          "u10-p12"
        ]
      },
      {
        "id": "u10-l2-core-compound-rest",
        "term": "compound rest",
        "cn": "小刀架（复式刀架）",
        "kind": "term",
        "variants": [
          "compound rest"
        ],
        "parentId": "u10-l2-core-tool-support",
        "definition": "A unit above the carriage allows angular setting of the tool holder.",
        "definitionCn": "位于溜板上方，可使刀架按所需角度调整的部件。",
        "sourceBlock": "u10-p13",
        "anchor": "compound rest",
        "highlight": true,
        "evidenceRefs": [
          "u10-p13"
        ]
      },
      {
        "id": "u10-l2-core-feed-box",
        "term": "feed box",
        "cn": "进给箱",
        "kind": "term",
        "variants": [
          "feed box"
        ],
        "parentId": "u10-l2-core-feed",
        "definition": "Gears in the feed box control motion and feed rate.",
        "definitionCn": "内装齿轮，用于控制运动和进给速率的部件。",
        "sourceBlock": "u10-p13",
        "anchor": "feed box",
        "highlight": true,
        "evidenceRefs": [
          "u10-p13"
        ]
      },
      {
        "id": "u10-l2-core-feed-rod",
        "term": "feed rod",
        "cn": "光杠（进给杆）",
        "kind": "term",
        "variants": [
          "feed rod"
        ],
        "parentId": "u10-l2-core-feed",
        "definition": "The feed rod provides tool motion for ordinary accurate machining.",
        "definitionCn": "用于提供一般加工所需刀具进给运动的传动杆。",
        "sourceBlock": "u10-p14",
        "anchor": "feed rod",
        "highlight": true,
        "evidenceRefs": [
          "u10-p14"
        ]
      },
      {
        "id": "u10-l2-core-lead-screw",
        "term": "lead screw",
        "cn": "丝杠",
        "kind": "term",
        "variants": [
          "lead screw"
        ],
        "parentId": "u10-l2-core-feed",
        "definition": "The lead screw provides the accurate lead required for thread cutting.",
        "definitionCn": "为螺纹切削提供精确导程的传动部件。",
        "sourceBlock": "u10-p14",
        "anchor": "lead screw",
        "highlight": true,
        "evidenceRefs": [
          "u10-p14"
        ]
      }
    ]
  },
  "11/1": {
    "title": "Introduction of EDM",
    "cn": "电火花加工概论",
    "rootId": "u11-l1-core-edm",
    "nodes": [
      {
        "id": "u11-l1-core-edm",
        "term": "electrical discharge machining",
        "cn": "电火花加工",
        "kind": "term",
        "variants": [
          "electrical discharge machining",
          "EDM"
        ],
        "parentId": null,
        "definition": "Controlled electric spark discharges erode electrically conductive workpiece material.",
        "definitionCn": "利用受控电火花放电的蚀除作用去除导电工件材料。",
        "sourceBlock": "u11-p2",
        "anchor": "Electrical Discharge Machining",
        "highlight": true,
        "evidenceRefs": [
          "u11-p2",
          "u11-p6"
        ]
      },
      {
        "id": "u11-l1-core-system",
        "term": "System elements",
        "cn": "系统要素",
        "kind": "group",
        "variants": [],
        "parentId": "u11-l1-core-edm",
        "definition": "Teaching group: System elements.",
        "definitionCn": "教学分组：系统要素。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u11-l1-core-discharge",
        "term": "Discharge process",
        "cn": "放电过程",
        "kind": "group",
        "variants": [],
        "parentId": "u11-l1-core-edm",
        "definition": "Teaching group: Discharge process.",
        "definitionCn": "教学分组：放电过程。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u11-l1-core-quality",
        "term": "Performance and surface",
        "cn": "效率与表面",
        "kind": "group",
        "variants": [],
        "parentId": "u11-l1-core-edm",
        "definition": "Teaching group: Performance and surface.",
        "definitionCn": "教学分组：效率与表面。",
        "sourceBlock": null,
        "highlight": false
      },
      {
        "id": "u11-l1-core-workpiece",
        "term": "workpiece",
        "cn": "工件",
        "kind": "term",
        "variants": [
          "workpiece",
          "workpieces"
        ],
        "parentId": "u11-l1-core-system",
        "definition": "The electrically conductive body from which small material volumes are removed.",
        "definitionCn": "在放电过程中被逐次去除少量材料的导电实体。",
        "sourceBlock": "u11-p4",
        "anchor": "workpiece",
        "highlight": true,
        "evidenceRefs": [
          "u11-p4",
          "u11-p6"
        ]
      },
      {
        "id": "u11-l1-core-electrode",
        "term": "electrode",
        "cn": "电极",
        "kind": "term",
        "variants": [
          "electrode",
          "electrodes"
        ],
        "parentId": "u11-l1-core-system",
        "definition": "The electrode acts as the tool opposite the workpiece.",
        "definitionCn": "与工件相对、起工具作用的导电体。",
        "sourceBlock": "u11-p6",
        "anchor": "electrodes",
        "highlight": true,
        "evidenceRefs": [
          "u11-p6"
        ]
      },
      {
        "id": "u11-l1-core-dielectric",
        "term": "dielectric liquid",
        "cn": "电介质工作液",
        "kind": "term",
        "variants": [
          "dielectric liquid",
          "liquid dielectric"
        ],
        "parentId": "u11-l1-core-system",
        "definition": "Water or oil surrounds the gap, cools the electrodes and removes particles.",
        "definitionCn": "充满间隙、冷却电极并冲走颗粒的水或油等工作液。",
        "sourceBlock": "u11-p6",
        "anchor": "dielectric liquid",
        "highlight": true,
        "evidenceRefs": [
          "u11-p6",
          "u11-p11"
        ]
      },
      {
        "id": "u11-l1-core-spark-discharge",
        "term": "electric spark discharge",
        "cn": "电火花放电",
        "kind": "term",
        "variants": [
          "electric spark discharge",
          "electric spark discharges"
        ],
        "parentId": "u11-l1-core-discharge",
        "definition": "A controlled discharge produces the eroding effect used in EDM.",
        "definitionCn": "产生电火花加工所需蚀除作用的受控放电。",
        "sourceBlock": "u11-p6",
        "anchor": "electric spark discharges",
        "highlight": true,
        "evidenceRefs": [
          "u11-p6"
        ]
      },
      {
        "id": "u11-l1-core-breakdown",
        "term": "breakdown",
        "cn": "击穿",
        "kind": "term",
        "variants": [
          "breakdown"
        ],
        "parentId": "u11-l1-core-discharge",
        "definition": "The dielectric breaks down as the electric field reaches the needed value.",
        "definitionCn": "间隙电场达到所需条件时电介质发生击穿。",
        "sourceBlock": "u11-p7",
        "anchor": "breakdown",
        "highlight": true,
        "evidenceRefs": [
          "u11-p7"
        ]
      },
      {
        "id": "u11-l1-core-plasma-channel",
        "term": "plasma channel",
        "cn": "等离子体通道",
        "kind": "term",
        "variants": [
          "plasma channel"
        ],
        "parentId": "u11-l1-core-discharge",
        "definition": "Ionization creates a channel that permits discharge current to flow.",
        "definitionCn": "电离后形成、使放电电流能够通过的通道。",
        "sourceBlock": "u11-p7",
        "anchor": "plasma channel",
        "highlight": true,
        "evidenceRefs": [
          "u11-p7"
        ]
      },
      {
        "id": "u11-l1-core-molten-pool",
        "term": "molten metal pool",
        "cn": "熔融金属池",
        "kind": "term",
        "variants": [
          "molten metal pool"
        ],
        "parentId": "u11-l1-core-discharge",
        "definition": "Strong heating creates a small molten region at the workpiece surface.",
        "definitionCn": "强烈加热在工件表面形成的小块熔融金属区域。",
        "sourceBlock": "u11-p8",
        "anchor": "molten metal pool",
        "highlight": true,
        "evidenceRefs": [
          "u11-p8"
        ]
      },
      {
        "id": "u11-l1-core-crater",
        "term": "crater",
        "cn": "放电凹坑",
        "kind": "term",
        "variants": [
          "crater"
        ],
        "parentId": "u11-l1-core-discharge",
        "definition": "A small surface depression remains after molten material is removed.",
        "definitionCn": "熔融材料被排出后留在工件表面的小凹坑。",
        "sourceBlock": "u11-p9",
        "anchor": "crater",
        "highlight": true,
        "evidenceRefs": [
          "u11-p9"
        ]
      },
      {
        "id": "u11-l1-core-removal-rate",
        "term": "material removal rate",
        "cn": "材料去除率",
        "kind": "term",
        "variants": [
          "material removal rate"
        ],
        "parentId": "u11-l1-core-quality",
        "definition": "A measure of removal speed discussed as relatively low for EDM.",
        "definitionCn": "反映去除材料速度的指标，课文将其较低作为局限。",
        "sourceBlock": "u11-p4",
        "anchor": "material removal rate",
        "highlight": true,
        "evidenceRefs": [
          "u11-p4"
        ]
      },
      {
        "id": "u11-l1-core-haz",
        "term": "heat affected zone",
        "cn": "热影响区",
        "kind": "term",
        "variants": [
          "heat affected zone"
        ],
        "parentId": "u11-l1-core-quality",
        "definition": "A thermally modified surface region listed as an EDM disadvantage.",
        "definitionCn": "课文列举的工件表层受热改变的区域。",
        "sourceBlock": "u11-p4",
        "anchor": "heat affected zone",
        "highlight": true,
        "evidenceRefs": [
          "u11-p4"
        ]
      }
    ],
    "processOrder": [
      "u11-l1-core-breakdown",
      "u11-l1-core-plasma-channel",
      "u11-l1-core-molten-pool",
      "u11-l1-core-crater"
    ]
  }
};
