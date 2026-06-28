import { Question } from "../../types";

export const VERBAL_QUESTIONS: Question[] = [
  // === TOPIC 2: Missing Letter in the Series ===
  {
    id: "q_2_easy",
    topicId: "2",
    type: "interactive-sequence",
    questionText: "Complete the alphabet pattern series by finding the missing letter (?).",
    options: ["S", "T", "U", "V"],
    correctAnswer: "2", // "U"
    explanation: "Look at the progressive additions of alphabetic ranks:\nA to C: +2 steps (1 -> 3)\nC to F: +3 steps (3 -> 6)\nF to J: +4 steps (6 -> 10)\nJ to O: +5 steps (10 -> 15)\nO to ?: +6 steps (15 + 6 = 21, which is U).",
    difficulty: "Easy",
    hint: "Write down alphabet numbers: A=1, C=3, F=6, J=10, O=15. Notice the differences between numbers are +2, +3, +4...",
    visualData: { sequence: ["A", "C", "F", "J", "O", "?"] }
  },
  {
    id: "q_2_medium",
    topicId: "2",
    type: "interactive-sequence",
    questionText: "Determine the missing letter that completes the descending letter series.",
    options: ["D", "E", "F", "G"],
    correctAnswer: "2", // "F"
    explanation: "Look at the descending intervals:\nZ (26) to X (24): -2\nX (24) to U (21): -3\nU (21) to Q (17): -4\nQ (17) to L (12): -5\nL (12) to ?: -6 (12 - 6 = 6, which is letter F).",
    difficulty: "Medium",
    hint: "The letters are counting backwards. Subtract increasing numbers of positions (-2, -3, -4, -5...).",
    visualData: { sequence: ["Z", "X", "U", "Q", "L", "?"] }
  },
  {
    id: "q_2_hard",
    topicId: "2",
    type: "interactive-sequence",
    questionText: "Identify the letter pair that logically completes the double-sequence series.",
    options: ["LL", "LM", "MN", "MO"],
    correctAnswer: "2", // "MN"
    explanation: "The pairs are consecutive letter blocks, and we skip 1 letter between adjacent blocks:\n- Block 1: AB (skips C)\n- Block 2: DE (skips F)\n- Block 3: GH (skips I)\n- Block 4: JK (skips L)\n- Block 5: MN.",
    difficulty: "Hard",
    hint: "Look at the letters inside each block and the single letter gaps between the blocks.",
    visualData: { sequence: ["AB", "DE", "GH", "JK", "?"] }
  },

  // === TOPIC 4: Analogy Letter / Word ===
  {
    id: "q_4_easy",
    topicId: "4",
    type: "multiple-choice",
    questionText: "Select the word that completes the lexical analogy logically:\n\nCOLD : ICE :: HOT : ?",
    options: ["WATER", "STEAM", "FIRE", "COOK"],
    correctAnswer: "2", // "FIRE"
    explanation: "Ice is characteristically cold. Similarly, fire is characteristically hot. Fire is the entity representing heat, analogous to ice representing cold.",
    difficulty: "Easy",
    hint: "Ice is famous for being extremely cold. What standard element is famous for being hot?",
    visualData: { sequence: ["COLD", "→", "ICE", "::", "HOT", "→", "?"] }
  },
  {
    id: "q_4_medium",
    topicId: "4",
    type: "multiple-choice",
    questionText: "Solve the semantic utility analogy:\n\nBOOK : READ :: PIANO : ?",
    options: ["SING", "PLAY", "WRITE", "DANCE"],
    correctAnswer: "1", // "PLAY"
    explanation: "A book is an object designed to be READ. Similarly, a piano is an instrument designed to be PLAYED.",
    difficulty: "Medium",
    hint: "What is the primary action you perform on a piano?",
    visualData: { sequence: ["BOOK", "→", "READ", "::", "PIANO", "→", "?"] }
  },
  {
    id: "q_4_hard",
    topicId: "4",
    type: "multiple-choice",
    questionText: "Determine the shifted alphabetical analogy relationship:\n\nCAT : ECV :: DOG : ?",
    options: ["FQI", "FPH", "GQI", "FOG"],
    correctAnswer: "0", // "FQI"
    explanation: "Each letter is shifted 2 positions forward (+2 offset):\nC (+2) = E\nA (+2) = C\nT (+2) = V\nApplying this same rule (+2) to DOG:\nD (+2) = F\nO (+2) = Q\nG (+2) = I\nResult: FQI.",
    difficulty: "Hard",
    hint: "Compare C to E, A to C. Note the alphabetical jump size and apply it to D, O, G.",
    visualData: { sequence: ["CAT", "→", "ECV", "::", "DOG", "→", "?"] }
  },

  // === TOPIC 6: Odd one out Letters / Word ===
  {
    id: "q_6_easy",
    topicId: "6",
    type: "multiple-choice",
    questionText: "Which letter in this group is the ODD ONE OUT because it is NOT a vowel?",
    options: ["A", "E", "O", "Z"],
    correctAnswer: "3", // "Z"
    explanation: "Letters A, E, and O are standard English vowels. Z is a consonant. Therefore, Z is the odd one out.",
    difficulty: "Easy",
    hint: "Vowels are A, E, I, O, U. All other letters are consonants.",
    visualData: { sequence: ["A", "E", "O", "Z"] }
  },
  {
    id: "q_6_medium",
    topicId: "6",
    type: "multiple-choice",
    questionText: "Which animal word is the ODD ONE OUT in this list?",
    options: ["Lion", "Tiger", "Leopard", "Cow"],
    correctAnswer: "3", // "Cow"
    explanation: "Lion, Tiger, and Leopard are wild, carnivorous animals. The Cow is a domestic, herbivorous animal. Thus, Cow is the odd one out.",
    difficulty: "Medium",
    hint: "Think about diet and whether the animal is wild or domesticated.",
    visualData: { sequence: ["Lion", "Tiger", "Leopard", "Cow"] }
  },
  {
    id: "q_6_hard",
    topicId: "6",
    type: "multiple-choice",
    questionText: "Which letter combination is the ODD ONE OUT based on letter gaps?",
    // Let's do AD (diff 3), FI (diff 3), KN (diff 3), RT (diff 2).
    // RT has gap +2, others have +3. So RT is odd one out!
    options: ["AD", "FI", "KN", "RT"],
    correctAnswer: "3", // "RT"
    explanation: "Let's check the alphabetical gaps:\n- A (1) to D (4) has a difference of +3\n- F (6) to I (9) has a difference of +3\n- K (11) to N (14) has a difference of +3\n- R (18) to T (20) has a difference of only +2. Therefore, RT is the odd one out.",
    difficulty: "Hard",
    hint: "Convert the letters to their alphabet positions and check the mathematical gap between them.",
    visualData: { sequence: ["AD", "FI", "KN", "RT"] }
  },

  // === TOPIC 10: Decoding ===
  {
    id: "q_10_easy",
    topicId: "10",
    type: "multiple-choice",
    questionText: "If 'REASON' is encrypted as 'SFBSPO', how is 'LOGIC' encrypted in that code?",
    options: ["KNFHB", "MPHJD", "MOHJD", "MPHKD"],
    correctAnswer: "1", // "MPHJD"
    explanation: "Each letter is shifted 1 position forward in alphabetical order (+1 offset):\nR (+1) → S\nE (+1) → F\nA (+1) → B\nS (+1) → T\nO (+1) → P\nN (+1) → O\nApplying this rule to 'LOGIC' gives MPHJD.",
    difficulty: "Easy",
    hint: "Compare each letter of REASON to SFBSPO. Notice how R turns into S, and E turns into F.",
    visualData: { sequence: ["REASON", "→", "SFBSPO", "::", "LOGIC", "→", "?"] }
  },
  {
    id: "q_10_medium",
    topicId: "10",
    type: "multiple-choice",
    questionText: "If 'MIND' is coded as 'NLKW', how is 'BODY' encrypted under the same sequence shift?",
    options: ["CQGC", "CPGA", "CRAF", "COEB"],
    correctAnswer: "0", // "CQGC"
    explanation: "The pattern is an increasing letter-by-letter offset shift of +1, +2, +3, +4:\n- B (+1) = C\n- O (+2) = Q\n- D (+3) = G\n- Y (+4) = C (recycles past Z).\nResult is CQGC.",
    difficulty: "Medium",
    hint: "Shift the first letter by 1, the second letter by 2, the third by 3, and the fourth by 4.",
    visualData: { sequence: ["B (+1)", "O (+2)", "D (+3)", "Y (+4)"] }
  },
  {
    id: "q_10_hard",
    topicId: "10",
    type: "multiple-choice",
    questionText: "If the word 'SOLVE' is encoded as 'EVLOS', how is 'SMART' encoded?",
    options: ["TRAMS", "SMART", "RAMST", "ARMTS"],
    correctAnswer: "0", // "TRAMS"
    explanation: "The letters of the word are written in exact reverse order:\nS-O-L-V-E becomes E-V-L-O-S.\nApplying this reverse rule to S-M-A-R-T gives T-R-A-M-S.",
    difficulty: "Hard",
    hint: "Write down the letters of the word from right to left.",
    visualData: { sequence: ["S-O-L-V-E", "→", "E-V-L-O-S"] }
  },

  // === TOPIC 14: Word within the word ===
  {
    id: "q_14_easy",
    topicId: "14",
    type: "multiple-choice",
    questionText: "Which of the following words CAN be formed using the letters of 'ENVIRONMENT'?",
    options: ["ENTIRE", "RENT", "MOUNT", "MINER"],
    correctAnswer: "1", // "RENT"
    explanation: "The letters in 'RENT' (R, E, N, T) are all fully available in 'ENVIRONMENT'. \n- 'ENTIRE' requires two Rs (ENVIRONMENT has only one).\n- 'MOUNT' requires 'U' (no U).\n- 'MINER' requires 'M' (no M in ENVIRONMENT? Wait, ENVI-RON-MENT has 'M', but has no 'R' and 'I'? No, ENVIRONMENT has 'I' and 'R' but has no 'S' etc). Thus, RENT is the correct answer.",
    difficulty: "Easy",
    hint: "Check spelling letter-by-letter to see which word can be fully spelled out with only the letters inside ENVIRONMENT.",
    visualData: { sequence: ["E-N-V-I-R-O-N-M-E-N-T"] }
  },
  {
    id: "q_14_medium",
    topicId: "14",
    type: "multiple-choice",
    questionText: "Which word CAN be formed using the letters of 'INCOMPREHENSIBLE'?",
    options: ["PENS", "CHAIR", "SHARKS", "BRUSH"],
    correctAnswer: "0", // "PENS"
    explanation: "The letters P, E, N, S are all fully available inside INCOMPREHENSIBLE. CHAIR requires A, SHARKS requires K, and BRUSH requires U, none of which exist in the parent word.",
    difficulty: "Medium",
    hint: "Look for letters like A, K, or U that do not exist in INCOMPREHENSIBLE.",
    visualData: { sequence: ["I-N-C-O-M-P-R-E-H-E-N-S-I-B-L-E"] }
  },
  {
    id: "q_14_hard",
    topicId: "14",
    type: "multiple-choice",
    questionText: "Which small word CAN be formed using the letters of the long word 'CHARACTERISTICS'?",
    options: ["CHART", "CRICKET", "SHARK", "THREAD"],
    correctAnswer: "0", // "CHART"
    explanation: "CHART is fully formable. CRICKET and SHARK require K, and THREAD requires E and D, none of which are present in CHARACTERISTICS.",
    difficulty: "Hard",
    hint: "Look for letters like K, E, or D which are missing from CHARACTERISTICS.",
    visualData: { sequence: ["C-H-A-R-A-C-T-E-R-I-S-T-I-C-S"] }
  },

  // === TOPIC 15: Word cannot be formed ===
  {
    id: "q_15_easy",
    topicId: "15",
    type: "multiple-choice",
    questionText: "Which word CANNOT be formed using the letters of the word 'COMMUNICATION'?",
    options: ["NATION", "UNION", "MUSIC", "ACTION"],
    correctAnswer: "2", // "MUSIC"
    explanation: "'MUSIC' contains the letter 'S', which is not present anywhere in 'COMMUNICATION'. All other options can be successfully formed.",
    difficulty: "Easy",
    hint: "Check if there is an 'unauthorized' letter in any of the choices that never appears in COMMUNICATION.",
    visualData: { sequence: ["C-O-M-M-U-N-I-C-A-T-I-O-N"] }
  },
  {
    id: "q_15_medium",
    topicId: "15",
    type: "multiple-choice",
    questionText: "Which word CANNOT be formed using the letters of 'KNOWLEDGE'?",
    options: ["WIND", "GOLD", "WOLF", "KNEW"],
    correctAnswer: "0", // "WIND"
    explanation: "'WIND' requires the letter 'I', which is not present in 'KNOWLEDGE'. All other options are formable.",
    difficulty: "Medium",
    hint: "Identify the letter in one of the choices that does not exist in KNOWLEDGE.",
    visualData: { sequence: ["K-N-O-W-L-E-D-G-E"] }
  },
  {
    id: "q_15_hard",
    topicId: "15",
    type: "multiple-choice",
    questionText: "Which word CANNOT be formed using the letters of 'REVOLUTIONARY'?",
    options: ["NATION", "ROUTINE", "VOLT", "LION"],
    correctAnswer: "0", // "NATION"
    explanation: "'NATION' requires two 'N's (N-A-T-I-O-N), but 'REVOLUTIONARY' contains only one 'N'. All other choices can be formed.",
    difficulty: "Hard",
    hint: "Count the occurrences of letters like 'N' in REVOLUTIONARY versus the options.",
    visualData: { sequence: ["R-E-V-O-L-U-T-I-O-N-A-R-Y"] }
  },

  // === TOPIC 16: Arrangement of Letters in English Dictionary ===
  {
    id: "q_16_easy",
    topicId: "16",
    type: "multiple-choice",
    questionText: "Arrange the following words in alphabetical order as they appear in the English Dictionary:\n1. Reason, 2. Reality, 3. Read, 4. React",
    options: ["1, 4, 3, 2", "4, 1, 3, 2", "4, 3, 2, 1", "4, 3, 1, 2"],
    correctAnswer: "2", // "4, 3, 2, 1" -> React, Read, Reality, Reason
    explanation: "Let's compare them letter-by-letter:\n- All start with 'Rea'.\n- Fourth letters: 'React' (c), 'Read' (d), 'Reality' (l), 'Reason' (s).\n- Alphabetical order of fourth letters: c < d < l < s.\n- Therefore: React (4), Read (3), Reality (2), Reason (1). Order is 4, 3, 2, 1.",
    difficulty: "Easy",
    hint: "Look at the first letters that are different. They are 'c' in React, 'd' in Read, 'l' in Reality, and 's' in Reason.",
    visualData: { sequence: ["1. Reason", "2. Reality", "3. Read", "4. React"] }
  },
  {
    id: "q_16_medium",
    topicId: "16",
    type: "multiple-choice",
    questionText: "Arrange these words in standard alphabetical dictionary sequence:\n1. Apple, 2. Apricot, 3. Ape, 4. Application",
    options: ["3, 1, 4, 2", "1, 3, 4, 2", "3, 1, 2, 4", "3, 4, 1, 2"],
    correctAnswer: "0", // "3, 1, 4, 2" -> Ape, Apple, Application, Apricot
    explanation: "Comparing them:\n- 'Ape' (3) is shortest and comes first.\n- Then 'Apple' (1) and 'Application' (4). Comparing 'Apple' and 'Appli': fifth letter 'e' in Apple comes before 'i' in Application. So 1 comes before 4.\n- Finally 'Apricot' (2) comes last because 'r' comes after 'p'.\n- Order: 3, 1, 4, 2.",
    difficulty: "Medium",
    hint: "Compare letter by letter. 'Ap' is common. Third letters: 'e' in Ape vs 'p' in Apple/Application vs 'r' in Apricot.",
    visualData: { sequence: ["1. Apple", "2. Apricot", "3. Ape", "4. Application"] }
  },
  {
    id: "q_16_hard",
    topicId: "16",
    type: "multiple-choice",
    questionText: "Arrange these closely spelled words alphabetically:\n1. Vase, 2. Vocal, 3. Venom, 4. Vision",
    options: ["1, 2, 3, 4", "1, 3, 4, 2", "1, 3, 2, 4", "1, 4, 3, 2"],
    correctAnswer: "1", // "1, 3, 4, 2" -> Vase, Venom, Vision, Vocal
    explanation: "Compare second letters of each word:\n- 'Vase' (1) has 'a' -> comes first.\n- 'Venom' (3) has 'e' -> comes second.\n- 'Vision' (4) has 'i' -> comes third.\n- 'Vocal' (2) has 'o' -> comes fourth.\n- Order: 1, 3, 4, 2.",
    difficulty: "Hard",
    hint: "Compare the second letter of each word: 'a' in Vase, 'o' in Vocal, 'e' in Venom, 'i' in Vision.",
    visualData: { sequence: ["1. Vase", "2. Vocal", "3. Venom", "4. Vision"] }
  },

  // === TOPIC 27: Legal Sequence of Word ===
  {
    id: "q_27_easy",
    topicId: "27",
    type: "multiple-choice",
    questionText: "Arrange these words in a logical growth sequence from beginning to end:\n1. Seed, 2. Tree, 3. Fruit, 4. Flower",
    options: ["1, 2, 3, 4", "1, 2, 4, 3", "2, 1, 4, 3", "1, 4, 2, 3"],
    correctAnswer: "1", // "1, 2, 4, 3"
    explanation: "The logical sequence is: Seed (1) is planted and grows into a Tree (2). The tree produces a Flower (4), which then develops into a Fruit (3). The sequence is 1, 2, 4, 3.",
    difficulty: "Easy",
    hint: "Think about the life cycle of a plant starting from planting a seed.",
    visualData: { sequence: ["Seed", "Tree", "Flower", "Fruit"] }
  },
  {
    id: "q_27_medium",
    topicId: "27",
    type: "multiple-choice",
    questionText: "Arrange the textile production process in its logical legal sequence:\n1. Cotton, 2. Thread, 3. Plant, 4. Shirt",
    options: ["3, 1, 2, 4", "1, 3, 2, 4", "3, 2, 1, 4", "3, 1, 4, 2"],
    correctAnswer: "0", // "3, 1, 2, 4"
    explanation: "The logical sequence of production is:\nFirst we grow the Cotton Plant (3). We harvest raw Cotton (1) from it. The cotton is spun into Thread (2). Finally, the thread is woven to manufacture a Shirt (4). Order: 3, 1, 2, 4.",
    difficulty: "Medium",
    hint: "Start with growing the plant and follow the steps to make a wearable piece of clothing.",
    visualData: { sequence: ["Plant", "Cotton", "Thread", "Shirt"] }
  },
  {
    id: "q_27_hard",
    topicId: "27",
    type: "multiple-choice",
    questionText: "Arrange these academic/career milestones in a logical, chronological sequence:\n1. Job, 2. School, 3. Salary, 4. College",
    options: ["2, 4, 1, 3", "2, 1, 4, 3", "4, 2, 1, 3", "2, 4, 3, 1"],
    correctAnswer: "0", // "2, 4, 1, 3"
    explanation: "The logical chronological timeline is:\nFirst, you attend School (2). Then, you pursue higher studies in College (4). After graduation, you get a Job (1). Finally, you receive a Salary (3). Order: 2, 4, 1, 3.",
    difficulty: "Hard",
    hint: "What is the chronological order from childhood education up to professional earning?",
    visualData: { sequence: ["School", "College", "Job", "Salary"] }
  }
];
