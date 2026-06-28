import { Topic } from "../types";

export const TOPICS: Topic[] = [
  // Module A: Numerical Reasoning
  {
    id: "1",
    name: "Missing Number in the Number Series",
    moduleId: "Numerical",
    description: "Crack the code of sequence intervals and find the hidden missing number.",
    order: 1
  },
  {
    id: "3",
    name: "Analogy Number",
    moduleId: "Numerical",
    description: "Solve numeric relations! Find the matching mathematical pairing rules.",
    order: 2
  },
  {
    id: "5",
    name: "Odd one out Number / Pair of Numbers",
    moduleId: "Numerical",
    description: "Inspect the list and catch the rebellious number or pair that doesn't fit the mathematical pattern.",
    order: 3
  },
  {
    id: "11",
    name: "Missing Number in the Figure",
    moduleId: "Numerical",
    description: "Explore geometric grids and find how spatial numbers relate to complete the missing node.",
    order: 4
  },
  {
    id: "17",
    name: "Number Matrix",
    moduleId: "Numerical",
    description: "Find algebraic connections across rows and columns in grid-based logic matrices.",
    order: 5
  },
  {
    id: "19",
    name: "Finding wrong in the Number Series",
    moduleId: "Numerical",
    description: "Identify the impostor number that breaks the arithmetic law of a given sequence.",
    order: 6
  },
  {
    id: "20",
    name: "Numerical Problems",
    moduleId: "Numerical",
    description: "Apply math operators and solve clever equations using custom numerical logic rules.",
    order: 7
  },
  {
    id: "26",
    name: "Ranking Test and Number / Letter Test",
    moduleId: "Numerical",
    description: "Calculate ranks, positions, and queue ordering from descriptive logic strings.",
    order: 8
  },

  // Module B: Verbal & Linguistic Logic
  {
    id: "2",
    name: "Missing Letter in the Number Series",
    moduleId: "Verbal",
    description: "Discover alphabetical series logic and fill in the missing letters.",
    order: 1
  },
  {
    id: "4",
    name: "Analogy Letter / Word",
    moduleId: "Verbal",
    description: "Map word relationships, vocabulary ties, and alphabetical shift analogies.",
    order: 2
  },
  {
    id: "6",
    name: "Odd one out Letters / Word",
    moduleId: "Verbal",
    description: "Find the linguistic outlier in sets of letters or words.",
    order: 3
  },
  {
    id: "10",
    name: "Decoding",
    moduleId: "Verbal",
    description: "Decrypt messages by tracking reverse coding, shifts, and letter swaps.",
    order: 4
  },
  {
    id: "14",
    name: "Word within the word",
    moduleId: "Verbal",
    description: "Form valid small words from the letters of a parent word.",
    order: 5
  },
  {
    id: "15",
    name: "Word cannot be formed",
    moduleId: "Verbal",
    description: "Detect which specific words cannot be assembled using letters of a source word.",
    order: 6
  },
  {
    id: "16",
    name: "Arrangement of Letters in English Dictionary",
    moduleId: "Verbal",
    description: "Sort words alphabetically by analyzing standard dictionary sequence sorting.",
    order: 7
  },
  {
    id: "27",
    name: "Legal Sequence of Word",
    moduleId: "Verbal",
    description: "Organize words into logical chronological or sizing sequences (e.g., Seed to Fruit).",
    order: 8
  },

  // Module C: Visual & Spatial Intelligence
  {
    id: "7",
    name: "Counting the Geometric Figures",
    moduleId: "Visual",
    description: "Count hidden triangles, squares, or circles inside complex geometric line drawings.",
    order: 1
  },
  {
    id: "8",
    name: "Venn Diagrams",
    moduleId: "Visual",
    description: "Match overlapping sets and discover relations between words and overlapping shapes.",
    order: 2
  },
  {
    id: "9",
    name: "Number / Letter Counting",
    moduleId: "Visual",
    description: "Inspect arrays of symbols to count specific occurrences under conditional criteria.",
    order: 3
  },
  {
    id: "12",
    name: "Missing Letter in the Figure",
    moduleId: "Visual",
    description: "Solve letter puzzles placed inside graphical shapes and circles.",
    order: 4
  },
  {
    id: "13",
    name: "Inserted figure: Number / Letter details",
    moduleId: "Visual",
    description: "Find the relationship between outer numbers and the inner result of complex figures.",
    order: 5
  },
  {
    id: "18",
    name: "Number, Signs and Symbols",
    moduleId: "Visual",
    description: "Solve equations by swapping mathematical signs or using coded symbol mappings.",
    order: 6
  },
  {
    id: "28",
    name: "Dice Problems",
    moduleId: "Visual",
    description: "Fold/unfold dice layouts and predict which face lies opposite or adjacent to another.",
    order: 7
  },
  {
    id: "29",
    name: "Cube Problems",
    moduleId: "Visual",
    description: "Understand 3D cube blocks, painting rules, and sectional cutting counts.",
    order: 8
  },
  {
    id: "30",
    name: "Completing the Figural Series",
    moduleId: "Visual",
    description: "Observe visual sequences (rotations, layers) and choose the next pattern frame.",
    order: 9
  },
  {
    id: "31",
    name: "Analogy - Figures",
    moduleId: "Visual",
    description: "Find the visual transformation rule (flip, rotate, scale) of a graphic pairing.",
    order: 10
  },
  {
    id: "32",
    name: "Odd one out - Figure",
    moduleId: "Visual",
    description: "Detect the visual icon that breaks the structural symmetry of a set.",
    order: 11
  },
  {
    id: "33",
    name: "Mirror Image",
    moduleId: "Visual",
    description: "Predict how letters or complex shapes look when reflected horizontally in a mirror.",
    order: 12
  },
  {
    id: "34",
    name: "Water Image",
    moduleId: "Visual",
    description: "Determine the vertical reflection of a figure over an imaginary water pool.",
    order: 13
  },
  {
    id: "35",
    name: "Hidden / Embedded Figures",
    moduleId: "Visual",
    description: "Hunt down simple shape silhouettes hidden inside complex lines.",
    order: 14
  },
  {
    id: "36",
    name: "Complete the Missing Part of the Image",
    moduleId: "Visual",
    description: "Identify the correct jigsaw piece to complete a grid pattern symmetric layout.",
    order: 15
  },

  // Module D: Situational & Logical Deduction
  {
    id: "21",
    name: "Situation Related Problems (Sitting Arrangement & Ages)",
    moduleId: "Situational",
    description: "Deduce circular/linear seating layouts or calculate age equations.",
    order: 1
  },
  {
    id: "22",
    name: "Blood Relation Problems",
    moduleId: "Situational",
    description: "Trace complex family trees from descriptive logic puzzles.",
    order: 2
  },
  {
    id: "23",
    name: "Directions Related Problems",
    moduleId: "Situational",
    description: "Trace movement directions (East, West, Left, Right) and measure final displacement.",
    order: 3
  },
  {
    id: "24",
    name: "Time Related Problem",
    moduleId: "Situational",
    description: "Calculate calendars, clock hands, leap years, and chronological timing intervals.",
    order: 4
  },
  {
    id: "25",
    name: "Puzzle Problem",
    moduleId: "Situational",
    description: "Solve complex grid constraints linking several variable properties (e.g., color, profession, city).",
    order: 5
  }
];
