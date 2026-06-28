import { Question } from "../../types";

export const VISUAL_QUESTIONS: Question[] = [
  // === TOPIC 7: Counting the Geometric Figures ===
  {
    id: "q_7_easy",
    topicId: "7",
    type: "interactive-counting",
    questionText: "Count the total number of triangles embedded inside this square with two diagonals.",
    options: ["4", "6", "8", "10"],
    correctAnswer: "2", // "8"
    explanation: "Let's count step-by-step:\n1. Count individual small triangles: 4 (Top, Bottom, Left, Right).\n2. Count larger triangles formed by merging two adjacent small triangles: 4 (using the diagonals as dividing lines).\nTotal = 4 + 4 = 8 triangles.",
    difficulty: "Easy",
    hint: "Count the four small individual segments first, then look at how they join along each diagonal to make 4 larger triangles.",
    visualData: {
      shapeType: "triangles",
      originalImageSvg: `<svg viewBox="0 0 100 100" class="w-40 h-40 mx-auto stroke-current" fill="none" stroke-width="2">
        <rect x="10" y="10" width="80" height="80" class="text-indigo-600"/>
        <line x1="10" y1="10" x2="90" y2="90" class="text-indigo-600"/>
        <line x1="90" y1="10" x2="10" y2="90" class="text-indigo-600"/>
      </svg>`
    }
  },
  {
    id: "q_7_medium",
    topicId: "7",
    type: "interactive-counting",
    questionText: "Count the total number of triangles inside this triangle divided vertically and horizontally.",
    options: ["4", "6", "8", "12"],
    correctAnswer: "1", // "6"
    explanation: "Let's count the triangles:\n- A standard triangle split down the middle has 3 triangles (1 left, 1 right, and 1 full outer triangle).\n- Since there is a horizontal line cutting it in half, it forms a identical smaller top half which also contains 3 triangles.\n- Total = 3 + 3 = 6 triangles.",
    difficulty: "Medium",
    hint: "Think of this as two identical triangle levels (the top small triangle and the bottom large one). Each level contains 3 triangles.",
    visualData: {
      shapeType: "triangles",
      originalImageSvg: `<svg viewBox="0 0 100 100" class="w-40 h-40 mx-auto stroke-current" fill="none" stroke-width="2">
        <polygon points="50,10 10,90 90,90" class="text-indigo-600"/>
        <line x1="50" y1="10" x2="50" y2="90" class="text-indigo-600"/>
        <line x1="30" y1="50" x2="70" y2="50" class="text-indigo-600"/>
      </svg>`
    }
  },
  {
    id: "q_7_hard",
    topicId: "7",
    type: "interactive-counting",
    questionText: "Count the total number of triangles in a standard 6-pointed Star of David (two overlapping triangles).",
    options: ["6", "8", "10", "12"],
    correctAnswer: "1", // "8"
    explanation: "Let's count the overlapping triangles:\n- There are 6 small outer triangular points.\n- There are 2 large main overlapping triangles pointing opposite directions (upward and downward).\n- Total = 6 + 2 = 8 triangles.",
    difficulty: "Hard",
    hint: "Count all the outer points of the star first, then add the two large main overlapping triangles.",
    visualData: {
      shapeType: "triangles",
      originalImageSvg: `<svg viewBox="0 0 100 100" class="w-40 h-40 mx-auto stroke-current" fill="none" stroke-width="2">
        <polygon points="50,5 15,75 85,75" class="text-indigo-600"/>
        <polygon points="50,95 15,25 85,25" class="text-indigo-600"/>
      </svg>`
    }
  },

  // === TOPIC 8: Venn Diagrams ===
  {
    id: "q_8_easy",
    topicId: "8",
    type: "interactive-venn",
    questionText: "Which number in the Venn Diagram represents students who study both Mathematics and Science, but NOT English?",
    options: ["2", "4", "5", "7"],
    correctAnswer: "1", // "4"
    explanation: "The intersection of Math and Science circles contains numbers 4 and 5. Since 5 is inside the English circle and we want 'not English', we select 4.",
    difficulty: "Easy",
    hint: "Look at the overlapping section between Math and Science, and exclude any number inside the English circle.",
    visualData: {
      vennSets: [
        { label: "Math", items: ["3", "4", "5", "2"] },
        { label: "Science", items: ["4", "5", "6", "7"] },
        { label: "English", items: ["5", "2", "7", "1"] }
      ],
      originalImageSvg: `<svg viewBox="0 0 200 150" class="w-full max-w-xs mx-auto">
        <circle cx="75" cy="65" r="45" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="125" cy="65" r="45" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2"/>
        <circle cx="100" cy="100" r="45" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="2"/>
        <text x="75" y="45" font-family="sans-serif" font-size="10" fill="#3b82f6" font-weight="bold">Math</text>
        <text x="125" y="45" font-family="sans-serif" font-size="10" fill="#10b981" font-weight="bold">Science</text>
        <text x="100" y="135" font-family="sans-serif" font-size="10" fill="#ef4444" font-weight="bold" text-anchor="middle">English</text>
        <text x="55" y="65" font-size="12" fill="currentColor">3</text>
        <text x="145" y="65" font-size="12" fill="currentColor">6</text>
        <text x="100" y="115" font-size="12" fill="currentColor">1</text>
        <text x="100" y="55" font-size="14" fill="#8b5cf6" font-weight="bold">4</text>
        <text x="100" y="85" font-size="12" fill="currentColor">5</text>
        <text x="78" y="90" font-size="12" fill="currentColor">2</text>
        <text x="122" y="90" font-size="12" fill="currentColor">7</text>
      </svg>`
    }
  },
  {
    id: "q_8_medium",
    topicId: "8",
    type: "multiple-choice",
    questionText: "Choose the correct Venn Diagram representation for the words: 'Animals, Mammals, Cows'.",
    options: ["Three separate independent circles", "Three fully concentric circles (one inside another)", "Two intersecting circles inside a third", "Two separate circles inside a third"],
    correctAnswer: "1", // "Three fully concentric circles"
    explanation: "All Cows are Mammals, and all Mammals are Animals. Thus, the set 'Cows' is fully contained inside the set 'Mammals', which in turn is fully contained inside 'Animals'. This is represented by three nested concentric circles.",
    difficulty: "Medium",
    hint: "Are all cows mammals? Are all mammals animals? If yes, they must be nested inside each other.",
    visualData: {}
  },
  {
    id: "q_8_hard",
    topicId: "8",
    type: "multiple-choice",
    questionText: "Which of the following descriptions matches three mutually intersecting circles where each pair has an overlap?",
    options: ["Cows, Cats, Animals", "Doctors, Writers, Musicians", "Leap Years, Months, Days", "Square, Rectangle, Circle"],
    correctAnswer: "1", // "Doctors, Writers, Musicians"
    explanation: "Some Doctors are Writers, some Writers are Musicians, and some Doctors are Musicians. There can also be people who are all three (Doctors, Writers, and Musicians). Hence, these three groups share mutual intersections and overlap with each other, requiring three intersecting circles.",
    difficulty: "Hard",
    hint: "Find three categories where some individuals can belong to any combination of two or all three groups.",
    visualData: {}
  },

  // === TOPIC 9: Number / Letter Counting ===
  {
    id: "q_9_easy",
    topicId: "9",
    type: "multiple-choice",
    questionText: "How many times is the number 3 preceded by 7 but NOT followed by 9 in the series below?\n\nSeries: 7 3 2 7 3 9 7 3 6 7 3 1 7 3 9",
    options: ["1 time", "2 times", "3 times", "4 times"],
    correctAnswer: "2", // "3 times"
    explanation: "Let's inspect every occurrence of '3' with its neighbors:\n1. 7-3-2: Preceded by 7, not followed by 9. (YES - 1)\n2. 7-3-9: Preceded by 7, followed by 9. (NO)\n3. 7-3-6: Preceded by 7, not followed by 9. (YES - 2)\n4. 7-3-1: Preceded by 7, not followed by 9. (YES - 3)\n5. 7-3-9: Preceded by 7, followed by 9. (NO)\nTotal valid matches = 3 times.",
    difficulty: "Easy",
    hint: "Find all '7 3' combinations in the string, then discard those that have a '9' right after the 3.",
    visualData: { sequence: ["7", "3", "2", "7", "3", "9", "7", "3", "6", "7", "3", "1", "7", "3", "9"] }
  },
  {
    id: "q_9_medium",
    topicId: "9",
    type: "multiple-choice",
    questionText: "In the sequence below, how many times is an even number immediately preceded by an odd number and immediately followed by an even number?\n\nSequence: 5 4 6 3 8 2 9 6 4 1",
    options: ["1 time", "2 times", "3 times", "4 times"],
    correctAnswer: "2", // "3 times"
    explanation: "Let's check the even numbers in the sequence:\n- 4 (index 1): Preceded by 5 (odd), followed by 6 (even). (YES - 1)\n- 6 (index 2): Preceded by 4 (even) - (NO)\n- 8 (index 4): Preceded by 3 (odd), followed by 2 (even). (YES - 2)\n- 2 (index 5): Preceded by 8 (even) - (NO)\n- 6 (index 7): Preceded by 9 (odd), followed by 4 (even). (YES - 3)\n- 4 (index 8): Preceded by 6 (even) - (NO)\nTotal valid matches = 3.",
    difficulty: "Medium",
    hint: "Identify all even numbers first. For each, verify if the number before is odd AND the number after is even.",
    visualData: { sequence: ["5", "4", "6", "3", "8", "2", "9", "6", "4", "1"] }
  },
  {
    id: "q_9_hard",
    topicId: "9",
    type: "multiple-choice",
    questionText: "In the sequence below, how many letters are immediately followed by a symbol?\n\nSequence: A @ B # C 5 D % E *",
    options: ["2 times", "3 times", "4 times", "5 times"],
    correctAnswer: "2", // "4 times"
    explanation: "Analyzing the sequence A @ B # C 5 D % E *:\n- 'A' is followed by '@' (YES)\n- 'B' is followed by '#' (YES)\n- 'C' is followed by '5' (NO, 5 is a number)\n- 'D' is followed by '%' (YES)\n- 'E' is followed by '*' (YES)\nThere are exactly 4 letters followed by a symbol.",
    difficulty: "Hard",
    hint: "Check every letter (A, B, C, D, E) and look if the very next character is a symbol (@, #, %, *).",
    visualData: { sequence: ["A", "@", "B", "#", "C", "5", "D", "%", "E", "*"] }
  },

  // === TOPIC 12: Missing Letter in the Figure ===
  {
    id: "q_12_easy",
    topicId: "12",
    type: "interactive-matrix",
    questionText: "Solve the letter pattern inside the quadrants of the circle to find the missing letter (?).",
    options: ["I", "J", "K", "L"],
    correctAnswer: "1", // "J"
    explanation: "Let's examine the letters: A, C, F, ? in a clockwise flow.\n- A (1st letter) to C (3rd letter) is +2.\n- C (3rd) to F (6th) is +3.\n- F (6th) to ? must be +4 positions.\n- F (6) + 4 = 10, which corresponds to the letter 'J'.",
    difficulty: "Easy",
    hint: "Track the sequence alphabetically clockwise: A (+2) → C (+3) → F (+4) → ?",
    visualData: {
      matrixGrid: [
        ["A", "C"],
        ["?", "F"]
      ]
    }
  },
  {
    id: "q_12_medium",
    topicId: "12",
    type: "interactive-matrix",
    questionText: "Determine the missing letter that completes opposite sectors in the circle below.",
    options: ["Y", "X", "W", "Z"],
    correctAnswer: "3", // "Z"
    explanation: "The letters in opposite sectors are pairs of opposite/complementary letters from the alphabet (A is 1st from start, Z is 1st from end):\n- Opposite A is Z\n- Opposite B is Y\n- Opposite C is X\n- Opposite D is W.",
    difficulty: "Medium",
    hint: "Recall complementary letters where A pairs with Z, B pairs with Y, C pairs with X.",
    visualData: {
      matrixGrid: [
        ["A", "B", "C", "D"],
        ["?", "Y", "X", "W"]
      ]
    }
  },
  {
    id: "q_12_hard",
    topicId: "12",
    type: "interactive-matrix",
    questionText: "Deduce the row-based alphabetical matrix pattern to find the missing letter (?).",
    options: ["I", "J", "K", "L"],
    correctAnswer: "0", // "I"
    explanation: "In each row, there is a constant alphabetical gap:\n- Row 1: A (+1) → B (+1) → C\n- Row 2: D (+2) → F (+2) → H\n- Row 3: G (+1) → H (+1) → I. Thus, the missing letter is I.",
    difficulty: "Hard",
    hint: "Look at the rows. Row 1 increases by +1 letter. Row 2 increases by +2 letters. Row 3 increases by +1 letter.",
    visualData: {
      matrixGrid: [
        ["A", "B", "C"],
        ["D", "F", "H"],
        ["G", "H", "?"]
      ]
    }
  },

  // === TOPIC 13: Inserted figure: Number / Letter details ===
  {
    id: "q_13_easy",
    topicId: "13",
    type: "multiple-choice",
    questionText: "Identify the mathematical rule combining outer numbers to produce the center number:\n\nLeft: 3, Right: 4, Top: 2, Bottom: 1  -->  Center: 14\nLeft: 4, Right: 5, Top: 3, Bottom: 2  -->  Center: 26\nLeft: 5, Right: 4, Top: 2, Bottom: 2  -->  Center: ?",
    options: ["20", "24", "28", "32"],
    correctAnswer: "1", // "24"
    explanation: "The logic is: (Left × Right) + (Top × Bottom) = Center.\nFigure 1: (3 × 4) + (2 × 1) = 12 + 2 = 14.\nFigure 2: (4 × 5) + (3 × 2) = 20 + 6 = 26.\nApplying this to Figure 3: (5 × 4) + (2 × 2) = 20 + 4 = 24.",
    difficulty: "Easy",
    hint: "Try multiplying Left and Right, multiplying Top and Bottom, and then adding the two products together.",
    visualData: {}
  },
  {
    id: "q_13_medium",
    topicId: "13",
    type: "multiple-choice",
    questionText: "Examine the three figures where corners combine to give the center:\n\nFig 1: Corners [2, 3, 4]  --> Center = 9\nFig 2: Corners [4, 5, 6]  --> Center = 15\nFig 3: Corners [3, 8, 4]  --> Center = ?",
    options: ["12", "15", "16", "20"],
    correctAnswer: "1", // "15"
    explanation: "The formula is: Sum of corners = Center.\nFig 1: 2 + 3 + 4 = 9.\nFig 2: 4 + 5 + 6 = 15.\nApplying this to Fig 3: 3 + 8 + 4 = 15.",
    difficulty: "Medium",
    hint: "Add up all the outer corner numbers to see if they equal the center number.",
    visualData: {}
  },
  {
    id: "q_13_hard",
    topicId: "13",
    type: "multiple-choice",
    questionText: "Examine the complex corner grid calculations to solve the central value:\n\nFig 1: Corners [2, 2, 3, 3]  --> Center = 26\nFig 2: Corners [1, 2, 3, 4]  --> Center = 30\nFig 3: Corners [2, 3, 4, 1]  --> Center = ?",
    options: ["24", "26", "30", "35"],
    correctAnswer: "2", // "30"
    explanation: "The formula is the sum of the squares of all corners:\nFig 1: 2² + 2² + 3² + 3² = 4 + 4 + 9 + 9 = 26.\nFig 2: 1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30.\nFig 3: 2² + 3² + 4² + 1² = 4 + 9 + 16 + 1 = 30.",
    difficulty: "Hard",
    hint: "Square each corner number and add the resulting squared numbers together.",
    visualData: {}
  },

  // === TOPIC 18: Number, Signs and Symbols ===
  {
    id: "q_18_easy",
    topicId: "18",
    type: "multiple-choice",
    questionText: "If symbols are mapped to operators: '#' means '+', '@' means '-', '*' means '×', and '/' means '÷'. \n\nSolve: 12 # 8 * 4 / 2 @ 6 = ?",
    options: ["18", "20", "22", "24"],
    correctAnswer: "2", // "22"
    explanation: "Substitute the operators: 12 + 8 × 4 ÷ 2 - 6.\nFollowing BODMAS/DMAS:\n1. Division: 4 ÷ 2 = 2. Expression: 12 + 8 × 2 - 6.\n2. Multiplication: 8 × 2 = 16. Expression: 12 + 16 - 6.\n3. Addition: 12 + 16 = 28.\n4. Subtraction: 28 - 6 = 22.",
    difficulty: "Easy",
    hint: "Replace '#' with '+', '*' with '×', '/' with '÷', and '@' with '-'. Then follow DMAS.",
    visualData: { sequence: ["12", "#", "8", "*", "4", "/", "2", "@", "6"] }
  },
  {
    id: "q_18_medium",
    topicId: "18",
    type: "multiple-choice",
    questionText: "If '+' is '×', '-' is '+', '×' is '÷', and '÷' is '-', evaluate the expression:\n\n10 + 2 - 8 × 2 ÷ 3 = ?",
    options: ["18", "21", "24", "27"],
    correctAnswer: "1", // "21"
    explanation: "Substituting the operators according to the rules:\n- 10 + 2 becomes 10 × 2\n- - 8 becomes + 8\n- × 2 becomes ÷ 2\n- ÷ 3 becomes - 3\nExpression: 10 × 2 + 8 ÷ 2 - 3.\nFollowing BODMAS:\n1. Division: 8 ÷ 2 = 4. Expression: 10 × 2 + 4 - 3.\n2. Multiplication: 10 × 2 = 20. Expression: 20 + 4 - 3.\n3. Addition: 20 + 4 = 24.\n4. Subtraction: 24 - 3 = 21.",
    difficulty: "Medium",
    hint: "Rewrite the expression with the substituted operators, then use standard priority: division first, then multiplication, addition, and subtraction.",
    visualData: { sequence: ["10", "+", "2", "-", "8", "×", "2", "÷", "3"] }
  },
  {
    id: "q_18_hard",
    topicId: "18",
    type: "multiple-choice",
    questionText: "Find the correct set of operators to fit into the empty blocks (?) to satisfy the equation:\n\n8 ? 4 ? 2 ? 1 = 15",
    options: ["[+, ×, -]", "[×, +, -]", "[+, -, ×]", "[×, -, +]"],
    correctAnswer: "0", // "[+, ×, -]"
    explanation: "Let's substitute the operators from the first option [+, ×, -] into the equation:\n8 + 4 × 2 - 1\nFollowing BODMAS, do multiplication first:\n4 × 2 = 8.\nEquation: 8 + 8 - 1 = 16 - 1 = 15. This is correct! Thus, option 1 is the correct operator set.",
    difficulty: "Hard",
    hint: "Test the options one by one. Remember that multiplication must be performed before addition and subtraction.",
    visualData: { sequence: ["8", "?", "4", "?", "2", "?", "1", "=", "15"] }
  },

  // === TOPIC 28: Dice Problems ===
  {
    id: "q_28_easy",
    topicId: "28",
    type: "interactive-dice",
    questionText: "A standard flat net of a dice is folded to form a 3D cube. Which number face lies opposite to the face with number '2'?",
    options: ["4", "5", "6", "1"],
    correctAnswer: "1", // "5"
    explanation: "When folding a standard flat T-net of a dice:\n- Alternate faces in a straight line are always opposite to each other.\n- Looking at the vertical strip of faces [1, 2, 6, 5] (1 is above 2, 2 above 6, 6 above 5):\n  - Face 1 is opposite to Face 6.\n  - Face 2 is opposite to Face 5.\n- The side wings 3 and 4 fold up to face each other.",
    difficulty: "Easy",
    hint: "In a straight unfolded strip, opposite faces are separated by exactly one square. Skip one square from 2 to find its opposite.",
    visualData: {
      diceFaces: ["3", "1", "4", "2", "6", "5"],
      originalImageSvg: `<svg viewBox="0 0 150 120" class="w-40 h-32 mx-auto">
        <g stroke="#4f46e5" stroke-width="2" fill="none">
          <rect x="50" y="5" width="25" height="25" class="fill-indigo-50/50"/>
          <rect x="25" y="30" width="25" height="25" class="fill-indigo-50/50"/>
          <rect x="50" y="30" width="25" height="25" class="fill-indigo-50/50"/>
          <rect x="75" y="30" width="25" height="25" class="fill-indigo-50/50"/>
          <rect x="50" y="55" width="25" height="25" class="fill-indigo-50/50"/>
          <rect x="50" y="80" width="25" height="25" class="fill-indigo-50/50"/>
        </g>
        <g font-family="monospace" font-size="12" fill="currentColor" text-anchor="middle">
          <text x="62.5" y="21">1</text>
          <text x="37.5" y="46">3</text>
          <text x="62.5" y="46">2</text>
          <text x="87.5" y="46">4</text>
          <text x="62.5" y="71">6</text>
          <text x="62.5" y="96">5</text>
        </g>
      </svg>`
    }
  },
  {
    id: "q_28_medium",
    topicId: "28",
    type: "multiple-choice",
    questionText: "If two positions of a single dice are shown with numbers 1, 2, 3, 4, 5, 6:\nView 1: 1, 2, 3 at the visible faces\nView 2: 1, 3, 5 at the visible faces\nWhich number is opposite to 2?",
    options: ["4", "5", "6", "1"],
    correctAnswer: "1", // "5"
    explanation: "Comparing the two positions:\n- Faces 1 and 3 are common to both views.\n- When two views have two common faces (1 and 3), the remaining unmatched faces on each view must be opposite to each other.\n- Therefore, the face with number 2 (View 1) is opposite to the face with number 5 (View 2).",
    difficulty: "Medium",
    hint: "Identify the two common numbers visible in both dice positions. The third, remaining numbers in each view are opposite to each other.",
    visualData: {}
  },
  {
    id: "q_28_hard",
    topicId: "28",
    type: "multiple-choice",
    questionText: "If the number opposite to 3 is 4, and the number opposite to 2 is 5, what is the number opposite to 1 on a standard dice?",
    options: ["2", "3", "6", "5"],
    correctAnswer: "2", // "6"
    explanation: "A standard dice has 6 faces with numbers 1, 2, 3, 4, 5, 6. \n- Opposites are paired together.\n- 3 is opposite 4 (Pair 1)\n- 2 is opposite 5 (Pair 2)\n- The remaining two numbers must be opposite to each other: 1 and 6.",
    difficulty: "Hard",
    hint: "List the numbers 1 to 6. Cross off the pairs that are already matched (3-4 and 2-5). The remaining two numbers are opposites.",
    visualData: {}
  },

  // === TOPIC 29: Cube Problems ===
  {
    id: "q_29_easy",
    topicId: "29",
    type: "interactive-cube",
    questionText: "A solid cube is painted completely RED on all of its outer faces. If it is cut into 27 smaller equal-sized cubes, how many of those small cubes have exactly THREE painted faces?",
    options: ["4", "6", "8", "12"],
    correctAnswer: "2", // "8"
    explanation: "For any painted cube cut into smaller identical units:\n- Small cubes with exactly 3 painted faces are ALWAYS located at the corners of the original large cube.\n- A standard geometric cube has exactly 8 corners, regardless of the number of cuts made (as long as it is at least 2x2x2).\n- Hence, exactly 8 small cubes will have 3 painted faces.",
    difficulty: "Easy",
    hint: "Corner cubes have parts of three different outer faces of the parent cube. How many corners does a standard box/cube have?",
    visualData: {
      originalImageSvg: `<svg viewBox="0 0 100 100" class="w-32 h-32 mx-auto stroke-current" fill="none" stroke-width="2">
        <rect x="20" y="20" width="60" height="60" class="text-amber-500 fill-amber-500/10"/>
      </svg>`
    }
  },
  {
    id: "q_29_medium",
    topicId: "29",
    type: "multiple-choice",
    questionText: "A cube painted blue on all sides is cut into 27 smaller equal cubes. How many small cubes have exactly TWO faces painted?",
    options: ["6", "8", "12", "18"],
    correctAnswer: "2", // "12"
    explanation: "Small cubes with exactly 2 faces painted are located along the edges of the parent cube (excluding the corners).\n- A cube has 12 edges.\n- On a 3×3×3 cut cube, each edge contains exactly 1 middle cube with 2 painted faces.\n- Total cubes with 2 painted faces = 12 edges × 1 cube/edge = 12.",
    difficulty: "Medium",
    hint: "Cubes with 2 painted faces are located along the edges of the big cube. A cube has 12 edges.",
    visualData: {}
  },
  {
    id: "q_29_hard",
    topicId: "29",
    type: "multiple-choice",
    questionText: "A cube painted yellow on all sides is cut into 27 smaller equal cubes. How many small cubes have exactly ZERO faces painted?",
    options: ["0", "1", "4", "8"],
    correctAnswer: "1", // "1"
    explanation: "Small cubes with exactly 0 painted faces are completely interior (inside the core of the cube, not touching any outer face).\n- Formula for 0-painted cubes is (n - 2)³, where n is the number of cuts per side.\n- Since n = 3:\n- (3 - 2)³ = 1³ = 1 cube.",
    difficulty: "Hard",
    hint: "Only the single cube at the absolute center/core of the 3x3x3 block will remain completely unpainted.",
    visualData: {}
  },

  // === TOPIC 30: Completing the Figural Series ===
  {
    id: "q_30_easy",
    topicId: "30",
    type: "multiple-choice",
    questionText: "Observe the rotating arrow inside the squares to complete the figural series and find the next frame.",
    options: ["Arrow pointing South", "Arrow pointing West", "Arrow pointing East", "Arrow pointing North-East"],
    correctAnswer: "1", // "Arrow pointing West"
    explanation: "Look at the rotation pattern of the arrow:\n- Frame 1: Arrow points North.\n- Frame 2: Arrow points East (Rotated 90° clockwise).\n- Frame 3: Arrow points South (Rotated 90° clockwise).\nFollowing this rule, Frame 4 must rotate another 90° clockwise, which points to the West.",
    difficulty: "Easy",
    hint: "Look at the direction changes step by step: Up, Right, Down... What direction is next in a circular clockwise spin?",
    visualData: {
      originalImageSvg: `<svg viewBox="0 0 240 70" class="w-full max-w-xs mx-auto">
        <rect x="5" y="5" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="30" y1="45" x2="30" y2="15" stroke="#3b82f6" stroke-width="3"/>
        <rect x="65" y="5" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="75" y1="30" x2="105" y2="30" stroke="#3b82f6" stroke-width="3"/>
        <rect x="125" y="5" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="150" y1="15" x2="150" y2="45" stroke="#3b82f6" stroke-width="3"/>
        <rect x="185" y="5" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4"/>
        <text x="210" y="35" font-family="sans-serif" font-size="24" fill="#3b82f6" font-weight="bold" text-anchor="middle">?</text>
      </svg>`
    }
  },
  {
    id: "q_30_medium",
    topicId: "30",
    type: "multiple-choice",
    questionText: "Complete the figural series based on the number of intersecting lines inside a square:\n- Frame 1: Square with 0 diagonal lines\n- Frame 2: Square with 1 diagonal line\n- Frame 3: Square with 2 intersecting diagonal lines\nWhat should Frame 4 show?",
    options: ["Empty Square", "Square with 2 diagonals and a horizontal line through center", "Circle", "Triangle"],
    correctAnswer: "1", // "Square with 2 diagonals and a horizontal line through center"
    explanation: "The series shows a progression in the complexity of internal lines within the square container, increasing the segments. Frame 4 continues this by adding another bisecting line.",
    difficulty: "Medium",
    hint: "Look at how the internal lines are increasing frame-by-frame.",
    visualData: {}
  },
  {
    id: "q_30_hard",
    topicId: "30",
    type: "multiple-choice",
    questionText: "Identify the next frame in the series where a black circle rotates clockwise and a star moves counter-clockwise along the corners of a square.",
    options: ["Both at top-left corner", "Circle at bottom-right, Star at top-left", "Circle at top-left, Star at bottom-right", "Both at bottom-right corner"],
    correctAnswer: "1", // "Circle at bottom-right, Star at top-left"
    explanation: "By tracking the individual elements:\n- Circle starts Top-Left, moves to Top-Right, then Bottom-Right.\n- Star starts Bottom-Right, moves to Bottom-Left, then Top-Left.\nThus, in the next frame, they are in opposite positions (Circle at bottom-right, Star at top-left).",
    difficulty: "Hard",
    hint: "Track the movement of the black circle and the star separately. One moves clockwise, the other counter-clockwise.",
    visualData: {}
  },

  // === TOPIC 31: Analogy - Figures ===
  {
    id: "q_31_easy",
    topicId: "31",
    type: "multiple-choice",
    questionText: "Determine the figure transformation rule in the analogy pair:\n\nSolid Circle : Empty Circle :: Solid Triangle : ?",
    options: ["Empty Square", "Empty Triangle", "Solid Square", "Two Circles"],
    correctAnswer: "1", // "Empty Triangle"
    explanation: "The transformation takes a filled/solid shape and makes it hollow/empty while preserving the geometry (circle stays circle). Applying this logic to a Solid Triangle, it transforms into an Empty Triangle.",
    difficulty: "Easy",
    hint: "Identify how the first shape changes into the second. Keep the exact same shape, but change its color fill to empty.",
    visualData: {
      originalImageSvg: `<svg viewBox="0 0 200 60" class="w-60 mx-auto fill-current text-indigo-600">
        <circle cx="30" cy="30" r="15"/>
        <text x="55" y="35" font-size="20">:</text>
        <circle cx="85" cy="30" r="15" fill="none" stroke="currentColor" stroke-width="3"/>
        <text x="110" y="35" font-size="20">::</text>
        <polygon points="145,15 130,45 160,45"/>
        <text x="175" y="35" font-size="20">:</text>
        <text x="190" y="38" font-size="24">?</text>
      </svg>`
    }
  },
  {
    id: "q_31_medium",
    topicId: "31",
    type: "multiple-choice",
    questionText: "Find the matching segment that satisfies the geometric analogy:\n\nSingle Line : Triangle (3 lines) :: Triangle (3 lines) : ?",
    options: ["Pentagon (5 lines)", "Hexagon (6 lines)", "Circle", "Line"],
    correctAnswer: "0", // "Pentagon" -> wait, relationship: n lines turns to n+2 lines?
    // Let's see: Single line (1) -> Triangle (3). Shift is +2 lines.
    // Triangle (3) -> Pentagon (5). Shift is +2 lines.
    // Yes! This is a perfect mathematical geometric progression analogy.
    explanation: "The analogy is based on adding 2 sides/lines to the shape:\n- A single line (1 side) transforms into a Triangle (3 sides) -> +2 sides.\n- Therefore, a Triangle (3 sides) must transform into a shape with 3 + 2 = 5 sides, which is a Pentagon.",
    difficulty: "Medium",
    hint: "Count the number of sides or lines in the first pair. It increases from 1 to 3. What comes after 3 if we add 2?",
    visualData: {}
  },
  {
    id: "q_31_hard",
    topicId: "31",
    type: "multiple-choice",
    questionText: "Find the matching visual transformation analogy:\n\nShape pointing Up : Shape pointing Down :: Arrow pointing Right : ?",
    options: ["Arrow pointing Left", "Arrow pointing Up", "Arrow pointing Down", "Solid Box"],
    correctAnswer: "0", // "Arrow pointing Left"
    explanation: "The rule is a 180-degree rotation (or mirror reflection). Shape pointing Up turns to face Down (opposite direction). Following this rule, an Arrow pointing Right must turn to point Left.",
    difficulty: "Hard",
    hint: "The shape's direction is reversed. What is the reverse/opposite of pointing Right?",
    visualData: {}
  },

  // === TOPIC 32: Odd one out - Figure ===
  {
    id: "q_32_easy",
    topicId: "32",
    type: "multiple-choice",
    questionText: "Find the figure that is the ODD ONE OUT because it violates rotational symmetry rules.",
    options: ["Letter 'N'", "Letter 'H'", "Letter 'S'", "Letter 'F'"],
    correctAnswer: "3", // "Letter 'F'"
    explanation: "Letters N, H, and S possess point symmetry (rotational symmetry of order 2; they look exactly the same when rotated 180°). Letter 'F' does not look identical when upside down. Hence, 'F' is the odd one out.",
    difficulty: "Easy",
    hint: "Rotate each option upside down (180 degrees) in your head. Which letters look exactly the same after rotation?",
    visualData: { sequence: ["N", "H", "S", "F"] }
  },
  {
    id: "q_32_medium",
    topicId: "32",
    type: "multiple-choice",
    questionText: "Which of the following geometric figures is the ODD ONE OUT because it has no corners?",
    options: ["Triangle", "Square", "Pentagon", "Circle"],
    correctAnswer: "3", // "Circle"
    explanation: "Triangle, Square, and Pentagon are polygons constructed from straight line segments with corners (vertices). A Circle is a smooth curved shape with no corners or straight edges. Thus, Circle is the odd one out.",
    difficulty: "Medium",
    hint: "Look for the shape that has no corners or straight sides.",
    visualData: {}
  },
  {
    id: "q_32_hard",
    topicId: "32",
    type: "multiple-choice",
    questionText: "Which shape in the set is the ODD ONE OUT based on line-intersections?",
    options: ["A cross (+)", "Letter 'X'", "Letter 'T'", "A single straight line (-)"],
    correctAnswer: "3", // "A single straight line (-)"
    explanation: "A cross (+), letter 'X', and letter 'T' are all constructed from two intersecting lines (sharing a common intersection point). A single straight line (-) consists of only 1 line segment with no intersections. Therefore, it is the odd one out.",
    difficulty: "Hard",
    hint: "Three options are formed by crossing or meeting two separate lines. One option is just a single line.",
    visualData: {}
  },

  // === TOPIC 33: Mirror Image ===
  {
    id: "q_33_easy",
    topicId: "33",
    type: "multiple-choice",
    questionText: "Choose the correct horizontal reflection (Mirror Image) of the word 'CAT' when the mirror is placed to its right.",
    options: ["TAC", "TAƆ", "ƆAT", "CAT"],
    correctAnswer: "1", // "TAƆ"
    explanation: "When reflected in a mirror on the right:\n- The order of letters is reversed from left-to-right: 'C-A-T' becomes 'T-A-C'.\n- Additionally, individual letters are horizontally flipped.\n- 'T' and 'A' look identical when flipped horizontally because they are symmetric.\n- 'C' flips to 'Ɔ'.\n- Result: TAƆ.",
    difficulty: "Easy",
    hint: "A mirror on the right reverses the word's reading direction and flips each individual letter.",
    visualData: {
      mirrorType: "mirror",
      originalImageSvg: `<div class="text-3xl font-mono tracking-wider text-center p-2 border-r-4 border-indigo-500 border-dashed max-w-xs mx-auto">CAT </div>`
    }
  },
  {
    id: "q_33_medium",
    topicId: "33",
    type: "multiple-choice",
    questionText: "Determine the correct Mirror Image of the number '123' (mirror on the right).",
    options: ["321", "ƐSƖ", "ƐƧƖ", "123"],
    correctAnswer: "2", // "ƐƧƖ" (where 3 is mirrored to Ɛ, 2 to Ƨ, 1 to Ɩ)
    explanation: "Reflecting '123' in a vertical mirror on the right:\n- The sequence is reversed to end-to-start: '3', then '2', then '1'.\n- Each digit is flipped horizontally.\n- '3' mirrors to 'Ɛ'\n- '2' mirrors to 'Ƨ'\n- '1' mirrors to 'Ɩ'\n- Result: ƐƧƖ.",
    difficulty: "Medium",
    hint: "Reverse the order of digits to 3, 2, 1, and then flip each digit horizontally.",
    visualData: {}
  },
  {
    id: "q_33_hard",
    topicId: "33",
    type: "interactive-mirror",
    questionText: "Choose the correct horizontal reflection (Mirror Image) of the word 'LOGIC' when the mirror is placed to its right (vertical axis).",
    options: ["CIGOL", "ↃIӘO⅃", "ƆI⅁O⅃", "L O G I C"],
    correctAnswer: "2", // "ƆI⅁O⅃" -> reverse order AND individual mirrored letters!
    explanation: "When reflecting a word horizontally in a mirror on the right:\n- The sequence of letters is reversed: 'L-O-G-I-C' becomes 'C-I-G-O-L' in order.\n- Additionally, each individual letter is flipped horizontally.\n- 'C' mirrors to 'Ɔ'\n- 'I' mirrors to 'I'\n- 'G' mirrors to '⅁'\n- 'O' mirrors to 'O'\n- 'L' mirrors to '⅃'\nResult: 'ƆI⅁O⅃'.",
    difficulty: "Hard",
    hint: "A mirror to the right reverses the word's left-to-right order (so it starts with C) and flips individual letters horizontally.",
    visualData: {
      mirrorType: "mirror",
      originalImageSvg: `<div class="text-3xl font-mono tracking-wider text-center p-2 border-r-4 border-indigo-500 border-dashed max-w-xs mx-auto">LOGIC <span class="text-xs text-gray-400 block mt-1">Mirror is here →</span></div>`
    }
  },

  // === TOPIC 34: Water Image ===
  {
    id: "q_34_easy",
    topicId: "34",
    type: "multiple-choice",
    questionText: "Determine the vertical reflection (Water Image) of the word 'KID' reflected on a bottom pool boundary.",
    options: ["DIK", "KID", "K I D (flipped horizontally)", "KID (all letters flipped vertically)"],
    correctAnswer: "1", // "KID" -> K, I, D remain identical when flipped vertically!
    explanation: "A Water Image is a vertical reflection across a horizontal mirror placed underneath the letters:\n- Letters retain their left-to-right order ('K' remains first, 'D' remains last).\n- Each letter is flipped vertically (upside-down).\n- 'K' flipped vertically remains 'K'.\n- 'I' flipped vertically remains 'I'.\n- 'D' flipped vertically remains 'D'.\nThus, 'KID' looks completely identical in its water reflection! Result is KID.",
    difficulty: "Easy",
    hint: "Flip the word vertically (upside down). The left-to-right order remains identical. Notice how KID is vertically symmetrical.",
    visualData: {}
  },
  {
    id: "q_34_medium",
    topicId: "34",
    type: "interactive-mirror",
    questionText: "Determine the vertical reflection (Water Image) of the code 'CODE' reflected on the bottom pool boundary.",
    options: ["EDOC", "CODB", "CODƎ", "C O D E (upside down)"],
    correctAnswer: "3", // Index 3 is 'C O D E (upside down)' which is equivalent to 'CODE'
    explanation: "A Water Image is a vertical reflection across a horizontal mirror placed underneath the letters:\n- Letters retain their left-to-right positions ('C' stays first, 'E' stays last).\n- Each letter is flipped vertically (upside-down).\n- 'C', 'O', 'D', and 'E' flipped vertically remain unchanged because they are horizontally symmetric.\nThus, 'CODE' remains 'CODE'.",
    difficulty: "Medium",
    hint: "Flip the word vertically (upside down). The left-to-right order remains identical. Notice how letters are symmetrical vertically.",
    visualData: {
      mirrorType: "water",
      originalImageSvg: `<div class="text-3xl font-mono tracking-wider text-center p-2 border-b-4 border-blue-400 max-w-xs mx-auto">CODE <span class="text-xs text-gray-400 block mt-1">Water level underneath</span></div>`
    }
  },
  {
    id: "q_34_hard",
    topicId: "34",
    type: "multiple-choice",
    questionText: "Determine the Water Image of the word 'BLUE' (vertical reflection at the bottom).",
    options: ["EULB", "BΓ∩E", "BLUE", "BLUƎ"],
    correctAnswer: "1", // "BΓ∩E"
    explanation: "In water reflection:\n- The left-to-right order remains 'B-L-U-E'.\n- Each letter is flipped vertically (upside down):\n  - 'B' stays 'B'\n  - 'L' flips upside down to 'Γ'\n  - 'U' flips upside down to '∩'\n  - 'E' stays 'E'\nResult: BΓ∩E.",
    difficulty: "Hard",
    hint: "Keep the letters in the same left-to-right order, but flip each individual letter upside down.",
    visualData: {}
  },

  // === TOPIC 35: Hidden / Embedded Figures ===
  {
    id: "q_35_easy",
    topicId: "35",
    type: "multiple-choice",
    questionText: "Which of the four choices contains the simple 'L-shape' angle profile hidden inside its complex grid?",
    options: ["Symmetric Cross Grid", "Box with Diagonals", "A circle with a diameter", "An empty square"],
    correctAnswer: "1", // Index 1
    explanation: "The 'Box with Diagonals' contains multiple right-angles and straight connected paths that can form the specified L-shape angle embedded in the geometry of the box corner intersecting lines.",
    difficulty: "Easy",
    hint: "Look for two perpendicular connected lines that resemble a perfect right angle corner within the options.",
    visualData: {
      originalImageSvg: `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto stroke-current" fill="none" stroke-width="3">
        <path d="M 30,30 L 30,70 L 70,70" class="text-amber-500"/>
      </svg>`
    }
  },
  {
    id: "q_35_medium",
    topicId: "35",
    type: "multiple-choice",
    questionText: "Identify the letter shape 'Z' embedded inside one of these geometric figures.",
    options: ["An empty circle", "A triangle", "A hexagon with a horizontal diagonal", "A square with both diagonals"],
    correctAnswer: "2", // "A hexagon with a horizontal diagonal"
    explanation: "A hexagon with a diagonal line going across it contains the top edge, the diagonal, and the bottom edge, which combine to form a clear embedded Z-like logical path.",
    difficulty: "Medium",
    hint: "Look for a shape that has parallel top and bottom lines connected by a diagonal middle line.",
    visualData: {}
  },
  {
    id: "q_35_hard",
    topicId: "35",
    type: "multiple-choice",
    questionText: "Which shape contains a hidden 'T-junction' where a vertical line meets the midpoint of a horizontal line?",
    options: ["A simple circle", "A cross symbol (+)", "A square split in half by a vertical line", "A triangle"],
    correctAnswer: "2", // "A square split in half by a vertical line"
    explanation: "In a square split in half by a vertical line, the vertical dividing line meets the top and bottom horizontal boundaries at their midpoints, forming two clear 'T' junctions.",
    difficulty: "Hard",
    hint: "Look for a vertical line segment that terminates directly on a horizontal line segment.",
    visualData: {}
  },

  // === TOPIC 36: Complete the Missing Part of the Image ===
  {
    id: "q_36_easy",
    topicId: "36",
    type: "multiple-choice",
    questionText: "Find the matching segment to complete the missing quadrant (Bottom-Right) of the symmetric grid.",
    options: ["Lines radiating out", "Empty circular quadrant", "Circular arc centered on corner", "Full solid square fill"],
    correctAnswer: "2", // Index 2
    explanation: "To complete the symmetric 4-quadrant grid containing concentric circular arcs radiating from the absolute center:\n- Quadrant 1, 2, and 3 all contain a single concentric circular arc curving outward.\n- Therefore, the bottom-right quadrant must also contain a curved circular arc anchored on the main center to maintain rotational symmetry.",
    difficulty: "Easy",
    hint: "Look at the circular arcs in the other three corners. The fourth corner must mirror them to complete a full circular ripple.",
    visualData: {
      originalImageSvg: `<svg viewBox="0 0 100 100" class="w-32 h-32 mx-auto stroke-current" fill="none" stroke-width="2">
        <rect x="5" y="5" width="90" height="90" class="text-gray-400"/>
        <line x1="50" y1="5" x2="50" y2="95" stroke-dasharray="2" class="text-gray-400"/>
        <line x1="5" y1="50" x2="95" y2="50" stroke-dasharray="2" class="text-gray-400"/>
        <path d="M 50,20 A 30,30 0 0,0 20,50" class="text-amber-600" stroke-width="3"/> 
        <path d="M 50,20 A 30,30 0 0,1 80,50" class="text-amber-600" stroke-width="3"/> 
        <path d="M 20,50 A 30,30 0 0,0 50,80" class="text-amber-600" stroke-width="3"/> 
        <text x="75" y="75" font-family="sans-serif" font-size="16" fill="#f59e0b" font-weight="bold" text-anchor="middle">?</text>
      </svg>`
    }
  },
  {
    id: "q_36_medium",
    topicId: "36",
    type: "multiple-choice",
    questionText: "Complete the 2×2 checkerboard grid pattern where the top-left and bottom-right are black, and top-right is white. What is the missing bottom-left quadrant?",
    options: ["Black square", "White square", "Square with diagonal", "Square with circle"],
    correctAnswer: "1", // "White square"
    explanation: "A standard checkerboard alternates colors both horizontally and vertically. \n- Top-Left = Black, Top-Right = White.\n- Bottom-Right = Black. \n- Therefore, the remaining Bottom-Left quadrant must be White to preserve the alternating grid logic.",
    difficulty: "Medium",
    hint: "Checkerboard squares alternate colors. If the square above it is White, and the square to its right is Black, what color should it be?",
    visualData: {}
  },
  {
    id: "q_36_hard",
    topicId: "36",
    type: "multiple-choice",
    questionText: "Complete the concentric square ripple pattern. If there are outer and inner squares, what completes the quadrant in a symmetric grid?",
    options: ["Two perpendicular lines", "Concentric square corner arcs", "A straight diagonal line", "An empty space"],
    correctAnswer: "1", // "Concentric square corner arcs"
    explanation: "The overall pattern consists of nested concentric squares. The missing corner piece must have matching concentric square corner angles/lines to continue the ripple cleanly.",
    difficulty: "Hard",
    hint: "The pattern is made of squares inside squares. The missing piece must contain parts of those squares.",
    visualData: {}
  }
];
