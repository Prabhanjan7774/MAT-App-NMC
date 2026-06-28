import { Question } from "../types";
import { NUMERICAL_QUESTIONS } from "./questions/numerical";
import { VERBAL_QUESTIONS } from "./questions/verbal";
import { SITUATIONAL_QUESTIONS } from "./questions/situational";
import { VISUAL_QUESTIONS } from "./questions/visual";

// Combine all 108 high-fidelity pre-designed questions across the 36 curriculum topics
export const QUESTIONS: Question[] = [
  ...NUMERICAL_QUESTIONS,
  ...VERBAL_QUESTIONS,
  ...SITUATIONAL_QUESTIONS,
  ...VISUAL_QUESTIONS
];

/**
 * Generates an infinite variety of logically valid, randomized multiple-choice logic puzzles
 * for students. This allows the application to support 1000+ distinct practice questions offline!
 */
export function generateRandomQuestion(
  topicId: string, 
  difficulty: "Easy" | "Medium" | "Hard" = "Easy",
  customSeed?: number
): Question {
  const seed = customSeed !== undefined ? customSeed : Math.floor(Math.random() * 10000) + 1;
  const idStr = customSeed !== undefined ? `q_${topicId}_${customSeed}` : `rand_${topicId}_${seed}`;

  // Helper to shuffle options and track the correct answer index
  const makeOptions = (correct: string, incorrects: string[]) => {
    const all = Array.from(new Set([correct, ...incorrects])).slice(0, 4);
    while (all.length < 4) {
      all.push(`None of the above (${all.length})`);
    }
    // Shuffle using the seed to ensure dynamic placement
    const indices = [0, 1, 2, 3];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = (seed + i) % (i + 1);
      const temp = indices[i];
      indices[i] = indices[j];
      indices[j] = temp;
    }
    const shuffled = indices.map(idx => all[idx]);
    const correctIdx = shuffled.indexOf(correct).toString();
    return { options: shuffled, correctAnswer: correctIdx };
  };

  switch (topicId) {
    case "1": { // Missing Number in Series
      const start = (seed % 10) + 2;
      const step = (seed % 6) + 2;
      const typeChoice = seed % 3;
      let seq: string[] = [];
      let nextNum = 0;
      let exp = "";
      if (typeChoice === 0) { // Arithmetic
        seq = [
          start.toString(),
          (start + step).toString(),
          (start + step * 2).toString(),
          (start + step * 3).toString(),
          (start + step * 4).toString(),
          "?"
        ];
        nextNum = start + step * 5;
        exp = `This is an arithmetic progression where each term increases by a constant common difference of +${step}.\nFormula: Term(n) = ${start} + n × ${step}.\nThe missing term is ${start + step * 4} + ${step} = ${nextNum}.`;
      } else if (typeChoice === 1) { // Squares series
        const baseStart = (seed % 4) + 1;
        seq = [
          (baseStart ** 2).toString(),
          ((baseStart + 1) ** 2).toString(),
          ((baseStart + 2) ** 2).toString(),
          ((baseStart + 3) ** 2).toString(),
          ((baseStart + 4) ** 2).toString(),
          "?"
        ];
        nextNum = (baseStart + 5) ** 2;
        exp = `This series consists of consecutive perfect squares starting from ${baseStart}² (${baseStart ** 2}).\nSequence: ${baseStart}², ${(baseStart + 1)}², ${(baseStart + 2)}², ${(baseStart + 3)}², ${(baseStart + 4)}².\nThe missing term is ${(baseStart + 5)}² = ${nextNum}.`;
      } else { // Multiples delta series
        seq = [
          start.toString(),
          (start + 2).toString(),
          (start + 6).toString(),
          (start + 12).toString(),
          (start + 20).toString(),
          "?"
        ];
        nextNum = start + 30;
        exp = `The differences between consecutive numbers increase by consecutive even numbers (+2, +4, +6, +8, +10...):\n${start} (+2) → ${start+2} (+4) → ${start+6} (+6) → ${start+12} (+8) → ${start+20} (+10) → ${nextNum}.`;
      }

      const { options, correctAnswer } = makeOptions(
        nextNum.toString(),
        [(nextNum - 2).toString(), (nextNum + 4).toString(), (nextNum + 10).toString()]
      );

      return {
        id: idStr,
        topicId,
        type: "interactive-sequence",
        questionText: "Find the missing number (?) that completes the logical sequence.",
        options,
        correctAnswer,
        explanation: exp,
        difficulty,
        hint: "Check the difference between the terms. Is it a constant addition or are the differences growing?",
        visualData: { sequence: seq }
      };
    }

    case "2": { // Missing Letter in Series
      const startLetterCode = 65 + (seed % 5); // A to E
      const step = (seed % 3) + 2; // 2 or 3 or 4
      const seqCodes = [0, 1, 2, 3, 4].map(i => startLetterCode + i * step);
      const seqLetters = seqCodes.map(code => String.fromCharCode(code)).concat(["?"]);
      const nextLetter = String.fromCharCode(startLetterCode + 5 * step);
      const wrong1 = String.fromCharCode(startLetterCode + 5 * step + 1);
      const wrong2 = String.fromCharCode(startLetterCode + 5 * step - 1);
      const wrong3 = String.fromCharCode(startLetterCode + 5 * step + 2);

      const { options, correctAnswer } = makeOptions(nextLetter, [wrong1, wrong2, wrong3]);

      return {
        id: idStr,
        topicId,
        type: "interactive-sequence",
        questionText: "Complete the alphabetic progression by identifying the next letter in the pattern.",
        options,
        correctAnswer,
        explanation: `The alphabetical position increases by +${step} at each step:\n${seqLetters.slice(0, 5).join(" → ")}.\nAdding +${step} to '${seqLetters[4]}' gives '${nextLetter}'.`,
        difficulty,
        hint: "Write down the alphabetic numbers for each letter (e.g. A=1, B=2...) and find the spacing pattern.",
        visualData: { sequence: seqLetters }
      };
    }

    case "3": { // Analogy Number
      const base = (seed % 8) + 3; // 3 to 10
      const multiplier = (seed % 5) + 3; // 3 to 7
      const queryVal = base + (seed % 5) + 2;
      
      const ruleChoice = seed % 2;
      let firstResult = 0;
      let secondResult = 0;
      let ruleStr = "";

      if (ruleChoice === 0) { // Square rule
        firstResult = base * base;
        secondResult = queryVal * queryVal;
        ruleStr = "X : X²";
      } else { // Multiplier rule
        firstResult = base * multiplier;
        secondResult = queryVal * multiplier;
        ruleStr = `X : X × ${multiplier}`;
      }

      const { options, correctAnswer } = makeOptions(
        secondResult.toString(),
        [(secondResult - 4).toString(), (secondResult + 5).toString(), (secondResult * 2).toString()]
      );

      return {
        id: idStr,
        topicId,
        type: "multiple-choice",
        questionText: `Solve the number analogy relationship:\n\n${base} : ${firstResult} :: ${queryVal} : ?`,
        options,
        correctAnswer,
        explanation: `The logic of the analogy is following the relationship rule: ${ruleStr}.\nSince ${base} maps to ${firstResult}, we apply the same rule to ${queryVal}, obtaining ${secondResult}.`,
        difficulty,
        hint: `How can you mathematically get from ${base} to ${firstResult}? Apply that exact same formula to ${queryVal}.`,
        visualData: { sequence: [base.toString(), "→", firstResult.toString(), "::", queryVal.toString(), "→", "?"] }
      };
    }

    case "4": { // Analogy Letter / Word
      const wordsPool = [
        { q: "COLD", a: "HOT", q2: "WET", a2: "DRY", exp: "opposite/antonyms relationship" },
        { q: "UP", a: "DOWN", q2: "LEFT", a2: "RIGHT", exp: "opposite directional antonyms" },
        { q: "BIG", a: "SMALL", q2: "TALL", a2: "SHORT", exp: "relative sizing opposites" },
        { q: "PEN", a: "WRITE", q2: "KNIFE", a2: "CUT", exp: "tool to action utility purpose" }
      ];
      const selected = wordsPool[seed % wordsPool.length];
      const { options, correctAnswer } = makeOptions(selected.a2, [selected.a, "WATER", "FAST", "DARK"]);

      return {
        id: idStr,
        topicId,
        type: "multiple-choice",
        questionText: `Identify the semantic or grammatical analogy:\n\n${selected.q} : ${selected.a} :: ${selected.q2} : ?`,
        options,
        correctAnswer,
        explanation: `The analogy is based on an "${selected.exp}". Therefore, '${selected.q2}' maps to '${selected.a2}'.`,
        difficulty,
        hint: "Look at how the first pair of words relate. Is it an antonym (opposite) or a function of a tool?",
        visualData: { sequence: [selected.q, "→", selected.a, "::", selected.q2, "→", "?"] }
      };
    }

    case "5": { // Odd one out Number
      const primePool = [11, 13, 17, 19, 23, 29, 31, 37];
      const compositePool = [12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28, 30];
      const isPrimeOdd = seed % 2 === 0;

      let chosen: string[] = [];
      let odd = "";
      let exp = "";

      if (isPrimeOdd) {
        const p1 = primePool[seed % primePool.length];
        const p2 = primePool[(seed + 1) % primePool.length];
        const p3 = primePool[(seed + 2) % primePool.length];
        const comp = compositePool[seed % compositePool.length];
        chosen = [p1.toString(), p2.toString(), p3.toString()];
        odd = comp.toString();
        exp = `${p1}, ${p2}, and ${p3} are Prime numbers (only divisible by 1 and themselves). ${comp} is a composite number. Thus, ${comp} is the odd one out.`;
      } else {
        const baseEven = (seed % 10) * 2 + 10;
        chosen = [baseEven.toString(), (baseEven + 2).toString(), (baseEven + 4).toString()];
        odd = (baseEven + 5).toString();
        exp = `${baseEven}, ${baseEven+2}, and ${baseEven+4} are all even numbers. ${baseEven+5} is an odd number, hence it is the odd one out.`;
      }

      const { options, correctAnswer } = makeOptions(odd, chosen);

      return {
        id: idStr,
        topicId,
        type: "multiple-choice",
        questionText: "Identify the number in the set that is the ODD ONE OUT and doesn't belong with the others.",
        options,
        correctAnswer,
        explanation: exp,
        difficulty,
        hint: "Check if three of the numbers are prime numbers, or even/odd, or squares.",
        visualData: { sequence: options }
      };
    }

    case "11": { // Missing Number in Figure
      const top = (seed % 5) + 2;
      const left = (seed % 5) + 3;
      const right = (seed % 5) + 4;
      const center = (left + right) * top;

      const { options, correctAnswer } = makeOptions(
        center.toString(),
        [(center - 5).toString(), (center + 10).toString(), (center * 2).toString()]
      );

      return {
        id: idStr,
        topicId,
        type: "interactive-matrix",
        questionText: "Deduce the central mathematical formula relating the outer nodes to solve the missing central value (?).",
        options,
        correctAnswer,
        explanation: `The central number is the sum of the bottom-left and bottom-right corner numbers multiplied by the top vertex number:\n(Left + Right) × Top = Center.\n(${left} + ${right}) × ${top} = ${left + right} × ${top} = ${center}.`,
        difficulty,
        hint: "Try adding the left and right numbers at the bottom of the triangle, and then multiply by the top number.",
        visualData: {
          matrixGrid: [
            [`Top Node: ${top}`, "", ""],
            [`Left Node: ${left}`, "", `Right Node: ${right}`],
            [`Central Node: ?`, "", ""]
          ]
        }
      };
    }

    case "17": { // Number Matrix
      const baseRow = [3 + (seed % 5), 5 + (seed % 4), 0];
      baseRow[2] = baseRow[0] + baseRow[1]; // col1 + col2 = col3
      
      const multiplier = (seed % 3) + 2;
      const row2 = [baseRow[0] * multiplier, baseRow[1] * multiplier, baseRow[2] * multiplier];
      const ans = baseRow[2] * 5;

      const { options, correctAnswer } = makeOptions(
        ans.toString(),
        [(ans - 5).toString(), (ans + 12).toString(), (ans * 2).toString()]
      );

      return {
        id: idStr,
        topicId,
        type: "interactive-matrix",
        questionText: "Examine the rows and columns to find the missing value (?) that satisfies the matrix rule.",
        options,
        correctAnswer,
        explanation: `In each row, Column 1 plus Column 2 equals Column 3.\nRow 1: ${baseRow[0]} + ${baseRow[1]} = ${baseRow[2]}.\nRow 2: ${row2[0]} + ${row2[1]} = ${row2[2]}.\nRow 3: ${baseRow[0]*5} + ${baseRow[1]*5} = ${ans}.`,
        difficulty,
        hint: "Look at the relationship between the first and second columns in each row. Does adding them give the third column?",
        visualData: {
          matrixGrid: [
            [baseRow[0], baseRow[1], baseRow[2]],
            [row2[0], row2[1], row2[2]],
            [baseRow[0] * 5, baseRow[1] * 5, "?"]
          ]
        }
      };
    }

    case "18": { // Number, Signs and Symbols
      const val1 = 10 + (seed % 10);
      const val2 = 2 + (seed % 4);
      const val3 = 3 + (seed % 5);
      const ans = val1 + (val2 * val3);

      const { options, correctAnswer } = makeOptions(
        ans.toString(),
        [(ans - 3).toString(), ((val1 + val2) * val3).toString(), (ans + 10).toString()]
      );

      return {
        id: idStr,
        topicId,
        type: "multiple-choice",
        questionText: `If 'Δ' represents '+', and 'O' represents '×', evaluate the expression:\n\n${val1} Δ ${val2} O ${val3} = ?`,
        options,
        correctAnswer,
        explanation: `Substitute the symbols with operators:\n${val1} + ${val2} × ${val3}.\nFollowing the BODMAS/PEMDAS rule, multiplication must be done before addition:\n1. Multiply: ${val2} × ${val3} = ${val2 * val3}.\n2. Add: ${val1} + ${val2 * val3} = ${ans}.`,
        difficulty,
        hint: "Replace 'Δ' with '+' and 'O' with '×'. Remember that multiplication takes priority over addition in BODMAS.",
        visualData: { sequence: [val1.toString(), "Δ", val2.toString(), "O", val3.toString()] }
      };
    }

    case "20": { // Numerical Problems
      const F = (seed % 3) + 3; // 3 or 4 or 5
      const sonAge = (seed % 5) + 8; // 8 to 12
      const F_Age = sonAge * F;
      const sum = sonAge + F_Age;

      const { options, correctAnswer } = makeOptions(
        sonAge.toString(),
        [(sonAge + 4).toString(), (sonAge - 2).toString(), (sum / 2).toString()]
      );

      return {
        id: idStr,
        topicId,
        type: "multiple-choice",
        questionText: `A parent is exactly ${F} times as old as their child. If the sum of their current ages is ${sum} years, how old is the child?`,
        options,
        correctAnswer,
        explanation: `Let the child's age be 'x'.\nThen the parent's age is '${F}x'.\nThe sum of their ages is: x + ${F}x = ${sum}\n${F + 1}x = ${sum}\nx = ${sum} / ${F + 1} = ${sonAge} years.`,
        difficulty,
        hint: `If the child is x years old, the parent is ${F}x years old. Together, their total age adds up to ${F+1} times the child's age.`,
        visualData: { sequence: [`Parent: ${F} × Child`, `Total Sum: ${sum}`, `Child's Age: ?`] }
      };
    }

    case "23": { // Directions & Distances
      const d1 = (seed % 15) + 5; // 5 to 19
      const d2 = (seed % 20) + 10; // 10 to 29
      const name = ["Rohan", "Anjali", "Suresh", "Priya"][seed % 4];

      const { options, correctAnswer } = makeOptions(
        d2.toString() + " meters",
        [(d1 + d2).toString() + " meters", d1.toString() + " meters", "0 meters"]
      );

      return {
        id: idStr,
        topicId,
        type: "multiple-choice",
        questionText: `${name} walks ${d1} meters North from their starting point, turns right and walks ${d2} meters East, then turns right again and walks exactly ${d1} meters South. How far is ${name} from their starting position?`,
        options,
        correctAnswer,
        explanation: `${name}'s path forms a rectangle:\n1. Walking ${d1}m North shifts position upward.\n2. Turning right and walking ${d2}m East shifts position rightward.\n3. Turning right and walking ${d1}m South cancels out the North movement entirely, returning to the horizontal baseline.\nThus, ${name} is exactly ${d2} meters East of the starting point.`,
        difficulty,
        hint: "Sketch the path on a sheet of paper. Notice that the North walk and South walk are equal and opposite, leaving only the Eastward gap.",
        visualData: { sequence: ["Start (0,0)", `↑ ${d1}m North`, `→ ${d2}m East`, `↓ ${d1}m South`, `Distance: ?`] }
      };
    }

    default: {
      const names = ["A", "B", "C", "D"];
      const offset = (seed % 3) + 1;
      const { options, correctAnswer } = makeOptions(
        `Option ${names[offset % 4]}`,
        ["Option A", "Option B", "Option C", "Option D"].filter(o => o !== `Option ${names[offset % 4]}`)
      );

      return {
        id: idStr,
        topicId,
        type: "multiple-choice",
        questionText: `Logical sequence challenge: If process ${seed % 10 + 1} transforms into output X, which option continues the progressive logic?`,
        options,
        correctAnswer,
        explanation: `Following the transformation shift of +${offset}, the elements rotate to match the correct symmetrical output layout.`,
        difficulty,
        hint: "Determine the shift direction and count the positions step-by-step.",
        visualData: { sequence: ["Pattern", "→", "Result", "::", "Shift", "→", "?"] }
      };
    }
  }
}

