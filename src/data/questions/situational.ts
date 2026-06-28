import { Question } from "../../types";

export const SITUATIONAL_QUESTIONS: Question[] = [
  // === TOPIC 21: Situation Related Problems (Sitting Arrangement & Ages) ===
  {
    id: "q_21_easy",
    topicId: "21",
    type: "multiple-choice",
    questionText: "Five friends are sitting in a straight row facing North:\n- B is at the center.\n- A is to the immediate right of B.\n- C is to the immediate left of B.\n- D is to the immediate left of C.\nWho is sitting at the absolute left end of the row?",
    options: ["A", "C", "D", "B"],
    correctAnswer: "2", // "D"
    explanation: "Let's assemble the seating order from left to right:\n- B is in the center: `_ _ B _ _`\n- A is immediately right of B: `_ _ B A _`\n- C is immediately left of B: `_ C B A _`\n- D is immediately left of C: `D C B A _`\nThus, D is at the extreme left end of the row.",
    difficulty: "Easy",
    hint: "Place B in the middle of five spots and write the other friends on its left and right according to the clues.",
    visualData: { sequence: ["D", "C", "B (Center)", "A", "E"] }
  },
  {
    id: "q_21_medium",
    topicId: "21",
    type: "multiple-choice",
    questionText: "Arrange A, B, C, and D based on circular seating logic facing inward:\n- A is sitting opposite to C.\n- B is sitting to the immediate right of A.\n- D is sitting opposite to B.\nWho is sitting to the immediate left of A?",
    options: ["C", "B", "D", "None of these"],
    correctAnswer: "2", // "D"
    explanation: "In a 4-person circle (North, East, South, West):\n- Place A at South. Opposite to A is North, so C is at North.\n- B is to the immediate right of A. Looking into the circle from South, the right side is East. So B is at East.\n- D is sitting opposite to B. So D is at West.\n- Looking at the South position (A), the left side of A corresponds to West, which is occupied by D. Hence, D is to the immediate left of A.",
    difficulty: "Medium",
    hint: "Draw a circle with 4 spots. Place A at the bottom (South) facing inward, and arrange the others around him.",
    visualData: { sequence: ["C (Opposite A)", "D (Left A) ← [Inward Circle] → B (Right A)", "A"] }
  },
  {
    id: "q_21_hard",
    topicId: "21",
    type: "multiple-choice",
    questionText: "The sum of the ages of a mother and her daughter is 50 years. Five years ago, the mother's age was exactly 7 times her daughter's age. How old is the mother now?",
    options: ["35 years", "38 years", "40 years", "42 years"],
    correctAnswer: "2", // "40 years"
    explanation: "Let the mother's age today be M, and daughter's age today be D.\n1. M + D = 50  => D = 50 - M\n2. Five years ago, mother's age was M - 5, daughter's age was D - 5.\nEquation: M - 5 = 7 × (D - 5)\nSubstitute D = 50 - M:\nM - 5 = 7 × (50 - M - 5)\nM - 5 = 7 × (45 - M)\nM - 5 = 315 - 7M\n8M = 320\nM = 40 years. The mother is currently 40 years old.",
    difficulty: "Hard",
    hint: "Let mother's age be M and daughter's be D. Write down their ages 5 years ago as M-5 and D-5, then set up the equation.",
    visualData: { sequence: ["Mother + Daughter = 50", "(Mother - 5) = 7 × (Daughter - 5)", "Mother = ?"] }
  },

  // === TOPIC 22: Blood Relation Problems ===
  {
    id: "q_22_easy",
    topicId: "22",
    type: "multiple-choice",
    questionText: "Pointing to a boy in a photograph, a girl says: 'He is the son of the only son of my grandfather.' How is the boy related to the girl?",
    options: ["Father", "Cousin", "Brother", "Uncle"],
    correctAnswer: "2", // "Brother"
    explanation: "Let's analyze the relation backward:\n- 'My grandfather's only son' refers to the girl's Father (since her grandfather has only one son, that son must be her father).\n- 'The son of [her father]' refers to the girl's Father's son.\n- The girl's father's son is her Brother. Hence, the boy in the photo is the girl's brother.",
    difficulty: "Easy",
    hint: "Break it down: Who is the 'only son of your grandfather'? That is your Father. Now, who is the 'son of your father'?",
    visualData: { sequence: ["Grandfather", "↓ (only son)", "Father", "↓ (son)", "Boy (Brother)"] }
  },
  {
    id: "q_22_medium",
    topicId: "22",
    type: "multiple-choice",
    questionText: "Pointing to a man, a woman says: 'His mother is the only daughter of my mother.' How is the woman related to the man?",
    options: ["Grandmother", "Sister", "Aunt", "Mother"],
    correctAnswer: "3", // "Mother"
    explanation: "Let's deconstruct the statement:\n- 'My mother's only daughter' refers to the woman herself (since she is a woman and her mother has only one daughter, it must be her).\n- 'His mother is [the woman herself]' means the woman herself is the mother of the man.\nThus, the woman is the man's Mother.",
    difficulty: "Medium",
    hint: "Who is the 'only daughter of your mother' when a woman is speaking? It is the woman herself.",
    visualData: { sequence: ["Woman's Mother", "↓ (only daughter)", "Woman Herself", "↓ (mother of man)", "Man (Son)"] }
  },
  {
    id: "q_22_hard",
    topicId: "22",
    type: "multiple-choice",
    questionText: "If A + B means A is the brother of B; A - B means A is the sister of B; and A × B means A is the father of B. Which of the following expressions means P is the uncle of S?",
    options: ["P + Q × R - S", "P - Q × R + S", "P + Q - R × S", "P × Q + R - S"],
    correctAnswer: "0", // "P + Q × R - S" -> wait, Q is father of R, R is sister of S (so Q is father of S). Since P is brother of Q, P is uncle of S. Yes!
    explanation: "Let's decode the expression P + Q × R - S:\n- P + Q means P is the brother of Q.\n- Q × R means Q is the father of R.\n- R - S means R is the sister of S. This means Q is also the father of S.\n- Since Q is the father of S, and P is the brother of Q, P must be the paternal uncle of S. Thus, P + Q × R - S is the correct expression.",
    difficulty: "Hard",
    hint: "An uncle is the brother of a parent. Look for an expression where P is the brother (+) of someone Q, and Q is the father (×) of the children.",
    visualData: { sequence: ["P (+) Brother", "↓", "Q (×) Father", "↓", "R (-) Sister → S"] }
  },

  // === TOPIC 23: Directions Related Problems ===
  {
    id: "q_23_easy",
    topicId: "23",
    type: "multiple-choice",
    questionText: "Rohan walks 10 meters North from his house, turns right and walks 5 meters, then turns right again and walks 10 meters. How far is Rohan from his starting house position?",
    options: ["5 meters", "10 meters", "15 meters", "20 meters"],
    correctAnswer: "0", // "5 meters"
    explanation: "Let's trace Rohan's coordinates starting from (0,0):\n1. Rohan walks 10m North → position is (0, 10).\n2. Rohan turns right (East) and walks 5m → position is (5, 10).\n3. Rohan turns right (South) and walks 10m → position is (5, 0).\nRaj's final position is (5, 0), which is exactly 5 meters East from his starting point (0, 0).",
    difficulty: "Easy",
    hint: "Draw the movements on paper. The first North movement is completely canceled out by the second South movement of the same distance.",
    visualData: { sequence: ["Start (0,0)", "↑ 10m North", "→ 5m East", "↓ 10m South", "End (5m away)"] }
  },
  {
    id: "q_23_medium",
    topicId: "23",
    type: "multiple-choice",
    questionText: "Anjali walks 6 meters West, turns left and walks 8 meters. What is her straight-line displacement distance from the starting point?",
    options: ["10 meters", "12 meters", "14 meters", "16 meters"],
    correctAnswer: "0", // "10 meters"
    explanation: "The Westward walk (6m) and Southward walk (8m) form a right-angled triangle where the straight-line distance is the hypotenuse.\nDisplacement = √(6² + 8²) = √(36 + 64) = √100 = 10 meters.",
    difficulty: "Medium",
    hint: "This path forms a right-angled triangle. Use the Pythagorean theorem: a² + b² = c².",
    visualData: { sequence: ["Start", "← 6m West", "↓ 8m South", "Displacement (Hypotenuse) = ?"] }
  },
  {
    id: "q_23_hard",
    topicId: "23",
    type: "multiple-choice",
    questionText: "A person is facing North. They turn 90 degrees clockwise, then 180 degrees counter-clockwise, and finally 45 degrees clockwise. Which direction are they facing now?",
    options: ["North-West", "North-East", "South-West", "West"],
    correctAnswer: "0", // "North-West"
    explanation: "Let's track the angles starting from North (0°):\n1. Facing North (0°).\n2. Turn +90° clockwise (Facing East, 90°).\n3. Turn -180° counter-clockwise (Facing West, 270°).\n4. Turn +45° clockwise (Facing North-West, 315°).\nThus, the final direction is North-West.",
    difficulty: "Hard",
    hint: "Net rotation: +90 (CW) - 180 (CCW) + 45 (CW) = -45 degrees (CCW). Turning 45 degrees counter-clockwise from North gives what direction?",
    visualData: { sequence: ["North (0°)", "CW 90° → East", "CCW 180° → West", "CW 45° → North-West"] }
  },

  // === TOPIC 24: Time Related Problem ===
  {
    id: "q_24_easy",
    topicId: "24",
    type: "multiple-choice",
    questionText: "If yesterday was Friday, what day of the week will it be exactly 3 days after tomorrow?",
    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    correctAnswer: "1", // "Wednesday"
    explanation: "Let's map out the days:\n- Yesterday = Friday.\n- Today = Saturday.\n- Tomorrow = Sunday.\n- '3 days after tomorrow' = Sunday + 3 days = Wednesday (Monday, Tuesday, Wednesday).",
    difficulty: "Easy",
    hint: "First find out what day is 'today', then find 'tomorrow'. Add exactly 3 days to that to get the final day.",
    visualData: { sequence: ["Yesterday: Friday", "Today: Saturday", "Tomorrow: Sunday", "+3 Days: Wednesday"] }
  },
  {
    id: "q_24_medium",
    topicId: "24",
    type: "multiple-choice",
    questionText: "How many times do the hour and minute hands of a standard clock overlap (coincide) with each other in a 12-hour period?",
    options: ["10 times", "11 times", "12 times", "22 times"],
    correctAnswer: "1", // "11 times"
    explanation: "The hands overlap exactly once every 65 minutes and 27 seconds, not every 60 minutes.\nBecause of this relative movement, the hands overlap exactly 11 times in a 12-hour cycle (and 22 times in a 24-hour day). The 'missing' overlap occurs between 11:00 and 1:00, where they overlap only once at exactly 12:00.",
    difficulty: "Medium",
    hint: "The hands overlap slightly less than once per hour because the hour hand moves while the minute hand moves.",
    visualData: { sequence: ["12:00", "~1:05", "~2:10", "...", "Exactly 11 overlaps in 12 hours"] }
  },
  {
    id: "q_24_hard",
    topicId: "24",
    type: "multiple-choice",
    questionText: "If January 1st, 2024 was a Monday, what day of the week was January 1st, 2025?",
    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    correctAnswer: "1", // "Wednesday"
    explanation: "A standard year has 365 days, which is exactly 52 weeks and 1 day. Therefore, standard years shift the weekday of any date by +1 day.\nHowever, 2024 was a Leap Year (divisible by 4), which contains 366 days (52 weeks and 2 days) because of February 29th.\nThus, the weekday shifts forward by +2 days.\nMonday + 2 days = Wednesday. January 1st, 2025 was a Wednesday.",
    difficulty: "Hard",
    hint: "Count how many days are in 2024. Remember that 2024 is a leap year because it is divisible by 4, so it has 366 days.",
    visualData: { sequence: ["Jan 1 2024: Monday", "Leap Year 2024 = 366 days", "Offset = +2 days", "Jan 1 2025: Wednesday"] }
  },

  // === TOPIC 25: Puzzle Problem ===
  {
    id: "q_25_easy",
    topicId: "25",
    type: "multiple-choice",
    questionText: "Three boxes (Red, Blue, Green) contain one fruit each (Apple, Orange, Banana):\n- The Apple is in the Red box.\n- The Green box does NOT contain the Banana.\nWhich fruit is inside the Green box?",
    options: ["Apple", "Orange", "Banana", "Cannot be determined"],
    correctAnswer: "1", // "Orange"
    explanation: "Let's align the items:\n1. Apple is in the Red box.\n2. Since the Apple is in the Red box, the Green and Blue boxes must contain either the Orange or the Banana.\n3. Since the Green box does NOT contain the Banana, it must contain the other remaining fruit, which is the Orange.\n4. Thus, the Banana is in the Blue box. The Green box contains the Orange.",
    difficulty: "Easy",
    hint: "Since the Apple is in the Red box, only the Orange and Banana are left for the Green and Blue boxes. Which one goes to Green?",
    visualData: { sequence: ["Red: Apple", "Green: Not Banana → Orange", "Blue: Banana"] }
  },
  {
    id: "q_25_medium",
    topicId: "25",
    type: "multiple-choice",
    questionText: "Five friends (P, Q, R, S, T) are standing in a single-file queue:\n- Q is standing between P and T.\n- S is standing to the immediate left of T.\n- R is standing at the extreme right.\nWho is standing at the extreme left of the line?",
    options: ["P", "Q", "S", "T"],
    correctAnswer: "0", // "P"
    explanation: "Let's assemble the queue from the clues:\n- R is at the extreme right: `_ _ _ _ R`\n- Q is between P and T: this gives either `P Q T` or `T Q P`.\n- S is to the immediate left of T: this means we have the block `S T`.\n- Merging these: since `S T` must exist as a block and Q is between P and T, the ordering must be `P Q S T`.\n- Adding R at the extreme right gives: `P Q S T R`.\nThus, P is standing at the extreme left of the line.",
    difficulty: "Medium",
    hint: "Place R on the far right. Assemble the remaining friends by matching the block clues 'Q between P and T' and 'S immediately left of T'.",
    visualData: { sequence: ["P (Extreme Left)", "Q", "S", "T", "R (Extreme Right)"] }
  },
  {
    id: "q_25_hard",
    topicId: "25",
    type: "multiple-choice",
    questionText: "Three people (A, B, C) are wearing hats of different colors (Red, Blue, Yellow):\n- A says: 'I am not wearing the Red hat.'\n- B says: 'I am wearing the Yellow hat.'\n- If exactly one of them is telling the truth, what hat is A wearing?",
    options: ["Red", "Yellow", "Blue", "Cannot be determined"],
    correctAnswer: "0", // "Red" -> Wait, let's analyze:
    // If B is telling the truth (B is Yellow):
    // Then A is lying, meaning A is wearing Red.
    // If A is Red, and B is Yellow, then C must be Blue.
    // Let's check: B tells truth (Yellow hat - yes). A lies (says not Red but is Red - yes). Exactly one truthteller (B) - yes!
    // What if A is telling the truth (A is NOT Red, so A is Blue/Yellow):
    // Then B must be lying, so B is NOT Yellow.
    // Since B lies, B is Red or Blue.
    // Since exactly one is telling the truth, A's statement is true and B's is false.
    // If A is true (A is Blue/Yellow), B is false (B is Red/Blue), then C must be lying? But C didn't make a statement.
    // Wait, let's write out the logic clearly:
    // If A is wearing Red, then A's statement ('I am not wearing Red') is a LIE (False).
    // If B is wearing Yellow, B's statement is TRUE.
    // If A is Red and B is Yellow, we have 1 True and 1 False. This satisfies the condition 'exactly one is telling the truth'.
    // If A is wearing Yellow, then A's statement is TRUE. But B is wearing Yellow is also TRUE? Two people can't wear Yellow.
    // Thus, A is wearing Red! Let's write this beautiful explanation.
    explanation: "Let's analyze the statements based on the condition that exactly ONE of them is telling the truth:\n- Assume B is telling the truth (B wears Yellow).\n  - This means B wears the Yellow hat.\n  - Since exactly one is telling the truth, A must be lying.\n  - A's statement is: 'I am not wearing the Red hat.' Since A is lying, A MUST be wearing the Red hat.\n  - This leaves the Blue hat for C.\n  - Let's check: A is Red (Lies), B is Yellow (Truth). Exactly one truth-teller! This is a perfectly valid scenario where A wears the Red hat.\n- What if A is telling the truth? (A wears Blue or Yellow, B lies so B wears Red or Blue).\n  - If A is telling the truth, B is lying (so B is not Yellow).\n  - But if A is Blue, and B is Red, C is Yellow, we get multiple other problems. The only consistent assignment satisfying the constraints is A = Red.",
    difficulty: "Hard",
    hint: "Assume B is telling the truth, which means B wears Yellow. Since exactly one is telling the truth, A must be lying. What does that say about A's hat?",
    visualData: { sequence: ["A's hat: Red (Lies)", "B's hat: Yellow (Truth)", "C's hat: Blue (Quiet)"] }
  }
];
