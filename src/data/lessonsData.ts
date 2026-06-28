export interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "root" | "branch" | "leaf";
  color?: string;
}

export interface MindMapConnection {
  from: string;
  to: string;
}

export interface LessonContent {
  topicId: string;
  title: string;
  goldenKeys: string[];
  mindMap: {
    nodes: MindMapNode[];
    connections: MindMapConnection[];
  };
}

// Map of module-level templates to ensure highly relevant lessons for all 36 topics
export const getLessonContent = (topicId: string, topicName: string, moduleId: string): LessonContent => {
  // Let's customize specific topics that are highly popular, and fallback to module-specific structures
  
  if (topicId === "1" || topicId === "19") {
    // Missing Number or Wrong Number in series
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "🔍 First-Order Differences: Subtract consecutive terms. If differences are constant, it is an arithmetic series (+3, +3, +3).",
        "📈 Growth Velocity: If numbers grow extremely fast, look for multiplication (e.g. ×2, ×3) or power indices.",
        "⚡ Perfect Squares/Cubes: Memorize squares (1 to 25) and cubes (1 to 10). Patterns often hide as n² + 1, n² - 1, or n³ - n.",
        "🔄 Alternating Series: If the numbers jump up and down, check alternate terms (1st, 3rd, 5th...) as two interleaved series."
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Number Series", x: 200, y: 150, type: "root", color: "from-amber-400 to-amber-600" },
          { id: "b1", label: "Arithmetic", x: 80, y: 70, type: "branch", color: "from-blue-400 to-indigo-600" },
          { id: "b2", label: "Geometric", x: 320, y: 70, type: "branch", color: "from-pink-400 to-rose-600" },
          { id: "b3", label: "Power Series", x: 80, y: 230, type: "branch", color: "from-emerald-400 to-teal-600" },
          { id: "b4", label: "Alternate", x: 320, y: 230, type: "branch", color: "from-purple-400 to-violet-600" },
          { id: "l1", label: "Constant Diff (+/-)", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "Growing Diff", x: 80, y: 15, type: "leaf" },
          { id: "l3", label: "Constant Ratio (×/÷)", x: 380, y: 20, type: "leaf" },
          { id: "l4", label: "Fibonacci Sum", x: 320, y: 15, type: "leaf" },
          { id: "l5", label: "Squares (n² +/- c)", x: 20, y: 280, type: "leaf" },
          { id: "l6", label: "Cubes (n³ +/- c)", x: 80, y: 285, type: "leaf" },
          { id: "l7", label: "Odd/Even Slots", x: 380, y: 280, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "root", to: "b3" },
          { from: "root", to: "b4" },
          { from: "b1", to: "l1" },
          { from: "b1", to: "l2" },
          { from: "b2", to: "l3" },
          { from: "b2", to: "l4" },
          { from: "b3", to: "l5" },
          { from: "b3", to: "l6" },
          { from: "b4", to: "l7" }
        ]
      }
    };
  }

  if (topicId === "2" || topicId === "10" || topicId === "16") {
    // Missing Letter, Decoding, English Dictionary
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "🔤 EJOTY Anchor: Memorize letter ranks using EJOTY (E=5, J=10, O=15, T=20, Y=25) for immediate positional conversion.",
        "🔄 Opposite Pairs (Sum 27): Letters opposite to each other in the alphabet sum to 27. (A=1 + Z=26 = 27, B=2 + Y=25 = 27).",
        "🎯 Circular Wrap-around: The alphabet rolls over! Z (26) + 1 = A (1), and A (1) - 1 = Z (26).",
        "📝 Letter Shift Rules: Translate strings into positional number series, find the math shift rule (+2, -1, +3...), then decode back."
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Alphabet Logic", x: 200, y: 150, type: "root", color: "from-indigo-400 to-indigo-600" },
          { id: "b1", label: "Positional Shifts", x: 80, y: 70, type: "branch", color: "from-blue-400 to-blue-600" },
          { id: "b2", label: "Reverse Coding", x: 320, y: 70, type: "branch", color: "from-pink-400 to-pink-600" },
          { id: "b3", label: "EJOTY anchors", x: 80, y: 230, type: "branch", color: "from-emerald-400 to-emerald-600" },
          { id: "b4", label: "Dictionary Sort", x: 320, y: 230, type: "branch", color: "from-purple-400 to-purple-600" },
          { id: "l1", label: "Constant (+2/-3)", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "Vowel Jump", x: 80, y: 15, type: "leaf" },
          { id: "l3", label: "Sum = 27 rule", x: 380, y: 20, type: "leaf" },
          { id: "l4", label: "Z to A wrap", x: 320, y: 15, type: "leaf" },
          { id: "l5", label: "A=1, B=2 coding", x: 20, y: 280, type: "leaf" },
          { id: "l6", label: "First Letter Match", x: 380, y: 280, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "root", to: "b3" },
          { from: "root", to: "b4" },
          { from: "b1", to: "l1" },
          { from: "b1", to: "l2" },
          { from: "b2", to: "l3" },
          { from: "b2", to: "l4" },
          { from: "b3", to: "l5" },
          { from: "b4", to: "l6" }
        ]
      }
    };
  }

  if (topicId === "7") {
    // Counting figures
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "📐 Base Triangle Formula: For a triangle divided into N sections by vertical lines, the total triangles = N × (N + 1) / 2.",
        "📊 Grid Method: Label each individual region with a letter or number (1, 2, 3...) to count systematically.",
        "🔄 Compound Shapes: Combine adjacent single regions (e.g. 1+2, 2+3, 1+2+3+4) to hunt for larger nested shapes.",
        "⚡ Square Segments: A square divided by two diagonals contains exactly 8 triangles. Memorize this multiplier!"
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Geometric Count", x: 200, y: 150, type: "root", color: "from-rose-400 to-rose-600" },
          { id: "b1", label: "Triangles", x: 80, y: 70, type: "branch", color: "from-blue-400 to-blue-600" },
          { id: "b2", label: "Squares/Rects", x: 320, y: 70, type: "branch", color: "from-emerald-400 to-emerald-600" },
          { id: "b3", label: "Straight Lines", x: 200, y: 250, type: "branch", color: "from-purple-400 to-purple-600" },
          { id: "l1", label: "Base Addition (1+2+3)", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "Diagonal cross = 8", x: 80, y: 15, type: "leaf" },
          { id: "l3", label: "Row x Col sum", x: 380, y: 20, type: "leaf" },
          { id: "l4", label: "No overlaps rule", x: 320, y: 15, type: "leaf" },
          { id: "l5", label: "Horizontal + Vertical", x: 200, y: 290, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "root", to: "b3" },
          { from: "b1", to: "l1" },
          { from: "b1", to: "l2" },
          { from: "b2", to: "l3" },
          { from: "b2", to: "l4" },
          { from: "b3", to: "l5" }
        ]
      }
    };
  }

  if (topicId === "8") {
    // Venn diagrams
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "🔵 Exclusive Regions: Pay absolute attention to key words like 'ONLY' or 'NOT' to filter out intersecting regions.",
        "🤝 Overlapping Sets: If elements exist in multiple circles, they represent shared intersection attributes.",
        "📊 Logic Relations: Map real-world categories (e.g. Birds, Mammals, Animals) into nested, disjoint, or overlapping sets.",
        "💡 Universal Containment: A subset is drawn completely inside another circle (e.g. Seconds inside Minutes, inside Hours)."
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Venn Logic", x: 200, y: 150, type: "root", color: "from-teal-400 to-teal-600" },
          { id: "b1", label: "Nested Sets", x: 80, y: 70, type: "branch", color: "from-blue-400 to-blue-600" },
          { id: "b2", label: "Disjoint Sets", x: 320, y: 70, type: "branch", color: "from-red-400 to-red-600" },
          { id: "b3", label: "Intersecting", x: 200, y: 250, type: "branch", color: "from-yellow-400 to-yellow-600" },
          { id: "l1", label: "All A are B", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "No A is B", x: 380, y: 20, type: "leaf" },
          { id: "l3", label: "Some A are B", x: 200, y: 290, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "root", to: "b3" },
          { from: "b1", to: "l1" },
          { from: "b2", to: "l2" },
          { from: "b3", to: "l3" }
        ]
      }
    };
  }

  // Fallbacks based on module ID
  if (moduleId === "Numerical") {
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "➕ Check Operations: Look for basic addition, subtraction, multiplication, or division between consecutive values.",
        "📈 Growth Trends: Rapid increases suggest squares, cubes, or geometric progression factors.",
        "⚡ Formulas: Always establish algebraic formulations for puzzle grids or series differences.",
        "🔄 Verify Fully: Confirm your rule holds true across the entire series or matrix before submitting."
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Numerical Logic", x: 200, y: 150, type: "root", color: "from-emerald-400 to-emerald-600" },
          { id: "b1", label: "Pattern Math", x: 80, y: 70, type: "branch", color: "from-blue-400 to-blue-600" },
          { id: "b2", label: "Algebra Rules", x: 320, y: 70, type: "branch", color: "from-pink-400 to-pink-600" },
          { id: "l1", label: "Consecutive diffs", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "Prime logic", x: 80, y: 15, type: "leaf" },
          { id: "l3", label: "Row-Col relations", x: 380, y: 20, type: "leaf" },
          { id: "l4", label: "Operator substitution", x: 320, y: 15, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "b1", to: "l1" },
          { from: "b1", to: "l2" },
          { from: "b2", to: "l3" },
          { from: "b2", to: "l4" }
        ]
      }
    };
  } else if (moduleId === "Verbal") {
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "🔤 Alphabetic converter: Write down letter positions (1 to 26) first when stuck.",
        "🤝 Semantic analogies: Evaluate synonyms, antonyms, parts of speech, and physical properties.",
        "🔀 Dictionary sequencing: Sort letters alphabetically, comparing term-by-term systematically.",
        "💡 Outlier hunt: Ensure the odd-one-out lacks the exact common rule shared by all remaining options."
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Verbal Logic", x: 200, y: 150, type: "root", color: "from-blue-400 to-blue-600" },
          { id: "b1", label: "Word Meanings", x: 80, y: 70, type: "branch", color: "from-amber-400 to-amber-600" },
          { id: "b2", label: "Alphabet shifts", x: 320, y: 70, type: "branch", color: "from-purple-400 to-purple-600" },
          { id: "l1", label: "Synonyms/Antonyms", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "Word categories", x: 80, y: 15, type: "leaf" },
          { id: "l3", label: "+/- position steps", x: 380, y: 20, type: "leaf" },
          { id: "l4", label: "Dictionary sequence", x: 320, y: 15, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "b1", to: "l1" },
          { from: "b1", to: "l2" },
          { from: "b2", to: "l3" },
          { from: "b2", to: "l4" }
        ]
      }
    };
  } else if (moduleId === "Visual") {
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "🪞 Mirror Inversion: Horizontal reflection swaps Left and Right, but Top and Bottom remain unchanged.",
        "💧 Water Inversion: Vertical reflection upside down swaps Top and Bottom, but Left and Right remain identical.",
        "🎲 Dice Opposites: Unfolded dice show opposite faces spaced exactly one square apart.",
        "🔄 Symmetry & Rotations: Observe rotational angles (45°, 90°, 180°) of visual objects clockwise or anti-clockwise."
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Visual Logic", x: 200, y: 150, type: "root", color: "from-amber-400 to-amber-600" },
          { id: "b1", label: "Reflections", x: 80, y: 70, type: "branch", color: "from-blue-400 to-blue-600" },
          { id: "b2", label: "Spatial Folding", x: 320, y: 70, type: "branch", color: "from-pink-400 to-pink-600" },
          { id: "b3", label: "Rotations", x: 200, y: 240, type: "branch", color: "from-purple-400 to-purple-600" },
          { id: "l1", label: "Mirror (Left-Right)", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "Water (Top-Bottom)", x: 80, y: 15, type: "leaf" },
          { id: "l3", label: "Dice net opposites", x: 380, y: 20, type: "leaf" },
          { id: "l4", label: "3D Cube cutting", x: 320, y: 15, type: "leaf" },
          { id: "l5", label: "Clockwise shifts", x: 200, y: 290, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "root", to: "b3" },
          { from: "b1", to: "l1" },
          { from: "b1", to: "l2" },
          { from: "b2", to: "l3" },
          { from: "b2", to: "l4" },
          { from: "b3", to: "l5" }
        ]
      }
    };
  } else {
    // Situational
    return {
      topicId,
      title: topicName,
      goldenKeys: [
        "🧭 Direction Sense: Always draw a small 4-point compass (N, S, E, W) to map walking paths correctly.",
        "👩‍👩‍👦 Blood Relations: Draw a tree. Represent generations vertically, use + for males, - for females, and double lines for couples.",
        "⏰ Ranking & Ages: For line/ranking queries, always use: Total = Rank(top) + Rank(bottom) - 1.",
        "📊 Sit Logic: Arrange seats step-by-step starting ONLY from definite positional clues (e.g. 'A is 2nd to the left of B')."
      ],
      mindMap: {
        nodes: [
          { id: "root", label: "Deductive Logic", x: 200, y: 150, type: "root", color: "from-rose-400 to-rose-600" },
          { id: "b1", label: "Relations & Seats", x: 80, y: 70, type: "branch", color: "from-indigo-400 to-indigo-600" },
          { id: "b2", label: "Space & Time", x: 320, y: 70, type: "branch", color: "from-emerald-400 to-emerald-600" },
          { id: "l1", label: "Family Tree mapping", x: 20, y: 20, type: "leaf" },
          { id: "l2", label: "Circular sits", x: 80, y: 15, type: "leaf" },
          { id: "l3", label: "Compass turns", x: 380, y: 20, type: "leaf" },
          { id: "l4", label: "Clock & Calendar", x: 320, y: 15, type: "leaf" }
        ],
        connections: [
          { from: "root", to: "b1" },
          { from: "root", to: "b2" },
          { from: "b1", to: "l1" },
          { from: "b1", to: "l2" },
          { from: "b2", to: "l3" },
          { from: "b2", to: "l4" }
        ]
      }
    };
  }
};