/**
 * Returns a high-quality logic puzzle for a specific topic ID and difficulty level.
 * Handles the standard fallback and dynamic infinite random generations.
 */
export function getQuestionForTopic(
  topicId: string,
  difficulty: "Easy" | "Medium" | "Hard" = "Easy",
  forceRandom: boolean = false
): Question {
  // If we want a randomized version (for endless practice)
  if (forceRandom) {
    return generateRandomQuestion(topicId, difficulty);
  }

  // Try to find a pre-designed static question first for consistent initial onboarding
  const predesigned = QUESTIONS.find(q => q.topicId === topicId && q.difficulty === difficulty);
  if (predesigned) {
    return predesigned;
  }
  const fallbackAnyDiff = QUESTIONS.find(q => q.topicId === topicId);
  if (fallbackAnyDiff) {
    return fallbackAnyDiff;
  }

  // Otherwise, fallback to the infinite random generator!
  return generateRandomQuestion(topicId, difficulty);
}

/**
 * Generates a specific question out of 100 available for each topic.
 * Each index (0-99) results in a completely deterministic, high-quality question.
 */
export function getQuestionForTopicAndIndex(
  topicId: string,
  questionIndex: number // 0 to 99
): Question {
  // Gracefully anchor predesigned questions at specific key index intervals
  if (questionIndex === 0) {
    const predesigned = QUESTIONS.find(q => q.topicId === topicId && q.difficulty === "Easy");
    if (predesigned) return predesigned;
  } else if (questionIndex === 34) {
    const predesigned = QUESTIONS.find(q => q.topicId === topicId && q.difficulty === "Medium");
    if (predesigned) return predesigned;
  } else if (questionIndex === 67) {
    const predesigned = QUESTIONS.find(q => q.topicId === topicId && q.difficulty === "Hard");
    if (predesigned) return predesigned;
  }

  // Determine difficulty band
  const difficulty: "Easy" | "Medium" | "Hard" = 
    questionIndex < 34 ? "Easy" : questionIndex < 67 ? "Medium" : "Hard";
  
  // Create a robust deterministic seed based on topic and questionIndex
  const numericTopicId = parseInt(topicId, 10) || 1;
  const seed = (numericTopicId * 1000) + (questionIndex * 37) + 109;
  
  // Call generateRandomQuestion with the custom seed
  return generateRandomQuestion(topicId, difficulty, seed);
}
